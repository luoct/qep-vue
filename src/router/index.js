import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Bar from '../views/Bar.vue'

// import Login from '../views/Login.vue'
// import User from '../views/user/User.vue'
// import Evaluation from '../views/evaluation/Evaluation'
// import RatingScale from '../views/evaluation/RatingScale'
// import Report from '../views/report/Report'


const Login = () => import(/* webpackChunkName: "group-1" */ '../views/Login.vue')
const User = () => import(/* webpackChunkName: "group-2" */ '../views/user/User.vue')

const Evaluation = () => import(/* webpackChunkName: "group-3" */ '../views/evaluation/Evaluation')
const RatingScale = () => import(/* webpackChunkName: "group-3" */ '../views/evaluation/RatingScale')

const Report = () => import(/* webpackChunkName: "group-4" */ '../views/report/Report')

const Err404 = () => import(/* webpackChunkName: "group-4" */ '../views/Err.vue')






Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/app',
    name: 'Bar',
    component: Bar,
    meta: { isAuth: true },
    children: [
      { path: 'user', name: 'User', component: User, meta: { isAuth: true }, },
      { path: 'evaluation', name: 'Evaluation', component: Evaluation, meta: { isAuth: true }, },
      { path: 'rating-scale/:type', name: 'RatingScale', component: RatingScale, meta: { isAuth: true }, },
      { path: 'report', name: 'Report', component: Report, meta: { isAuth: true }, },
    ]
  },

  { path: '*', component: Err404 }

]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {

  let stuNo = sessionStorage.getItem('stuNo')

  if (to.meta.isAuth == true) {
    if (stuNo) next()
    else next('/')
  }
  else next()
})



export default router
