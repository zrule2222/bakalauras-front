<template>
    <div>
        <div class="hero">
      <section class="hero is-primary is-small">
        <div class="hero-body is-justify-content-center">
          <p class="title">
            Paslaugų istorija
          </p>
        </div>
      </section>
    </div>
 <MenuBar :menu-type="'services'"></MenuBar>


    </div>

</template>
<script>
import MenuBar from "../components/MenuBar.vue"
export default {
    name: 'ServiceHistoryView',
    data() {
        return {
            
        }
    },
    props: {
    },
    components:{
        MenuBar,
    },
    methods: {

    },
    created() {
    }
}
</script>