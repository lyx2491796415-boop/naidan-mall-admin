import { createRouter, createWebHashHistory } from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'

// 路由表：四个新模块（权限 / 商品 / 订单 / 设置）全部注册为 /home 的子路由
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/home/users',
      children: [
        { path: 'users', component: () => import('./components/subcomponent/MyUsers.vue') },
        { path: 'users/:id', component: () => import('./components/user/MyUserDetali.vue'), props: true },
        { path: 'rights', component: () => import('./components/subcomponent/MyRights.vue') },
        { path: 'goods', component: () => import('./components/subcomponent/MyGoods.vue') },
        { path: 'orders', component: () => import('./components/subcomponent/MyOrders.vue') },
        { path: 'settings', component: () => import('./components/subcomponent/MySettings.vue') }
      ]
    }
  ]
})

// 全局导航守卫：照旧校验 token，没有 token 一律回登录页
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  const token = localStorage.getItem('token')
  if (!token) return next('/login')
  next()
})

export default router
