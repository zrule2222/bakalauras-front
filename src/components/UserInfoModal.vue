<template>
    <div class="modal" :class="{ 'is-active': isActive }">
   <div class="modal-background"></div>
      <div class="modal-content">
        <header class="modal-card-head">
          <p  class="modal-card-title has-text-left">Pakeisti naudotojo informaciją</p>
        </header>
            <section class="modal-card-body">
              <div v-if="(userRole == 'Administratorius' && adminCanOpenForm == true) || (userRole == 'Gyventojas' && residentCanOpenForm == true)">
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
            <input class="input" :class="noPassword || badPasswordLenght || passwordTooShort || notStrongPassword ? 'is-danger' : ''" v-model="password" type="password"
                placeholder="Slaptažodis">
                <p v-show="noPassword" class="help is-danger has-text-left">Slaptažodis tuščias</p>
            <p v-show="badPasswordLenght" class="help is-danger has-text-left">Slaptažodis negali viršyti 100 simbolių</p>
            <p v-show="passwordTooShort" class="help is-danger has-text-left">Minimalus slaptažodžio ilgis yra 6 simboliai</p>
            <p v-show="notStrongPassword" class="help is-danger has-text-left">Slaptažotis privalo turėti mažaja, didžiają raidę, skaičių ir specialų simbolį</p>
          </div>
          <div class="field">
            <label class="label has-text-left">Slaptažio pakartojimas</label>
            <input class="input " type="password" :class=" repeatNoPassword || repeatBadPasswordLength || passwordsDontMatch ? 'is-danger' : ''"
              placeholder="Slaptažio pakartojimas" v-model="repeatPassword">
            <p v-show="repeatNoPassword" class="help is-danger has-text-left">Pakartotas slaptažodis tuščias</p>
            <p v-show="repeatBadPasswordLength" class="help is-danger has-text-left ">Pakartotas slaptažodis negali viršyti 100 simbolių</p>
            <p v-show="passwordsDontMatch" class="help is-danger has-text-left">Pakartotas slaptažodis nesutampa su įvestu slaptažodžiu</p>
          </div>
          <!-- this checkbox only apears if the resident is blocked -->
          <div v-if="blocked == true"  class="field has-text-left">
            <label class="label">Užblokuotas</label>
            <input class="ml-[1px]" type="checkbox" v-model="newBlocked">
          </div>
           </div>
           <div v-else-if="userRole == 'Administratorius' && adminCanOpenForm == false" class="label">
            Gyventojas šiuo metu atnaujina savo informaciją. Prašome palaukti
           </div>
           <div v-else-if="userRole == 'Gyventojas' && residentCanOpenForm == false" class="label">
            Administratorius šiuo metu atnaujina jūsų informaciją. Prašome palaukti
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
            passwordTooShort: false,
            notStrongPassword: false,
            residentCanOpenForm: true,
            adminCanOpenForm: true,
            userRole: "",
            


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
      //close this modal
       async closeModal() {
        await this.$api.setEditStatus(sessionStorage.getItem('id'), {status: null})
            this.$emit('close-action');
        },
        //update user data
        async setUserData() {
            if(!this.validateForm()){
                return
            }
            //create a variable that hold all the data that is in the form
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
                  await this.$api.setEditStatus(sessionStorage.getItem('id'), {status: null})
                  this.$emit('update-sucess');
                }
                if(this.email != this.ckeckEmail || this.blocked != this.newBlocked){
                  await this.$api.updateUserInfo(this.userId, userinfo)
                  await this.$api.setEditStatus(sessionStorage.getItem('id'), {status: null})
             this.$emit('update-sucess');
                }
              }
              else if(this.email != this.ckeckEmail){
             await this.$api.updateUserInfo(this.userId, userinfo)
             await this.$api.setEditStatus(sessionStorage.getItem('id'), {status: null})
             this.$emit('update-sucess');
              }
              else if(this.blocked != this.newBlocked){
                await this.$api.updateUserInfo(this.userId, userinfo)
                await this.$api.setEditStatus(sessionStorage.getItem('id'), {status: null})
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
        //get the data of the user whose data is being changed
       async getUserData(){
        if(!this.checkIfUserCanOpenForm()){
          return
        }
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
       async checkIfUserCanOpenForm(){
          try{
          if(sessionStorage.getItem('role') == "Administratorius"){
         var status = await this.$api.getEditStatus(this.userId)
         console.log(status)
         if(status.editing_data != null){
           this.adminCanOpenForm = false
           return false
         }
         else{
          this.adminCanOpenForm = true
          await this.$api.setEditStatus(sessionStorage.getItem('id'), {status: this.userId})
          return true
         }

          }
          else if(sessionStorage.getItem('role') == "Gyventojas"){
            var status = await this.$api.getEditStatus(29)
            if(status.editing_data != null){
           this.residentCanOpenForm = false
           return false
         }
         else{
          this.residentCanOpenForm = true
          await this.$api.setEditStatus(sessionStorage.getItem('id'), {status: this.userId})
          return true
          }
        }
      }
        catch(error){

        }
        },
        //check all the form fields
        validateForm() {
          this.badEmail = false
          this.noEmail = false
          this.badEmailLenght = false
          this.badPasswordLenght = false
          this.repeatNoPassword = false
          this.repeatBadPasswordLength = false
          this.passwordsDontMatch = false
          this.passwordTooShort = false
          this.notStrongPassword = false
          var passwordCheck = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,}$/
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
      if(this.password && this.password.length < 6){
        this.passwordTooShort = true
        return false
      }
      else{
        this.passwordTooShort = false
      }
     
     if(this.password && this.password.match(passwordCheck)){
        this.notStrongPassword = false
        
      }
      else if (this.password && !this.password.match(passwordCheck)){
        this.notStrongPassword = true
        return false
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
      this.userRole = sessionStorage.getItem('role')
        this.getUserData()
       
    }
}
</script>