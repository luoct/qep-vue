import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Bar from '../views/Bar.vue'
import User from '../views/user/User.vue'
import Evaluation from '../views/evaluation/Evaluation'
import RatingScale from '../views/evaluation/RatingScale'




Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/app',
    name: 'Bar',
    component: Bar,
    children: [
      { path: 'user', name: 'User', component: User },
      { path: 'evaluation', name: 'Evaluation', component: Evaluation, },
      { path: 'rating-scale/:type', name: 'RatingScale', component: RatingScale, },
    ]
  },


]

const router = new VueRouter({
  routes
})

export default router
