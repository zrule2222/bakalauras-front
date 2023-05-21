<template>
    <div>
        <div class="hero">
      <section class="hero is-primary is-small">
        <div class="hero-body is-justify-content-center">
          <!-- display the service name -->
          <p v-if="$route.params.name == 'guests'" class="title">Svečių registracija</p>
          <p v-else-if="$route.params.name == 'leisureRoom'" class="title">Laisvalaikio kambario registracija</p>
          <p v-else-if="$route.params.name == 'washing'" class="title">Skalbimų registracija</p>
          <p v-else-if="$route.params.name == 'machineFail'" class="title">Skalbyklių gedimų registracija</p>
        </div>
      </section>
    </div>
    <MenuBar :menu-type="'main-back'"></MenuBar>


    <div v-if="Records.length > 0" class="columns is-centered mt-5 ">
      <div class="column is-5">
      <label class="label has-text-left">Įrašų filtravimas</label>
 <p class="control has-icons-left">
        <input v-model="searchedValue" @input="filterRecords" class="input" type="text" placeholder="Filtravimas">
        <span class="icon is-small is-left">
      <i class="fa fa-search"></i>
    </span>
 </p>
</div>
    </div>
        <!-- display the washine machine fail registration's history based on if there are registrations for this service and if the path of this page is pointing to this service -->
    <div v-if="(Records.length > 0 && $route.params.name == 'machineFail' && searchedValue.length == 0) || ($route.params.name == 'machineFail' && Records.length > 0 && filteredRecords.length > 0)" class="">
      <table class="table is-bordered is-striped is-hoverable ml-auto mr-auto mt-7">
        <thead>
    <tr>
        <th class="has-text-centered">Numeris</th>
        <th  v-if="$route.params.role == 'Administratorius' " class="has-text-centered">Gyventojas</th>
        <th class="has-text-centered">Gedimas pateiktas</th>
        <th class="has-text-centered">Skalbimo mašina</th>
    </tr>
        </thead>
        <tbody v-if="filteredRecords.length == 0 && searchedValue.length == 0" v-for="(record, count) in Records" :key="record.leisure_id">
            <tr>
                <th class="has-text-centered">{{count+1}}</th>
                <!-- show difrent data depending on the user's role -->
                <td v-if="$route.params.role == 'Administratorius' ">{{record.firstname}} {{ record.lastname }}</td>
                <td>{{ record.created_at }}</td>
                <td>Nr. {{record.machine_number }}</td>
            </tr>
        </tbody>
        <!-- show filtered records -->
        <tbody v-if="filteredRecords.length > 0" v-for="(record, count) in filteredRecords" :key="record.leisure_id">
          <tr>
                <th class="has-text-centered">{{count+1}}</th>
                <td v-if="$route.params.role == 'Administratorius' ">{{record.firstname}} {{ record.lastname }}</td>
                <td>{{ record.created_at }}</td>
                <td>Nr. {{record.machine_number }}</td>
            </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="Records.length == 0 && $route.params.role == 'Gyventojas' && $route.params.name == 'machineFail'" class="text-xl mt-5 has-text-info">
      Jūs neturite naudotų arba užsakytų paslaugų
    </div>
    <div v-else-if="Records.length == 0 && $route.params.role == 'Administratorius' && $route.params.name == 'machineFail'" class="text-xl mt-5 has-text-info">
      Sistemoje ši paslauga nėra naudota arba užsakyta
    </div>
    <div v-else-if="searchedValue.length >= 0 &&  $route.params.name == 'machineFail' && filteredRecords.length == 0" class="text-xl mt-5 has-text-info">
      Nepavyko rasti įrašų pagal jūsų pateiktus kriterijus
    </div>
        <!-- display the guest registration history based on if there are registrations for this service and if the path of this page is pointing to this service -->
    <div v-if="(Records.length > 0 && $route.params.name == 'guests' && searchedValue.length == 0) || ($route.params.name == 'guests' && Records.length > 0 && filteredRecords.length > 0)" class="">
      <table class="table is-bordered is-striped is-hoverable ml-auto mr-auto mt-7">
        <thead>
    <tr>
        <th class="has-text-centered">Numeris</th>
        <th v-if="$route.params.role == 'Administratorius'" class="has-text-centered">Gyventojas</th>
        <th class="has-text-centered"> Svečias</th>
        <th class="has-text-centered">Svečias atvyksta</th>
        <th class="has-text-centered">Statusas</th>
        <th class="has-text-centered">Registracija pateikta</th>
        <th class="has-text-centered">Registraciją pateikė</th>
    </tr>
        </thead>
        
        <tbody v-if="filteredRecords.length == 0 && searchedValue.length == 0" v-for="(record, count) in Records" :key="record.leisure_id">
            <tr>
                <th class="has-text-centered">{{count+1}}</th>
                <!-- show difrent data depending on the user's role -->
                <td v-if="$route.params.role == 'Administratorius' ">{{record.firstname}} {{ record.lastname }}</td>
                <td>{{record.guest_firstname}} {{ record.guest_lastname }}</td>
                <td>{{record.guest_arrival }}</td>
                <td>{{record.statusas }}</td>
                <td>{{record.happened_at }}</td>
                <td>{{record.action_firstname }} {{record.action_lastname }}</td>
            </tr>
        </tbody>
         <!-- show filtered records -->
        <tbody  v-else-if="filteredRecords.length > 0"  v-for="(recordFiltered, count) in filteredRecords" :key="recordFiltered.leisure_id">
        <tr>
                <th class="has-text-centered">{{count+1}}</th>
                <td v-if="$route.params.role == 'Administratorius' ">{{recordFiltered.firstname}} {{ recordFiltered.lastname }}</td>
                <td>{{recordFiltered.guest_firstname}} {{ recordFiltered.guest_lastname }}</td>
                <td>{{recordFiltered.guest_arrival }}</td>
                <td>{{recordFiltered.statusas }}</td>
                <td>{{recordFiltered.happened_at }}</td>
                <td>{{recordFiltered.action_firstname }} {{recordFiltered.action_lastname }}</td>
            </tr>
          </tbody>

      </table>
    </div>
    <div v-else-if="Records.length == 0 && $route.params.role == 'Gyventojas' && $route.params.name == 'guests'" class="text-xl mt-5 has-text-info">
      Jūs neturite naudotų arba užsakytų paslaugų
    </div>
    <div v-else-if="Records.length == 0 && $route.params.role == 'Administratorius' && $route.params.name == 'guests'" class="text-xl mt-5 has-text-info">
      Sistemoje ši paslauga nėra naudota arba užsakyta
    </div>
    <div v-else-if="searchedValue.length >= 0 &&  $route.params.name == 'guests' && filteredRecords.length == 0" class="text-xl mt-5 has-text-info">
      Nepavyko rasti įrašų pagal jūsų pateiktus kriterijus
    </div>
 <!-- display the leisure room registration history based on if there are registrations for this service and if the path of this page is pointing to this service -->
    <div v-if="(Records.length > 0 && $route.params.name == 'leisureRoom' && searchedValue.length == 0) || ($route.params.name == 'leisureRoom' && Records.length > 0 && filteredRecords.length > 0)" class="">
      <table class="table is-bordered is-striped is-hoverable ml-auto mr-auto mt-7">
        <thead>
    <tr>
        <th class="has-text-centered">Numeris</th>
        <th v-if="$route.params.role == 'Administratorius'" class="has-text-centered">Gyventojas</th>

        <th class="has-text-centered">Statusas</th>
        <th class="has-text-centered">Registracija pateikta</th>
        <th class="has-text-centered">Registraciją pateikė</th>
    </tr>
        </thead>
        
        <tbody v-if="filteredRecords.length == 0 && searchedValue.length == 0" v-for="(record, count) in Records" :key="record.leisure_id">
            <tr>
                <th class="has-text-centered">{{count+1}}</th>
                 <!-- show difrent data depending on the user's role -->
                <td v-if="$route.params.role == 'Administratorius' ">{{record.firstname}} {{ record.lastname }}</td>
                <td>{{record.statusas }}</td>
                <td>{{record.happened_at }}</td>
                <td>{{record.action_firstname }} {{record.action_lastname }}</td>
            </tr>
        </tbody>
         <!-- show filtered records -->
        <tbody v-if="filteredRecords.length > 0" v-for="(record, count) in filteredRecords" :key="record.leisure_id">
        <tr>
                <th class="has-text-centered">{{count+1}}</th>
                <td v-if="$route.params.role == 'Administratorius' ">{{record.firstname}} {{ record.lastname }}</td>
                <td>{{record.statusas }}</td>
                <td>{{record.happened_at }}</td>
                <td>{{record.action_firstname }} {{record.action_lastname }}</td>
            </tr>
          </tbody>
      </table>
    </div>
    <div v-else-if="Records.length == 0 && $route.params.role == 'Gyventojas' && $route.params.name == 'leisureRoom'" class="text-xl mt-5 has-text-info">
      Jūs neturite naudotų arba užsakytų paslaugų
    </div>
    <div v-else-if="Records.length == 0 && $route.params.role == 'Administratorius' && $route.params.name == 'leisureRoom'" class="text-xl mt-5 has-text-info">
      Sistemoje ši paslauga nėra naudota arba užsakyta
    </div>
    <div v-else-if="searchedValue.length >= 0 &&  $route.params.name == 'leisureRoom' && filteredRecords.length == 0" class="text-xl mt-5 has-text-info">
      Nepavyko rasti įrašų pagal jūsų pateiktus kriterijus
    </div>
