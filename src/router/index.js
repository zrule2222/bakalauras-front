import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "../views/LoginView.vue"
import MainView from "../views/MainView.vue"
import Page404 from "../views/Page404"
import UserInfoView from "../views/UserInfoView.vue"
import ContactInformationView from "../views/ContactInformationView.vue"
import ServiceView from "../views/ServiceView.vue"
import GuestRegistrationView from "../views/GuestRegistrationView.vue"
import LeisureRoomView from "../views/LeisureRoomView.vue"
import LeisureRoomRegistrationsView from "../views/LeisureRoomRegistrationsView.vue"
import Page401 from "../views/Page401.vue"
import RegistrationView from "../views/RegistrationView.vue"
import UsersView from "../views/UsersView.vue"
import doorKeeperPasswordView from "../views/doorKeeperPasswordView"
import axios from 'axios';
//import babelPolyfill from 'babel-polyfill'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/401',
    name: '401',
    component: Page401
  },
  {
    path: '/main',
    name: 'main',
    component: MainView,
    meta: { requiresAuth: true }
  },
  {
    path: '/changePassword',
    name: 'changePassword',
    component: doorKeeperPasswordView,
    meta: { requiresAuth: true },
    beforeEnter: async (to, from, next) => {

      try {
            const response =  await axios.get(`http://localhost:5000/authenticate`, {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
              }
            })
            if (response.data.role == "Budėtojas"){
            to.params.role=response.data.role
              next()
            }
            else{
              next('/401')
            }
          
      }
      catch (error) {
          next('/404')
      }
  }
  },
  {
    path: '/residents',
    name: 'residents',
    component: UsersView,
    meta: { requiresAuth: true },
    beforeEnter: async (to, from, next) => {

      try {
            const response =  await axios.get(`http://localhost:5000/authenticate`, {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
              }
            })
            if (response.data.role == "Administratorius"){
            to.params.role=response.data.role
              next()
            }
            else{
              next('/401')
            }
          
      }
      catch (error) {
          next('/404')
      }
  }
    
    
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationView,
    meta: { requiresAuth: true },
    beforeEnter: async (to, from, next) => {

      try {
            const response =  await axios.get(`http://localhost:5000/authenticate`, {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
              }
            })
            if (response.data.role == "Administratorius"){
            to.params.role=response.data.role
              next()
            }
            else{
              next('/401')
            }
          
      }
      catch (error) {
          next('/404')
      }
  }
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

            if(response2.data.username == to.params.name && response2.data.role == "Gyventojas" || response2.data.role == "Administratorius" && response.data.role == "Gyventojas" ){
            to.params.id=response.data.user_id
              next()
            }
            else{
              next('/401')
            }
          }
          }
      catch (error) {
          next('/404')
      }
  }
},
{
  path: '/contacts',
  name: 'contacts',
  component: ContactInformationView,
  meta: { requiresAuth: true },
  beforeEnter: async (to, from, next) => {

    try {
          const response =  await axios.get(`http://localhost:5000/authenticate`, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
          if (response.data.role == "Gyventojas"){
          to.params.role=response.data.role
            next()
          }
          else{
            next('/401')
          }
        
    }
    catch (error) {
        next('/404')
    }
}
},
{
  path: '/services',
  name: 'services',
  component: ServiceView,
  meta: { requiresAuth: true },
  beforeEnter: async (to, from, next) => {

    try {
          const response =  await axios.get(`http://localhost:5000/authenticate`, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
          if (response.data.role == "Gyventojas"){
          to.params.role=response.data.role
            next()
          }
          else{
            next('/401')
          }
        
    }
    catch (error) {
        next('/404')
    }
}
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
            next('/401')
          }
        
    }
    catch (error) {
        next('/404')
    }
}
},
{
  path: '/leisureRoom',
  name: 'leisureRoom',
  component: LeisureRoomView,
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
            next('/401')
          }
        
    }
    catch (error) {
        next('/404')
    }
}
},
{
  path: '/leisureRegistrations',
  name: 'leisureRegistrations',
  component: LeisureRoomRegistrationsView,
  meta: { requiresAuth: true },
  beforeEnter: async (to, from, next) => {

    try {
          const response =  await axios.get(`http://localhost:5000/authenticate`, {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          })
          if ( response.data.role == "Budėtojas"){
          to.params.role=response.data.role
            next()
          }
          else{
            next('/401')
          }
        
    }
    catch (error) {
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
      localStorage.setItem('message',"Jūs neturite galiojančios sesijos. Prašome prisijungti")
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
        if(sessionStorage.getItem('role')  == 'Administratorius' || sessionStorage.getItem('role')  == 'Budėtojas'){
          await axios.put(`http://localhost:5000/occupation/${sessionStorage.getItem('id')}`,{occupation: "Neprisijiungęs"})
        }
        localStorage.setItem('message',"Jūs neturite galiojančios sesijos. Prašome prisijungti")
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
