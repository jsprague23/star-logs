<template>
  <div> 
    <button @click="createLog">Add Log</button>
    <ul>
      <li v-for="log in logs"><router-link :to="'/logs/'+log._id">{{log.name}}</router-link> <span @click="removeLog(log)">x</span></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'logs',
  mounted(){
    this.$store.dispatch('getLogs')
  },
  computed:{
    logs(){
      return this.$store.state.logs
    }
  },
  methods:{
    createLog(){
      this.$store.dispatch('createLog', {
        name: 'Testing log creation',
        description: 'blarg'
      })
    },
    removeLog(log){
      this.$store.dispatch('removeLog', log)
    }
  }
}
</script>

<style scoped>

</style>
