<template>
    <div>

    <div class="hero">
      <section class="hero is-primary is-small">
        <div class="hero-body is-justify-content-center">
          <p class="title">
            Svečių registracija
          </p>
        </div>
      </section>
    </div>
    <MenuBar :menu-type="'main-back'"></MenuBar>
    <button v-if="$route.params.role == 'Gyventojas' " @click="showRegistrationModal" class="button is-pulled-right mt-5 mr-6 is-primary">Registruoti svečią</button>
    <div>
        <div v-if="$route.params.role == 'Gyventojas'" class="text-4xl mt-20">
        Jūsų svečių registracijos
    </div>
    <div v-if="$route.params.role == 'Budėtojas'" class="text-4xl mt-20">
      Registracijos, laukiančios patvirtinimo
    </div>
    <!-- display user guest registration if the user has regisred guests -->
      <div v-if="$route.params.role == 'Gyventojas' && userRegistrations.length > 0" class="">
      <table class="table is-bordered is-striped is-hoverable ml-auto mr-auto mt-7">
        <thead>
    <tr>
        <th class="has-text-centered">Numeris</th>
        <th class="has-text-centered">Svečias</th>
        <th class="has-text-centered">Svečias atvyksta</th>
        <th class="has-text-centered">Registracijos atšaukimas</th>
        <th class="has-text-centered">Registracijos redagavimas</th>
    </tr>
        </thead>
        <tbody v-for="(registration, count) in userRegistrations" :key="registration.guest_id">
            <tr>
                <th class="has-text-centered">{{count+1}}</th>
                <td>{{registration.guest_firstname}} {{ registration.guest_lastname }}</td>
                <td>{{ registration.guest_arrival }}</td>
                <td><button class="button is-danger is-small w-2/3" @click="openConfirmationModal(registration.guest_id)"> Atšaukti</button></td>
                <td><button class="button is-warning is-small w-2/3" @click="openRegistrationEditModal(registration.guest_id, registration.guest_arrival, registration.guest_firstname,registration.guest_lastname)"> Redaguoti</button></td>
                
            </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="$route.params.role == 'Gyventojas' && userRegistrations.length == 0" class="text-xl mt-2 has-text-info">
      Šiuo metu neturite užregistravę svečių
    </div>

   <!-- display the guest registrations that are waitinf confirmation to the doorkeeper -->
    <div v-if="$route.params.role == 'Budėtojas'  && registrations.length > 0" class="">
      <table class="table is-bordered is-striped is-hoverable ml-auto mr-auto mt-7">
        <thead>
    <tr>
        <th class="has-text-centered">Numeris</th>
        <th class="has-text-centered">Svečias</th>
        <th class="has-text-centered">Svečias atvyksta</th>
        <th class="has-text-centered">Registracijos tvirtinimas</th>
        <th class="has-text-centered">Registracijos atmetimas</th>
    </tr>
        </thead>
        <tbody v-for="(registration, count) in registrations" :key="registration.guest_id">
            <tr>
                <th class="has-text-centered">{{count+1}}</th>
                <td>{{registration.guest_firstname}} {{ registration.guest_lastname }}</td>
                <td>{{ registration.guest_arrival }}</td>
                <td><button class="button is-primary is-small " @click="confirmRegistration(registration.guest_id)" :disabled="doorkeeperOccupation == 'Laisvas' || doorkeeperOccupation == 'Užimtas' ? false : true"> Tvirtinti registraciją</button></td>
                <td><button class="button is-danger is-small " @click="declineRegistration(registration.guest_id)" :disabled="doorkeeperOccupation == 'Laisvas' || doorkeeperOccupation == 'Užimtas' ? false : true"> Atmesti registraciją</button></td>
            </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="$route.params.role == 'Budėtojas' && registrations.length == 0" class="text-xl mt-2 has-text-info">
      Šiuo metu nėra svečių laukiančių patvirtinimo
    </div>
 <!-- display registrations that the doorkeeper has to end -->
    <div v-if="$route.params.role == 'Budėtojas'" class="text-4xl mt-14">
      Svečio išvykimo patvirtinimas
    </div>

    <div v-if="$route.params.role == 'Budėtojas' && acceptedRegistrations.length > 0" class="">
      <table class="table is-bordered is-striped is-hoverable ml-auto mr-auto mt-7">
        <thead>
    <tr>
        <th class="has-text-centered">Numeris</th>
        <th class="has-text-centered">Svečias</th>
        <th class="has-text-centered">Svečias atvyko</th>
        <th class="has-text-centered">Svečio išvykimas</th>
    </tr>
        </thead>
        <tbody v-for="(registration, count) in acceptedRegistrations" :key="registration.guest_id">
            <tr>
                <th class="has-text-centered">{{count+1}}</th>
                <td>{{registration.guest_firstname}} {{ registration.guest_lastname }}</td>
                <td>{{ registration.confirmed_at }}</td>
                <td><button class="button is-warning is-small " @click="setRegistrationAsDone(registration.guest_id)" :disabled="doorkeeperOccupation == 'Laisvas' || doorkeeperOccupation == 'Užimtas' ? false : true"> Svečias išvyko</button></td>
            </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="$route.params.role == 'Budėtojas' && acceptedRegistrations.length == 0" class="text-xl mt-2 has-text-info">
      Šiuo metu bendrabutyje svečių nėra
    </div>
