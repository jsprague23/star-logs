<template>
  <div class="container">
    <div class="heading row text-center">
      <h1>{{user.rank}}'s Log</h1>
      <h3>{{ship.name}}</h3>
    </div>
    <div class="row">
        <button class="col-sm-1 col-sm-offset-11" @click="editToggle"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button>
    </div>
    <div v-if="edit" class="edit-log row">
      <h4 class="pull-left">{{log.title}} :</h4>
      <form @submit.prevent="updateLog">
        <textarea class="form-control" rows="3" v-model="log.body"></textarea>
        <button class="btn btn-success pull-right" type="submit">Update Log</button>
      </form>
    </div>
    <div v-else class="log row">
        <h4 class="pull-left col-sm-12">{{log.title}} :</h4>
        <div class="log-body col-sm-11 col-sm-offset-1">
          <p>{{log.body}}</p>
        </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'log',
    mounted() {
      this.$store.dispatch('getLog', this.$route.params.id)
      this.$store.dispatch('getShip', this.user.shipId)
    },
    data() {
      return {
        body: '',
        edit: false
      }
    },
    computed: {
      log() {
        return this.$store.state.activeLog
      },
      user() {
        return this.$store.state.user
      },
      ship() {
        return this.$store.state.activeShip
      }
    },
    methods: {
      updateLog() {
        this.$store.dispatch('updateLog', this.log)
        this.editToggle()
      },
      editToggle(){
        this.edit = !this.edit
      }
    }
  }
</script>

<style scoped>
  .edit-log {
    margin-top: 15%;
  }

  .btn {
    margin: 5%;
  }
  .log{
    margin-top: 15%;
  }
  .log-body{
    outline: 2px solid green;
  }
</style>