<template>
       <div class="modal" :class="{ 'is-active': isActive }">
        <div class="h-12"></div>
   <div class="modal-background"></div>
      <div class="modal-content">
        <header class="modal-card-head">
          <p  class="modal-card-title has-text-left">Svečio atvykimo redagavimas</p>
        </header>
            <section class="modal-card-body">
          <div class="field">
            <label class="label has-text-left">Atvykimo laikas</label>
            <VueDatePicker :state="displayError" :minDate="new Date(new Date().setDate(new Date().getDate()))" :min-time="{ hours: 8, minutes: 0 }"   v-model="registrationTime"   locale="lt" cancelText="Atšaukti" selectText="Pasirinkti" :timezone="'Europe/Minsk'"  :teleport="true" :format="`yyyy/MM/dd HH:mm`" placeholder="Atvykimo laikas"/>
            <div class="">

            </div>
            <p v-show="noTime == false" class="help is-danger has-text-left">Nepasirinktas svečio atvykimo laikas</p>
            <p v-show="incorrectTime == false" class="help is-danger has-text-left">Svečias negali atvykti laiko tarpu 00:00-08:00</p>
            <p v-show="sameTimeRrror == false" class="help is-danger has-text-left">Nebuvo pasirinktas naujas svečio atvykimo laikas</p>
            <p v-show="bellowCurrentTimeError == false" class="help is-danger has-text-left">Svečio atvykimo laikas yra praeityje</p>
            <p v-show="sameTimeError == false" class="help is-danger has-text-left">Jūs jau esate užregistravę šį svečia nurodytam laikui</p>
          </div>

            </section>
            <footer class="modal-card-foot flex justify-between">
                <button @click="updateTime()" class="button is-success">Išsaugotį pokytį</button>
                <button @click.prevent="close()" class="button is-danger">Uždaryti</button>
            </footer>


        </div>
    </div>
</template>
<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
export default {
    name: 'GuestRegistrationEditModal',
    data() {
        return {
            registrationTime: "",
            originalRegistrationTime: "",
            noTime: null,
            incorrectTime: null,
            sameTimeRrror: null,
            bellowCurrentTimeError: null,
            sameTimeError: null,
            displayError: null,

        }
    },
    props: {
        isActive: { type: Boolean, default: false, required: true },
        time: {type: String, required: true},
        regId: {type: Number, required: true},
        timeArray: {type: Array, required: true}
    },
    components:{
        VueDatePicker,
    },
    methods: {
        //close this modal
        close() {
            this.$emit('close-action');
        },
       async updateTime(){
        if(!this.validateForm()){
            return
        }
        try{
            await this.$api.updateGuestArrival(this.regId,{arrival: this.registrationTime})
            this.$emit('time-update-sucess');
        }
        catch(error){
            this.$emit('time-update-fail');
        }
        },
        validateForm(){
            this.noTime = null
            this.incorrectTime = null
            this.displayError = null
            this.sameTimeRrror = null
            this.bellowCurrentTimeError = null
            this.sameTimeError = null
            let time = new Date(this.registrationTime)
            if (!this.registrationTime) {
                this.displayError = false
        this.noTime = false
        return false
      }
      else if(time.getHours() >= 0  && time.getHours()  < 8){
        this.displayError = false
       this.incorrectTime = false
       return false
      }
      if(this.registrationTime == this.originalRegistrationTime){
        this.displayError = false
        this.sameTimeRrror = false
        return false
      }
      if(time < new Date()){
        this.displayError = false
        this.bellowCurrentTimeError = false
        return false
      }
      for (let index = 0; index < this.timeArray.length; index++) {
        console.log(time)
        console.log(new Date(this.timeArray[index]))
        if(+time == +new Date(this.timeArray[index])){
            this.sameTimeError = false
            this.displayError = false
            return false
        }
        
      }
      
      return true
        }
    },
    created() {
        console.log(this.regId)
        this.registrationTime = this.time
        this.originalRegistrationTime = this.time
    }
}
</script>