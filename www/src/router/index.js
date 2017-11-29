import Vue from 'vue'
import Router from 'vue-router'
import Logs from 'components/Logs'
import Log from 'components/Log'
import Login from 'components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Logs',
      component: Logs
    },{
      path: '/logs/:id',
      name: 'Log',
      component: Log
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
