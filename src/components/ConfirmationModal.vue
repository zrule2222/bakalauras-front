<template>
    <div class="modal" :class="{ 'is-active': isActive }">
   <div class="modal-background"></div>
      <div class="modal-content">
        <header class="modal-card-head">
          <p  class="modal-card-title has-text-left">Pakartotinis patvirtinimas</p>
        </header>
            <section class="modal-card-body">
                <label class="label">Ar jūs tikrai norite atlikti šį veiksmą?</label>

            </section>
            <footer class="modal-card-foot flex flex-row justify-between ">
                <button @click="accept()" class="button is-success">Tvirtinti</button>
                <button @click.prevent="reject()" class="button is-danger">Uždaryti</button>
            </footer>


        </div>
    </div>
</template>

<script>
export default {
    name: 'ConfirmationModal',
    data() {
        return {
            
        }
    },
    props: {
        isActive: { type: Boolean, default: false, required: true },
    },
    methods: {
        // user does not confirm again
        reject() {
            this.$emit('close-action');
        },
        //user confirms again
        accept() {
            this.$emit('confirm-action');
        }
    },
    created() {
    }
}
</script>