<template>
    <div class="modal" :class="{ 'is-active': isActive }">
   <div class="modal-background"></div>
      <div class="modal-content">
        <header class="modal-card-head">
          <p  class="modal-card-title has-text-left">Pakeisti naudotojo informacija</p>
        </header>
            <section class="modal-card-body">
                <div class="field">
            <label class="label has-text-left">Svečio vardas</label>
            <input class="input" :class="noGuestName ? 'is-danger' : ''" v-model="guestName" type="text"
                placeholder="Svečio vardas">
            <p v-show="noGuestName" class="help is-danger has-text-left">Svečio vardas tuščias</p>
            <!-- <p v-show="badEmail" class="help is-danger has-text-left">Netinkamas El. pašto formatas</p> -->
          </div>
          <div class="field">
            <label class="label has-text-left">Svečio pavardė</label>
            <input class="input" :class="noGuestLastName ? 'is-danger' : ''" v-model="guestLastName" type="password"
                placeholder="Svečio pavardė">
            <p v-show="noGuestLastName" class="help is-danger">Svečio pavardė tuščia</p>
          </div>
          <div class="field">
            <label class="label has-text-left">Svečio atvykimo laikas</label>
            <VueDatePicker :state="noGuestArrival" v-model="guestArrival" locale="lt" cancelText="Atšaukti" selectText="Pasirinkti" :timezone="'UTC'" :teleport="true" :format="`yyyy/MM/dd HH:mm`"/>
            <p v-show="noGuestArrival" class="help is-danger has-text-left">Nepasirinktas svečio atvykimo laikas</p>
          </div>

            </section>
            <footer class="modal-card-foot flex justify-between">
                <button @click="test()" class="button is-success">Tvirtinti</button>
                <button @click.prevent="closeModal()" class="button is-danger">Uždaryti</button>
            </footer>


        </div>
    </div>
</template>

<script>
import SucessMessageModal from "../components/SucessMessageModal.vue"
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';
export default {
    name: 'GuestRegistrationModal',
    data() {
        return {
            guestName: "",
            noGuestName: false,
            guestLastName: "",
            noGuestLastName: "",
            guestArrival: "",
            noGuestArrival: false,
            time: Date,


        }
    },
    props: {
        isActive: { type: Boolean, default: false, required: true },
        
        // userId: { type: Number, required: true }
    },
    components:{
        SucessMessageModal,
        VueDatePicker,
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
        let userData = await this.$api.getUserInfo(this.userId)
        this.email = userData.email
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
      if (!this.email) {
        this.noEmail = true
        return false
      }
      else {
        this.noEmail = false
      }
    //   var emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    //   if(this.email.match(emailCheck)){
    //     this.badEmail = false
    //   }
    //   else{
    //     this.badEmail = true
    //     return false
    //   }


      return true
    },
    test(){
        let date = JSON.parse(JSON.stringify(this.time))
        let diena = new Date(date)
        // console.log(diena.getUTCHours())
        // console.log(diena)
        // console.log(this.time)
        // console.log(date)
        // console.log(date.hours)
        // console.log(date.minutes)
    }
    },
    created() {
        // this.getUserData()
    }
}
</script>