<GuestRegistrationModal @registration-sucess="registrationComplete()" :activeRegistrations="userRegistrations" @registration-fail="registrationFailed()" @close-action="closeRegistrationModal" v-if="showModal" :is-active="showModal" ></GuestRegistrationModal>
<SucessMessageModal v-if="showSucessMessage" :is-active="showSucessMessage"  @close-action="closeSucessMessageModal()" :Message="sucessMessage"></SucessMessageModal>
<ConfirmationModal @close-action="closeConfirmationModal()" @confirm-action="cancelRegistration()" :isActive="showConfirmationModal"></ConfirmationModal>
<GuestRegistrationEditModal v-if="showEditModal" :is-active="showEditModal" :regId="registrationEditId" :time="registrationEditTime" @close-action="showEditModal = false, registrationEditTime = ''" @time-update-sucess="sucessfulTimeEdit()" @time-update-fail="failTimeEdit()" @time-update-canceled="canceledTimeEdit()" :timeArray="timeEditArray"></GuestRegistrationEditModal>
<SucessMessageModal v-if="showEditMessage" :is-active="showEditMessage" @close-action="closeEditSucessMessage()" :Message="editTimeMessage"></SucessMessageModal>
    </div>
    </div>
</template>

<script>
import MenuBar from "../components/MenuBar.vue"
import GuestRegistrationModal from "../components/GuestRegistrationModal.vue"
import SucessMessageModal from "../components/SucessMessageModal.vue"
import ConfirmationModal from "../components/ConfirmationModal.vue"
import GuestRegistrationEditModal from "../components/GuestRegistrationEditModal.vue"
export default {
    name: 'GuestRegistrationView',
    data() {
        return {
            showModal:false,
            showSucessMessage: false,
            sucessMessage: "",
            userRegistrations: [],
            showConfirmationModal: false,
            selectedRegistrationId: Number,
            registrations: [],
            acceptedRegistrations: [],
            showEditModal: false,
            registrationEditTime: "",
            registrationEditId: Number,
            showEditMessage: false,
            editTimeMessage: "",
            timeEditArray: [],
            doorkeeperOccupation: "",
        }
    },
    props: {
    },
    components:{
        MenuBar,
        GuestRegistrationModal,
        SucessMessageModal,
        ConfirmationModal,
        GuestRegistrationEditModal,
    },
    methods: {
  //show registration modal
showRegistrationModal(){
    this.showModal = true
},
//close registration modal
closeRegistrationModal(){
    this.showModal = false
},
//display that the guest registration was sucesfull
registrationComplete(){
this.sucessMessage = "Svečias užregistruotas sėkmingai"
this.showModal = false
this.showSucessMessage = true
},
//display that the guest registration has failed
registrationFailed(){
this.sucessMessage = "Svečio registracija nebuvo sėkminga"
this.showModal = false
this.showSucessMessage = true
},
// return the user's guest registratons
 async getActiveUserRegistrations(){
  try{
    // format guesr arrival date
    let userData = await this.$api.getDataFromToken()
    let registrations = await this.$api.getuserGuestRegistrations(userData.id)
    for (let index = 0; index < registrations.length; index++) {
     let year =   new Date(registrations[index].guest_arrival).getUTCFullYear()
    let month =   new Date(registrations[index].guest_arrival).getUTCMonth() +1
     let day =   new Date(registrations[index].guest_arrival).getUTCDate()
     let hour =   new Date(registrations[index].guest_arrival).getHours()
      let minute =  new Date(registrations[index].guest_arrival).getMinutes()

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
      registrations[index].guest_arrival = finalDate
    }
 this.userRegistrations = registrations
  }
  catch(error){
    this.userRegistrations = []
  }
 },
 // close the sucess message modal
closeSucessMessageModal(){
      this.showSucessMessage = false
      if(this.$route.params.role == 'Gyventojas'){
     this.getActiveUserRegistrations()
      }
      else{
        this.getActiveRegistrations()
        this.getConfirmedRegistrations()
      }
    },
    //cancel the guest registration
   async cancelRegistration(){
    if(await this.checkForRegStatusChange(this.selectedRegistrationId)){
        this.sucessMessage = "Svečio registracija nebuvo atšaukta, dėl registracijos statuso pokyčio"
  this.showConfirmationModal = false
  this.showSucessMessage = true
  return
      }
    try{

  await this.$api.cancelGuestRegistration(this.selectedRegistrationId)
  this.sucessMessage = "Svečio registracija atšaukta sėkmingai"
  this.showConfirmationModal = false
  this.showSucessMessage = true
      
    }
    catch(error){
        this.sucessMessage = "Nepavyko atšaukti svečio registracijos"
        this.showConfirmationModal = false
        this.showSucessMessage = true
    }
    },
    async checkForRegStatusChange(id){
      let registrations = await this.$api.getuserGuestRegistrations(sessionStorage.getItem('id'))
      console.log(registrations)
  let reg =  registrations.find(registration => registration.guest_id == id)
if(reg == undefined){
 return true
}
else{
  return false
}
    },
    //doorkeeper mars the registration as done
   async setRegistrationAsDone(id){
       try{
         await this.$api.setGuestRegistrationAsDone(id)
         this.sucessMessage = "Svečio išvykimas pažymėtas sėkmingai"
  this.showConfirmationModal = false
  this.showSucessMessage = true
       }
       catch(error){
          this.sucessMessage = "Nepavyko pažymėti svečio išvykimo"
  this.showConfirmationModal = false
  this.showSucessMessage = true
       }
    },
    //close confirmation modal
    closeConfirmationModal(){
      this.showConfirmationModal = false
    },
    //return the confirmed registrations for the doorkeeper
  async  getConfirmedRegistrations(){
        try{
          //formar registration confirmation date
           let registrations = await this.$api.getConfirmedGuestRegistrations()
           for (let index = 0; index < registrations.length; index++) {
     let year =   new Date(registrations[index].confirmed_at).getUTCFullYear()
    let month =   new Date(registrations[index].confirmed_at).getUTCMonth() +1
     let day =   new Date(registrations[index].confirmed_at).getUTCDate()
     let hour =   new Date(registrations[index].confirmed_at).getHours()
      let minute =  new Date(registrations[index].confirmed_at).getMinutes()

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
      registrations[index].confirmed_at = finalDate
     
    }
    this.acceptedRegistrations = registrations
           
        }
        catch(error){
            this.acceptedRegistrations = []
        }
    },
    //return active registrations for the doorkeeper
  async getActiveRegistrations(){
    try{
     
     //format the registration guest arrival date
     let registrations = await this.$api.getActiveGuestRegistrations()
    for (let index = 0; index < registrations.length; index++) {
     let year =   new Date(registrations[index].guest_arrival).getUTCFullYear()
    let month =   new Date(registrations[index].guest_arrival).getUTCMonth() +1
     let day =   new Date(registrations[index].guest_arrival).getUTCDate()
     let hour =   new Date(registrations[index].guest_arrival).getHours()
      let minute =  new Date(registrations[index].guest_arrival).getMinutes()

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
      registrations[index].guest_arrival = finalDate
    }
 this.registrations = registrations
    }
    catch(error){
        this.registrations = []
    }
    },
    //confirm guest registration
   async confirmRegistration(id){
    if(await this.checkForActiveRegStatusChange(id)){
        this.sucessMessage = "Svečio registracija nebuvo patvirtinta, dėl registracijos statuso pokyčio"
      this.showSucessMessage = true
      return
      }
   try{
      await this.$api.acceptGuestRegistration(id)
     this.sucessMessage = "Svečio registracija patvirtinta sėkmingai"
      this.showSucessMessage = true
   }
   catch(error){
  this.sucessMessage = "Nepavyko patvirtinti svečio registracijos"
      this.showSucessMessage = true
   }
    },
  async checkForActiveRegStatusChange(id){
    try{
      let registrations = await this.$api.getActiveGuestRegistrations()
      console.log(registrations)
      let reg =  registrations.find(registration => registration.guest_id == id)
      console.log(reg)
      if(reg == undefined){
        return true
      }
      else if(reg.status == "Laukiama patvirtinimo"){
      return false
      }
      else{
        return true
      }
    }
    catch(error){
    return true
    }
    },
   //reject guest registration
    async declineRegistration(id){
      if(await this.checkForActiveRegStatusChange(id)){
        this.sucessMessage = "Svečio registracija nebuvo atmesta, dėl registracijos statuso pokyčio"
      this.showSucessMessage = true
      return
      }
   try{
      await this.$api.rejectGuestRegistration(id)
     this.sucessMessage = "Svečio registracija atmesta sėkmingai"
      this.showSucessMessage = true
   }
   catch(error){
  this.sucessMessage = "Nepavyko atmesti svečio registracijos"
      this.showSucessMessage = true
   }
    },

    //open confirmation modal
   openConfirmationModal(id){
    this.selectedRegistrationId = id
      this.showConfirmationModal = true
    },
    openRegistrationEditModal(id,arrivalTime, firstname, lastname){
      let registrationArray = [...this.userRegistrations]
      registrationArray.splice(registrationArray.findIndex(registration => registration.guest_id === id), 1)
      for (let index = 0; index < registrationArray.length; index++) {
        if (registrationArray[index].guest_firstname == firstname && registrationArray[index].guest_lastname == lastname) {
          this.timeEditArray.push(registrationArray[index].guest_arrival)
        }
        
      }
      this.registrationEditId = id
    this.registrationEditTime =arrivalTime
    this.showEditModal = true
    },
    sucessfulTimeEdit(){
      this.editTimeMessage = "Svečio atvykimo laikas atnaujintas sėkmingai"
      this.showEditModal = false
      this.showEditMessage = true
    },
    canceledTimeEdit(){
      this.editTimeMessage = "Laikas nepakeistas, dėl registracijos statuso pokyčio"
      this.showEditModal = false
      this.showEditMessage = true
    },
    failTimeEdit(){
      this.editTimeMessage = "Svečio atvykimo laiko atnaujinti nepavyko"
      this.showEditModal = false
      this.showEditMessage = true
    },
    closeEditSucessMessage(){
      this.showEditMessage = false
      this.editTimeMessage = ""
      this.getActiveUserRegistrations()
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
        if(this.$route.params.role == 'Gyventojas'){
        this.getActiveUserRegistrations()
        }
        else{
          this.getActiveRegistrations()
          this.getConfirmedRegistrations()
          this.getDoorkeeperOccupation()
        }
    }
}
</script>