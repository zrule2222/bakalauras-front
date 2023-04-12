<template>
    <div class="modal" :class="{ 'is-active': isActive }">
   <div class="modal-background"></div>
      <div class="modal-content">
        <header class="modal-card-head">
          <p  class="modal-card-title has-text-left">{{serviceName}}</p>
        </header>
            <section class="modal-card-body has-text-left">
                <label class="label">{{ serviceInformation }}</label>

            </section>
            <footer class="modal-card-foot flex justify-end">
                <button @click.prevent="closeModal()" class="button is-danger">Uždaryti</button>
            </footer>


        </div>
    </div>
</template>

<script>
export default {
    name: 'ServiceInfoModal',
    data() {
        return {
            
        }
    },
    props: {
        isActive: { type: Boolean, default: false, required: true },
        serviceInformation: {type: String, required: true},
        serviceName: {type: String, required: true}
    },
    methods: {
        closeModal() {
            this.$emit('close-action');
        }
    },
    created() {
    }
}
</script>