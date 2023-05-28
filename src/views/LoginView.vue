<template>
     <form @submit.prevent="login">
    <div class="hero is-fullheight">
      <section class="hero is-primary is-small">
        <div class="hero-body is-justify-content-center">
          <p class="title">
            Bendrabučio teikiamų paslaugų administravimo informacinė sistema
          </p>
        </div>
      </section>
      <div v-if="showError" class="notification is-danger has-text-centered text-xl">
        <p>{{ errorMessage }}</p>
      </div>
      <div v-if="showMessage" class="notification is-info has-text-centered text-xl">
        <p>{{ message }}</p>
      </div>
      <div class="hero-body is-justify-content-center is-align-items-center">
        <div class="columns is-flex is-flex-direction-column box">
          <div class="column has-text-left">
            <label for="username">Prisijungimo vardas</label>
            <input class="input is-primary" type="text" :class="noUsername || badUsernameLenght ? 'is-danger' : ''"
              placeholder="Prisijungimo vardas" v-model="username">
            <p v-show="noUsername" class="help is-danger">Prisijungimo vardas tuščias</p>
            <p v-show="badUsernameLenght" class="help is-danger">Prisijungimo vardas negali viršyti 50 simbolių</p>
          </div>
          <div class="column has-text-left">
            <label for="Name">Slaptažodis</label>
            <input class="input is-primary" type="password" :class="noPassword || badPasswordLenght ? 'is-danger' : ''" placeholder="Slaptažodis"
              v-model="password">
            <p v-show="noPassword" class="help is-danger">Slaptažodis tuščias</p>
            <p v-show="badPasswordLenght" class="help is-danger">Slaptažodis negali viršyti 100 simbolių</p>

          </div>
          <div class="column">
            <button class="button is-primary is-fullwidth" type="submit">Prisijungti</button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>
<script>
export default {
  name: 'LoginView',
  data() {
    return {
      username: "",
      password: "",
      showError: false,
      noUsername: false,
      noPassword: false,
      badPasswordLenght: false,
      errorMessage: "",
      showMessage: false,
      message: "",
      badUsernameLenght: false,
    };
  },
  props: {
  },
  methods: {
    //login the user
    async login() {
      if (!this.validateForm()) {
        return
      }
      try {
        const response = await this.$api.login({
          "username": this.username,
          "password": this.password
        })
        localStorage.removeItem('message')
        if(response.blocked == 0){
        localStorage.setItem('token', response.token)
        

        this.message = localStorage.getItem('message')
        if(this.message != null){
        this.showMessage = true
        }
        let data = await this.$api.getDataFromToken()
        sessionStorage.setItem('id',data.id)
       sessionStorage.setItem('role',data.role)
      let occupaton = await this.$api.getUserOccupation(sessionStorage.getItem('id'))
      if(occupaton.occupation == "Neprisijungęs"){
       // if(data.role == 'Administratorius' || data.role == 'Budėtojas'){
        await this.$api.setWorkerOccupation("Prisijungęs",data.id)
       // }
        this.$router.push('/main')
       }
       else{
        this.message = "Naudotojas jau yra prisijungęs prie paskyros"
          this.showMessage = true
       }
        }
        else{
          this.message = "Jūsų paskyra užblokuota"
        this.showMessage = true
        }
      }
      catch (error) {
        //check if there was a connection error
        if(error.code == 'ERR_NETWORK'){
          this.message = 'Nepavyko susisiekti su serveriu'
          this.showMessage = true
        }
        //check if too many requests
        else if(error.response.status == 429){
          this.message = error.response.data
          this.showMessage = true
        
        }
        //check if imputed data does not belong to a user
        else if(error.response.status == 500){
        this.showMessage = false
        this.showError = true
        this.errorMessage = error.response.data
        }
       
      }
    },
    //check the form field data
    validateForm() {
      this.showError = false
      this.showMessage = false
      this.noUsername = false
      this.noPassword = false
      this.badUsernameLenght = false
      this.badPasswordLenght = false
      if (!this.username) {
        this.noUsername = true
        return false
      }
      else {
        this.noUsername = false
      }
      if(this.username.length > 50){
        this.badUsernameLenght = true
        return false
      }
      else{
        this.badUsernameLenght = false
      }
      if (!this.password) {
        this.noPassword = true
        return false
      }
      else {
        this.noPassword = false
      }
      if(this.password.length > 100){
        this.badPasswordLenght = true
        return false
      }
      else{
        this.badPasswordLenght = false
      }

      return true
    },
    //check if there is a message to display and display it
    checkAndShowMessage() {
      if (localStorage.getItem('message') != null) {
        this.message = localStorage.getItem('message')
        this.showMessage = true
        localStorage.removeItem('message')
      }
      else {
        this.showMessage = false
      }
    }
  },
  created() {
    this.checkAndShowMessage()
  }
}
</script>