import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  // 一级路由布局容器
  {
    path: '/',
    component: () => import('@/views/Layout'),
    children: [
      { path: '/', component: () => import('@/views/home') },
      { path: '/category/:id', component: () => import('@/views/category') },
      { path: '/category/sub/:id', component: () => import('@/views/category/sub.vue') }
    ]
  }
]

// vue2.0 new VueRouter({})创建路由实例
// vue3.0 createRouter({})创建路由实例
const router = createRouter({
  // 使用hash的路由模式
  history: createWebHashHistory(),
  routes
})

export default router
