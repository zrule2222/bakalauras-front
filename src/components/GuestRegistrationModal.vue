<template>
    <div class="modal" :class="{ 'is-active': isActive }">
   <div class="modal-background"></div>
      <div class="modal-content">
        <header class="modal-card-head">
          <p  class="modal-card-title has-text-left">Svečio registracija</p>
        </header>
            <section class="modal-card-body">
                <div class="field">
            <label class="label has-text-left">Svečio vardas</label>
            <input class="input" :class="noGuestName || badGuestNameLenght || nameHasNumbers ? 'is-danger' : ''" v-model="guestName" type="text"
                placeholder="Svečio vardas">
            <p v-show="noGuestName" class="help is-danger has-text-left">Svečio vardas tuščias</p>
            <p v-show="badGuestNameLenght" class="help is-danger has-text-left">Svečio vardas negali viršyti 40 simbolių</p>
            <p v-show="nameHasNumbers" class="help is-danger has-text-left">Svečio vardas negali turėti skaičių</p>
          </div>
          <div class="field">
            <label class="label has-text-left">Svečio pavardė</label>
            <input class="input" :class="noGuestLastName || badGuestLastNameLenght || lastnameHasNumbers ? 'is-danger' : ''" v-model="guestLastName" type="text"
                placeholder="Svečio pavardė">
            <p v-show="noGuestLastName" class="help is-danger has-text-left">Svečio pavardė tuščia</p>
            <p v-show="badGuestLastNameLenght" class="help is-danger has-text-left">Svečio pavardė negali viršyti 40 simbolių</p>
            <p v-show="lastnameHasNumbers" class="help is-danger has-text-left">Svečio pavardėje negali būti skaičių</p>
          </div>
          <div class="field">
            <label class="label has-text-left">Svečio atvykimo laikas</label>
            <VueDatePicker :state="timeError" :minDate="new Date(new Date().setDate(new Date().getDate() - 1))"  v-model="guestArrival" locale="lt" :min-time="{ hours: 8, minutes: 0 }" cancelText="Atšaukti" selectText="Pasirinkti" :timezone="'UTC'" :teleport="true" :format="`yyyy/MM/dd HH:mm`" placeholder="Svečio atvykimo laikas"/>
            <p v-show="noTimeEror == true" class="help is-danger has-text-left">Nepasirinktas svečio atvykimo laikas</p>
            <p v-show="RegistrationAlreadyExists == true" class="help is-danger has-text-left">Jūs jau esate užregistravę svečią nurodytam laikui</p>
            <p v-show="incorrectTime == true" class="help is-danger has-text-left">Svečias negali atvykti laiko tarpu 00:00-07:59</p>
            <p v-show="bellowCurrentTimeError == true" class="help is-danger has-text-left">Svečio atvykimo laikas yra praeityje</p>
          </div>

            </section>
            <footer class="modal-card-foot flex justify-between">
                <button @click="registerGuest()" class="button is-success">Tvirtinti</button>
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
            nameHasNumbers: false,
            lastnameHasNumbers: false,
            RegistrationAlreadyExists: false,
            timeError: null,
            noTimeEror: false,
            bellowCurrentTimeError: false,
            incorrectTime: false
        }
    },
    props: {
        isActive: { type: Boolean, default: false, required: true },
        activeRegistrations: {type: Array, required: true}
    },
    components:{
        SucessMessageModal,
        VueDatePicker,
    },
    methods: {
      //close this modal
        closeModal() {
            this.$emit('close-action');
        },
        //check all registration for imputs
        validateForm() {
          this.noGuestName = false
          this.badGuestNameLenght = false
          this.noGuestLastName = false
          this.badGuestLastNameLenght = false
          this.nameHasNumbers = false
          this.lastnameHasNumbers = false
          this.RegistrationAlreadyExists = false
          this.noGuestArrival = false
          this.noTimeEror = false
          this.incorrectTime = false
          this.bellowCurrentTimeError = false
          this.timeError = null
          let currentDate = new Date()
      //  console.log(selectedData)
      //  console.log(FormatedCurrentDate)
      //  console.log(selectedData < FormatedCurrentDate)
      //  return false
          const numbers = /\d/
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
      if(numbers.test(this.guestName)){
        this.nameHasNumbers = true
        return false
      }
      else{
        this.nameHasNumbers = false
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
      if(numbers.test(this.guestLastName)){
        this.lastnameHasNumbers = true
        return false
      }
      else{
        this.lastnameHasNumbers = false
      }
      if (!this.guestArrival) {
        this.timeError = false
        this.noTimeEror = true
        return false
      }
      let year =   this.guestArrival.getUTCFullYear()
    let month =   this.guestArrival.getUTCMonth() +1
     let day =   this.guestArrival.getUTCDate()
     let hour =  this.guestArrival.getUTCHours()
      let minute =  this.guestArrival.getUTCMinutes()

      if(month < 10){
        month = '0' + month
      }
      if(day < 10){
        day = '0' + day
      }
      if(minute < 10){
        minute = '0' + minute
      }
      if(hour < 10){
        hour = '0' + hour
      }
          let selectedData = `${year}-${month}-${day} ${hour}:${minute}`
          let currentYear =   currentDate.getUTCFullYear()
    let curreentMonth =   currentDate.getUTCMonth() +1
     let currentDay =   currentDate.getUTCDate()
     let currentHour = currentDate.getHours()
      let currentMinute =  currentDate.getMinutes()

      if(curreentMonth < 10){
        curreentMonth = '0' + curreentMonth
      }
      if(currentDay < 10){
        currentDay = '0' + currentDay
      }
      if(currentMinute < 10){
        currentMinute = '0' + currentMinute
      }
      if(currentHour < 10){
        currentHour = '0' + currentHour
      }
       let FormatedCurrentDate = `${currentYear}-${curreentMonth}-${currentDay} ${currentHour}:${currentMinute}`
      if(selectedData < FormatedCurrentDate){
        this.timeError = false
        this.bellowCurrentTimeError = true
        return false
      }
      if(this.guestArrival.getUTCHours() >= 0  && this.guestArrival.getUTCHours()  < 8){
        this.timeError = false
       this.incorrectTime = true
       return false
      }
      for (let index = 0; index < this.activeRegistrations.length; index++) {
        let dateToCompare = new Date(this.activeRegistrations[index].guest_arrival)
       let imputDate = `${this.guestArrival.getUTCFullYear()}-${this.guestArrival.getMonth() + 1}-${this.guestArrival.getUTCDate()} ${this.guestArrival.getUTCHours()}:${this.guestArrival.getUTCMinutes()}`
       let activeRegistrationDate = `${dateToCompare.getUTCFullYear()}-${dateToCompare.getMonth() + 1}-${dateToCompare.getUTCDate()} ${dateToCompare.getHours()}:${dateToCompare.getMinutes()}`
        if(this.activeRegistrations[index].guest_firstname == this.guestName.charAt(0).toUpperCase() + this.guestName.slice(1) && this.activeRegistrations[index].guest_lastname == this.guestLastName.charAt(0).toUpperCase() + this.guestLastName.slice(1) && imputDate == activeRegistrationDate){
          this.RegistrationAlreadyExists = true
          this.timeError = false
          return false
        }
        
      }
      return true
    },
    //register the guest
    async registerGuest(){
        if(!this.validateForm()){
            return
        }
        let userData = await this.$api.getDataFromToken()
        let date = JSON.parse(JSON.stringify(this.guestArrival))
        let arrival = new Date(date)
        let formatedGuestArrival = {
            user_id: userData.id,
	firstname: this.guestName.charAt(0).toUpperCase() + this.guestName.slice(1),
	lastname: this.guestLastName.charAt(0).toUpperCase() + this.guestLastName.slice(1),
  //format registration time
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
    }
}
</script>