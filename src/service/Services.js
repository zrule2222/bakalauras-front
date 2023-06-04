import axios from 'axios';
import router from '../router/index.js'

export const api = {}


api.http = axios.create({ baseURL: "http://localhost:5000" })
// return a jwt token and the blocked status if the user logs in sucesfully
api.login = async function (loginData) {
  let response = null
    response = await this.http.post(`/login`, loginData)
  return response.data
},
//retuens user's id ant role by the given name
api.userByName = async function (username) {
   const res = await this.authenticateUser()
   let response = null
   if (res == true) {
     response = await this.http.post(`/userByName`, {"name": username})
   }
   return response.data
 }
 //returns user's information
 api.getUserInfo = async function (id) {
   const res = await this.authenticateUser()
   let response = null
   if (res == true) {
     response = await this.http.get(`/user/${id}`)
   }
   return response.data
 }
//returns information that is displayed on workers contact information page
 api.getContactInformation = async function () {
   const res = await this.authenticateUser()
   let response = null
   if (res == true) {
     response = await this.http.get(`/contacts`)
   }
   return response.data
 }
 //returns user's room number
 api.getUserRoom = async function (id, fk_room) {
   const res = await this.authenticateUser()
    let response = null
    if (res == true) {
      response = await this.http.post(`/userRoom/${id}`,{room: fk_room})
    }
    return response.data.number
  }
  //registers a guest for a stay at the dormitary
  api.registerGuest = async function (guestData) {
    const res = await this.authenticateUser()
     if (res == true) {
      await this.http.post(`/registerGuest`,guestData)
     }
   }
   //block a residents account
  api.blockUser = async function (id) {
   const res = await this.authenticateUser()
    if (res == true) {
    await this.http.put(`/block/${id}`)
    }
  }
//update user's email and blocked status
  api.updateUserInfo = async function (id,userinfo) {
    this.setEditStatus(sessionStorage.getItem('id'), {status: null})
   const res = await this.authenticateUser()
   if (res == true) {
     await this.http.put(`/updateUser/${id}`, userinfo)
   }
  }
//returns information about all washing machines
  api.getWashingMachineData = async function () {
    const res = await this.authenticateUser()
    let response = null
    if (res == true) {
      response = await this.http.get(`/machineData`)
    }
     return response.data
   }
//registers a new washing for a spesific washing machine
   api.registerWashing = async function (registrationData) {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.post(`/registerWashing`,registrationData)
    }
     return response.data
   }
//get users that currectly have an active washing machine failure registration
   api.getCurrentFailRegUsers = async function (id) {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.get(`/getFailRegUsers/${id}`)
    }
     return response.data
   }
//repair a broken washing mashine
   api.fixWashingMachine = async function (id) {
    const res = await this.authenticateUser()
    if (res == true) {
      await this.http.put(`/fixMachine/${id}`)
    }
   }
//update washing machine with the washing registration data
   api.updateWashingMachine = async function (id, updateData) {
    const res = await this.authenticateUser()
    if (res == true) {
      await this.http.put(`/updatemachine/${id}`,updateData)
    }
  
   }
//resident cancels his guest registration
  api.cancelGuestRegistration = async function (id) {
    const res = await this.authenticateUser()
    if (res == true) {
      await this.http.put(`/cancelGuest/${id}`)
    }
   }
//get guest registrations that are waiting confirmation
   api.getActiveGuestRegistrations = async function () {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.get(`/activeGuests`)
    }
     return response.data
   }
 //doorkeeper accepts user's guest registration  
   api.acceptGuestRegistration = async function (id) {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
      let data = await this.getDataFromToken()
       response = await this.http.put(`/updateGuest/${id}`, {	status : "Patvirtinta",doorKeeper_id: data.id})
    }
     return response.data
   }
//doorkeeper rejects user's guest registration
   api.rejectGuestRegistration = async function (id) {
    const res = await this.authenticateUser()
    if (res == true) {
      let data = await this.getDataFromToken()
      await this.http.put(`/updateGuest/${id}`, {	status : "Atmesta",doorKeeper_id: data.id})
    }
   }
//return guest registrations that are already confirmed
   api.getConfirmedGuestRegistrations = async function () {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.get(`/confirmedGuests`)
    }
     return response.data
   }
//return the doorkeeper's occupation
   api.getDoorkeeperOccupation = async function () {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.get(`/doorkeeperOccupation`)
    }
     return response.data
   }
