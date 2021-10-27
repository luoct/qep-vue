import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import './plugins/identicon'

Vue.config.productionTip = false

axios.defaults.baseURL = 'http://192.168.43.226:3000/api/'
axios.interceptors.request.use((config) => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
Vue.prototype.$http = axios

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
