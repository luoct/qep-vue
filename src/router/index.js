import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Bar from '../views/Bar.vue'
import User from '../views/user/User.vue'



Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/app',
    name: 'Bar',
    component: Bar,
    children: [
      { path: 'user', name: 'User', component: User }
    ]
  },

]

const router = new VueRouter({
  routes
})

export default router
