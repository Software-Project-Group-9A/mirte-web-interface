import Vue from 'vue'
import VueRouter from 'vue-router'

import Programming from '../views/Programming.vue'
import Settings from '../views/Settings.vue'
import Control from '../views/Control.vue'
import Tutorials from '../views/Tutorials.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Programming',
    component: Programming
  },
  {
    path: '/Settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/Control',
    name: 'Control',
    component: Control
  },
  {
    path: '/Tutorials',
    name: 'Tutorials',
    component: Tutorials
  },
]

const router = new VueRouter({
  routes
})

export default router
