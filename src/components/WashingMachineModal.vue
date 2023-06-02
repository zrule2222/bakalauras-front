<template>
   <div class="modal" :class="{ 'is-active': isActive }">
   <div class="modal-background"></div>
      <div class="modal-content">
        <header class="modal-card-head">
          <p  class="modal-card-title has-text-left">Skalbyklė Nr. {{machineNumber}}</p>
        </header>
            <section class="modal-card-body">
          <div class="field">
            <label class="label has-text-left">Skalbimo laikas</label>
            <VueDatePicker :state="displayError" :minDate="new Date(new Date().setDate(new Date().getDate() - 1))"  v-model="washingTime" locale="lt" cancelText="Atšaukti" selectText="Pasirinkti" :timezone="'UTC'" :start-time="{hours: 0, minutes: 0 }" :max-time="{ hours: '3', minutes: 0 }" :min-time="{ hours: '00'}" :teleport="true" time-picker placeholder="Skalbimo laikas"/>
            <p v-show="noWashingTime == false" class="help is-danger has-text-left">Nepasirinkta skalbimo trukmė</p>
            <p v-show="badWashingTime == false" class="help is-danger has-text-left">Minimali skalbimo trukmė 30 minučių</p>
            <p v-show="overTimeLimitError == false" class="help is-danger has-text-left">Skalbimo trukmė negali viršyti 3 valandų</p>
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
            overTimeLimitError: null,
        }
    },
    props: {
        isActive: { type: Boolean, default: false, required: true },
        machineNumber: {type: Number,required: true},
        machineId: {type: Number,required: true}
    },
    components:{
        VueDatePicker,
    },
    methods: {
        //close this modal
        closeModal() {
            this.$emit('close-action');
        },
        //register a washing for the selected washing machine
       async registerWashing(){
            if(!this.validateForm()){
                return
            }
            try{
                let data = await this.$api.getDataFromToken()
                let timer = JSON.parse(JSON.stringify(this.washingTime))
                //object that hold the registration data
                let registrationData ={
                    user: data.id,
	                status: "Aktyvus",
	               machine: this.machineId,
                   time : `${timer.hours}:${timer.minutes}`
                }
                //format washing time
                let washingFinishDate = new Date()
                 washingFinishDate.setHours(washingFinishDate.getHours() + timer.hours)
                 washingFinishDate.setMinutes(washingFinishDate.getMinutes() + timer.minutes)
                 washingFinishDate.setSeconds(0)
                 let machines = await this.$api.getWashingMachineData()
                 let thisMachine = machines.filter(obj => {
                 return obj.machine_id === this.machineId
                })
                if(thisMachine[0].machine_status == "Working"){
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
              else if(thisMachine[0].machine_status == "Occupied"){
                this.$emit('washing-occupied');
              }
              else{
                this.$emit('washing-broken');
              }
            }
            catch(error){
            this.$emit('washing-fail');
            }
            
        },
        //check if the selected time is valid
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
      else if(time.hours > 3 || (time.hours == 3 && time.minutes > 0) ){
        this.displayError = false
        this.overTimeLimitError = false
        return false
      }
      return true
        }
    },
   async created() {
    }
}
</script>