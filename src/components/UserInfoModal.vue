<template>
    <div class="modal" :class="{ 'is-active': isActive }">
   <div class="modal-background"></div>
      <div class="modal-content">
        <header class="modal-card-head">
          <p  class="modal-card-title has-text-left">Pakeisti naudotojo informaciją</p>
        </header>
            <section class="modal-card-body">
                <div class="field">
            <label class="label has-text-left">El. paštas</label>
            <input class="input" :class="noEmail || badEmail || badEmailLenght ? 'is-danger' : ''" v-model="email" type="email"
                placeholder="Email">
            <p v-show="noEmail" class="help is-danger has-text-left">El. pašto laukelis tuščias</p>
            <p v-show="badEmail" class="help is-danger has-text-left">Netinkamas el. pašto formatas</p>
            <p v-show="badEmailLenght" class="help is-danger has-text-left">El. paštas negali viršyti 100 simbolių</p>
          </div>
          <div class="field">
            <label class="label has-text-left">Naujas slaptažodis</label>
            <input class="input" :class="noPassword || badPasswordLenght ? 'is-danger' : ''" v-model="password" type="password"
                placeholder="Slaptažodis">
                <p v-show="noPassword" class="help is-danger has-text-left">Slaptažodis tuščias</p>
            <p v-show="badPasswordLenght" class="help is-danger has-text-left">Slaptažodis negali viršyti 100 simbolių</p>
          </div>
          <div class="field">
            <label class="label has-text-left">Slaptažio pakartojimas</label>
            <input class="input " type="password" :class=" repeatNoPassword || repeatBadPasswordLength || passwordsDontMatch ? 'is-danger' : ''"
              placeholder="Slaptažio pakartojimas" v-model="repeatPassword">
            <p v-show="repeatNoPassword" class="help is-danger has-text-left">Pakartotas slaptažodis tuščias</p>
            <p v-show="repeatBadPasswordLength" class="help is-danger has-text-left ">Pakartotas slaptažodis negali viršyti 100 simbolių</p>
            <p v-show="passwordsDontMatch" class="help is-danger has-text-left">Pakartotas slaptažodis nesutampa su įvestu slaptažodžiu</p>
          </div>
          
          <div v-if="blocked == true"  class="field has-text-left">
            <label class="label">Užblokuotas</label>
            <input class="ml-[1px]" type="checkbox" v-model="newBlocked">
          </div>

            </section>
            <footer class="modal-card-foot flex justify-between">
                <button @click="setUserData()" class="button is-success">Tvirtinti</button>
                <button @click.prevent="closeModal()" class="button is-danger">Uždaryti</button>
            </footer>


        </div>
    </div>
</template>

<script>
import SucessMessageModal from "../components/SucessMessageModal.vue"
export default {
    name: 'UserInfoModal',
    data() {
        return {
            email: "",
            noEmail: false,
            badEmail: false,
            badEmailLenght: false,
            ckeckEmail: "",
            password: "",
            noPassword: false,
            badPasswordLenght: false,
            blocked: false,
            newBlocked: false,
            repeatPassword: "",
            repeatNoPassword: false,
            repeatBadPasswordLength: false,
            passwordsDontMatch: false,
            


        }
    },
    props: {
        isActive: { type: Boolean, default: false, required: true },
        userId: { type: Number, required: true }
    },
    components:{
        SucessMessageModal,
    },
    methods: {
        closeModal() {
            this.$emit('close-action');
        },
        async setUserData() {
            if(!this.validateForm()){
                return
            }
            let userinfo = {
             email: this.email,
             password: this.password,
             blocked: this.newBlocked
            }
            try{
              if(this.password && this.repeatPassword){
                let data = await this.$api.getDataFromToken()
                if(data.role == 'Gyventojas'){
                await this.$api.updateUserPassword(data.id,this.password)
                }
                else{
                  await this.$api.updateUserPassword(this.userId,this.password)
                }

                if(this.email == this.ckeckEmail){
                  this.$emit('update-sucess');
                }
                if(this.email != this.ckeckEmail || this.blocked != this.newBlocked){
                  await this.$api.updateUserInfo(this.userId, userinfo)
             this.$emit('update-sucess');
                }
              }
              else if(this.email != this.ckeckEmail){
             await this.$api.updateUserInfo(this.userId, userinfo)
             this.$emit('update-sucess');
              }
              else if(this.blocked != this.newBlocked){
                await this.$api.updateUserInfo(this.userId, userinfo)
                this.$emit('update-sucess');
              }
              else{
                this.$emit('no-changes');
              }
            }
            catch(error){
              if(error.request.status == 500){
                this.$emit('same-password');
              }
              else{
              this.$emit('update-fail');
              }
            }
        },
       async getUserData(){
        try{
        let userData = await this.$api.getUserInfo(this.userId)
        this.email = userData.email
        this.ckeckEmail = userData.email
        if(userData.blocked == 1){
        this.blocked = true
        this.newBlocked = true
        }
        else{
            this.blocked = false
            this.newBlocked = false
        }
        }
        catch(error){
            this.email = ""
            this.blocked = false
            this.newBlocked = false
        }
        },
        validateForm() {
          this.badEmail = false
          this.noEmail = false
          this.badEmailLenght = false
          this.badPasswordLenght = false
          this.repeatNoPassword = false
          this.repeatBadPasswordLength = false
          this.passwordsDontMatch = false
      if (!this.email) {
        this.noEmail = true
        return false
      }
      else {
        this.noEmail = false
      }
      var emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(this.email.match(emailCheck)){
        this.badEmail = false
      }
      else{
        this.badEmail = true
        return false
      }
      if(this.email.length > 100){
        this.badEmailLenght = true
        return false
      }
      else{
        this.badEmailLenght = false
      }
      if (this.repeatPassword && !this.password) {
        this.noPassword = true
        return false
      }
      else {
        this.noPassword = false
      }
      if(this.password.length > 100 && this.password){
        this.badPasswordLenght = true
        return false
      }
      else{
        this.badPasswordLenght = false
      }
      if (!this.repeatPassword && this.password) {
        this.repeatNoPassword = true
        return false
      }
      else {
        this.repeatNoPassword = false
      }
      if(this.repeatPassword.length > 100 && this.repeatPassword){
            this.repeatBadPasswordLength = true
            return false
      }else{
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
        this.getUserData()
    }
}
</script>