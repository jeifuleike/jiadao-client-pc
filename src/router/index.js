import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'

const routes = [
  // 一级路由布局容器
  {
    path: '/',
    component: () => import('@/views/Layout'),
    children: [
      { path: '/', component: () => import('@/views/home') },
      { path: '/category/:id', component: () => import('@/views/category') },
      { path: '/category/sub/:id', component: () => import('@/views/category/sub.vue') },
      { path: '/product/:id', component: import('@/views/goods') },
      { path: '/cart', component: import('@/views/cart') },
      { path: '/member/checkout', component: import('@/views/member/pay') },
      { path: '/member/pay', component: import('@/views/member/pay/page') },
      { path: '/pay/callback', component: import('@/views/member/pay/XtxPayResultPage') },
      {
        path: '/member',
        component: import('@/views/member/Layout'),
        children: [
          { path: '/member', component: import('@/views/member/home') },
          { path: '/member/order', component: import('@/views/member/order') },
          { path: '/member/order/:id', component: import('@/views/member/order/detail') }
        ]
      }
    ]
  },
  { path: '/login', component: import('@/views/login') },
  { path: '/login/callback', component: import('@/views/login/callback') },
  { path: '/register', component: import('@/views/login/components/register') }
]

// vue2.0 new VueRouter({})创建路由实例
// vue3.0 createRouter({})创建路由实例
const router = createRouter({
  // 使用hash的路由模式
  history: createWebHashHistory(),
  routes,
  // 每次切换路由的时候滚动到顶部
  scrollBehavior () {
    return { left: 0, top: 0 }
  }
})

// 前置导航守卫
router.beforeEach((to, from, next) => {
  // 跳转去member开头的地址却没有登录
  if (to.path.startsWith('/member') && !store.state.user.profile.token) {
    next({ path: '/login', query: { redirectUrl: to.fullPath } })
  }
  if (to.path.startsWith('/login') && store.state.user.profile.token) {
    next({ path: '/' })
  }
  next()
})

export default router
