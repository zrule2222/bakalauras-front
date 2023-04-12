<template>
    <div>
      <div class="hero is-fullheight">
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

    <div v-for="user in users" :key="user.id" class="hero-body is-justify-content-center is-align-items-center">
        <div class="columns is-flex is-flex-direction-column box w-[304px] h-[220px]">
          <div class="column has-text-left">
            <label class="font-bold text-3xl" for="username">{{user.role}}</label>
          </div>
          <div class="column has-text-left break-all">
            <label for="Name">{{ user.firstname }} {{ user.lastname }}</label>
          </div>
          <div class="column has-text-left break-all">
            <label for="Name">El. paštas: {{ user.email }}</label>
          </div>
        </div>
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
    // message: {
    //   type: String
    // }
  },
  methods: {
    async getContactInfo(){
    //   this.id = this.$route.params.id
      this.users = await this.$api.getContactInformation()
       
    }
  },
  created(){
    this.getContactInfo()
  }
}

</script>