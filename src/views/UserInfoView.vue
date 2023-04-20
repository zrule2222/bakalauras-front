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
    <div v-if="$route.params.id" class=" flex flex-col items-center">
     <div class="text-4xl mt-5">
      {{ name }} {{ lastname }}
     </div>
     <div  v-if="userRole == 'Administratorius'">
      Rolė: {{ role }}
     </div>
     <div>
      Lytis: {{ gender }}
     </div>
     <div>
      Kambarys: {{ room }}
     </div>
     <div :class="userRole == 'Administratorius' ? '' : 'pb-4'">
      El. paštas: {{ email }}
     </div>
     <div  v-if="userRole == 'Administratorius'" class="flex flex-row pb-4">
      Užblokuotas:
      <div v-if="blocked != -1 && blocked == 0" class="has-text-success">
       Ne
      </div>
      <div v-else-if="blocked != -1 && blocked == 1" class="has-text-danger">
        Taip
      </div>
     </div>
     <div class="buttons">
       <button @click="showEditModal()" class="button is-warning">Redaguoti informaciją</button>
       <button @click="showConfirmationModal()" v-if="userRole == 'Administratorius' && blocked != -1 && blocked == 0" class="button is-danger ml-3">Blokuoti paskyrą</button>
     </div>
    </div>
    <div v-else class="text-xl mt-7 has-text-info">
      Nepavyko gauti naudotojo informaciją
    </div>
    <ConfirmationModal v-if="displayConfirmationModal" @confirm-action="blockUser($route.params.id)" @close-action="closeConfirmationModal" :isActive="displayConfirmationModal"></ConfirmationModal>
    <SucessMessageModal @close-action="closeSucessMessageModal()" :Message="messageSucess" v-if="showSucessMessage" :isActive="showSucessMessage"></SucessMessageModal>
    <UserInfoModal @update-sucess="updateSucess()" @update-fail="updateFail()" :userId="$route.params.id" @close-action="closeEditModal()" v-if="showModal" :isActive="showModal"></UserInfoModal>
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
      

    };
  },
  components:{
     MenuBar,
     ConfirmationModal,
     SucessMessageModal,
     UserInfoModal,
  },
  props: {
    // message: {
    //   type: String
    // }
  },
  methods: {
    async setPageData(){
      //this.id = this.$route.params.id
      try{
      let user = await this.$api.getUserInfo(this.$route.params.id)
      let room = await this.$api.getUserRoom(this.$route.params.id,user.fk_room)
      this.name = user.firstname
      this.lastname = user.lastname
      this.role = user.role
      this.gender = user.gender
      this.room = room
      this.email = user.email
      this.blocked = user.blocked
     let UserRole = await this.$api.getDataFromToken()
      this.userRole = UserRole.role
      }
      catch(error){
        this.room = -1
      }
    },
    showConfirmationModal(){
      this.displayConfirmationModal = true
    },
    closeConfirmationModal(){
      this.displayConfirmationModal = false
    },
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
    }

  },
  created(){
    this.setPageData()
  }
}
</script>