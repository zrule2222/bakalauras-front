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

  api.getWashingMachineData = async function () {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.get(`/machineData`)
    }
     return response.data
   }

   api.registerWashing = async function (registrationData) {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.post(`/registerWashing`,registrationData)
    }
     return response.data
   }

   api.getCurrectFailRegUsers = async function (id) {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.get(`/getFailRegUsers/${id}`)
    }
     return response.data
   }

   api.updateWashingMachine = async function (id, updateData) {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.put(`/updatemachine/${id}`,updateData)
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

   api.getDoorkeeperOccupation = async function () {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.get(`/doorkeeperOccupation`)
    }
     return response.data
   }

   api.getAdminOccupation = async function () {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.get(`/adminOccupation`)
    }
     return response.data
   }

   api.getRoomsForRegistration = async function (roomType) {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.post(`/roomsForRegistration`,{room_gender: roomType})
    }
     return response.data
   }

   api.registerUser = async function (userData) {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.post(`/register`,userData)
    }
     return response.data
   }

   api.updateRoomSpace = async function (id) {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.put(`/updateRoomSpace/${id}`)
    }
     return response.data
   }

   api.checkUsername = async function (username) {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.post(`/checkUsername`, {username: username})
    }
     return response.data
   }

   api.getAllResidents = async function () {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.get(`/residents`)
    }
     return response.data
   }

   api.updateRoomstatus = async function () {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.put(`/updateRoomstatus`)
    }
     return response.data
   }


   api.setGuestRegistrationAsDone = async function (id) {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
      let data = await this.getDataFromToken()
       response = await this.http.put(`/updateGuest/${id}`, {	status : "Užbaigta",doorKeeper_id: data.id})
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

   api.finishWashingMachine = async function (id) {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.put(`/finishMachine/${id}`)
    }
     return response.data
   }
   api.registerMachineFailure = async function (id, userId) {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       let resp = await this.http.post(`/registerFailure`,{user: userId, machineId:id} )
       console.log(resp.data.insertId)

        try{
          console.log(resp.data.insertId)
          await this.http.put(`/machineFailFirstReg/${id}`,{regId: resp.data.insertId} )
        }
        catch(error){
          try{
            console.log(resp.data.insertId)
          await this.http.put(`/machineFailSecondtReg/${id}`,{regId: resp.data.insertId} )
          }
          catch(error){
            try{
              console.log(resp.data.insertId)
            await this.http.put(`/machineFailThirdtReg/${id}`,{regId: resp.data.insertId} )
            }
            catch(error){
              return false
            }
          }
        }
        return true
    }
    else{
      return false
    }

   }


   api.finishWashingRegistration = async function (id) {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.put(`/finishWashing/${id}`)
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
      if(sessionStorage.getItem('role')  == 'Administratorius' || sessionStorage.getItem('role')  == 'Budėtojas'){
        this.setWorkerOccupation("Neprisijungęs",sessionStorage.getItem('id'))
      }
      localStorage.setItem('message',"Jūs neturite galiojančios sesijos. Prašome prisijungti")
      router.push({ path: '/' })
      return false
    }
    
   }
   else{
      localStorage.setItem('message',"Jūs neturite galiojančios sesijos. Prašome prisijungti")
     router.push({ path: '/' })
      return false
   }
  }

  api.setWorkerOccupation = async function(occupation, id){
    //const res = await this.authenticateUser()
    let response = null
    //if (res == true) {
    response =  await this.http.put(`/occupation/${id}`,{occupation: occupation})
    //}
      //return response.data
    },



  api.getServices = async function(){
    const res = await this.authenticateUser()
    let response = null
    if (res == true) {
    response =  await this.http.get(`/services`)
    }
      return response.data
    },

    api.getUserOccupations = async function(id){
      const res = await this.authenticateUser()
      let response = null
      if (res == true) {
      response =  await this.http.get(`/userOccupation/${id}`)
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

        api.updateUserPassword = async function(id,password){
          const res = await this.authenticateUser()
          let response = null
          if (res == true) {
          response =  await this.http.put(`/userPass/${id}`, {password: password})
          }
            return response.data
          },



        api.sendEmail = async function(email,password){
          const res = await this.authenticateUser()
          let response = null
          if (res == true) {
          response =  await this.http.post(`/sendMail`, {userMail: email,password: password})
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

                api.finishLeisureRegistration = async function(id){
                  const res = await this.authenticateUser()
                  let response = null
                  if (res == true) {
                  response =  await this.http.put(`/updateUserLeisure/${id}`,{status: "Užbaigta"})
                  }
                    return response.data
                  },


  api.getDataFromToken = async function(){
    if (localStorage.getItem("token") != null){
      try{
  let response =  await this.http.get(`/authenticate`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
    return response.data
  }
  catch(error){
    if(sessionStorage.getItem('role')  == 'Administratorius' || sessionStorage.getItem('role')  == 'Budėtojas'){
      this.setWorkerOccupation("Neprisijungęs",sessionStorage.getItem('id'))
    }
    localStorage.setItem('message',"Jūs neturite galiojančios sesijos. Prašome prisijungti")
    router.push({ path: '/' })
  }
  }
  else{
    localStorage.setItem('message',"Jūs neturite galiojančios sesijos. Prašome prisijungti")
    router.push({ path: '/' })
  }
  }

export default {
    install(App) {
        App.config.globalProperties.$api = api
    }
  }