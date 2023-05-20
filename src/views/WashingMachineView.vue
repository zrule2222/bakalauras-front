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
    <div v-if="washingMachines.length > 0" class="columns is-multiline mt-3 is-centered ">
<div v-for="machine in washingMachines" :key="machine.machine_id" :class="machine.machine_status == 'Occupied'? '!mt-0': ''"   class="mb-3 column is-4 mt-5    has-text-centered">
<div class="tex text-xl">Skalbyklė Nr. {{ machine.machine_number  }}</div>
<div  v-if="machine.machine_status == 'Occupied'"> skalbiama iki: {{machine.time}}</div>
<img v-if="machine.machine_status == 'Working' || machine.machine_status == 'Occupied'"  src="../assets/washing_machine.jpg"  class="m-auto">
<img v-else-if="machine.machine_status == 'Broken' "  src="../assets/broken_washing_machine.jpg"  class="m-auto">
<div class=" justify-between mt-2">
<button  v-if="machine.machine_status == 'Working' && machine.hasFailReg != true && $route.params.role == 'Gyventojas'" class="button is-primary m-1" @click="showRegistrationModal(machine.machine_id,machine.machine_number)" >Registruoti skalbimą</button>
<button  v-if="machine.machine_status == 'Working' && machine.hasFailReg != true && $route.params.role == 'Gyventojas'" class="button is-danger m-1" @click="showRegistrationConfirmationModal(machine.machine_id)">Registruoti gedimą</button>
<button  v-if="machine.machine_status == 'Broken' &&  $route.params.role == 'Administratorius'" class="button is-warning m-1" @click="showFixConfirmation = true, fixingId = machine.machine_id">Gedimas sutvarkytas</button>
</div>
</div>
    </div>
    <div v-else class="text-xl mt-7 has-text-info">
    Šiuo metu bendrabutyje nėra skalbyklių
    </div>

<WashingMachineModal v-if="showModal" :isActive="showModal" :machineId="machineId" :machineNumber="washingNumber" @close-action="closeMachineModal()" @washing-sucess="washingSucess()" @washing-fail="washingFail()"></WashingMachineModal>
<SucessMessageModal v-if="showSucessMessage" :isActive="showSucessMessage" :Message="messageSucess" @close-action="showSucessMessage = false, messageSucess = '', getMachineData()"></SucessMessageModal>
<ConfirmationModal  v-if="showConfirmation" :isActive="showConfirmation" @close-action="closeFailRegModal()" @confirm-action="registerFailure(brokenMachineRegistrationId)"></ConfirmationModal>
<SucessMessageModal v-if="showFailRegMessage" :isActive="showFailRegMessage" :Message="failRegMessage" @close-action="showFailRegMessage = false, failRegMessage = '', getMachineData()"></SucessMessageModal>
<ConfirmationModal  v-if="showFixConfirmation" :isActive="showFixConfirmation" @close-action="showFixConfirmation = false, fixingId = Number" @confirm-action="fixMachine(fixingId)"></ConfirmationModal>
<SucessMessageModal v-if="showFixSucessMessage" :isActive="showFixSucessMessage" :Message="fixSucessMessage" @close-action="showFixSucessMessage = false, fixSucessMessage = '', getMachineData()"></SucessMessageModal>
    </div>
</template>

<script>
import MenuBar from "../components/MenuBar.vue"
import WashingMachineModal from "../components/WashingMachineModal.vue"
import SucessMessageModal from "../components/SucessMessageModal.vue"
import ConfirmationModal from "../components/ConfirmationModal.vue"
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
            showConfirmation: false,
            brokenMachineRegistrationId: Number,
            showFailRegMessage: false,
            failRegMessage: '',
            noFailRegProvided: true,
            userRole: '',
            showFixConfirmation: false,
            fixingId: Number,
            showFixSucessMessage: false, 
            fixSucessMessage: '',

        }
    },
    props: {
    },
    components: {
        MenuBar,
        WashingMachineModal,
        SucessMessageModal,
        ConfirmationModal,
    },
    methods: {
       async getMachineData() {
        try{
        let machines = await this.$api.getWashingMachineData()
        for (let index = 0; index <  machines.length; index++) {
            if(new Date(machines[index].time) < new Date() && machines[index].time != null){
                try{
                await this.$api.finishWashingMachine(machines[index].machine_id)
               await this.$api.finishWashingRegistration(machines[index].fk_wasking_registration)
                }
                catch(error){

                }
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
        try{
            let data = await this.$api.getDataFromToken()
            for (let index = 0; index < this.washingMachines.length; index++) {
                try{
                let users = await this.$api.getCurrentFailRegUsers( this.washingMachines[index].machine_id)
                for (let indexUser = 0; indexUser < users.length; indexUser++) {
                    if(users[indexUser].fk_user == data.id){
                        this.washingMachines[index].hasFailReg = true
                    }
                    else{
                        this.washingMachines[index].hasFailReg = false
                    }
                   
                    
                }
            }
            catch(error){
              
            }
                
            }
        
        }
        catch(error){

        }

    }
        catch(error){
        
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
    showRegistrationConfirmationModal(id){
        this.showConfirmation = true
        this.brokenMachineRegistrationId = id
    },
    closeFailRegModal(){
        this.showConfirmation = false
        this.brokenMachineRegistrationId = Number
    },
   async fixMachine(id){
    try{
      await this.$api.fixWashingMachine(id)
      this.showFixConfirmation = false
      this.fixSucessMessage = 'Gedimas sutvarkytas sėkmingai'
      this.showFixSucessMessage = true
    }
    catch(error){
        this.showFixConfirmation = false
      this.fixSucessMessage = 'Gedimo sutvarkyti nepavyko'
      this.showFixSucessMessage = true

    }
    },

    async registerFailure(id){
        try{
        let data = await this.$api.getDataFromToken()
    try{
      const response = await this.$api.registerMachineFailure(id,data.id)
      if(response == true){
        this.showConfirmation = false
        this.failRegMessage = 'Skalbimo mašinos gedimas užregistruotas sėkmingai'
        this.showFailRegMessage = true
      }
      else{
        this.showConfirmation = false
        this.failRegMessage = 'Skalbimo mašinos gedimo užregistruoto nepavyko'
        this.showFailRegMessage = true

      }
    }
    catch(error){

     this.showConfirmation = false
        this.failRegMessage = 'įvyko klaida registruojant skalbimo mašinos gedimą'
        this.showFailRegMessage = true
    }
}
catch(error){

}
    }

    },
    created() {
        this.getMachineData()
    }
}
</script>