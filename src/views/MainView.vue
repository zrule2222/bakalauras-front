<template>
  <div>
       <div class="hero">
      <section class="hero is-primary is-small">
        <div class="hero-body is-justify-content-center">
          <p class="title">
            Bendrabučio teikiamų paslaugų administravimo informacinė sistema
          </p>
        </div>
      </section>
    </div>
 <MenuBar v-if="role == 'Gyventojas'" :menu-type="'main-resident'"></MenuBar>
 <MenuBar v-if="role == 'Administratorius'" :menu-type="'main-admin'"></MenuBar>
 <MenuBar v-if="role == 'Budėtojas'" :menu-type="'main-doorkeeper'"></MenuBar>
 <div v-if="role == 'Gyventojas'" class="is-flex is-flex-direction-row is-justify-content-space-between  mt-4">
<div v-if="role == 'Gyventojas'" class="  ml-6 min-w-fit sm:text-[21px]/[30px] mr-2">
 Jūsų kambarys: <span class="font-bold ">{{ room }}</span>
</div>
<!-- display workers occupation to the resident -->
<div v-if="role == 'Gyventojas'" class="mr-6">
  <div class=" sm:ml-6 min-w-fit text-left sm:text-center sm:text-[21px]/[30px]">
  Darbuotojų užimtumas
</div>
  <div class="has-text-left is-flex is-flex-direction-column min-w-fit">
    <div class="has-text-left is-flex is-flex-direction-row sm:text-[21px]/[30px]">
    Budėtojas:
    <div v-if="role == 'Gyventojas' && doorkeeperOccupation == 'Užimtas'" class="has-text-danger ml-2">
    {{doorkeeperOccupation}}
  </div>
  <div v-else-if="role == 'Gyventojas' && doorkeeperOccupation == 'Laisvas'" class="has-text-primary ml-2">
    {{doorkeeperOccupation}}
  </div>
  <div v-else-if="role == 'Gyventojas' && doorkeeperOccupation == 'Neprisijungęs'" class="text-violet-700 ml-2">
    {{doorkeeperOccupation}}
  </div>
</div>
    <div class="has-text-left is-flex is-flex-direction-row sm:text-[21px]/[30px]">
    <div>
      Administratorius:
    </div >
    <div v-if="role == 'Gyventojas' && administratorOccupation == 'Užimtas'" class="has-text-danger ml-2">
    {{administratorOccupation}}
  </div>
  <div v-if="role == 'Gyventojas' && administratorOccupation == 'Laisvas'" class="has-text-primary ml-2">
    {{administratorOccupation}}
  </div>
  <div v-if="role == 'Gyventojas' && administratorOccupation == 'Neprisijungęs'" class=" ml-2 text-violet-700">
    {{administratorOccupation}}
  </div>
  </div>
</div>
</div>

</div>
<div v-else class="is-flex is-flex-direction-row is-justify-content-end  mt-4">
<div  class="mr-6">
  <div class=" sm:ml-6 min-w-fit text-left sm:text-center sm:text-[21px]/[30px]">
  Užimtumas
</div>
<!-- display the occupation for the admin -->
<div class="has-text-left is-flex is-flex-direction-column min-w-fit">
    <div class="has-text-left is-flex is-flex-direction-row items-center sm:text-[21px]/[30px]">
    Jūsų užimtumas:
    <div v-if="role == 'Administratorius' && administratorOccupation == 'Užimtas'" class="has-text-danger ml-2">
    {{administratorOccupation}}
  </div>
  <div v-else-if="role == 'Administratorius' && administratorOccupation == 'Laisvas'" class="has-text-primary ml-2">
    {{administratorOccupation}}
  </div>
  <div v-else-if="role == 'Administratorius' && administratorOccupation == 'Prisijungęs'" class="has-text-info ml-2">
    {{administratorOccupation}}
  </div>
  <!-- display the occupation for the doorkeeper -->
  <div v-if="role == 'Budėtojas' && doorkeeperOccupation == 'Užimtas'" class="has-text-danger ml-2">
    {{doorkeeperOccupation}}
  </div>
  <div v-else-if="role == 'Budėtojas' && doorkeeperOccupation == 'Laisvas'" class="has-text-primary ml-2">
    {{doorkeeperOccupation}}
  </div>
  <div v-else-if="role == 'Budėtojas' && doorkeeperOccupation == 'Prisijungęs'" class="has-text-info ml-2">
    {{doorkeeperOccupation}}
  </div>
  </div>
  <div  class="flex flex-row sm:text-[21px]/[30px]">
  <div v-if="role == 'Administratorius'">
      Budėtojas:
    </div >
    <div v-if="role == 'Administratorius' && doorkeeperOccupation == 'Užimtas'" class="has-text-danger ml-2">
    {{doorkeeperOccupation}}
  </div>
  <div v-else-if="role == 'Administratorius' && doorkeeperOccupation == 'Laisvas'" class="has-text-primary ml-2">
    {{doorkeeperOccupation}}
  </div>
  <div v-else-if="role == 'Administratorius' && doorkeeperOccupation == 'Neprisijungęs'" class="text-violet-700 ml-2">
    {{doorkeeperOccupation}}
  </div>
