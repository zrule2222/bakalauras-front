<template>
  <div>
       <div class="hero">
      <section class="hero is-primary is-small">
        <div class="hero-body is-justify-content-center">
          <p class="title">
            Bendrabučio administravimo sistema
          </p>
        </div>
      </section>
    </div>
 <MenuBar :menu-type="'main-resident'"></MenuBar>
 <div class="is-flex is-flex-direction-row is-justify-content-space-between  mt-4">
<div class="  ml-6 min-w-fit">
 Jūsų kambarys: {{ room }}
</div>
<div class="mr-6">
  <div class=" sm:ml-6 min-w-fit text-left sm:text-center">
  Darbuotojų užimtumas
</div>
  <div class="has-text-left is-flex is-flex-direction-column min-w-fit">
    <div class="has-text-left is-flex is-flex-direction-row">
    Budėtojas:
    <div class="has-text-danger">
    Laisvas
  </div>
</div>
    <div class="has-text-left is-flex is-flex-direction-row">
    <div>
      Administratorius:
    </div >
    <div class="has-text-success">
     Užimtas
    </div>
  </div>
</div>
</div>
</div>

    </div> 
</template>
<script>
import MenuBar from "../components/MenuBar.vue"
export default {
  name: 'MainView',
  data() {
    return {
      username: "",
      room: 0,

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
   async setPageData(){
      this.username = localStorage.getItem('username')
      let user = await this.$api.getUserInfo(localStorage.getItem('id'))
      this.room = await this.$api.getUserRoom(localStorage.getItem('id'),user.fk_room)

    }
  },
  created(){
   this.setPageData()
  }
}
</script>