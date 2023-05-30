<template>
    <div>
        <div class="hero">
      <section class="hero is-primary is-small">
        <div class="hero-body is-justify-content-center">
          <p class="title">
            Laisvalaikio kambarys
          </p>
        </div>
      </section>
    </div>
    <MenuBar :menu-type="'main-back'"></MenuBar>

    <div class="text-4xl mt-20">
      Registracijos, laukiančios patvirtinimo
    </div>
     <!-- show registrations only if there are active registrations -->
    <div v-if="registrations.length > 0" class="">
      <table class="table is-bordered is-striped is-hoverable ml-auto mr-auto mt-7">
        <thead>
    <tr>
        <th class="has-text-centered">Numeris</th>
        <th class="has-text-centered">Gyventojas</th>
        <th class="has-text-centered">Registracija pateikta</th>
        <th class="has-text-centered">Registracijos tvirtinimas</th>
        <th class="has-text-centered">Registracijos atmetimas</th>
    </tr>
        </thead>
        <tbody v-for="(registration, count) in registrations" :key="registration.leisure_id">
            <tr>
                <th class="has-text-centered">{{count+1}}</th>
                <td>{{registration.firstname}} {{ registration.lastname }}</td>
                <td>{{ registration.waiting_confirmation_at }}</td>
                <td><button class="button is-primary is-small " @click="confirmRegistration(registration.leisure_id)" :disabled="doorkeeperOccupation == 'Laisvas' || doorkeeperOccupation == 'Užimtas' ? false : true"> Tvirtinti registracija</button></td>
                <td><button class="button is-danger is-small " @click="rejectRegistration(registration.leisure_id)" :disabled="doorkeeperOccupation == 'Laisvas' || doorkeeperOccupation == 'Užimtas' ? false : true"> Atmesti registracija</button></td>
            </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="registrations.length == 0" class="text-xl mt-2 has-text-info">
      Šiuo metu nėra registracijų į laisvalaikio kambarį
    </div>

    <SucessMessageModal v-if="showSucessMessage" :Message="sucessMessage" :isActive="showSucessMessage" @close-action="closeSucessModal()"></SucessMessageModal>

    </div>
</template>
<script>
import MenuBar from "../components/MenuBar.vue"
import SucessMessageModal from "../components/SucessMessageModal.vue"
export default {
    
    name: 'LeisureRoomRegistrationsView',
    data() {
        return {
            registrations: [],
            showSucessMessage: false,
            sucessMessage: "",
            doorkeeperOccupation: "",
        }
    },
    props: {
    },
    components:{
        MenuBar,
        SucessMessageModal,
        
    },
    methods: {
      //return leisure room registrations
async getRegistrations(){
  //format registration date
   try{
     let registrations = await this.$api.getLeisureRoomRegistrations()
     for (let index = 0; index < registrations.length; index++) {
     let year =   new Date(registrations[index].waiting_confirmation_at).getUTCFullYear()
    let month =   new Date(registrations[index].waiting_confirmation_at).getUTCMonth() +1
     let day =   new Date(registrations[index].waiting_confirmation_at).getUTCDate()
     let hour =   new Date(registrations[index].waiting_confirmation_at).getHours()
      let minute =  new Date(registrations[index].waiting_confirmation_at).getMinutes()

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
      let finalDate = `${year}-${month}-${day} ${hour}:${minute}`
      registrations[index].waiting_confirmation_at = finalDate
    }
    this.registrations = registrations
   }
   catch(error){
  this.registrations = []
   }
},
//confirm the leisure room registration
async confirmRegistration(id){
    try{
      await this.$api.acceptLeisureRoomRegistration(id)
     this.sucessMessage = "Laisvalaikio kambario registracija patvirtinta sėkmingai"
      this.showSucessMessage = true
   }
   catch(error){
  this.sucessMessage = "Nepavyko patvirtinti laisvalaikio kambario registracijos"
      this.showSucessMessage = true
   }
},
closeSucessModal(){
    this.showSucessMessage= false
    this.getRegistrations()
},
//reject the leisure room registration
async rejectRegistration(id){
    try{
      await this.$api.rejectLeisureRoomRegistration(id)
     this.sucessMessage = "Laisvalaikio kambario registracija atmesta sėkmingai"
      this.showSucessMessage = true
   }
   catch(error){
  this.sucessMessage = "Nepavyko atmesti laisvalaikio kambario registracijos"
      this.showSucessMessage = true
   }
},
async getDoorkeeperOccupation(){
    try{
      let data = await this.$api.getUserOccupation(sessionStorage.getItem('id'))
        this.doorkeeperOccupation = data.occupation
        console.log( this.doorkeeperOccupation)
    }
    catch(error){
      this.doorkeeperOccupation = 'Prisijungęs'
    }
        
    }
    },
    created() {
     this.getRegistrations()
     this.getDoorkeeperOccupation()
    }
}
</script>