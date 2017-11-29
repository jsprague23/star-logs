import axios from 'axios'
import vue from 'vue'
import vuex from 'vuex'

let api = axios.create({
  baseURL: 'http://localhost:3000/api/',
  timeout: 2000,
  withCredentials: true
})

let auth = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 2000,
  withCredentials: true
})
vue.use(vuex)

var store = new vuex.Store({
  state: {
    logs: [{ _id: '', name: 'This is total rubbish' }],
    activeLog: {},
    error: {}
  },
  mutations: {
    setLogs(state, data) {
      state.logs = data
    },
    handleError(state, err) {
      state.error = err
    }
  },
  actions: {
    //when writing your auth routes (login, logout, register) 
    //be sure to use auth instead of api for the posts
    getLogs({ commit, dispatch }) {
      api('logs')
        .then(res => {
          commit('setLogs', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    getLog({ commit, dispatch }, id) {
      api('logs/' + id)
        .then(res => {
          commit('setActiveLog', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    createLog({ commit, dispatch }, log) {
      debugger
      api.post('logs/', log)
        .then(res => {
          dispatch('getLogs')
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    removeLog({ commit, dispatch }, log) {
      api.delete('logs/' + log._id)
        .then(res => {
          this.getLogs()
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    handleError({ commit, dispatch }, err) {
      commit('handleError', err)
    }
  }

})


export default store
