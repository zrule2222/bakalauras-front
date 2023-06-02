<template>
    <div class="hero is-fullheight">
        <div class="hero">
      <section class="hero is-primary is-small">
        <div class="hero-body is-justify-content-center">
          <p class="title">
            Gyventojų ir darbuotojų registracija
          </p>
        </div>
      </section>
    </div>
 <MenuBar  :menu-type="'main-back'"></MenuBar>
 <div class="modal" :class="{ 'is-active': showLoading }">
   <div class="modal-background"></div>
   <div class="modal-content">
    <div class="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-bulma-green rounded-full" role="status" aria-label="loading">
  <span class="sr-only">Loading...</span>
</div>
<div class=" text-white">Paskyra yra kuriama</div>
    </div>
 </div>

 <div class="hero-body is-justify-content-center is-align-items-center">
        <div class="columns is-flex is-flex-direction-column box">
          <div class="column has-text-left">
            <label for="username">Prisijungimo vardas</label>
            <input class="input " type="text" :class="noUsername || badUsernameLenght ? 'is-danger' : ''"
              placeholder="Prisijungimo vardas" v-model="username">
            <p v-show="noUsername" class="help is-danger">Prisijungimo vardas tuščias</p>
            <p v-show="badUsernameLenght" class="help is-danger">Prisijungimo vardas negali viršyti 50 simbolių</p>
          </div>
          <div class="column has-text-left">
          <div class="field w-fit mr-auto">
            <label class=" text-left">Rolė</label>
            <div class="control">
              <div>
                <select v-model="role" :class="noRole ? 'border-boarder-red' : ''" @change="getRooms()">
                  <option value="" disabled selected>Pasirinkite Rolę</option>
                  <option value="Gyventojas"  selected>Gyventojas</option>
                  <option value="Budėtojas"  selected>Budėtojas</option>
                </select>
                <p v-show="noRole" class="help is-danger has-text-left">Nepasirinkta rolė</p>
              </div>
            </div>
          </div>
          </div>
          <div class="column has-text-left">
            <label for="Name">El. paštas</label>
            <input class="input " type="text" :class="noEmail || badEmail || badEmailLenght ? 'is-danger' : ''" placeholder="El. paštas"
              v-model="email">
              <p v-show="noEmail" class="help is-danger has-text-left">El. pašto laukelis tuščias</p>
            <p v-show="badEmail" class="help is-danger has-text-left">Netinkamas el. pašto formatas</p>
            <p v-show="badEmailLenght" class="help is-danger">El. paštas negali viršyti 100 simbolių</p>
          </div>
          <div class="column has-text-left">
            <label for="Name">Vardas</label>
            <input class="input " type="text" :class="noName || badNameLenght || nameHasNumbers ? 'is-danger' : ''" placeholder="Vardas"
              v-model="name">
            <p v-show="noName" class="help is-danger">Vardas tuščias</p>
            <p v-show="badNameLenght" class="help is-danger">Vardas negali viršyti 40 simbolių</p>
            <p v-show="nameHasNumbers" class="help is-danger has-text-left">Naudotojo vardas negali turėti skaičių</p>
          </div>
          <div class="column has-text-left">
            <label for="Name">Pavardė</label>
            <input class="input " type="text" :class="noLastName || BadLastNameLenght || lastnameHasNumbers ? 'is-danger' : ''" placeholder="Pavardė"
              v-model="lastName">
            <p v-show="noLastName" class="help is-danger">Pavardė tuščia</p>
            <p v-show="BadLastNameLenght" class="help is-danger">Pavardė negali viršyti 40 simbolių</p>
            <p v-show="lastnameHasNumbers" class="help is-danger has-text-left">Naudotojo pavardė negali turėti skaičių</p>
          </div>
          <div class="column has-text-left">
          <div class="field w-fit mr-auto">
            <label class=" text-left">Lytis</label>
            <div class="control">
              <div>
                <select v-model="gender" :class="noGender ? 'border-boarder-red' : ''" @change="getRooms()">
                  <option value="" disabled selected>Pasirinkite lytį</option>
                  <option value="Vyras"  selected>Vyras</option>
                  <option value="Moteris"  selected>Moteris</option>
                </select>
                <p v-show="noGender" class="help is-danger has-text-left">Nepasirinkta lytis</p>
              </div>
            </div>
          </div>
          </div>
          <div v-if="role == 'Gyventojas' && gender != ''" class="column has-text-left">
          <div class="field w-fit mr-auto">
            <label class=" text-left">Kambarys</label>
            <div class="control">
              <div v-if="!noFreeRooms">
                <select v-model="room" :class="noRoom ? 'border-boarder-red' : ''" >
                  <option  :value=0 disabled selected>Pasirinkite kambarį</option>
                  <option  v-for="rooms in roomsForRegistration" :key="rooms.room_id" :value="`${rooms.room_id}`">{{ rooms.number }}</option>
                </select>
                <p v-show="noRoom" class="help is-danger has-text-left">Nepasirinktas kambarys</p>
              </div>
              <!-- thisplay this select when there are no rooms for the resident -->
              <div v-if="noFreeRooms">
                <select :class="noRoom ? 'border-boarder-red' : ''" >
                  <option value="" disabled selected>Nėra laisvų kambarių</option>
                </select>
                <p v-show="noRoom" class="help is-danger has-text-left">Nepasirinktas kambarys</p>
              </div>
            </div>
          </div>
          </div>
          <div class="column">
            <button class="button is-primary is-fullwidth"  @click="registerUser()" :disabled="administratorOccupation == 'Laisvas' || administratorOccupation == 'Užimtas' ? false : true">Registruoti</button>
          </div>

          

          <SucessMessageModal v-if="showSucessModal" :isActive="showSucessModal" :Message="sucessMessage" @close-action="closeSucessMessageModal()"></SucessMessageModal>
          <SucessMessageModal v-if="showUsernameSucessModal" :isActive="showUsernameSucessModal" :Message="usernameExistsMessage" @close-action="closeUsernameMessageModal()"></SucessMessageModal>

        </div>
      </div>
      </div>

