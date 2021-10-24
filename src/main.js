import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import axios from 'axios'
import './plugins/identicon'

Vue.config.productionTip = false

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://rap2api.taobao.org/app/mock/292620/'

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
