<template>
    <div class="modal" :class="{ 'is-active': isActive }">
   <div class="modal-background"></div>
      <div class="modal-content">
        <header class="modal-card-head">
          <p  class="modal-card-title has-text-left">Pranešimas</p>
        </header>
            <section class="modal-card-body">
                <label class="label">{{ Message }}</label>

            </section>
            <footer class="modal-card-foot flex justify-end">
                <button @click.prevent="close()" class="button is-danger">Uždaryti</button>
            </footer>


        </div>
    </div>
</template>

<script>
export default {
    name: 'SucessMessageModal',
    data() {
        return {
            
        }
    },
    props: {
        isActive: { type: Boolean, default: false, required: true },
        Message: {type: String, required: true},
    },
    methods: {
        close() {
            this.$emit('close-action');
        }
    },
    created() {
    }
}
</script>