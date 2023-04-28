<template>
   <div class="modal" :class="{ 'is-active': isActive }">
   <div class="modal-background"></div>
      <div class="modal-content">
        <header class="modal-card-head">
          <p  class="modal-card-title has-text-left">Skalbyklė Nr. {{machineNumber}}</p>
        </header>
            <section class="modal-card-body">
          <div class="field">
            <label class="label has-text-left">skalbimo laikas</label>
            <VueDatePicker :state="displayError" :minDate="new Date(new Date().setDate(new Date().getDate() - 1))"  v-model="washingTime" locale="lt" cancelText="Atšaukti" selectText="Pasirinkti" :timezone="'UTC'" :start-time="{hours: 0, minutes: 0 }" :max-time="{ hours: '3', minutes: 0 }" :teleport="true" time-picker/>
            <p v-show="noWashingTime == false" class="help is-danger has-text-left">Nepasirinkta skalbimo trukmė</p>
            <p v-show="badWashingTime == false" class="help is-danger has-text-left">Minimali skalbimo trukmė 30 minučių</p>
          </div>

            </section>
            <footer class="modal-card-foot flex justify-between">
                <button @click="registerWashing()" class="button is-success">Išsaugotį pokytį</button>
                <button @click.prevent="closeModal()" class="button is-danger">Uždaryti</button>
            </footer>


        </div>
    </div>
</template>
<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
export default {
    name: 'WashingMachineModal',
    data() {
        return {
            washingTime: "",
            noWashingTime: null,
            badWashingTime: null,
            displayError: null,
        }
    },
    props: {
        isActive: { type: Boolean, default: false, required: true },
        machineNumber: {type: Number,required: true},
        machineId: {type: Number,required: true}
        // serviceInformation: {type: String, required: true},
        // serviceName: {type: String, required: true}
    },
    components:{
        VueDatePicker,
    },
    methods: {
        closeModal() {
            this.$emit('close-action');
        },
       async registerWashing(){
            if(!this.validateForm()){
                return
            }
            try{
                let data = await this.$api.getDataFromToken()
                let timer = JSON.parse(JSON.stringify(this.washingTime))
                let registrationData ={
                    user: data.id,
	                status: "Aktyvus",
	              // created_at: new Date(),
	               machine: this.machineId,
                   time : `${timer.hours}:${timer.minutes}`
                }
                let washingFinishDate = new Date()
                 washingFinishDate.setHours(washingFinishDate.getHours() + timer.hours)
                 washingFinishDate.setMinutes(washingFinishDate.getMinutes() + timer.minutes)
                 washingFinishDate.setSeconds(0)
               let response =  await this.$api.registerWashing(registrationData)
               let updateData ={
                    status: "Occupied",
	                time: washingFinishDate,
	                user: data.id,
                    registration: response.insertId
                }
                  await this.$api.updateWashingMachine(this.machineId,updateData)
                  this.$emit('washing-sucess');
            }
            catch(error){
            console.log(error)
            this.$emit('washing-fail');
            }
            
        },
        validateForm(){
            this.noWashingTime = null
            this.badWashingTime = null
            this.displayError = null
            let time = JSON.parse(JSON.stringify(this.washingTime))
            if (!this.washingTime) {
                this.displayError = false
        this.noWashingTime = false
        return false
      }
      else if(time.hours == 0 && time.minutes < 30){
        this.displayError = false
       this.badWashingTime = false
       return false
      }
      return true
        }
    },
    created() {
    }
}
</script>