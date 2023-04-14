import axios from 'axios';
//import "babel-polyfill";
import router from '../router/index.js'

export const api = {}


api.http = axios.create({ baseURL: "http://localhost:5000" })

api.login = async function (loginData) {
  let response = null
    response = await this.http.post(`/login`, loginData)
  return response.data
},
api.userByName = async function (username) {
   const res = await this.authenticateUser()
   let response = null
   if (res == true) {
     response = await this.http.post(`/userByName`, {"name": username})
   }
   return response.data
 }
 api.getUserInfo = async function (id) {
   const res = await this.authenticateUser()
   let response = null
   if (res == true) {
     response = await this.http.get(`/user/${id}`)
   }
   return response.data
 }

 api.getContactInformation = async function () {
   const res = await this.authenticateUser()
   let response = null
   if (res == true) {
     response = await this.http.get(`/contacts`)
   }
   return response.data
 }
 api.getUserRoom = async function (id, fk_room) {
   const res = await this.authenticateUser()
    let response = null
    if (res == true) {
      response = await this.http.post(`/userRoom/${id}`,{room: fk_room})
    }
    return response.data.number
  }
  api.registerGuest = async function (guestData) {
    const res = await this.authenticateUser()
     let response = null
     if (res == true) {
       response = await this.http.post(`/registerGuest`,guestData)
     }
     return response.data
   }
  api.blockUser = async function (id) {
   const res = await this.authenticateUser()
    let response = null
    if (res == true) {
      response = await this.http.put(`/block/${id}`)
    }
    return response.data
  }

  api.updateUserInfo = async function (id,userinfo) {
   const res = await this.authenticateUser()
    let response = null
   if (res == true) {
      response = await this.http.put(`/updateUser/${id}`, userinfo)
   }
    return response.data
  }

  api.cancelGuestRegistration = async function (id) {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.put(`/cancelGuest/${id}`)
    }
     return response.data
   }

   api.getActiveGuestRegistrations = async function () {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.get(`/activeGuests`)
    }
     return response.data
   }
   api.acceptGuestRegistration = async function (id) {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
      let data = await this.getDataFromToken()
       response = await this.http.put(`/updateGuest/${id}`, {	status : "Patvirtinta",doorKeeper_id: data.id})
    }
     return response.data
   }

   api.rejectGuestRegistration = async function (id) {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
      let data = await this.getDataFromToken()
       response = await this.http.put(`/updateGuest/${id}`, {	status : "Atmesta",doorKeeper_id: data.id})
    }
     return response.data
   }

   api.getConfirmedGuestRegistrations = async function () {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.get(`/confirmedGuests`)
    }
     return response.data
   }

   api.setGuestRegistrationAsDone = async function (id) {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
      let data = await this.getDataFromToken()
       response = await this.http.put(`/updateGuest/${id}`, {	status : "Užbaikta",doorKeeper_id: data.id})
    }
     return response.data
   }

   api.leisureRoomRegistration = async function (id) {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.post(`/registerLeisure/${id}`)
    }
     return response.data
   }
   
   
   

 api.authenticateUser = async function () {
   if (localStorage.getItem("token") != null){
    try{
      await this.http.get(`/authenticate`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
    return true
    }
    catch(error){
      localStorage.setItem('message',"Jūs neturite galiojančios sesijos. Prašome prisijiungti")
      router.push("/")
      return false
    }
   }
   else{
      localStorage.setItem('message',"Jūs neturite galiojančios sesijos. Prašome prisijiungti")
      router.push("/")
      return false
   }
  }
  api.getServices = async function(){
    const res = await this.authenticateUser()
    let response = null
    if (res == true) {
    response =  await this.http.get(`/services`)
    }
      return response.data
    },
    api.getuserGuestRegistrations = async function(id){
      const res = await this.authenticateUser()
      let response = null
      if (res == true) {
      response =  await this.http.get(`/guestRegistrations/${id}`)
      }
        return response.data
      },

      api.getLeisureRoomRegistrations = async function(){
        const res = await this.authenticateUser()
        let response = null
        if (res == true) {
        response =  await this.http.get(`/activeLeisure`)
        }
          return response.data
        },

        
      api.acceptLeisureRoomRegistration = async function(id){
        const res = await this.authenticateUser()
        let response = null
        if (res == true) {
          let data = await this.getDataFromToken()
          console.log(data)
        response =  await this.http.put(`/updateLeisure/${id}`,{status: "Patvirtinta", doorKeeper_id: data.id})
        }
          return response.data
        },

        api.rejectLeisureRoomRegistration = async function(id){
          const res = await this.authenticateUser()
          let response = null
          if (res == true) {
            let data = await this.getDataFromToken()
            console.log(data)
          response =  await this.http.put(`/updateLeisure/${id}`,{status: "Atmesta", doorKeeper_id: data.id})
          }
            return response.data
          },

          api.getLeisureRoomData = async function(){
            const res = await this.authenticateUser()
            let response = null
            if (res == true) {
            response =  await this.http.get(`/confirmedLeisure`)
            }
              return response.data
            },

            api.getuserLeisureRegistration = async function(id){
              const res = await this.authenticateUser()
              let response = null
              if (res == true) {
              response =  await this.http.get(`/userLeisure/${id}`)
              }
                return response.data
              },

              api.cancelLeisureRegistration = async function(id){
                const res = await this.authenticateUser()
                let response = null
                if (res == true) {
                response =  await this.http.put(`/updateUserLeisure/${id}`,{status: "Atšaukta"})
                }
                  return response.data
                },


  api.getDataFromToken = async function(){
  let response =  await this.http.get(`/authenticate`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    return response.data
  }

export default {
    install(App) {
        App.config.globalProperties.$api = api
    }
  }