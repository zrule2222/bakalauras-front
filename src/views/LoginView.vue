<template>
     <form @submit.prevent="login">
    <div class="hero is-fullheight">
      <section class="hero is-primary is-small">
        <div class="hero-body is-justify-content-center">
          <p class="title">
            Bendrabučio administravimo sistema
          </p>
        </div>
      </section>
      <div v-if="showError" class="notification is-danger has-text-centered">
        <p>{{ errorMessage }}</p>
      </div>
      <div v-if="showMessage" class="notification is-info has-text-centered">
        <p>{{ message }}</p>
      </div>
      <div class="hero-body is-justify-content-center is-align-items-center">
        <div class="columns is-flex is-flex-direction-column box">
          <div class="column has-text-left">
            <label for="username">Prisijiungimo vardas</label>
            <input class="input is-primary" type="text" :class="noUsername || badUsernameLenght ? 'is-danger' : ''"
              placeholder="Prisijiungimo vardas" v-model="username">
            <p v-show="noUsername" class="help is-danger">Prisijiungimo vardas tuščias</p>
            <p v-show="badUsernameLenght" class="help is-danger">Prisijiungimo vardas negali viršyti 50 simbolių</p>
          </div>
          <div class="column has-text-left">
            <label for="Name">Slaptažodis</label>
            <input class="input is-primary" type="password" :class="noPassword ? 'is-danger' : ''" placeholder="Slaptažodis"
              v-model="password">
            <p v-show="noPassword" class="help is-danger">Slaptažodis tuščias</p>

          </div>
          <div class="column">
            <button class="button is-primary is-fullwidth" type="submit">Prisijiungti</button>
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
      errorMessage: "",
      showMessage: false,
      message: "",
      badUsernameLenght: false
    };
  },
  props: {
    // message: {
    //   type: String
    // }
  },
  methods: {
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
        this.showMessage = true
        let data = await this.$api.getDataFromToken()
        if(data.role == 'Administratorius' || data.role == 'Budėtojas'){
        await this.$api.setWorkerOccupation("Prisijiungęs",data.id)
        }
        this.$router.push('/main')
        }
        else{
          this.message = "Jūsų paskyra užblokuota"
        this.showMessage = true
        }
      }
      catch (error) {
        this.showMessage = false
        this.showError = true
        this.errorMessage = error.response.data
      }
    },
    validateForm() {
      this.showError = false
      this.showMessage = false
      this.noUsername = false
      this.noPassword = false
      this.badUsernameLenght = false
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
      return true
    },
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