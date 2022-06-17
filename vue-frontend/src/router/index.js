import Vue from 'vue'
import VueRouter from 'vue-router'

import Programming from '../views/Programming.vue'
import Settings from '../views/Settings.vue'
import Control from '../views/Control.vue'
import Tutorials from '../views/Tutorials.vue'
import WebsiteEditor from '../views/WebsiteEditor.vue'
import ExposeSensors from '../views/ExposeSensors.vue'

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
  {
    path: '/WebsiteEditor',
    name: 'WebsiteEditor',
    component: WebsiteEditor
  },
  {
    path: '/ExposeSensors',
    name: 'ExposeSensors',
    component: ExposeSensors
  },
]

const router = new VueRouter({
  routes
})

export default router
