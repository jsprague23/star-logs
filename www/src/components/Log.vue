<template>
  <div> 
    Active Log: {{log}}
  </div>
</template>

<script>
export default {
  name: 'log',
  mounted(){
    this.$root.$store.dispatch('getLog',this.$route.params.id)
  },
  computed:{
    log(){
      return this.$store.state.activeLog
    }
  }
}
</script>

<style scoped>

</style>
