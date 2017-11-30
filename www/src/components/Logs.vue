<template>
  <div>
    <button @click="createLog">Add Log</button>
    <ul>
      <li v-for="log in logs">
        <router-link :to="'/logs/'+log._id">{{log.title}}</router-link>
        <p class="action" @click="removeLog(log)">x</p>
      </li>
    </ul>

    <div class="ship-logs">
      <button v-if="user.rank == 'Captain'" @click="getLogsByShipId">Get MyShip Logs</button>
      <ul>
          <li v-for="shipLog in shipLogs">
            <router-link :to="'/logs/'+shipLog._id">{{shipLog.title}}</router-link>
          </li>
        </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'logs',
    data() {
      return {
      }
    },
    mounted() {
      this.$store.dispatch('getUserLogs')
    },
    computed: {
      logs() {
        return this.$store.state.logs
      },
      user(){
        return this.$store.state.user
      },
      shipLogs(){
        return this.$store.state.shipLogs
      }
    },
    methods: {
      createLog() {
        let log = {
          title: `${this.user.name.split(' ').join('-')}-${this.user.rank}-${Date.now()}`,
          body: '',
          shipId: this.user.shipId
        }
        this.$store.dispatch('createLog', log)
      },
      removeLog(log) {
        this.$store.dispatch('removeLog', log)
      },
      getLogsByShipId(){
        this.$store.dispatch('getLogsByShip', this.user.shipId)
      }
    }
  }
</script>

<style scoped>
    .action{
        cursor: pointer;
        opacity: .7;
        transition: all .3s linear;
    }
    .action:hover{
        opacity: 1
    }
</style>