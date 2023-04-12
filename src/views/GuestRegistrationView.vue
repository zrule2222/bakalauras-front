<template>
    <div>

    <div class="hero">
      <section class="hero is-primary is-small">
        <div class="hero-body is-justify-content-center">
          <p class="title">
            Svečių registracijos
          </p>
        </div>
      </section>
    </div>
    <MenuBar :menu-type="'main-back'"></MenuBar>
    <button @click="showRegistrationModal" class="button is-pulled-right mt-5 mr-6 is-primary">Registruoti svečią</button>
    <div>
        <div class="text-4xl mt-20">
      Jūsų svečių registracijos
    </div>
      <div class="">
      <table class="table is-bordered is-striped is-hoverable ml-auto mr-auto mt-7">
        <thead>
    <tr>
        <th>Numeris</th>
        <th>Svečias</th>
        <th>Registracijos atšaukimas</th>
    </tr>
        </thead>
        <tbody>
            <tr>
                <th class="has-text-centered">1</th>
                <td>Jonas jonaitis</td>
                <td><button class="button is-danger is-small w-2/3"> Atšaukti</button></td>
            </tr>
        </tbody>
      </table>
    </div>
<GuestRegistrationModal @close-action="closeRegistrationModal" v-if="showModal" :is-active="showModal" ></GuestRegistrationModal>
    </div>
    </div>
</template>

<script>
import MenuBar from "../components/MenuBar.vue"
import GuestRegistrationModal from "../components/GuestRegistrationModal.vue"
export default {
    name: 'GuestRegistrationView',
    data() {
        return {
            showModal:false
        }
    },
    props: {
        // isActive: { type: Boolean, default: false, required: true },
        // Message: {type: String, required: true},
    },
    components:{
        MenuBar,
        GuestRegistrationModal,
    },
    methods: {
showRegistrationModal(){
    this.showModal = true
},
closeRegistrationModal(){
    this.showModal = false
}
    },
    created() {
    }
}
</script>