//return the admin's occupation
   api.getAdminOccupation = async function () {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.get(`/adminOccupation`)
    }
     return response.data
   }
   api.checkActivationToken = async function (token) {
      let response = await this.http.post(`/checkActivationToken`,{token: token})
     return response.data
   }
//return rooms that are available to register a resident in
   api.getRoomsForRegistration = async function (roomType) {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.post(`/roomsForRegistration`,{room_gender: roomType})
    }
     return response.data
   }
//create a new user's account
   api.registerUser = async function (userData) {
    const res = await this.authenticateUser()
    let response = null
    if (res == true) {
      response = await this.http.post(`/register`,userData)
    }
    return response.data
   }

   api.activateAccount = async function (id) {
    console.log(id)
      await this.http.put(`/activationDone/${id}`)
   }
//update the amout of free spaces left in the room
   api.updateRoomSpace = async function (id) {
    const res = await this.authenticateUser()
    if (res == true) {
     await this.http.put(`/updateRoomSpace/${id}`)
    }
   }
//check if an account with the given username exists
   api.checkUsername = async function (username) {
    const res = await this.authenticateUser()
    if (res == true) {
      await this.http.post(`/checkUsername`, {username: username})
    }
   }
//return the name and surname of all the residents in the system
   api.getAllResidents = async function () {
    const res = await this.authenticateUser()
     let response = null
    if (res == true) {
       response = await this.http.get(`/residents`)
    }
     return response.data
   }
//update room status if the room has no more free space
   api.updateRoomstatus = async function () {
    const res = await this.authenticateUser()
    if (res == true) {
     await this.http.put(`/updateRoomstatus`)
    }
   }

 //doorkeeper ends user's guest registration  
   api.setGuestRegistrationAsDone = async function (id) {
    const res = await this.authenticateUser()
    if (res == true) {
      let data = await this.getDataFromToken()
      await this.http.put(`/updateGuest/${id}`, {	status : "Užbaigta",doorKeeper_id: data.id})
    }
   }
//save resident's leisure room registration
   api.leisureRoomRegistration = async function (id) {
    const res = await this.authenticateUser()
    if (res == true) {
      await this.http.post(`/registerLeisure/${id}`)
    }
   }
//update washing machine status when the washing registration is finished
   api.finishWashingMachine = async function (id) {
    const res = await this.authenticateUser()
    if (res == true) {
     await this.http.put(`/finishMachine/${id}`)
    }
   }
//resident register's that the washing machine is broken
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

