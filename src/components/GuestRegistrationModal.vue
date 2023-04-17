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
            <input class="input" :class="noGuestName || badGuestNameLenght ? 'is-danger' : ''" v-model="guestName" type="text"
                placeholder="Svečio vardas">
            <p v-show="noGuestName" class="help is-danger has-text-left">Svečio vardas tuščias</p>
            <p v-show="badGuestNameLenght" class="help is-danger has-text-left">Svečio vardas negali viršyti 40 simbolių</p>
            <!-- <p v-show="badEmail" class="help is-danger has-text-left">Netinkamas El. pašto formatas</p> -->
          </div>
          <div class="field">
            <label class="label has-text-left">Svečio pavardė</label>
            <input class="input" :class="noGuestLastName || badGuestLastNameLenght ? 'is-danger' : ''" v-model="guestLastName" type="text"
                placeholder="Svečio pavardė">
            <p v-show="noGuestLastName" class="help is-danger has-text-left">Svečio pavardė tuščia</p>
            <p v-show="badGuestLastNameLenght" class="help is-danger has-text-left">Svečio pavardė negali viršyti 40 simbolių</p>
          </div>
          <div class="field">
            <label class="label has-text-left">Svečio atvykimo laikas</label>
            <VueDatePicker :state="noGuestArrival" :minDate="new Date(new Date().setDate(new Date().getDate() - 1))"  v-model="guestArrival" locale="lt" cancelText="Atšaukti" selectText="Pasirinkti" :timezone="'UTC'" :teleport="true" :format="`yyyy/MM/dd HH:mm`"/>
            <p v-show="noGuestArrival == false" class="help is-danger has-text-left">Nepasirinktas svečio atvykimo laikas</p>
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
            badGuestNameLenght: false,
            guestLastName: "",
            noGuestLastName: false,
            badGuestLastNameLenght: false,
            guestArrival: "",
            noGuestArrival: null,
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
        validateForm() {
          this.noGuestName = false
          this.badGuestNameLenght = false
          this.noGuestLastName = false
          this.badGuestLastNameLenght = false
      if (!this.guestName) {
        this.noGuestName = true
        return false
      }
      else {
        this.noGuestName = false
      }
      if(this.guestName.length > 40){
        this.badGuestNameLenght = true
        return false
      }
      else{
        this.badGuestNameLenght = false
      }
      if (!this.guestLastName) {
        this.noGuestLastName = true
        return false
      }
      else {
        this.noGuestLastName = false
      }
      if(this.guestLastName.length > 40){
        this.badGuestLastNameLenght = true
        return false
      }
      else{
        this.badGuestLastNameLenght = false
      }
      if (!this.guestArrival) {
        this.noGuestArrival = false
        return false
      }
      return true
    },
    async test(){
        if(!this.validateForm()){
            return
        }
        let userData = await this.$api.getDataFromToken()
        let date = JSON.parse(JSON.stringify(this.guestArrival))
        let arrival = new Date(date)
        console.log(arrival)
        let formatedGuestArrival = {
            user_id: userData.id,
	firstname: this.guestName,
	lastname: this.guestLastName,
	arrival: `${arrival.getUTCFullYear()}-${arrival.getMonth() + 1}-${arrival.getUTCDate()} ${arrival.getUTCHours()}:${arrival.getUTCMinutes()}`
        }
        try{
        await this.$api.registerGuest(formatedGuestArrival)
        this.$emit("registration-sucess")
        }
        catch(error){
            this.$emit("registration-fail")
        }
       
        
    }
    },
    created() {
        // this.getUserData()
    }
}
</script>