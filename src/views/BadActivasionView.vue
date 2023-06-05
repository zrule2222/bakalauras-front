<template>
    <section class="hero is-link is-fullheight has-background-dark">
        <div class="hero-body">
            <div>
                <p class="title text-left">
                    Paskyros aktyvavimas negalimas
                </p>
                <p v-if="$route.params.failReason == 'error'" class="subtitle w-fit ">
                    Nerasta paskyra aktyvavimui
                </p>
                <p v-else-if="$route.params.failReason == 'expired'" class="subtitle w-fit ">
                    Paskyros aktyvavimo laikas baigėsi
                </p>
                <button @click="$router.push('/')" class="button is-success float-left">Grįžti į prisijungimo puslapį</button>
            </div>
        </div>
    </section>
</template>
<script>
export default {
    name: 'BadActivasionView',
    data() {
        return {
            
        }
    },
    props: {
        // isActive: { type: Boolean, default: false, required: true },
        // serviceInformation: {type: String, required: true},
        //failReason: {type: String, required: true}
    },
    methods: {
        //close this modal
        closeModal() {
            this.$emit('close-action');
        },

    },
    created() {
    }
}
</script>