//set the washing registrations status to 'Užbaigta'
   api.finishWashingRegistration = async function (id) {
    const res = await this.authenticateUser()
    if (res == true) {
       await this.http.put(`/finishWashing/${id}`)
    }
   }
   //check if user's jwt token is still valid
 api.authenticateUser = async function () {
   if (localStorage.getItem("token") != null){
    try{
      await this.http.get(`/authenticate`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      })
       let blocked = await this.getUserBlockedStatus()
   if(blocked == 0){
     return true
   }
   else{
    await axios.put(`http://localhost:5000/occupation/${sessionStorage.getItem('id')}`,{occupation: "Neprisijungęs"})
    localStorage.removeItem('token')
    sessionStorage.removeItem('id')
    sessionStorage.removeItem('role')
     localStorage.setItem('message',"Jūsų paskyra užblokuota")
     router.push({ path: '/' })
   }
   // return true
    }
    catch(error){
     // if(sessionStorage.getItem('role')  == 'Administratorius' || sessionStorage.getItem('role')  == 'Budėtojas'){
        this.setWorkerOccupation("Neprisijungęs",sessionStorage.getItem('id'))
        localStorage.removeItem('token')
        sessionStorage.removeItem('id')
        sessionStorage.removeItem('role')
      //}
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
//sets the occupation of the worker
  api.setWorkerOccupation = async function(occupation, id){
    if(occupation == 'Neprisijungęs'){
      sessionStorage.removeItem('id')
      sessionStorage.removeItem('role')
      localStorage.removeItem('token')
    }
   await this.http.put(`/occupation/${id}`,{occupation: occupation})
    },


//return all the information about all the services
  api.getServices = async function(){
    const res = await this.authenticateUser()
    let response = null
    if (res == true) {
    response =  await this.http.get(`/services`)
    }
      return response.data
    },
//return the occupation of the user with the given id
    api.getUserOccupation = async function(id){
      const res = await this.authenticateUser()
      let response = null
      if (res == true) {
      response =  await this.http.get(`/userOccupation/${id}`)
      }
        return response.data
      },
      api.getUserLoginId = async function(token){
        let response =  await this.http.get(`/authenticate`, {
          headers: {
            Authorization: 'Bearer ' + token
          }
        })
        return response.data.id

        },
//return all user guest registrations that are waiting confirmation
    api.getuserGuestRegistrations = async function(id){
      const res = await this.authenticateUser()
      let response = null
      if (res == true) {
      response =  await this.http.get(`/guestRegistrations/${id}`)
      }
        return response.data
      },
//return leiure room registrations that are waiting confirmation
      api.getLeisureRoomRegistrations = async function(){
        const res = await this.authenticateUser()
        let response = null
        if (res == true) {
        response =  await this.http.get(`/activeLeisure`)
        }
          return response.data
        },
//update the password of a user with the given id
        api.updateUserPassword = async function(id,password){
          this.setEditStatus(sessionStorage.getItem('id'), {status: null})
        await this.http.put(`/userPass/${id}`, {password: password})
          
          },
          //update the password of a user with the given id
        api.updateGuestArrival = async function(id,updateData){
          const res = await this.authenticateUser()
          if (res == true) {
           
        await this.http.put(`/updateGuestArrival/${id}`, updateData)
          }
          },
          //get user's information editing status
          api.setEditStatus = async function(id,updateData){
          await this.http.put(`/setEditStatus/${id}`, updateData)
            },
            //get user's information editing status
            api.getEditStatus = async function(id){
              const res = await this.authenticateUser()
              let response = null
              if (res == true) {
              response =  await this.http.get(`/getEditStatus/${id}`)
              }
                return response.data
              },
//send an email to a user with the login credentials
        api.sendEmail = async function(email,token, username){
          const res = await this.authenticateUser()
          if (res == true) {
            await this.http.post(`/sendMail`, {userMail: email,token: token, username:username})
          }
          },

//return the history of a requested service according to the user's role
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

       //doorkeeper accepts user's leisure room registration  
      api.acceptLeisureRoomRegistration = async function(id){
        const res = await this.authenticateUser()
        if (res == true) {
          let data = await this.getDataFromToken()
          await this.http.put(`/updateLeisure/${id}`,{status: "Patvirtinta", doorKeeper_id: data.id})
        }
        },
      //doorkeeper rejects user's leisure room registration
        api.rejectLeisureRoomRegistration = async function(id){
          const res = await this.authenticateUser()
          if (res == true) {
            let data = await this.getDataFromToken()
            await this.http.put(`/updateLeisure/${id}`,{status: "Atmesta", doorKeeper_id: data.id})
          }
          },
         //return the name and surname of the resident's that currently have a confirmed registration
          api.getLeisureRoomData = async function(){
            const res = await this.authenticateUser()
            let response = null
            if (res == true) {
            response =  await this.http.get(`/confirmedLeisure`)
            }
              return response.data
            },
            //return a user's leisure room registration that is waiting confirmation or is confirmed
            api.getuserLeisureRegistration = async function(id){
              const res = await this.authenticateUser()
              let response = null
              if (res == true) {
              response =  await this.http.get(`/userLeisure/${id}`)
              }
                return response.data
              },
              //resident cancels his leisure room registration
              api.cancelLeisureRegistration = async function(id){
                const res = await this.authenticateUser()
                if (res == true) {
                await this.http.put(`/updateUserLeisure/${id}`,{status: "Atšaukta"})
                }
                },
                //resident finishes his leisure room registration
                api.finishLeisureRegistration = async function(id){
                  const res = await this.authenticateUser()
                  if (res == true) {
                  await this.http.put(`/updateUserLeisure/${id}`,{status: "Užbaigta"})
                  }
                  },
                  //resident finishes his leisure room registration
                api.getUserBlockedStatus = async function(){
                  //const res = await this.authenticateUser()
                  let response = null
                  //if (res == true) {
                    try{
                 response = await this.http.get(`/getUserBlockedStatus/${sessionStorage.getItem('id')}`)
                    }
                    catch(error){
                    }
                 // }
                  return response.data[0].blocked
                  },
                  

//return the username, role and id of the user that is encoded on the jwt token
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
    //if(sessionStorage.getItem('role')  == 'Administratorius' || sessionStorage.getItem('role')  == 'Budėtojas'){
      if(sessionStorage.getItem('role') == "Gyventojas" || sessionStorage.getItem('role') == "Administratorius"){
      this.setEditStatus(sessionStorage.getItem('id'), {status: null})
      }
      this.setWorkerOccupation("Neprisijungęs",sessionStorage.getItem('id'))
      localStorage.removeItem('token')
      sessionStorage.removeItem('id')
      sessionStorage.removeItem('role')
    //}
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