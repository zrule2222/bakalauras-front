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
<div v-for="machine in washingMachines" :key="machine.machine_id" class="mb-3 column is-4 mt-auto has-text-centered">
<div class="tex text-xl">Skalbyklė nr. {{ machine.machine_number  }}</div>
<div  v-if="false">skalbimo laikas</div>
<img src="../assets/washing_machine.jpg"  class="m-auto">
<div class=" justify-between mt-2">
<button class="button is-primary m-1" @click="showRegistrationModal(machine.machine_id,machine.machine_number)">Registruoti skalbimą</button>
<button class="button is-danger m-1">Registruoti gedimą</button>
</div>
</div>
    </div>

<WashingMachineModal v-if="showModal" :isActive="showModal" :machineId="machineId" :machineNumber="washingNumber" @close-action="closeMachineModal()" @washing-sucess="washingSucess()" @washing-fail="washingFail()"></WashingMachineModal>
<SucessMessageModal v-if="showSucessMessage" :isActive="showSucessMessage" :Message="messageSucess" @close-action="showSucessMessage = false, messageSucess = ''"></SucessMessageModal>
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
        this.washingMachines = machines.sort((a, b) => a.machine_number-b.machine_number)
        }
        catch(error){
            console.log(error)
        console.log('no machine data')
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