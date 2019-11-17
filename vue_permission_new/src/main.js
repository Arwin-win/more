import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/iview.js'

Vue.config.productionTip = false
import './assets/css/global.css'
import axios from 'axios'
Vue.prototype.$http = axios 

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
