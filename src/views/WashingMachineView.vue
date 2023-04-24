<template>
    <div>
        <div class="hero">
      <section class="hero is-primary is-small">
        <div class="hero-body is-justify-content-center">
          <p class="title">
            Skalbykla
          </p>
        </div>
      </section>
    </div>
    <MenuBar :menu-type="'main-back'"></MenuBar>

    <div class="columns is-multiline mt-3 is-centered ">
<div v-for="machine in washingMachines" :key="machine.machine_id" :class="machine.machine_status == 'Occupied'? '!mt-0': ''"   class="mb-3 column is-4 mt-5    has-text-centered">
<div class="tex text-xl">Skalbyklė nr. {{ machine.machine_number  }}</div>
<div  v-if="machine.machine_status == 'Occupied'"> skalbiama iki: {{machine.time}}</div>
<img  src="../assets/washing_machine.jpg"  class="m-auto">
<div class=" justify-between mt-2">
<button  v-if="machine.machine_status == 'Working'" class="button is-primary m-1" @click="showRegistrationModal(machine.machine_id,machine.machine_number)">Registruoti skalbimą</button>
<button  v-if="machine.machine_status == 'Working'" class="button is-danger m-1">Registruoti gedimą</button>
</div>
</div>
    </div>

<WashingMachineModal v-if="showModal" :isActive="showModal" :machineId="machineId" :machineNumber="washingNumber" @close-action="closeMachineModal()" @washing-sucess="washingSucess()" @washing-fail="washingFail()"></WashingMachineModal>
<SucessMessageModal v-if="showSucessMessage" :isActive="showSucessMessage" :Message="messageSucess" @close-action="showSucessMessage = false, messageSucess = '', getMachineData()"></SucessMessageModal>
    </div>
</template>

<script>
import MenuBar from "../components/MenuBar.vue"
import WashingMachineModal from "../components/WashingMachineModal.vue"
import SucessMessageModal from "../components/SucessMessageModal.vue"
export default {
    name: 'WashingMachineView',
    data() {
        return {
            washingMachines: [],
            showModal: false,
            machineId: Number,
            showSucessMessage: false,
            messageSucess: '',
            washingNumber: Number,
        }
    },
    props: {
        // isActive: { type: Boolean, default: false, required: true },
        // serviceInformation: {type: String, required: true},
        // serviceName: {type: String, required: true}
    },
    components: {
        MenuBar,
        WashingMachineModal,
        SucessMessageModal,
    },
    methods: {
       async getMachineData() {
        try{
        let machines = await this.$api.getWashingMachineData()
        //this.washingMachines = machines.sort((a, b) => a.machine_number-b.machine_number)
        for (let index = 0; index <  machines.length; index++) {
            if(new Date(machines[index].time) < new Date() && machines[index].time != null){
                try{
                await this.$api.finishWashingMachine(machines[index].machine_id)
               await this.$api.finishWashingRegistration(machines[index].fk_wasking_registration)
                }
                catch(error){
                    
                    console.log(error)
                }
            }
            else{

            }
            
        }

        this.washingMachines = await this.$api.getWashingMachineData()
        this.washingMachines = this.washingMachines.sort((a, b) => a.machine_number-b.machine_number)
        for (let index = 0; index <   this.washingMachines.length; index++) {
        let month =   new Date(this.washingMachines[index].time).getUTCMonth() +1
     let day =   new Date(this.washingMachines[index].time).getUTCDate()
     let hour =   new Date(this.washingMachines[index].time).getHours()
      let minute =  new Date(this.washingMachines[index].time).getMinutes()

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
      let WashingEnd = `${month}-${day} ${hour}:${minute}`
      this.washingMachines[index].time = WashingEnd
        }
    }
        catch(error){
            console.log(error)
    }
    },
    showRegistrationModal(id,number){
        this.machineId = id
        this.washingNumber = number
        this.showModal = true
    },
    closeMachineModal(){
        this.machineId = Number
        this.showModal = false
    },
    washingSucess(){
        this.showModal = false
        this.messageSucess= 'Skalbimas užregistruotas sėkmingai'
        this.showSucessMessage = true

    },
    washingFail(){
        this.showModal = false
        this.messageSucess= 'Nepavyko užregistruoti skalbimo'
        this.showSucessMessage = true

    },


    

    },
    created() {
        this.getMachineData()
    }
}
</script>