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

    <div class="is-flex is-flex-direction-row is-justify-content-space-between  mt-4">
<div v-if="$route.params.role == 'Gyventojas' &&  !userHasRegistration" class="sm:ml-6 min-w-fit">
 <button class="button is-primary" @click="showConfirmationModal">Registruotis</button>
</div>
<div v-else-if="$route.params.role == 'Budėtojas'" class="sm:ml-6 min-w-fit">
    <router-link :to="{ name: 'leisureRegistrations'}">
    <button class="button is-warning">Registracijų sąrašas</button>
</router-link>
</div>
<div v-else-if="$route.params.role == 'Gyventojas' &&  userHasRegistration" class="sm:ml-6 min-w-fit">
  <!-- show this button after the resident had provided a registration -->
 <button v-if="registrationStatus == 'Laukiama patvirtinimo'" class="button is-danger" @click="showCancelConfirmationModal()">Atšaukti</button>
 <!-- show this button after the residents registration has been confirmed -->
 <button v-else-if="registrationStatus == 'Patvirtinta'" class="button is-danger" @click="showCancelConfirmationModal()">Išsiregistruoti</button>
 <div  v-if="registrationStatus == 'Laukiama patvirtinimo'" class="sm:text-[21px]/[30px] mr-2">
  Registracija pateikta: {{ registrationWaitingConfirmTime }}
 </div>
 <div  v-else-if="registrationStatus == 'Patvirtinta'" class="sm:text-[21px]/[30px] mr-2">
  Registracija patvirtinta: {{ RegistrationConfirmTime }}
 </div>
</div>
<div class="mr-6">
  <div class="  sm:ml-6 min-w-fit text-left sm:text-center sm:text-[21px]/[30px]">
  Informacija apie laisvalaikio kambarį
</div>
  <div class="has-text-left is-flex is-flex-direction-column min-w-fit sm:text-[21px]/[30px]">
    <div class="has-text-left is-flex is-flex-direction-row items-center justify-center">
      Užimtumas:
    <div v-if="numberOfUsers >= 1" class="has-text-danger ml-2">
      Užimtas
  </div>
  <div v-else-if="numberOfUsers == 0" class="has-text-primary ml-2">
    Laisvas
  </div>
</div>
    <div class="has-text-left is-flex is-flex-direction-row justify-center">
    <div>
      Žmonių skaičius:
    </div >
    <div class=" ml-2">
     {{ numberOfUsers }}
    </div>
  </div>
</div>
</div>
</div>

<div v-if="$route.params.role == 'Budėtojas'" class="text-4xl mt-20">
      Kambaryje esantys gyventojai
    </div>
  <!-- display residents that are in the leisure room -->
    <div v-if="$route.params.role == 'Budėtojas' && users.length > 0" class="">
      <table class="table is-bordered is-striped is-hoverable ml-auto mr-auto mt-7">
        <thead>
    <tr>
        <th class="has-text-centered">Numeris</th>
        <th class="has-text-centered">Gyventojas</th>
        <th class="has-text-centered">Gyventojas kambaryje nuo</th>
    </tr>
        </thead>
        <tbody v-for="(registration, count) in users" :key="registration.leisure_id">
            <tr>
                <th class="has-text-centered">{{count+1}}</th>
                <td>{{registration.firstname}} {{ registration.lastname }}</td>
                <td>{{registration.confirmed_at}}</td>
            
            </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="$route.params.role == 'Budėtojas' && users.length == 0" class="text-xl mt-2 has-text-info">
      Šiuo metu laisvalaikio kambaryje nėra gyventojų
    </div>

<ConfirmationModal v-if="showConfirmation" :isActive="showConfirmation" @close-action="closeConfirmationModal()" @confirm-action="register()"></ConfirmationModal>
<SucessMessageModal :Message="sucessMessage" :isActive="showSucessMessage" @close-action="closeSucessMessageModal()"></SucessMessageModal>
<ConfirmationModal  v-if="showCancelConfirmation" :isActive="showCancelConfirmation" @close-action="closeCancelConfirmationModal()" @confirm-action="unregister(registrationId)"></ConfirmationModal>

    </div>
</template>

