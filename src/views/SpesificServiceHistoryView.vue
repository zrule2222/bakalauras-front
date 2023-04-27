<template>
    <div>
        <div class="hero">
      <section class="hero is-primary is-small">
        <div class="hero-body is-justify-content-center">
          <p v-if="$route.params.name == 'guests'" class="title">Svečių registracijos</p>
          <p v-else-if="$route.params.name == 'leisureRoom'" class="title">Laisvalaikio kambario registracijos</p>
          <p v-else-if="$route.params.name == 'washing'" class="title">Skalbimų registracijos</p>
          <p v-else-if="$route.params.name == 'machineFail'" class="title">Skalbyklių gedimų registracijos</p>
        </div>
      </section>
    </div>
    <MenuBar :menu-type="'main-back'"></MenuBar>
        
    <div v-if="Records.length > 0 && $route.params.name == 'machineFail'" class="">
      <table class="table is-bordered is-striped is-hoverable ml-auto mr-auto mt-7">
        <thead>
    <tr>
        <th class="has-text-centered">Numeris</th>
        <th  v-if="$route.params.role == 'Administratorius' " class="has-text-centered">Gyventojas</th>
        <th class="has-text-centered">Gedimas pateiktas</th>
        <th class="has-text-centered">Skalbimo mašina</th>
    </tr>
        </thead>
        <tbody v-for="(record, count) in Records" :key="record.leisure_id">
            <tr>
                <th class="has-text-centered">{{count+1}}</th>
                <td v-if="$route.params.role == 'Administratorius' ">{{record.firstname}} {{ record.lastname }}</td>
                <td>{{ record.created_at }}</td>
                <td>{{record.machine_number }}</td>
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

    <div v-if="Records.length > 0 && $route.params.name == 'guests'" class="">
      <table class="table is-bordered is-striped is-hoverable ml-auto mr-auto mt-7">
        <thead>
    <tr>
        <th class="has-text-centered">Numeris</th>
        <th v-if="$route.params.role == 'Administratorius'" class="has-text-centered">Gyventojas</th>
        <th class="has-text-centered"> Svečias</th>
        <th class="has-text-centered">Svečias atvyksta</th>
        <th class="has-text-centered">Statusas</th>
        <th class="has-text-centered">Registracija pateikta</th>
        <th class="has-text-centered">Registracija pateikė</th>
    </tr>
        </thead>
        <tbody v-for="(record, count) in Records" :key="record.leisure_id">
            <tr>
                <th class="has-text-centered">{{count+1}}</th>
                <td v-if="$route.params.role == 'Administratorius' ">{{record.firstname}} {{ record.lastname }}</td>
                <td>{{record.guest_firstname}} {{ record.guest_lastname }}</td>
                <td>{{record.guest_arrival }}</td>
                <td>{{record.statusas }}</td>
                <td>{{record.happened_at }}</td>
                <td>{{record.action_firstname }} {{record.action_lastname }}</td>
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

    <div v-if="Records.length > 0 && $route.params.name == 'leisureRoom'" class="">
      <table class="table is-bordered is-striped is-hoverable ml-auto mr-auto mt-7">
        <thead>
    <tr>
        <th class="has-text-centered">Numeris</th>
        <th v-if="$route.params.role == 'Administratorius'" class="has-text-centered">Gyventojas</th>

        <th class="has-text-centered">Statusas</th>
        <th class="has-text-centered">Registracija pateikta</th>
        <th class="has-text-centered">Registracija pateikė</th>
    </tr>
        </thead>
        <tbody v-for="(record, count) in Records" :key="record.leisure_id">
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

    <div v-if="Records.length > 0 && $route.params.name == 'washing'" class="">
      <table class="table is-bordered is-striped is-hoverable ml-auto mr-auto mt-7">
        <thead>
    <tr>
        <th class="has-text-centered">Numeris</th>
        <th v-if="$route.params.role == 'Administratorius'" class="has-text-centered">Gyventojas</th>
        <th class="has-text-centered">Statusas</th>
        <th class="has-text-centered">Skalbimo mašina</th>
        <th class="has-text-centered">Skalbimas pradėtas</th>
        <th class="has-text-centered">Skalbim trukmė</th>
        <th class="has-text-centered">Skalbimas baigėsi</th>
    </tr>
        </thead>
        <tbody v-for="(record, count) in Records" :key="record.leisure_id">
            <tr>
                <th class="has-text-centered">{{count+1}}</th>
                <td v-if="$route.params.role == 'Administratorius' ">{{record.firstname}} {{ record.lastname }}</td>
                <td>{{record.statusas }}</td>
                <td>{{record.machine_number }}</td>
                <td>{{record.started_at }}</td>
                <td>{{record.washing_time }}</td>
                <td v-if="record.ended_at != null">{{ record.ended_at }}</td>
                <td v-else>-</td>
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

    </div>
</template>
<script>
import MenuBar from "../components/MenuBar.vue"
export default {
    name: 'SpesificServiceHistoryView',
    data() {
        return {
            Records: []
        }
    },
    props: {
        // isActive: { type: Boolean, default: false, required: true },
        // Message: {type: String, required: true},
    },
    components:{
        MenuBar,
    },
    methods: {
        async getRecords() {

            try{
              if(this.$route.params.name == 'machineFail'){
         let recordsToProcess =  await this.$api.getServiceHistory(this.$route.params.id,this.$route.params.role,this.$route.params.name)

         for (let index = 0; index < recordsToProcess.length; index++) {
          
          let time = recordsToProcess[index].washing_time.slice(0,-3)
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
    else if(this.$route.params.name == 'guests'){
      let recordsToProcess =  await this.$api.getServiceHistory(this.$route.params.id,this.$route.params.role,this.$route.params.name)
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
    else if(this.$route.params.name == 'leisureRoom'){
      let recordsToProcess =  await this.$api.getServiceHistory(this.$route.params.id,this.$route.params.role,this.$route.params.name)

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
    else if(this.$route.params.name == 'washing'){
      let recordsToProcess =  await this.$api.getServiceHistory(this.$route.params.id,this.$route.params.role,this.$route.params.name)

for (let index = 0; index < recordsToProcess.length; index++) {
  let time = recordsToProcess[index].washing_time.slice(0,-3)
let year =   new Date(recordsToProcess[index].started_at).getUTCFullYear()
let month =   new Date(recordsToProcess[index].started_at).getUTCMonth() +1
let day =   new Date(recordsToProcess[index].started_at).getUTCDate()
let hour =   new Date(recordsToProcess[index].started_at).getHours()
let minute =  new Date(recordsToProcess[index].started_at).getMinutes()
let seconds = new Date(recordsToProcess[index].started_at).getSeconds()

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
        console.log(error)
    }
    }
},
created() {
        this.getRecords()
    }

}
</script>