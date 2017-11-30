import axios from 'axios'
import vue from 'vue'
import vuex from 'vuex'
import router from '../router'

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
    logs: [],
    shipLogs: [],
    activeLog: {},
    activeShip: {},
    error: {},
    user: {}
  },
  mutations: {
    //User
    setUser(state, user){
      state.user = user
    },
    //Logs
    setLogs(state, data) {
      state.logs = data
    },
    setActiveLog(state, log){
      state.activeLog = log
    },
    //Ship
    setActiveShip(state, ship){
      state.activeShip = ship
    },
    setShipLogs(state, data) {
      state.shipLogs = data
    },

    //Errors
    handleError(state, err) {
      state.error = err
    }
  },
  actions: {
    //AUTH
    login({commit, dispatch}, payload){
      auth.post('login', payload)
        .then(res=>{
          commit('setUser', res.data.data)
          dispatch('getShip', res.data.data.shipId)
          router.push({name: 'Logs'})
        })
        .catch(err=>{
          commit('handleError', err.response.data)
        })
    },
    register({commit, dispatch}, payload){
      auth.post('register', payload)
      .then(res=>{
        commit('setUser', res.data.data)
        router.push({name: 'Logs'})
      })
      .catch(err=>{
        commit('handleError', err.response.data)
      })
    },
    authenticate({commit, dispatch}){
      auth('authenticate')
        .then(res=>{
          commit('setUser', res.data.data)
          dispatch('getShip', res.data.data.shipId)
          router.push({name: 'Logs'})
        })
        .catch(()=>{
          router.push({name: 'Login'})
        })
    },
    logout({commit, dispatch}){
      auth.delete('logout')
        .then(()=>{
          commit('setUser', {})
          router.push({name: 'Login'})
        })
        .catch(()=>{
          router.push({name: 'Login'})
        })
    },

    //LOGS
    getUserLogs({ commit, dispatch }) {
      api('mylogs')
        .then(res => {
          commit('setLogs', res.data.data)
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    getLogsByShip({commit, dispatch}, shipId){
      api('ships/' + shipId + '/logs')
        .then(res=>{
          debugger
          commit('setShipLogs', res.data.data)
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
      api.post('logs/', log)
        .then(res => {
          dispatch('getUserLogs')
          commit('setActiveLog', res.data.data)
          router.push({name: "Log", params: {id: res.data.data._id}})
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    removeLog({ commit, dispatch }, log) {
      api.delete('logs/' + log._id)
        .then(res => {  
          dispatch('getUserLogs')
        })
        .catch(err => {
          commit('handleError', err)
        })
    },
    updateLog({commit, dispatch}, log){
      api.put('logs/'+log._id, log)
        .then(log=>{
          dispatch('getUserLogs')
        })
        .catch(err => {
          commit('handleError', err)
        })  
    },

    //SHIP
    getShip({commit, dispatch}, shipId){
      api('/ships/'+shipId)
        .then(res=>{
          commit('setActiveShip', res.data.data)
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
