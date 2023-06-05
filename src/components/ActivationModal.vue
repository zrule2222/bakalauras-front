<template>
    <div class="modal" :class="{ 'is-active': isActive }">
   <div class="modal-background"></div>
      <div class="modal-content">
        <header class="modal-card-head">
          <p  class="modal-card-title has-text-left">Paskyros aktyvavimas</p>
        </header>
            <section class="modal-card-body">
                <label class="label">{{ Message }}</label>

            </section>
            <footer class="modal-card-foot flex justify-end" :class="activationStatus == 'fail' ? '' : '!justify-center'">
                <button v-if="activationStatus == 'fail'" @click.prevent="close()" class="button is-danger">Uždaryti</button>
                <router-link v-else-if="activationStatus == 'sucess'" :to="{ name: 'login'}">
                <button  class="button is-primary">Prisijungimo puslapis</button>
            </router-link>
            </footer>


        </div>
    </div>
</template>

<script>
export default {
    name: 'ActivationModal',
    data() {
        return {
            
        }
    },
    props: {
        isActive: { type: Boolean, default: false, required: true },
        Message: {type: String, required: true},
        activationStatus: {type: String, required: true}
    },
    methods: {
        //close this modal
        close() {
            this.$emit('close-action');
        }
    },
    created() {
    }
}
</script>