<template>
    <div>
        <div class="hero is-fullheight">
        <div class="hero">
      <section class="hero is-primary is-small">
        <div class="hero-body is-justify-content-center">
          <p class="title">
            Slaptažodžio keitimas
          </p>
        </div>
      </section>
    </div>
    <MenuBar :menu-type="'main-back'"></MenuBar>

    <div class="hero-body is-justify-content-center is-align-items-center">
        <div class="columns is-flex is-flex-direction-column box">
          <div class="column has-text-left">
            <label for="password">Slaptažodis</label>
            <input class="input " type="password" :class=" noPassword || badPasswordLength || passwordTooShort || notStrongPassword ? 'is-danger' : ''"
              placeholder="Slaptažodis" v-model="password">
            <p v-show="noPassword" class="help is-danger">Slaptažodis tuščias</p>
            <p v-show="badPasswordLength" class="help is-danger">Slaptažodis negali viršyti 100 simbolių</p>
            <p v-show="passwordTooShort" class="help is-danger has-text-left">Minimalus slaptažodžio ilgis yra 6 simboliai</p>
            <p v-show="notStrongPassword" class="help is-danger has-text-left">Slaptažodis privalo turėti mažąją, didžiąją raidę, skaičių ir specialų simbolį</p>
          </div>
          <div class="column has-text-left">
            <label for="repeatPassword">Slaptažio pakartojimas</label>
            <input class="input " type="password" :class=" repeatNoPassword || repeatBadPasswordLength || passwordsDontMatch ? 'is-danger' : ''"
              placeholder="Slaptažio pakartojimas" v-model="repeatPassword">
            <p v-show="repeatNoPassword" class="help is-danger">Pakartotas slaptažodis tuščias</p>
            <p v-show="repeatBadPasswordLength" class="help is-danger">Pakartotas slaptažodis negali viršyti 100 simbolių</p>
            <p v-show="passwordsDontMatch" class="help is-danger">Pakartotas slaptažodis nesutampa su įvestu slaptažodžiu</p>
          </div>
          <div class="column">
            <button class="button is-primary is-fullwidth"  @click="changePassword()">Keisti slaptažodį</button>
          </div>
        </div>
    </div>
        </div>
 <SucessMessageModal v-if="showSucessModal" :isActive="showSucessModal" :Message="sucessMessage" @close-action="closeSucessModal()"></SucessMessageModal>
    
    </div>


    
</template>

<script>
import MenuBar from "../components/MenuBar.vue"
import SucessMessageModal from"../components/SucessMessageModal.vue"
export default {
    name: 'doorKeeperPasswordView',
    data() {
        return {
            password: "",
            noPassword: false,
            badPasswordLength: false,
            repeatPassword: "",
            repeatNoPassword: false,
            repeatBadPasswordLength: false,
            passwordsDontMatch: false,
            showSucessModal: false,
            sucessMessage: "",
            changeSucess: false,
            passwordTooShort: false,
            notStrongPassword: false,
        }
    },
    props: {
    },
    components: {
        MenuBar,
        SucessMessageModal,
    },
    methods: {
      //change the doorkeepers password
       async changePassword() {
            if(!this.validateForm()){
              return
            }
            else{
              try{
                let data = await this.$api.getDataFromToken()
               await this.$api.updateUserPassword(data.id,this.password)
               this.sucessMessage = 'Slaptažodis pakeistas sėkmingai'
                    this.showSucessModal = true
                    this.changeSucess = true
              }
              catch(error){
                if(error.request.status == 500){
                    this.sucessMessage = 'Naujas slaptažodis negali būti toks pat kaip senas'
                    this.showSucessModal = true
                    this.changeSucess = false

                }
                else if(error.request.status == 501){
                    this.sucessMessage = 'Nepavyko pakeisti slaptažodžio'
                    this.showSucessModal = true
                    this.changeSucess = false
                }
              }
            }
        },
        //close sucess message modal
        closeSucessModal(){
            this.showSucessModal = false
            if(this.changeSucess == true){
                this.password = ""
            this.noPassword = false
            this.badPasswordLength = false
            this.repeatPassword = ""
            this.repeatNoPassword = false
            this.repeatBadPasswordLength = false
            this.passwordsDontMatch = false
            this.showSucessModal = false
            this.sucessMessage = ""
            }
        },
        //check if form data is correct
        validateForm(){
            this.noPassword = false
            this.badPasswordLength = false
            this.repeatNoPassword = false
            this.repeatBadPasswordLength = false
            this.passwordsDontMatch = false
            this.passwordTooShort = false
            this.notStrongPassword = false
            if (!this.password) {
        this.noPassword = true
        return false
      }
      else {
        this.noPassword = false
      }
      if(this.password.length > 100){
        this.badPasswordLength = true
        return false
      }
      else{
        this.badPasswordLength = false
      }
      if(this.password.length < 6 ){
        this.passwordTooShort = true
        return false
      }
      else{
        this.passwordTooShort = false
      }
      var passwordCheck = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,}$/
      if(this.password.match(passwordCheck)){
        this.notStrongPassword = false
        
      }
      else{
        this.notStrongPassword = true
        return false
      }
      if (!this.repeatPassword) {
        this.repeatNoPassword = true
        return false
      }
      else {
        this.repeatNoPassword = false
      }
      if(this.repeatPassword.length > 100){
        this.repeatBadPasswordLength = true
        return false
      }
      else{
        this.repeatBadPasswordLength = false
      }
      if(this.password != this.repeatPassword){
this.passwordsDontMatch = true
return false
      }
      else{
        this.passwordsDontMatch = false
      }
      return true
        }
    },
    created() {
    }
}
</script>