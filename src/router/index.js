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

// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location, onResolve, onReject) {undefined
// if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
// return originalPush.call(this, location).catch(err => err)
// }

router.beforeEach((to,from,next)=>{
  console.log('路由守卫开启')
  console.log(from)
  if(to.path==='/login') {
    return next()
  }
  const u=localStorage.getItem("user")
  console.log(u)
  if(!u){
    return next("/login")//user为空 返回到login
  }
  next()
})

export default router
