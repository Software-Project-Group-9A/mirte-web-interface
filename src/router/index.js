import Vue from 'vue'
import VueRouter from 'vue-router'

import Beginner from '../views/Beginner.vue'
import Advanced from '../views/Advanced.vue'
import Settings from '../views/Settings.vue'
import Network from '../views/Network.vue'
import Sensors from '../views/Sensors.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Beginner',
    component: Beginner
  },
  {
    path: '/Advanced',
    name: 'Advanced',
    component: Advanced
  },
  {
    path: '/Network',
    name: 'Network',
    component: Network
  },
  {
    path: '/Settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/Sensors',
    name: 'Sensors',
    component: Sensors
  },
]

const router = new VueRouter({
  routes
})

export default router
