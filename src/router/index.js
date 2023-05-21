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
import doorKeeperPasswordView from "../views/DoorKeeperPasswordView"
import WashingMachineView from "../views/WashingMachineView.vue"
import ServiceHistoryView from "../views/ServiceHistoryView.vue"
import SpesificServiceHistoryView from "../views/SpesificServiceHistoryView.vue"
import axios from 'axios';

const routes = [
  //route to login page
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  //route to 401 page
  {
    path: '/401',
    name: '401',
    component: Page401
  },
  //route to main page
  {
    path: '/main',
    name: 'main',
    component: MainView,
    meta: { requiresAuth: true }
  },
  //route to spesific service history
  {
    path: '/serviceHistory/:name',
    name: 'serviceHistory',
    component: SpesificServiceHistoryView,
    meta: { requiresAuth: true },
    beforeEnter: async (to, from, next) => {

      try {
            const response =  await axios.get(`http://localhost:5000/authenticate`, {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
              }
            })
            //only alow residents and the administrator to enter this page
            if (response.data.role == "Administratorius" || response.data.role == "Gyventojas"){
              if( to.params.name == 'guests' || to.params.name == 'leisureRoom' || to.params.name == 'washing' || to.params.name == 'machineFail'){
            to.params.role=response.data.role
            to.params.id=response.data.id
              next()
            }
            else{
              next('/404')
            }
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
  //route to service history page
  {
    path: '/servicesHistory',
    name: 'servicesHistory',
    component: ServiceHistoryView,
    meta: { requiresAuth: true },
    beforeEnter: async (to, from, next) => {

      try {
            const response =  await axios.get(`http://localhost:5000/authenticate`, {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
              }
            })
             //only alow residents and the administrator to enter this page
            if (response.data.role == "Administratorius" || response.data.role == "Gyventojas"){
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
  //route to the washing machine page
  {
    path: '/laundry',
    name: 'laundry',
    component: WashingMachineView,
    meta: { requiresAuth: true },
    beforeEnter: async (to, from, next) => {

      try {
            const response =  await axios.get(`http://localhost:5000/authenticate`, {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
              }
            })
             //only alow residents and the administrator to enter this page
            if (response.data.role == "Administratorius" || response.data.role == "Gyventojas"){
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
  //route to the dorkeepers pasword change page
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
             //only alow doorkeepers to enter this page
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
  //route to the residents list page
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
              //only alow the admin to enter this page
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
    
  //route to the users registration page
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
            //only alow the admin to enter this page
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
  //route to the resident's information page
  },
  {
    path: '/user/:name',
    name: 'spesificUser',
    component: UserInfoView,
    props: true,
    meta: { requiresAuth: true },
    beforeEnter: async (to, from, next) => {
      //check if the resident with the given name exists
      try {
          const response = await axios.post(`http://localhost:5000/userByName`, {"name": to.params.name})
          if (response.status == 200) {
            const response2 =  await axios.get(`http://localhost:5000/authenticate`, {
              headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
              }
            })
            //only allow the admin and the owner of this information to see this page
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
  //route to contacts information page
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
          //allow resident to go to this page
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
 //route to the services page
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
          //allow resident to go to this page
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
//route to the guests registration page
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
          //only allow residents and doorkeepers to go to this page
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
//route to the leisure room page
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
          //only allow residents and doorkeepers to go to this page
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
//route to leisure room registration page
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
          //only allow doorkeepers to go to this page
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
// route to 404 page
},

  
  {
    path: '/:pathMatch(.*)*',
    name: "InvalidLink",
    component: Page404
  }
]
//create the router
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
//authenticate the user before goiing to a route that requires authentification
router.beforeEach( async (to, from, next) => {
  if (to.meta.requiresAuth) {
    if (localStorage.getItem("token") == null) {
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
          sessionStorage.removeItem('id')
          sessionStorage.removeItem('role')
          localStorage.removeItem('token')
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
