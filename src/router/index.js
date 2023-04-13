import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "../views/LoginView.vue"
import MainView from "../views/MainView.vue"
import Page404 from "../views/Page404"
import UserInfoView from "../views/UserInfoView.vue"
import ContactInformationView from "../views/ContactInformationView.vue"
import ServiceView from "../views/ServiceView.vue"
import GuestRegistrationView from "../views/GuestRegistrationView.vue"
import axios from 'axios';
//import babelPolyfill from 'babel-polyfill'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/main',
    name: 'main',
    component: MainView,
    meta: { requiresAuth: true }
  },
  {
    path: '/user/:name',
    name: 'spesificUser',
    component: UserInfoView,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: async (to, from, next) => {

      try {
          const response = await axios.post(`http://localhost:5000/userByName`, {"name": to.params.name})
          if (response.status == 200) {
            const response2 =  await axios.get(`http://localhost:5000/authenticate`, {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
              }
            })
            console.log(response2.data.username)
            if(response2.data.username == to.params.name && response2.data.role == "Gyventojas" || response2.data.role == "Administratorius" && response.data.role == "Gyventojas" ){
            to.params.id=response.data.user_id
              next()
            }
            else{
              next('/404')
            }
          }
      }
      catch (error) {
        alert(error)
          next('/404')
      }
  }
},
{
  path: '/contacts',
  name: 'contacts',
  component: ContactInformationView,
  meta: { requiresAuth: true }
},
{
  path: '/services',
  name: 'services',
  component: ServiceView,
  meta: { requiresAuth: true }
},
{
  path: '/guests',
  name: 'guests',
  component: GuestRegistrationView,
  meta: { requiresAuth: true },

  beforeEnter: async (to, from, next) => {

    try {
          const response =  await axios.get(`http://localhost:5000/authenticate`, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
          if (response.data.role == "Gyventojas" || response.data.role == "Budėtojas"){
          to.params.role=response.data.role
            next()
          }
          else{
            next('/404')
          }
        
    }
    catch (error) {
      alert(error)
        next('/404')
    }
}
},

  
  {
    path: '/:pathMatch(.*)*',
    name: "InvalidLink",
    component: Page404
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach( async (to, from, next) => {
  if (to.meta.requiresAuth) {
    if (localStorage.getItem("token") == null) {
      // to.params.message = "Jūs neturite galiojančios sesijos"
      localStorage.setItem('message',"Jūs neturite galiojančios sesijos. Prašome prisijiungti")
      next({
        path: "/", 
      });
    }
    else{
      try{
        await axios.get(`http://localhost:5000/authenticate`, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
  
        })
      next();
      }
      catch(error){
        localStorage.setItem('message',"Jūs neturite galiojančios sesijos. Prašome prisijiungti")
        next({
          path: "/", 
        });
      }
    } 
  } else {
    next();
  }
});

export default router
