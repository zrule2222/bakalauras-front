<template>
    <div>
        <div class="hero">
      <section class="hero is-primary is-small">
        <div class="hero-body is-justify-content-center">
          <p class="title">
            Gyventojų sąrašas
          </p>
        </div>
      </section>
    </div>
 <MenuBar  :menu-type="'main-back'"></MenuBar>
 <div v-if="users.length > 0" class="columns is-centered mt-5 ">
      <div class="column is-5">
      <label class="label has-text-left">Gyventojų filtravimas</label>
 <p class="control has-icons-left">
        <input v-model="searchedValue" @input="filterRecords" class="input" type="text" placeholder="Vardas pavardė">
        <span class="icon is-small is-left">
      <i class="fa fa-search"></i>
    </span>
 </p>
</div>
    </div>
 <!-- show the residents list only if there are registered resident accounts in the database -->
 <div v-if="(users.length > 0  && searchedValue.length == 0) || (users.length > 0 && filteredRecords.length > 0)">
      <table class="table is-bordered is-striped is-hoverable ml-auto mr-auto mt-7">
        <thead>
    <tr>
        <th class="has-text-centered">Numeris</th>
        <th class="has-text-centered">Gyventojas</th>
        <th class="has-text-centered">Detali informacija</th>
    </tr>
        </thead>
        <tbody v-if="filteredRecords.length == 0 && searchedValue.length == 0" v-for="(user, count) in users" :key="user.user_id">
            <tr>
                <th class="has-text-centered">{{count+1}}</th>
                <td>{{user.firstname}} {{ user.lastname }}</td>
                <td>
                    <router-link :to="{ name: 'spesificUser', params: { name:  user.username} }">
                    <button class="button is-primary is-small w-2/3"> Žiūrėti</button>
                </router-link>
                </td>
            </tr>
        </tbody>
        <tbody v-if="filteredRecords.length > 0" v-for="(user, count) in filteredRecords" :key="user.user_id">
            <tr>
                <th class="has-text-centered">{{count+1}}</th>
                <td>{{user.firstname}} {{ user.lastname }}</td>
                <td>
                    <router-link :to="{ name: 'spesificUser', params: { name:  user.username} }">
                    <button class="button is-primary is-small w-2/3"> Žiūrėti</button>
                </router-link>
                </td>
            </tr>
        </tbody>
      </table>
    </div>
    <div v-else-if="searchedValue.length > 0  && filteredRecords.length == 0" class="text-xl mt-5 has-text-info">
      Nepavyko rasti gyventojo pagal jūsų pateiktus kriterijus
    </div>
    <div v-else-if="users.length <= 0" class="text-xl mt-7 has-text-info">
      Bendrabutyje gyventojų nėra
    </div>

    </div>
</template>
<script>
import MenuBar from "../components/MenuBar.vue"
export default {
    name: 'UsersView',
    data() {
        return {
            users: [],
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
      //get all the residents names and lastnames that are registered in the database
       async getUserInfo() {
        try{
          this.users =  await this.$api.getAllResidents()
          console.log(this.users)
        }
        catch(error){
        this.users = []
        }
        },
        filterRecords(){
          let searchText = this.searchedValue.toLowerCase().trim()
     this.filteredRecords = this.users.filter(p => {
       return p.firstname.toLowerCase().includes(searchText) ||
        p.lastname.toLowerCase().includes(searchText) ||
        (p.firstname.toLowerCase() + ' ' +  p.lastname.toLowerCase()).includes(searchText)
      })
        }
    },
    created() {
        this.getUserInfo()
       
    }
}
</script>