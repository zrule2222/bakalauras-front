<template>
    <div class="modal" :class="{ 'is-active': isActive }">
   <div class="modal-background"></div>
      <div class="modal-content">
        <header class="modal-card-head">
          <p  class="modal-card-title has-text-left">Pakeisti naudotojo informacija</p>
        </header>
            <section class="modal-card-body">
                <div class="field">
            <label class="label has-text-left">El. paštas</label>
            <input class="input" :class="noEmail || badEmail || badEmailLenght ? 'is-danger' : ''" v-model="email" type="email"
                placeholder="Email">
            <p v-show="noEmail" class="help is-danger has-text-left">El. pašto laukelis tuščias</p>
            <p v-show="badEmail" class="help is-danger has-text-left">Netinkamas El. pašto formatas</p>
            <p v-show="badEmailLenght" class="help is-danger has-text-left">El. paštas negali viršyti 100 simbolių</p>
          </div>
          <div class="field">
            <label class="label has-text-left">Naujas slaptažodis</label>
            <input class="input" :class="badPasswordLenght ? 'is-danger' : ''" v-model="password" type="password"
                placeholder="Slaptažodis">
            <p v-show="badPasswordLenght" class="help is-danger has-text-left">Slaptažodis negali viršyti 100 simbolių</p>
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
            password: "",
            badPasswordLenght: false,
            blocked: false,
            newBlocked: false,

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
            if(!this.password){
                this.password = null
            }
            let userinfo = {
             email: this.email,
             password: this.password,
             newBlocked: this.newBlocked
            }
            try{
            await this.$api.updateUserInfo(this.userId, userinfo)
            this.$emit('update-sucess');
            }
            catch(error){
                this.$emit('update-fail');
            }
        },
       async getUserData(){
        try{
        let userData = await this.$api.getUserInfo(this.userId)
        this.email = userData.email
        }
        catch(error){
            this.email = ""
        }
        if(userData.blocked == 1){
        this.blocked = true
        this.newBlocked = true
        }
        else{
            this.blocked = false
            this.newBlocked = false
        }
        },
        validateForm() {
          this.badEmail = false
          this.noEmail = false
          this.badEmailLenght = false
          this.badPasswordLenght = false
          if(this.password.length > 100){
        this.badPasswordLenght = true
        return false
      }
      else{
        this.badPasswordLenght = false
      }
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


      return true
    }
    },
    created() {
        this.getUserData()
    }
}
</script>