<!-- display the washing registration history based on if there are registrations for this service and if the path of this page is pointing to this service -->
    <div v-if="(Records.length > 0 && $route.params.name == 'washing' && searchedValue.length == 0) || ($route.params.name == 'washing' && Records.length > 0 && filteredRecords.length > 0)" class="">
      <table class="table is-bordered is-striped is-hoverable ml-auto mr-auto mt-7">
        <thead>
    <tr>
        <th class="has-text-centered">Numeris</th>
        <th v-if="$route.params.role == 'Administratorius'" class="has-text-centered">Gyventojas</th>
        <th class="has-text-centered">Statusas</th>
        <th class="has-text-centered">Skalbimo mašina</th>
        <th class="has-text-centered">Skalbimas pradėtas</th>
        <th class="has-text-centered">Skalbimo trukmė</th>
        <th class="has-text-centered">Skalbimas baigėsi</th>
    </tr>
        </thead>
        <tbody v-if="filteredRecords.length == 0 && searchedValue.length == 0" v-for="(record, count) in Records" :key="record.leisure_id">
            <tr>
                <th class="has-text-centered">{{count+1}}</th>
                <!-- show difrent data depending on the user's role -->
                <td v-if="$route.params.role == 'Administratorius' ">{{record.firstname}} {{ record.lastname }}</td>
                <td>{{record.statusas }}</td>
                <td>Nr. {{record.machine_number }}</td>
                <td>{{record.started_at }}</td>
                <td>{{record.washing_time }}</td>
                <td v-if="record.ended_at != null">{{ record.ended_at }}</td>
                <td v-else>N/A</td>
            </tr>
        </tbody>
         <!-- show filtered records -->
        <tbody v-if="filteredRecords.length > 0" v-for="(record, count) in filteredRecords" :key="record.leisure_id">
          <tr>
                <th class="has-text-centered">{{count+1}}</th>
                <td v-if="$route.params.role == 'Administratorius' ">{{record.firstname}} {{ record.lastname }}</td>
                <td>{{record.statusas }}</td>
                <td>Nr. {{record.machine_number }}</td>
                <td>{{record.started_at }}</td>
                <td>{{record.washing_time }}</td>
                <td v-if="record.ended_at != null">{{ record.ended_at }}</td>
                <td v-else>N/A</td>
            </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="Records.length == 0 && $route.params.role == 'Gyventojas' && $route.params.name == 'washing'" class="text-xl mt-5 has-text-info">
      Jūs neturite naudotų arba užsakytų paslaugų
    </div>
    <div v-else-if="Records.length == 0 && $route.params.role == 'Administratorius' && $route.params.name == 'washing'" class="text-xl mt-5 has-text-info">
      Sistemoje ši paslauga nėra naudota arba užsakyta
    </div>
    <div v-else-if="searchedValue.length >= 0 &&  $route.params.name == 'washing' && filteredRecords.length == 0" class="text-xl mt-5 has-text-info">
      Nepavyko rasti įrašų pagal jūsų pateiktus kriterijus
    </div>

    </div>
