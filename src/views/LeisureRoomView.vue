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
 <button v-if="registrationStatus == 'Laukiama patvirtinimo'" class="button is-danger" @click="showCancelConfirmationModal()">Atšaukti</button>
 <button v-else-if="registrationStatus == 'Patvirtinta'" class="button is-danger" @click="showCancelConfirmationModal()">Išsiregistruoti</button>
</div>
<div class="mr-6">
  <div class="  sm:ml-6 min-w-fit text-left sm:text-center">
  Informacija apie laisvalaikio kambarį
</div>
  <div class="has-text-left is-flex is-flex-direction-column min-w-fit">
    <div class="has-text-left is-flex is-flex-direction-row items-center justify-center">
    užimtumas:
    <div v-if="numberOfUsers >= 1" class="has-text-danger ml-2">
    užimtas
  </div>
  <div v-else-if="numberOfUsers == 0" class="has-text-primary ml-2">
    laisvas
  </div>
</div>
    <div class="has-text-left is-flex is-flex-direction-row justify-center">
    <div>
      žmonių skaičius:
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

    <div v-if="$route.params.role == 'Budėtojas' && users.length > 0" class="">
      <table class="table is-bordered is-striped is-hoverable ml-auto mr-auto mt-7">
        <thead>
    <tr>
        <th class="has-text-centered">Numeris</th>
        <th class="has-text-centered">Gyventojas</th>
    </tr>
        </thead>
        <tbody v-for="(registration, count) in users" :key="registration.leisure_id">
            <tr>
                <th class="has-text-centered">{{count+1}}</th>
                <td>{{registration.firstname}} {{ registration.lastname }}</td>
            
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
            registrationStatus: ""
        }
    },
    props: {
        // isActive: { type: Boolean, default: false, required: true },
        // Message: {type: String, required: true},
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
async getleisureRoomData(){
try{
 this.users = await this.$api.getLeisureRoomData()
 this.numberOfUsers =  this.users.length
}
catch(error){
this.users = []
this.numberOfUsers = 0
}
},
async getUserRegistration(){
try{
    let data = await this.$api.getDataFromToken()
  let response = await this.$api.getuserLeisureRegistration(data.id)
  if(response.length > 0){
    this.userHasRegistration = true
    this.registrationId = response[0].leisure_id
    this.registrationStatus = response[0].leisure_status
  }
}
catch(error){
this.userHasRegistration = false
}
},
async unregister(id){
  if(this.registrationStatus == 'Laukiama patvirtinimo'){
  try{
  await this.$api.cancelLeisureRegistration(id)
  this.sucessMessage = "Laisvalaikio kambario registracija atšaukta teisingai"
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
}
    },
    created() {
      this.getleisureRoomData()
      if(this.$route.params.role == 'Gyventojas'){
        this.getUserRegistration()
      }
    }
}
</script>