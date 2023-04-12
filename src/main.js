import Vue from "vue";
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import services from '../src/service/Services.js'
import '@vuepic/vue-datepicker/dist/main.css'
import "../style.css"

//Vue.use(services)
createApp(App).use(router).use(services).mount('#app')
