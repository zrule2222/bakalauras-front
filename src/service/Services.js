import axios from 'axios';
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
     if (res == true) {
      await this.http.post(`/registerGuest`,guestData)
     }
   }
  api.blockUser = async function (id) {
   const res = await this.authenticateUser()
    if (res == true) {
    await this.http.put(`/block/${id}`)
    }
  }

  api.updateUserInfo = async function (id,userinfo) {
   const res = await this.authenticateUser()
   if (res == true) {
     await this.http.put(`/updateUser/${id}`, userinfo)
   }
  }

  api.getWashingMachineData = async function () {
    const res = await this.authenticateUser()
    if (res == true) {
     await this.http.get(`/machineData`)
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

   api.getCurrentFailRegUsers = async function (id) {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.get(`/getFailRegUsers/${id}`)
    }
     return response.data
   }

   api.fixWashingMachine = async function (id) {
    const res = await this.authenticateUser()
    if (res == true) {
      await this.http.put(`/fixMachine/${id}`)
    }
   }

   api.updateWashingMachine = async function (id, updateData) {
    const res = await this.authenticateUser()
    if (res == true) {
      await this.http.put(`/updatemachine/${id}`,updateData)
    }
  
   }

  api.cancelGuestRegistration = async function (id) {
    const res = await this.authenticateUser()
    if (res == true) {
      await this.http.put(`/cancelGuest/${id}`)
    }
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
    if (res == true) {
      let data = await this.getDataFromToken()
      await this.http.put(`/updateGuest/${id}`, {	status : "Atmesta",doorKeeper_id: data.id})
    }
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
    if (res == true) {
    await this.http.post(`/register`,userData)
    }
   }

   api.updateRoomSpace = async function (id) {
    const res = await this.authenticateUser()
    if (res == true) {
     await this.http.put(`/updateRoomSpace/${id}`)
    }
   }

   api.checkUsername = async function (username) {
    const res = await this.authenticateUser()
    if (res == true) {
      await this.http.post(`/checkUsername`, {username: username})
    }
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
    if (res == true) {
     await this.http.put(`/updateRoomstatus`)
    }
   }


   api.setGuestRegistrationAsDone = async function (id) {
    const res = await this.authenticateUser()
    if (res == true) {
      let data = await this.getDataFromToken()
      await this.http.put(`/updateGuest/${id}`, {	status : "Užbaigta",doorKeeper_id: data.id})
    }
   }

   api.leisureRoomRegistration = async function (id) {
    const res = await this.authenticateUser()
    if (res == true) {
      await this.http.post(`/registerLeisure/${id}`)
    }
   }

   api.finishWashingMachine = async function (id) {
    const res = await this.authenticateUser()
    if (res == true) {
     await this.http.put(`/finishMachine/${id}`)
    }
   }
   api.registerMachineFailure = async function (id, userId) {
    const res = await this.authenticateUser()
    if (res == true) {
       let resp = await this.http.post(`/registerFailure`,{user: userId, machineId:id} )

        try{
          await this.http.put(`/machineFailFirstReg/${id}`,{regId: resp.data.insertId} )
        }
        catch(error){
          try{
          await this.http.put(`/machineFailSecondtReg/${id}`,{regId: resp.data.insertId} )
          }
          catch(error){
            try{
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
    if (res == true) {
       await this.http.put(`/finishWashing/${id}`)
    }
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
    if(occupation == 'Neprisijungęs'){
      sessionStorage.removeItem('id')
      sessionStorage.removeItem('role')
    }
   await this.http.put(`/occupation/${id}`,{occupation: occupation})
    },



  api.getServices = async function(){
    const res = await this.authenticateUser()
    let response = null
    if (res == true) {
    response =  await this.http.get(`/services`)
    }
      return response.data
    },

    api.getUserOccupation = async function(id){
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
          if (res == true) {
        await this.http.put(`/userPass/${id}`, {password: password})
          }
          },

        api.sendEmail = async function(email,password,username){
          const res = await this.authenticateUser()
          if (res == true) {
            await this.http.post(`/sendMail`, {userMail: email,password: password,username: username})
          }
          },

          api.getServiceHistory = async function(id,role,service){
            const res = await this.authenticateUser()
            let response = null
            if (res == true) {
              if(role == 'Gyventojas'){
                if(service == 'guests'){
                  response =  await this.http.get(`/guestRegResident/${id}`)
                }
                else if(service == 'leisureRoom'){
                  response =  await this.http.get(`/leisureRegResident/${id}`)
                }
                else if(service == 'washing'){
                  response =  await this.http.get(`/washingRegResident/${id}`)
                }
                else if(service == 'machineFail'){
                  response =  await this.http.get(`/machineFailResident/${id}`)
                }

              }else if(role == 'Administratorius'){
                if(service == 'guests'){
                  response =  await this.http.get(`/guestRegAdmin`)
                }
                else if(service == 'leisureRoom'){
                  response =  await this.http.get(`/leisureRegAdmin`)
                }
                else if(service == 'washing'){
                  response =  await this.http.get(`/washingRegAdmin`)
                }
                else if(service == 'machineFail'){
                  response =  await this.http.get(`/machineFailAdmin`)
                }
              }
            }
              return response.data
            },

        
      api.acceptLeisureRoomRegistration = async function(id){
        const res = await this.authenticateUser()
        if (res == true) {
          let data = await this.getDataFromToken()
          await this.http.put(`/updateLeisure/${id}`,{status: "Patvirtinta", doorKeeper_id: data.id})
        }
        },

        api.rejectLeisureRoomRegistration = async function(id){
          const res = await this.authenticateUser()
          if (res == true) {
            let data = await this.getDataFromToken()
            await this.http.put(`/updateLeisure/${id}`,{status: "Atmesta", doorKeeper_id: data.id})
          }
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
                if (res == true) {
                await this.http.put(`/updateUserLeisure/${id}`,{status: "Atšaukta"})
                }
                },

                api.finishLeisureRegistration = async function(id){
                  const res = await this.authenticateUser()
                  if (res == true) {
                  await this.http.put(`/updateUserLeisure/${id}`,{status: "Užbaigta"})
                  }
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