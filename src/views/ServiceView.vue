<template>
    <div>
        <div  :class="services.length > 0 ? 'hero is-fullheight' : 'hero'">
        <div class="hero">
      <section class="hero is-primary is-small">
        <div class="hero-body is-justify-content-center">
          <p class="title">
            Paslaugos
          </p>
        </div>
      </section>
    </div>
 <MenuBar :menu-type="'main-back'"></MenuBar>

 <div v-if="services.length > 0" v-for="service in services" :key="service.id" class="hero-body is-justify-content-center is-align-items-center  ">
    <div class="box is-radiusless border-2 border-bulma-green  w-[700px]">
        <div class=" flex flex-row">
        <div v-if="service.name == 'Laisvalaikio kambarys'" class="min-w-[213px] min-h-[160px]">
            <img src="../assets/leisure_room.jpg" class=" object-cover min-w-[175px] min-h-[160px] h-40" >
        </div>
        <div v-else-if="service.name == 'Skalbykla'" class="min-w-[213px] min-h-[160px]">
            <img src="../assets/washing_machine.jpg" class=" object-cover min-w-[213px] min-h-[160px]  h-40" >
        </div>
        <div v-else-if="service.name == 'Svečiai'" class="min-w-[213px] min-h-[160px]">
            <img src="../assets/guests.jpg" class=" object-cover min-w-[213px] min-h-[160px]  h-40" >
        </div>
        <div v-else class="min-w-[213px] min-h-[160px]">
            <img src="../assets/placeholder_service.jpg" class=" object-cover min-w-[213px] min-h-[160px]  h-40" >
        </div>
        <div class="flex flex-col items-start ">
        <div v-if="service.name.length > 0" class=" ml-3 font-bold text-3xl">
            {{service.name}}
        </div>
        <div v-else class=" ml-3 font-bold text-3xl">
            Paslaugos pavadinimas
        </div>
        <div v-if="service.information.length > 0" class=" ml-3 mt-4 font-semibold  break-all text-left">
            {{service.information}}  
        </div>
        <div v-else class=" ml-3 mt-4 font-semibold  break-all text-left">
           Paslaugos trumpa informacija.
        </div>
        <div class=" ml-3 h-fill sm:mt-auto  flex  sm:flex-row flex-col ">
           <button @click="openInfoModal(service.name,service.description)" class="button is-primary">daugiau informacijos</button>
           <div v-if="service.name == 'Svečiai'">
            <router-link :to="{ name: 'guests'}">
           <button class="button is-warning sm:ml-10 min-w-[193px]  ">Jūsų registracijos</button>
        </router-link>
        </div>
        <div v-if="service.name == 'Laisvalaikio kambarys'">
            <router-link :to="{ name: 'leisureRoom'}">
           <button v-if="service.name == 'Laisvalaikio kambarys'" class="button is-warning sm:ml-10   ">Kambario užimtumas</button>
        </router-link>
        </div>
        <div v-if="service.name == 'Skalbykla'">
            <router-link :to="{ name: 'laundry'}">
           <button v-if="service.name == 'Skalbykla'" class="button is-warning sm:ml-10   ">Skalbyklos puslapis</button>
        </router-link>
        </div>
        </div>
    </div>
        </div>
    </div>
 </div>
 <div v-else class="text-xl mt-7 has-text-info">
    Šiuo metu bendrabutyje nėra teikiamų paslaugų
    </div>
 <ServiceInfoModal  @close-action="closeInfoModal()" v-if="showInfoModal" :serviceName="serviceName" :serviceInformation="serviceInformation" :isActive="showInfoModal"></ServiceInfoModal>
</div>
</div>
</template>
<script>
import MenuBar from "../components/MenuBar.vue"
import ServiceInfoModal from "../components/ServiceInfoModal.vue"
export default {
    name: 'ServiceView',
    data() {
        return {
            services: [],
            showInfoModal: false,
            serviceInformation: "",
            serviceName: "",

        }
    },
    props: {
    },
    components:{
        MenuBar,
        ServiceInfoModal,
    },
    methods: {
       async getServices() {
        try{
           this.services = await this.$api.getServices()
          
        }
        catch(error){
            this.services = []
        }
        },
       async openInfoModal(name,description){
         await this.$api.authenticateUser()
           this.showInfoModal = true
           this.serviceName = name
           this.serviceInformation = description
        },
        closeInfoModal(){
           this.showInfoModal = false
           this.serviceName = ""
           this.serviceInformation = ""
        }
    },
    created() {
        this.getServices()
    }
}
</script>