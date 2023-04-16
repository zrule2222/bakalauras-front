<template>
        <nav class=" p-0">
            <div class="flex  items-center bg-neutral-400">
            <button data-collapse-toggle="navbar-default" @click="navCollapse()" type="button" class=" h-full px-1 py-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 " aria-expanded="false">
      <span class="sr-only h-full">Open main menu</span>
      <svg class="w-7 h-full" aria-hidden="true" fill="white" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    </button>
    <div class="flex flex-wrap items-center   ml-auto justify-end md:hidden h-full">
            <!-- <button  class="text-sm  text-white hover:bg-gray-700 rounded-md px-3 py-2">(555) 412-1234</button> -->
            <div>
              prisijungęs: {{ username }}
            </div>
            <button  class="text-sm  text-white hover:bg-gray-700 rounded-md px-3 py-2 fa-solid fa-right-from-bracket"></button>
        </div>
</div>
    <div class="hidden w-1/3 min-w-fit  md:block md:w-auto" id="navbar-default-target">
        <ul class="font-medium flex flex-col p-0 md:p-0 border bg-neutral-400 border-gray-100  md:flex-wrap md:items-center md:w-screen-xl md:flex-row  md:space-x-8 md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    <!-- <div class="flex flex-wrap items-center w-screen-xl p-0"> -->
     
            <li v-if="menuType == 'main-resident' && username" class="m-0 ">
                <router-link :to="{ name: 'spesificUser', params: { name:  username} }">
            <button class="self-center font-normal block text-sm w-full text-left whitespace-nowrap text-white hover:bg-gray-700 rounded-md px-2 py-1">Mano duomenys</button>
        </router-link>
        </li>
        <li v-if="menuType == 'main-resident'" class="m-0 ">
          <router-link :to="{ name: 'services'}">
            <button class="self-center block text-sm w-full font-normal text-left  whitespace-nowrap text-white hover:bg-gray-700 rounded-md px-2 py-1">Paslaugos</button>
          </router-link>
        </li>
        <li v-if="menuType == 'main-resident'" class="m-0">
            <router-link :to="{ name: 'contacts'}">
            <button class="self-center block text-sm w-full text-left font-normal  whitespace-nowrap text-white hover:bg-gray-700 rounded-md px-2 py-1">Bendrabučio personalas</button>
        </router-link>
        </li>
        <li v-if="menuType == 'main-resident'" class="m-0">
            <button class="self-center block text-sm w-full text-left font-normal  whitespace-nowrap text-white hover:bg-gray-700 rounded-md px-2 py-1">Paslaugų istorija</button>
        </li>
        <li v-if="menuType == 'main-back'" class="m-0">
          <router-link :to="{ name: 'main'}">
            <button class="self-center block text-sm w-full text-left font-normal  whitespace-nowrap text-white hover:bg-gray-700 rounded-md px-2 py-1">Pradžia</button>
          </router-link>
        </li>
        <li v-if="menuType == 'main-back'" class="m-0">
            <button @click="$router.go(-1)" class="self-center block text-sm w-full text-left font-normal  whitespace-nowrap text-white hover:bg-gray-700 rounded-md px-2 py-1">Atgal</button>
        </li>
        <li v-if="menuType == 'main-admin'" class="m-0">
          <router-link :to="{ name: 'registration'}">
            <button class="self-center block text-sm w-full text-left font-normal  whitespace-nowrap text-white hover:bg-gray-700 rounded-md px-2 py-1">Registracija</button>
          </router-link>
        </li>
        <li v-if="menuType == 'main-admin'" class="m-0">
          <!-- <router-link :to="{ name: 'main'}"> -->
            <button class="self-center block text-sm w-full text-left font-normal  whitespace-nowrap text-white hover:bg-gray-700 rounded-md px-2 py-1">Skalbykla</button>
          <!-- </router-link> -->
        </li>
        <li v-if="menuType == 'main-admin'" class="m-0">
          <router-link :to="{ name: 'residents'}">
            <button class="self-center block text-sm w-full text-left font-normal  whitespace-nowrap text-white hover:bg-gray-700 rounded-md px-2 py-1">Gyventojai</button>
          </router-link>
        </li>
        <li v-if="menuType == 'main-admin'" class="m-0">
          <!-- <router-link :to="{ name: 'main'}"> -->
            <button class="self-center block text-sm w-full text-left font-normal  whitespace-nowrap text-white hover:bg-gray-700 rounded-md px-2 py-1">Paslaugų istorija</button>
          <!-- </router-link> -->
        </li>
        <li v-if="menuType == 'main-doorkeeper'" class="m-0">
          <router-link :to="{ name: 'guests'}">
            <button class="self-center block text-sm w-full text-left font-normal  whitespace-nowrap text-white hover:bg-gray-700 rounded-md px-2 py-1">Svečiai</button>
          </router-link>
        </li>
        <li v-if="menuType == 'main-doorkeeper'" class="m-0">
          <router-link :to="{ name: 'leisureRoom'}">
            <button class="self-center block text-sm w-full text-left font-normal  whitespace-nowrap text-white hover:bg-gray-700 rounded-md px-2 py-1">Laisvalaikio kambarys</button>
          </router-link>
        </li>
            <!-- <div class="ml-auto"> -->
                <li class="ml-auto">
        <div class="md:flex md:flex-wrap md:items-center md:ml-auto md:justify-end hidden ">
            <!-- <button  class="text-sm  text-white hover:bg-gray-700 rounded-md px-3 py-2">(555) 412-1234</button> -->
            <div>
              prisijiungęs: {{ username }}
            </div>
            <button @click="logout()"  class="text-sm  text-white hover:bg-gray-700 rounded-md md:px-2 md:py-1 fa-solid fa-right-from-bracket sm:px-3 sm:py-3 "></button>
        </div>
    </li>
    <!-- </div> -->
     
  <!-- </div> -->
  </ul>
    </div>
</nav>

</template>
<script>
import { Collapse } from 'flowbite';
// window.addEventListener('beforeunload', function (e) {
//             e.preventDefault();
//            this.logout()
//         })
export default {
  
  name: 'MenuBar',
  data() {
    return {
    username: "",
    role: "",
    navOpen: false,
    window: document.defaultView,
    loaded: false

    };
  },
  props: {
     menuType: {
       type: String,
       required: true,
     }
  },
  methods: {
    
  async  setPageData(){
      let data = await this.$api.getDataFromToken()
    this.username = data.username
    },
    navCollapse(){

        const $triggerEl = document.getElementById('navbar-default');
        const $targetEl = document.getElementById('navbar-default-target');
        const collapse = new Collapse($targetEl, $triggerEl);
        if(this.navOpen == true){
        collapse.collapse();
        this.navOpen = false
        }
        else{
        collapse.expand()
        this.navOpen = true
        }
    },
   async logout(){
    // if(this.loaded){
    //  if (sessionStorage.getItem('reloaded') == null){
    let data = await this.$api.getDataFromToken()
    if(data.role == 'Administratorius' || data.role == 'Budėtojas'){
         await this.$api.setWorkerOccupation("Neprisijiungęs",data.id)
    }
      localStorage.removeItem('token')
      this.$router.push('/')
 // }

   //}
  // else{
  //   this.loaded = true
  // }
    },
    // test(){
    //   this.loaded = true
    //   sessionStorage.removeItem('reloaded')
    // }
  },
   mounted(){

    this.setPageData()
     //window.addEventListener("onload",  this.test());
     //window.addEventListener("beforeunload", this.test());
   // window.addEventListener("onunload", this.logout());

  }
}
</script>