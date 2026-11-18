import { createRouter, createWebHashHistory } from 'vue-router'
import Home from './components/Home.vue'
import Login from './components/Login.vue'

const routes = [
  { path: '/', redirect: '/home/dashboard' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/home/dashboard',
    children: [
      { path: 'dashboard', component: () => import('./views/Dashboard.vue') },
      { path: 'users', component: () => import('./views/Users.vue') },
      { path: 'users/:id', component: () => import('./views/UserDetail.vue'), props: true },
      { path: 'rights', component: () => import('./views/Rights.vue') },
      { path: 'goods', component: () => import('./views/Goods.vue') },
      { path: 'orders', component: () => import('./views/Orders.vue') },
      { path: 'memes', component: () => import('./views/Memes.vue') },
      { path: 'settings', component: () => import('./views/Settings.vue') }
    ]
  },
  { path: '/:pathMatch(.*)*', redirect: '/home/dashboard' }
]

const router = createRouter({ history: createWebHashHistory(), routes })

router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  if (!localStorage.getItem('token')) return next('/login')
  next()
})

export default router
