import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home'

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
  },
  //首页路由注册
  {
    path:'/home',
    component:Home
  }
]

const router = new VueRouter({
  routes
})

export default router
