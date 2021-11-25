import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../components/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    //默认定向大登陆页面
    redirect:"/login"
  },
  {
    path:'/login',
    component:Login
  }
]

const router = new VueRouter({
  routes
})

export default router