</template>
<script>
import MenuBar from "../components/MenuBar.vue"
export default {
    name: 'SpesificServiceHistoryView',
    data() {
        return {
            Records: [],
            filteredRecords: [],
            searchedValue: '',
        }
    },
    props: {
    },
    components:{
        MenuBar,
    },
    methods: {
        async getRecords() {
            //return washing machine failure registration history
            try{
              if(this.$route.params.name == 'machineFail'){
         let recordsToProcess =   await this.$api.getServiceHistory(this.$route.params.id,this.$route.params.role,this.$route.params.name)
    //format the washing registration creation time
         for (let index = 0; index < recordsToProcess.length; index++) {
          

     let year =   new Date(recordsToProcess[index].created_at).getUTCFullYear()
    let month =   new Date(recordsToProcess[index].created_at).getUTCMonth() +1
     let day =   new Date(recordsToProcess[index].created_at).getUTCDate()
     let hour =   new Date(recordsToProcess[index].created_at).getHours()
      let minute =  new Date(recordsToProcess[index].created_at).getMinutes()
      let seconds = new Date(recordsToProcess[index].created_at).getSeconds()

      if(month < 10){
        month = '0' + month
      }
      if(day < 10){
        day = '0' + day
      }
      if(minute < 10){
        minute = '0' + minute
      }
      if(hour < 10){
        hour = '0' + hour
      }
      if(seconds < 10){
        seconds = '0' + seconds
      }
      let finalDate = `${year}-${month}-${day} ${hour}:${minute}:${seconds}`
      recordsToProcess[index].created_at = finalDate
        }
        this.Records = recordsToProcess
    }
     //return guest registration history
    else if(this.$route.params.name == 'guests'){
      let recordsToProcess = await this.$api.getServiceHistory(this.$route.params.id,this.$route.params.role,this.$route.params.name)
      //format the guest arrival time
      for (let index = 0; index < recordsToProcess.length; index++) {
     let year =   new Date(recordsToProcess[index].guest_arrival).getUTCFullYear()
    let month =   new Date(recordsToProcess[index].guest_arrival).getUTCMonth() +1
     let day =   new Date(recordsToProcess[index].guest_arrival).getUTCDate()
     let hour =   new Date(recordsToProcess[index].guest_arrival).getHours()
      let minute =  new Date(recordsToProcess[index].guest_arrival).getMinutes()
      let seconds = new Date(recordsToProcess[index].guest_arrival).getSeconds()

      let yearHappened =   new Date(recordsToProcess[index].happened_at).getUTCFullYear()
    let monthHappened =   new Date(recordsToProcess[index].happened_at).getUTCMonth() +1
     let dayHappened =   new Date(recordsToProcess[index].happened_at).getUTCDate()
     let hourHappened =   new Date(recordsToProcess[index].happened_at).getHours()
      let minuteHappened =  new Date(recordsToProcess[index].happened_at).getMinutes()
      let secondsHappened = new Date(recordsToProcess[index].happened_at).getSeconds()

      if(month < 10){
        month = '0' + month
      }
      if(day < 10){
        day = '0' + day
      }
      if(minute < 10){
        minute = '0' + minute
      }
      if(hour < 10){
        hour = '0' + hour
      }
      if(seconds < 10){
        seconds = '0' + seconds
      }

      if(monthHappened < 10){
        monthHappened = '0' + monthHappened
      }
      if(dayHappened < 10){
        dayHappened = '0' + dayHappened
      }
      if(minuteHappened < 10){
        minuteHappened = '0' + minuteHappened
      }
      if(hourHappened < 10){
        hourHappened = '0' + hourHappened
      }
      if(secondsHappened < 10){
        secondsHappened = '0' + secondsHappened
      }
      let finalDate = `${year}-${month}-${day} ${hour}:${minute}:${seconds}`
      let finalDateHappened = `${yearHappened}-${monthHappened}-${dayHappened} ${hourHappened}:${minuteHappened}:${secondsHappened}`
      recordsToProcess[index].guest_arrival = finalDate
      recordsToProcess[index].happened_at = finalDateHappened
        }
        this.Records = recordsToProcess
    }
    //return leisure room registration history
    else if(this.$route.params.name == 'leisureRoom'){
      let recordsToProcess = await this.$api.getServiceHistory(this.$route.params.id,this.$route.params.role,this.$route.params.name)
//format leisure room registration time
for (let index = 0; index < recordsToProcess.length; index++) {
let year =   new Date(recordsToProcess[index].happened_at).getUTCFullYear()
let month =   new Date(recordsToProcess[index].happened_at).getUTCMonth() +1
let day =   new Date(recordsToProcess[index].happened_at).getUTCDate()
let hour =   new Date(recordsToProcess[index].happened_at).getHours()
let minute =  new Date(recordsToProcess[index].happened_at).getMinutes()
let seconds = new Date(recordsToProcess[index].happened_at).getSeconds()

if(month < 10){
month = '0' + month
}
if(day < 10){
day = '0' + day
}
if(minute < 10){
minute = '0' + minute
}
if(hour < 10){
hour = '0' + hour
}
if(seconds < 10){
seconds = '0' + seconds
}


let finalDate = `${year}-${month}-${day} ${hour}:${minute}:${seconds}`
recordsToProcess[index].happened_at = finalDate
}
this.Records = recordsToProcess
    }
    //get washing registration history
    else if(this.$route.params.name == 'washing'){
      let recordsToProcess =   await this.$api.getServiceHistory(this.$route.params.id,this.$route.params.role,this.$route.params.name)
//format registration time
for (let index = 0; index < recordsToProcess.length; index++) {
  let time = recordsToProcess[index].washing_time.slice(0,-3)
let year =   new Date(recordsToProcess[index].started_at).getUTCFullYear()
let month =   new Date(recordsToProcess[index].started_at).getUTCMonth() +1
let day =   new Date(recordsToProcess[index].started_at).getUTCDate()
let hour =   new Date(recordsToProcess[index].started_at).getHours()
let minute =  new Date(recordsToProcess[index].started_at).getMinutes()
let seconds = new Date(recordsToProcess[index].started_at).getSeconds()

if(recordsToProcess[index].ended_at != null){

let yearEnding =   new Date(recordsToProcess[index].ended_at).getUTCFullYear()
    let monthEnding =   new Date(recordsToProcess[index].ended_at).getUTCMonth() +1
     let dayEnding =   new Date(recordsToProcess[index].ended_at).getUTCDate()
     let hourEnding =   new Date(recordsToProcess[index].ended_at).getHours()
      let minuteEnding =  new Date(recordsToProcess[index].ended_at).getMinutes()
      let secondsEnding = new Date(recordsToProcess[index].ended_at).getSeconds()

      if(monthEnding < 10){
  monthEnding = '0' + monthEnding
      }
      if(dayEnding < 10){
        dayEnding = '0' + dayEnding
      }
      if(minuteEnding < 10){
        minuteEnding = '0' + minuteEnding
      }
      if(hourEnding < 10){
        hourEnding = '0' + hourEnding
      }
      if(secondsEnding < 10){
        secondsEnding = '0' + secondsEnding
}

let finalDateEnd = `${yearEnding}-${monthEnding}-${dayEnding} ${hourEnding}:${minuteEnding}:${secondsEnding}`
recordsToProcess[index].ended_at = finalDateEnd
}

if(month < 10){
month = '0' + month
}
if(day < 10){
day = '0' + day
}
if(minute < 10){
minute = '0' + minute
}
if(hour < 10){
hour = '0' + hour
}
if(seconds < 10){
seconds = '0' + seconds
}

let finalDate = `${year}-${month}-${day} ${hour}:${minute}:${seconds}`
recordsToProcess[index].started_at = finalDate
recordsToProcess[index].washing_time = time
}
this.Records = recordsToProcess
    }
    }
    catch(error){
    }
    },
    //filter records based on the provided input
    filterRecords(){
      if(this.$route.params.name == 'guests'){

      let searchText = this.searchedValue.toLowerCase()
     this.filteredRecords = this.Records.filter(p => {
      if(this.$route.params.role == 'Administratorius'){
       return p.firstname.toLowerCase().includes(searchText) ||
        p.lastname.toLowerCase().includes(searchText) ||
        (p.firstname.toLowerCase() + ' ' +  p.lastname.toLowerCase()).includes(searchText) ||
         p.guest_firstname.toLowerCase().includes(searchText) ||
         p.guest_lastname.toLowerCase().includes(searchText) ||
         (p.guest_firstname.toLowerCase() + ' ' +  p.guest_lastname.toLowerCase()).includes(searchText) ||
         p.guest_arrival.toLowerCase().includes(searchText) ||
         p.statusas.toLowerCase().includes(searchText) ||
         p.happened_at.toLowerCase().includes(searchText) || 
         p.action_firstname.toLowerCase().includes(searchText) ||
         p.action_lastname.toLowerCase().includes(searchText)  ||
         (p.action_firstname.toLowerCase() + ' ' +  p.action_lastname.toLowerCase()).includes(searchText) 
      }
      else if(this.$route.params.role == 'Gyventojas'){
        return p.guest_firstname.toLowerCase().includes(searchText) ||
         p.guest_lastname.toLowerCase().includes(searchText) ||
         (p.guest_firstname.toLowerCase() + ' ' +  p.guest_lastname.toLowerCase()).includes(searchText) ||
         p.guest_arrival.toLowerCase().includes(searchText) ||
         p.statusas.toLowerCase().includes(searchText) ||
         p.happened_at.toLowerCase().includes(searchText) || 
         p.action_firstname.toLowerCase().includes(searchText) ||
         p.action_lastname.toLowerCase().includes(searchText)  ||
         (p.action_firstname.toLowerCase() + ' ' +  p.action_lastname.toLowerCase()).includes(searchText) 
      }

      })
    }
    else if(this.$route.params.name == 'leisureRoom'){
      let searchText = this.searchedValue.toLowerCase()
     this.filteredRecords = this.Records.filter(p => {
      if(this.$route.params.role == 'Administratorius'){
       return p.firstname.toLowerCase().includes(searchText) ||
        p.lastname.toLowerCase().includes(searchText) ||
        (p.firstname.toLowerCase() + ' ' +  p.lastname.toLowerCase()).includes(searchText) ||
         p.statusas.toLowerCase().includes(searchText) ||
         p.happened_at.toLowerCase().includes(searchText) ||
         p.action_firstname.toLowerCase().includes(searchText) ||
         p.action_lastname.toLowerCase().includes(searchText)  ||
         (p.action_firstname.toLowerCase() + ' ' +  p.action_lastname.toLowerCase()).includes(searchText)
      }
      else if(this.$route.params.role == 'Gyventojas'){
        return  p.statusas.toLowerCase().includes(searchText) ||
         p.happened_at.toLowerCase().includes(searchText) ||
         p.action_firstname.toLowerCase().includes(searchText) ||
         p.action_lastname.toLowerCase().includes(searchText)  ||
         (p.action_firstname.toLowerCase() + ' ' +  p.action_lastname.toLowerCase()).includes(searchText)
      }
      })
    }
    else if(this.$route.params.name == 'washing'){
      let searchText = this.searchedValue.toLowerCase()
     this.filteredRecords = this.Records.filter(p => {
      if( p.ended_at == null){
      p.ended_at = 'N/A'
      }
      let number =  `Nr. ${p.machine_number}`
      if(this.$route.params.role == 'Administratorius'){
       return p.firstname.toLowerCase().includes(searchText) ||
        p.lastname.toLowerCase().includes(searchText) ||
        (p.firstname.toLowerCase() + ' ' +  p.lastname.toLowerCase()).includes(searchText) ||
         p.statusas.toLowerCase().includes(searchText) ||
         number.toLowerCase().includes(searchText) ||
         p.started_at.toLowerCase().includes(searchText) ||
         p.washing_time.toLowerCase().includes(searchText)  ||
         p.ended_at.toLowerCase().includes(searchText)
      }
      else if(this.$route.params.role == 'Gyventojas'){
        return p.statusas.toLowerCase().includes(searchText) ||
        number.toLowerCase().includes(searchText) ||
         p.started_at.toLowerCase().includes(searchText) ||
         p.washing_time.toLowerCase().includes(searchText)  ||
         p.ended_at.toLowerCase().includes(searchText)
      }
      })
    }
    else if(this.$route.params.name == 'machineFail'){
      let searchText = this.searchedValue.toLowerCase()
      this.filteredRecords = this.Records.filter(p => {
        let number =  `Nr. ${p.machine_number}`
      if(this.$route.params.role == 'Administratorius'){
       return p.firstname.toLowerCase().includes(searchText) ||
        p.lastname.toLowerCase().includes(searchText) ||
        (p.firstname.toLowerCase() + ' ' +  p.lastname.toLowerCase()).includes(searchText) ||
         p.created_at.toLowerCase().includes(searchText) ||
         number.toLowerCase().includes(searchText)

      }
      else if(this.$route.params.role == 'Gyventojas'){
        return p.created_at.toLowerCase().includes(searchText) ||
        number.toLowerCase().includes(searchText)

      }
    })
    }

      
    }
},
created() {
        this.getRecords()
    }

}
</script>