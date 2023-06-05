<template>
    <div>
      <div  :class="users.length > 0 ? 'hero is-fullheight' : 'hero'">
      <div class="hero">
      <section class="hero is-primary is-small">
        <div class="hero-body is-justify-content-center">
          <p class="title">
            Bendrabučio personalo kontaktinė informacija
          </p>
        </div>
      </section>
    </div>
    <MenuBar :menu-type="'main-back'"></MenuBar>
    <!-- display workers contact information if there are registered workers -->
    <div v-if="users.length > 0" v-for="user in users" :key="user.id" class="hero-body is-justify-content-center is-align-items-center">
        <div class="columns is-flex is-flex-direction-column box w-[304px] h-[220px]">
          <div class="column has-text-left">
            <label v-if="user.gender == 'Vyras'" class="font-bold text-3xl" for="username">{{user.role}}</label>
            <label v-else-if="user.gender == 'Moteris' && user.role == 'Budėtojas'" class="font-bold text-3xl" for="username">Budėtoja</label>
            <label v-else-if="user.gender == 'Moteris' && user.role == 'Administratorius'" class="font-bold text-3xl" for="username">Administratorė</label>
            
          </div>
          <div class="column has-text-left break-all">
            <label for="Name">{{ user.firstname }} {{ user.lastname }}</label>
          </div>
          <div class="column has-text-left break-words">
            <label for="Name">El. paštas: {{ user.email }}</label>
          </div>
        </div>
      </div>
    <!-- </div> -->
    <div v-else class="text-xl mt-7 has-text-info">
    Šiuo metu bendrabutyje nėra užregistruotų darbuotojų
    </div>


    </div>

    
  </div>

  

</template>
<script>
import MenuBar from "../components/MenuBar.vue"
export default {
  name: 'ContactInformationView',
  data() {
    return {
     users: []

    };
  },
  components:{
    MenuBar
  },
  props: {
  },
  methods: {
    //return the workers contact information
    async getContactInfo(){
    try{
      this.users = await this.$api.getContactInformation()
      console.log(this.users)
    }
    catch(error){
      this.users = []
    }
       
    }
  },
  created(){
    this.getContactInfo()
  }
}

</script>