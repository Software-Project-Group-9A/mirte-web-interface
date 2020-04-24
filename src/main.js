import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


Vue.config.productionTip = false
Vue.config.ignoredElements = ['block', 'field', 'xml', 'category', 'value', 'mutation', 'sep']

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
