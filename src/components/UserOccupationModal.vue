<template>
    <div>
        <div class="modal" :class="{ 'is-active': isActive }">
   <div class="modal-background"></div>
      <div class="modal-content">
        <header class="modal-card-head">
          <p  class="modal-card-title has-text-left">užimtumo keitimas</p>
        </header>
            <section class="modal-card-body">
                <div class="field w-fit mx-auto">
            <label class="label text-left">Naujas užimtumas</label>
            <div class="control">
              <div>
                <select v-model="userOccupation" :class="noOccupations ? 'border-boarder-red' : ''">
                  <option value="" disabled selected>Pasirinkite užimtumą</option>
                  <option value="Laisvas" :disabled="currectOccupation == 'Laisvas' ? true : false" selected>Laisvas</option>
                  <option value="Užimtas" :disabled="currectOccupation == 'Užimtas' ? true : false" selected>Užimtas</option>
                  <option value="Prisijiungęs" :disabled="currectOccupation == 'Prisijiungęs' ? true : false" selected>Prisijungęs</option>
                </select>
                <p v-show="noOccupations" class="help is-danger has-text-left">Nepasirinktas užimtumas</p>
              </div>
            </div>
          </div>
          <div></div>

            </section>
            <footer class="modal-card-foot flex flex-row justify-between ">
                <button @click="changeUserOccupation()" class="button is-success">Išsaugoti pokytį</button>
                <button @click.prevent="close()" class="button is-danger">Uždaryti</button>
            </footer>


        </div>
    </div>
    </div>
</template>
<script>
export default {
    name: 'UserOccupationModal',
    data() {
        return {
            userOccupation: "",
            noOccupations: false,
            currectOccupation: ""
        }
    },
    props: {
        isActive: { type: Boolean, default: false, required: true },
    },
    methods: {
        close() {
            this.$emit('close-action');
        },
        async changeUserOccupation(){
          if(!this.userOccupation){
            this.noOccupations = true
            return
          }
          else{
            this.noOccupations = false
        
          }
          try{
          let data = await this.$api.getDataFromToken()
           await this.$api.setWorkerOccupation(this.userOccupation,data.id)
           this.$emit("occupation-sucess")
          }
          catch(error){
            this.$emit("occupation-fail")
          }
        }
    },
   async created() {
        let data = await this.$api.getDataFromToken()
        try{
    let occupation = await this.$api.getUserOccupations(data.id)
    this.currectOccupation = occupation.occupation
        }
        catch(error){
          this.currectOccupation = ""
        }
    }
}
</script>