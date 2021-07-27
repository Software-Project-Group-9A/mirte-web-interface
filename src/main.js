import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import Vuex from 'vuex'
import storeData from "./store/index"

Vue.config.productionTip = false
Vue.config.ignoredElements = ['block', 'field', 'xml', 'category', 'value', 'mutation', 'sep']

Vue.use(Vuex)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


const store = new Vuex.Store(
  storeData
)

import i18n from './i18n'

new Vue({
  i18n,
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