</template>

<script>
import MenuBar from "../components/MenuBar.vue"
import SucessMessageModal from"../components/SucessMessageModal.vue"
export default {
    name: 'RegistrationView',
    data() {
        return {
            username: "",
            noUsername: false,
            badUsernameLenght: false,
            role: "",
            noRole: false,
            email: "",
            noEmail: false,
            badEmail: false,
            badEmailLenght: false,
            name: "",
            noName: false,
            badNameLenght: false,
            nameHasNumbers: false,
            lastName: "",
            noLastName: false,
            BadLastNameLenght: false,
            lastnameHasNumbers: false,
            gender: "",
            noGender: false,
            room: 0,
            noRoom: false,
            roomsForRegistration: [],
            noFreeRooms: false,
            showSucessModal: false,
      sucessMessage: "",
      showUsernameSucessModal: false,
      usernameExistsMessage: "",
      randomPassword: "",
      showLoading: false,
      administratorOccupation: "",

        }
    },
    props: {

    },
    components:{
        MenuBar,
        SucessMessageModal,
    },
    methods: {
      //register a new user's account
       async registerUser() {
            if(!this.validateForm()){
                return
            }
            if(this.role == 'Budėtojas'){
                 this.room = null
            }
            this.generatePassword()
            var userData ={
                username: this.username,
	            //password: this.randomPassword,
	            role: this.role,
                blocked: 0,
	            email: this.email,
                firstname: this.name.charAt(0).toUpperCase() + this.name.slice(1),
	            lastname: this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1),
	            gender: this.gender,
                room: this.room,
	            occupation: "Neprisijungęs",
                
            }
            try{
              //show a loading screen while the user's account is being created
              this.showLoading = true
              //check if a user with the given username already exists
               if(await this.checkUsername()){
             let token = await this.$api.registerUser(userData)
             console.log(token)
                await this.$api.sendEmail(userData.email,token, userData.username)
         
            //update room space if creating a resident's account
            if(this.role == 'Gyventojas'){
            await this.$api.updateRoomSpace(this.room)
            await this.$api.updateRoomstatus()
            }
            this.sucessMessage = "Naudotojas užregistruotas sėkmingai",
            this.showSucessMessageModal()
        }
        else{
          this.showLoading = false
            this.usernameExistsMessage = "Naudotojas su nurodytu prisijungimo vardu jau egzistuoja",
            this.showUsernameSucessModal = true
        }

            }
            catch(error){
              console.log(error)
                this.sucessMessage = "Naudotojo registracija nebuvo sėkminga",
                this.showSucessMessageModal()
            }
            
        },
        closeSucessMessageModal(){
            this.showSucessModal = false
            this.$router.go(0);
        },
        closeUsernameMessageModal(){
            this.showUsernameSucessModal = false
        },
        //check if an account with the given username already exists
      async  checkUsername(){
        try{
            await this.$api.checkUsername(this.username)
            return true
        }
        catch(error){
        return false
        }
        },
        showSucessMessageModal(){
          this.showLoading = false
            this.showSucessModal = true
        },
        //check if the data imputed into the form is correct
        validateForm(){
          this.noUsername = false
          this.badUsernameLenght = false
          this.noRole = false
          this.noEmail = false
          this.badEmail = false
          this.badEmailLenght = false
          this.noName = false
          this.noLastName = false
          this.badNameLenght = false
          this.nameHasNumbers = false
          this.BadLastNameLenght = false
          this.lastnameHasNumbers = false
          this.noGender = false
          this.noRoom = false
          const numbers = /\d/
            if (!this.username) {
        this.noUsername = true
        return false
      }
      else {
        this.noUsername = false
      }
      if(this.username.length > 50){
        this.badUsernameLenght = true
        return false
      }
      else{
        this.badUsernameLenght = false
      }
      if (!this.role) {
        this.noRole = true
        return false
      }
      else {
        this.noRole = false
      }
      if (!this.email) {
        this.noEmail = true
        return false
      }
      else {
        this.noEmail = false
      }
      var emailCheck = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if(this.email.match(emailCheck)){
        this.badEmail = false
      }
      else{
        this.badEmail = true
        return false
      }
      if(this.email.length > 100){
        this.badEmailLenght = true
        return false
      }
      else{
        this.badEmailLenght = false
      }
      if (!this.name) {
        this.noName = true
        return false
      }
      else {
        this.noName = false
      }
      if(this.name.length > 40){
        this.badNameLenght = true
        return false
      }
      else{
        this.badNameLenght = false
      }
      if(numbers.test(this.name)){
        this.nameHasNumbers = true
        return false
      }
      else{
        this.nameHasNumbers = false
      }
      if (!this.lastName) {
        this.noLastName = true
        return false
      }
      else {
        this.noLastName = false
      }
      if(this.lastName.length > 40){
        this.BadLastNameLenght = true
        return false
      }
      else{
        this.BadLastNameLenght = false
      }
      if(numbers.test(this.lastName)){
        this.lastnameHasNumbers = true
        return false
      }
      else{
        this.lastnameHasNumbers = false
      }
      if (!this.gender) {
        this.noGender = true
        return false
      }
      else {
        this.noGender = false
      }
      if(this.role == 'Gyventojas'){
      if (!this.room) {
        this.noRoom = true
        return false
      }
      else {
        this.noRoom = false
      }
    }
      return true
        },
        //get the available rooms for the registration
       async getRooms(){
        this.noRoom = false
        let roomType
        if(this.gender && this.role == 'Gyventojas'){
            let roomType = null
            if(this.gender == 'Vyras')
            {
                roomType = 'Vyrams'
            }
            else if(this.gender == 'Moteris'){
                roomType = 'Moterims'
            }
            try{
            this.roomsForRegistration = await this.$api.getRoomsForRegistration(roomType)
            this.noFreeRooms = false
            }
            catch(error){
                this.noFreeRooms = true
            }
        }
    },
    //generate a user's password
    generatePassword(){
      const length = Math.floor(Math.random() * (10 - 5 + 1)) + 5
      const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@#$'
      const indexes = crypto.getRandomValues(new Uint32Array(length));

  let secret = '';

  for (const index of indexes) {
    secret += charset[index % charset.length];
  }
  this.randomPassword = secret
        },
        async getAdminOccupation(){
      try{
        let data = await this.$api.getAdminOccupation()
        this.administratorOccupation = data.occupation
      }
      catch(error){
        this.administratorOccupation = "Prisijungęs"
      }
    }
    
    },
    created() {
      this.getAdminOccupation()
    }
}
</script>