<script>
import MenuBar from "../components/MenuBar.vue"
import ConfirmationModal from "../components/ConfirmationModal.vue"
import SucessMessageModal from "../components/SucessMessageModal.vue"
export default {
    
    name: 'LeisureRoomView',
    data() {
        return {
            showConfirmation: false,
            showCancelConfirmation: false,
            registrationId: Number,
            showSucessMessage: false,
            sucessMessage: "",
            users: [],
            numberOfUsers: Number,
            userHasRegistration: false,
            registrationStatus: "",
            registrationWaitingConfirmTime: "",
            RegistrationConfirmTime: "",
        }
    },
    props: {
    },
    components:{
        MenuBar,
        ConfirmationModal,
        SucessMessageModal,
        
    },
    methods: {
showConfirmationModal(){
   this.showConfirmation = true
},
showCancelConfirmationModal(){
   this.showCancelConfirmation = true
},
closeConfirmationModal(){
   this.showConfirmation = false
},
closeCancelConfirmationModal(){
   this.showCancelConfirmation = false
},
//resident registers being in this room
async register(){
try{
    let data = await this.$api.getDataFromToken()
    await this.$api.leisureRoomRegistration(data.id)
    this.sucessMessage = "Laisvalaikio kambario registracija sėkminga"
    this.showConfirmation = false
    this.showSucessMessageModal()
}
catch(error){
    this.sucessMessage = "Laisvalaikio kambario registracija nebuvo sėkminga"
    this.showConfirmation = false
  this.showSucessMessageModal()
}
},
showSucessMessageModal(){
    this.showSucessMessage = true
},
closeSucessMessageModal(){
    this.showSucessMessage = false
    this.getleisureRoomData()
      if(this.$route.params.role == 'Gyventojas'){
        this.getUserRegistration()
      }
},
//return the residents that are currently in the room
async getleisureRoomData(){
try{
 this.users = await this.$api.getLeisureRoomData()
 this.numberOfUsers =  this.users.length
 for (let index = 0; index < this.users.length; index++) {
  let userDate = new Date(this.users[index].confirmed_at)
  console.log(userDate)
  let year =   userDate.getUTCFullYear()
    let month =  userDate.getUTCMonth() +1
     let day =   userDate.getUTCDate()
     let hour =  userDate.getHours()
      let minute =  userDate.getMinutes()
      let seconds = userDate.getSeconds()

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
      if(seconds < 10){
        seconds = '0' + seconds
      }
      let finalDate = `${year}-${month}-${day} ${hour}:${minute}`
      this.users[index].confirmed_at = finalDate
 }

}
catch(error){
  console.log(error)
this.users = []
this.numberOfUsers = 0
}
},
//get the resident's registration
async getUserRegistration(){
try{
    let data = await this.$api.getDataFromToken()
  let response = await this.$api.getuserLeisureRegistration(data.id)
  if(response.length > 0){
    this.userHasRegistration = true
    this.registrationId = response[0].leisure_id
    this.registrationStatus = response[0].leisure_status
    if(this.registrationStatus =='Laukiama patvirtinimo'){
    let registrationTime = new Date(response[0].waiting_confirmation_at)
    let year =   registrationTime.getUTCFullYear()
    let month =   registrationTime.getUTCMonth() +1
     let day =   registrationTime.getUTCDate()
     let hour =   registrationTime.getHours()
      let minute =  registrationTime.getMinutes()
      let seconds = registrationTime.getSeconds()

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
      if(seconds < 10){
        seconds = '0' + seconds
      }
      let finalDate = `${year}-${month}-${day} ${hour}:${minute}`
    this.registrationWaitingConfirmTime = finalDate
    }
    else if(this.registrationStatus =='Patvirtinta'){
      let registrationTime = new Date(response[0].confirmed_at)
    let year =   registrationTime.getUTCFullYear()
    let month =   registrationTime.getUTCMonth() +1
     let day =   registrationTime.getUTCDate()
     let hour =   registrationTime.getHours()
      let minute =  registrationTime.getMinutes()
      let seconds = registrationTime.getSeconds()

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
      if(seconds < 10){
        seconds = '0' + seconds
      }
      let finalDate = `${year}-${month}-${day} ${hour}:${minute}`
    this.RegistrationConfirmTime = finalDate
    }
  }
}
catch(error){
this.userHasRegistration = false
}
},
//register out of the room
async unregister(id){
  if(this.registrationStatus == 'Laukiama patvirtinimo'){
    if(await this.checkForRegCancelStatusChange()){
      this.sucessMessage = "Registracija nebuvo atšaukta, dėl registracijos statuso pokyčio"
    this.showCancelConfirmation = false
    this.showSucessMessageModal()
    return
    }
  try{
  await this.$api.cancelLeisureRegistration(id)
  this.sucessMessage = "Laisvalaikio kambario registracija atšaukta sėkmingai"
    this.showCancelConfirmation = false
    this.showSucessMessageModal()

  }
  catch(error){
 this.sucessMessage = "Laisvalaikio kambario registracijos atšaukti nepavyko"
    this.showCancelConfirmation = false
    this.showSucessMessageModal()
  }
}
else if(this.registrationStatus == 'Patvirtinta'){
  try{
    await this.$api.finishLeisureRegistration(id)
  this.sucessMessage = "Iš laisvalaikio kambario išsiregistruota sėkmingai"
    this.showCancelConfirmation = false
    this.showSucessMessageModal()
  }
  catch(error){
    this.sucessMessage = "Iš laisvalaikio kambario išsiregistruoti nepavyko"
    this.showCancelConfirmation = false
    this.showSucessMessageModal()
  }
}
},
async checkForRegCancelStatusChange(){
  try{
  let response = await this.$api.getuserLeisureRegistration(sessionStorage.getItem('id'))
  console.log(response[0].leisure_status)
  if(response[0].leisure_status == 'Laukiama patvirtinimo'){
  return false
  }
  else{
    return true
  }
  }
  catch(error){
    return true
  }
}
    },
    created() {
      //on page load get resident's registration
      this.getleisureRoomData()
      if(this.$route.params.role == 'Gyventojas'){
        this.getUserRegistration()
      }
    }
}
</script>