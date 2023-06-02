<template>
    <div>
        bad activation
    </div>
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
        // serviceName: {type: String, required: true}
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