</div>
  <button class="button is-primary mt-2" @click="showUserOccupationModal()" >Keisti užimtumą</button>
</div>
</div>
</div>
<UserOccupationModal v-if="showModal" :isActive="showModal" @close-action="closeUserOccupationModal()" @occupation-sucess="occupationUpdateSucess()" @occupation-fail="occupationUpdateFail()" @occupation-cantChange="occupationUpdateCantChange()"></UserOccupationModal>
<SucessMessageModal v-if="showSucessModal" :isActive="showSucessModal" :Message="sucessMessage" @close-action="closeSucessModal()"></SucessMessageModal>

    </div> 
</template>
<script>
import MenuBar from "../components/MenuBar.vue"
import UserOccupationModal from "../components/UserOccupationModal.vue"
import SucessMessageModal from"../components/SucessMessageModal.vue"
export default {
  name: 'MainView',
  data() {
    return {
      room: 0,
      role: "",
      administratorOccupation: "",
      doorkeeperOccupation: "",
      showModal: false,
      showSucessModal: false,
      sucessMessage: "",

    };
  },
  components:{
    MenuBar,
    UserOccupationModal,
    SucessMessageModal,
  },
  props: {
  },
  methods: {
    //return the resident's information
   async getUserInfo(){
    let data = await this.$api.getDataFromToken()
    this.role = data.role
    if(this.role == "Gyventojas"){
      try{
      let user = await this.$api.getUserInfo(data.id)
      this.room = await this.$api.getUserRoom(data.id,user.fk_room)
      }
      catch(error){
        this.room = -1
      }
    }

    },
    showUserOccupationModal(){
      this.showModal = true
    },
    closeUserOccupationModal(){
      this.showModal = false
    },
    closeSucessModal(){
      this.showSucessModal = false
      this.getUserInfo()
      if(this.role == 'Administratorius' || this.role == 'Budėtojas' ){
   this.getWorkerOccupation()
   }
    },
    occupationUpdateSucess(){
      this.sucessMessage = "Užimtumas atnaujintas sėkmingai"
      this.showModal = false
      this.showSucessModal = true

    },
    occupationUpdateCantChange(){
      this.sucessMessage = "Šiuo metu bendrabutyje yra aktyvus budėtojas, todėl užimtumo keisti negalite"
      this.showModal = false
      this.showSucessModal = true
    },
    occupationUpdateFail(){
      this.sucessMessage = "Nepavyko atnaujinti užimtumo"
      this.showModal = false
      this.showSucessModal = true

    },
    //return the occupation for the workers
   async getWorkerOccupation(){
    let data = await this.$api.getDataFromToken()
    try{
    let occupation = await this.$api.getUserOccupation(data.id)
      if(data.role == 'Administratorius'){
      this.administratorOccupation = occupation.occupation
      this.getDoorkeeperOccupation()
      }
      else if(data.role == 'Budėtojas'){
        this.doorkeeperOccupation = occupation.occupation
      }
    }
    catch(error){
      if(data.role == 'Administratorius'){
      this.administratorOccupation = `Prisijungęs`
      this.getDoorkeeperOccupation()
      }
      else if(data.role == 'Budėtojas'){
        this.doorkeeperOccupation = `Prisijungęs`
      }
    }
     
    },
     //return the doorkeeper's occupation
    async getDoorkeeperOccupation(){
      try{
    let data = await this.$api.getDoorkeeperOccupation()
        this.doorkeeperOccupation = data.occupation
      }
      catch(error){
        this.doorkeeperOccupation = "Neprisijungęs"
      }
    },
   //return admin's occupation
    async getAdminOccupationForResident(){
      try{
        let data = await this.$api.getAdminOccupation()
        this.administratorOccupation = data.occupation
      }
      catch(error){
        this.administratorOccupation = "Neprisijungęs"
      }
    }
  },
 async created(){
   await this.getUserInfo()
   //return the occupation for the worker based on his role
   if(this.role == 'Administratorius' || this.role == 'Budėtojas' ){
   this.getWorkerOccupation()
   if(this.role == 'Administratorius'){
    this.getDoorkeeperOccupation()
   }
   }
   //get the occupasion of the admin and doorkeeper for the resident on page load
   else if(this.role == 'Gyventojas'){
    this.getDoorkeeperOccupation()
    this.getAdminOccupationForResident()
   }
  }
}
</script>