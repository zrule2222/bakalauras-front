<template>
  <div>
    <div class="hero">
      <section class="hero is-primary is-small">
        <div class="hero-body is-justify-content-center">
          <p class="title">
            Naudotojo informacija
          </p>
        </div>
      </section>
    </div>
    <MenuBar :menu-type="'main-back'"></MenuBar>
    <!-- display resident's information only if the route parameter is set -->
    <div v-if="$route.params.id" class=" flex flex-col items-center">
     <div class="text-4xl mt-5">
      {{ name }} {{ lastname }}
     </div>
     <div  v-if="userRole == 'Administratorius'" class="text-lg">
      Rolė: {{ role }}
     </div>
     <div class="text-lg">
      Lytis: {{ gender }}
     </div>
     <div class="text-lg">
      Kambarys: {{ room }}
     </div>
     <div :class="userRole == 'Administratorius' ? '' : 'pb-4'" class="text-lg">
      El. paštas: {{ email }}
     </div>
     <div  v-if="userRole == 'Administratorius'" class="flex flex-row pb-4 text-lg">
      Užblokuotas:
      <div v-if="blocked != -1 && blocked == 0" class="has-text-success">
       Ne
      </div>
      <div v-else-if="blocked != -1 && blocked == 1" class="has-text-danger">
        Taip
      </div>
     </div>
     <div class="buttons">
       <button v-if="userRole == 'Administratorius'" @click="showEditModal()" class="button is-warning" :disabled="administratorOccupation == 'Laisvas' || administratorOccupation == 'Užimtas' ? false : true">Redaguoti informaciją</button>
       <button v-else-if="userRole == 'Gyventojas'" @click="showEditModal()" class="button is-warning" >Redaguoti informaciją</button>
       <button @click="showConfirmationModal()" v-if="userRole == 'Administratorius' && blocked != -1 && blocked == 0" class="button is-danger ml-3" :disabled="administratorOccupation == 'Laisvas' || administratorOccupation == 'Užimtas' ? false : true">Blokuoti paskyrą</button>
     </div>
    </div>
    <div v-else class="text-xl mt-7 has-text-info">
      Nepavyko gauti naudotojo informaciją
    </div>
    <ConfirmationModal v-if="displayConfirmationModal" @confirm-action="blockUser($route.params.id)" @close-action="closeConfirmationModal" :isActive="displayConfirmationModal"></ConfirmationModal>
    <SucessMessageModal @close-action="closeSucessMessageModal()" :Message="messageSucess" v-if="showSucessMessage" :isActive="showSucessMessage"></SucessMessageModal>
    <UserInfoModal @update-sucess="updateSucess()" @update-fail="updateFail()" :userId="$route.params.id" @close-action="closeEditModal()" @same-password="messageSucess = 'Naujas slaptažodis negali būti toks pat kaip senas', showModal = false, showSucessMessage = true" @no-changes="messageSucess = 'Nebuvo įvesti nauji duomenys', showModal = false, showSucessMessage = true" v-if="showModal" :isActive="showModal"></UserInfoModal>
  </div>
</template>
<script>
import MenuBar from "../components/MenuBar.vue"
import ConfirmationModal from "../components/ConfirmationModal.vue"
import SucessMessageModal from "../components/SucessMessageModal.vue"
import UserInfoModal from "../components/UserInfoModal.vue"
export default {
  name: 'UserInfoView',
  data() {
    return {
      name: "",
      role: "",
      email: "",
      lastname: "",
      gender: "",
      blocked: -1,
      showModal: false,
      password: "",
      confirmationAccepted: false,
      messageSucess: "",
      sucessStatus: "",
      showSucessMessage: false,
      room: 0,
      userRole: "",
      displayConfirmationModal: false,
      administratorOccupation: "",
      

    };
  },
  components:{
     MenuBar,
     ConfirmationModal,
     SucessMessageModal,
     UserInfoModal,
  },
  props: {
  },
  methods: {
    //set the data that is displayed on this page
    async setPageData(){
      try{
      let user = await this.$api.getUserInfo(this.$route.params.id)
      this.name = user.firstname
      this.lastname = user.lastname
      this.role = user.role
      this.gender = user.gender
      this.email = user.email
      this.blocked = user.blocked
      let room = await this.$api.getUserRoom(this.$route.params.id,user.fk_room)
      this.room = room
     let UserRole = await this.$api.getDataFromToken()
      this.userRole = UserRole.role
      if(this.userRole == 'Administratorius'){
      this.getAdminOccupation()
    }
      }
      catch(error){
        this.room = -1
        let UserRole = await this.$api.getDataFromToken()
      this.userRole = UserRole.role
      }
    },
    showConfirmationModal(){
      this.displayConfirmationModal = true
    },
    closeConfirmationModal(){
      this.displayConfirmationModal = false
    },
    //block the resident
    async blockUser(id){
      try{
      await this.$api.blockUser(id)
      this.messageSucess = "Naudotojas užblokuotas sėkmingai"
      this.displayConfirmationModal = false
      this.showSucessMessage = true
      }
      catch(error){
        this.messageSucess = "Nepavyko užblokuoti naudotojo"
        this.displayConfirmationModal = false
        this.showSucessMessage = true
      }
    },
    closeSucessMessageModal(){
      this.showSucessMessage = false
      this.setPageData()
    },
    showEditModal(){
      this.showModal = true
    },
    closeEditModal(){
      this.showModal = false
    },
    updateSucess(){
      this.messageSucess = "Naudotojo duomenys atnaujinti sėkmingai"
      this.showModal = false
      this.showSucessMessage = true
    },
    updateFail(){
      this.messageSucess = "Naudotojo duomenys nebuvo atnaujinti"
      this.showModal = false
      this.showSucessMessage = true
    },
    async getAdminOccupation(){
      try{
        let data = await this.$api.getAdminOccupation()
        this.administratorOccupation = data.occupation
      }
      catch(error){
        this.administratorOccupation = "Prisijungęs"
      }
    }

  },
  created(){
    this.setPageData()
  }
}
</script>