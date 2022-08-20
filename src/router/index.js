import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home'
import Welcome from '../components/Welcome'
import UserList from '../components/admin/UserList'
import BuildingList from '../components/building/BuildingList'
// import { component } from 'vue/types/umd'
import Static from '../components/Static'


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

,
  //首页路由注册
  {
    path:'/home',
    component:Home,
    //在home组件下重定向到welcome页面
    //welcome组件的路径是home下的二级菜单
    //在home下的mian标签下 使用了路由的占位符 所以定向更新的的是home下的mian内容
    redirect:"/user",
    children:[
      {
        path:'/welcome',
        component:Welcome
      },
      {
        path:'/user',
        component:UserList,
      },
      {
        path:'/building/list',
        component:BuildingList,},
        {
          path:'/sta',
          component:Static
        }
      
    ],

  },
  
  
]



const router = new VueRouter({
  mode:'history',
  routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {undefined
if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
return originalPush.call(this, location).catch(err => err)
}

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
