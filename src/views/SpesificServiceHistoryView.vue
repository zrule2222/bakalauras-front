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
        
    <div v-if="Records.length > 0" class="">
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
    <div v-else-if="Records.length == 0 && $route.params.role == 'Gyventojas'" class="text-xl mt-5 has-text-info">
      Jūs neturite naudotų arba užsakytų paslaugų
    </div>
    <div v-else-if="Records.length == 0 && $route.params.role == 'Administratorius'" class="text-xl mt-5 has-text-info">
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
         let recordsToProcess =  await this.$api.getServiceHistory(this.$route.params.id,this.$route.params.role,this.$route.params.name)

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