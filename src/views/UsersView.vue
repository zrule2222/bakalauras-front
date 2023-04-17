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

 <div v-if="users.length > 0">
      <table class="table is-bordered is-striped is-hoverable ml-auto mr-auto mt-7">
        <thead>
    <tr>
        <th class="has-text-centered">Numeris</th>
        <th class="has-text-centered">Gyventojas</th>
        <th class="has-text-centered">Detali informacija</th>
    </tr>
        </thead>
        <tbody v-for="(user, count) in users" :key="user.user_id">
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
    <div v-else class="text-xl mt-7 has-text-info">
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
        }
    },
    props: {
        // isActive: { type: Boolean, default: false, required: true },
        // serviceInformation: {type: String, required: true},
        // serviceName: {type: String, required: true}
    },
    components:{
        MenuBar,
    },
    methods: {
       async getUserInfo() {
        try{
          this.users =  await this.$api.getAllResidents()
        }
        catch(error){
        this.users = []
        }
        }
    },
    created() {
        this.getUserInfo()
    }
}
</script>