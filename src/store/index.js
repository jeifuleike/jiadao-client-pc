// createLogger vuex日志文件
import { createStore, createLogger } from 'vuex'
// vuex本地化存储存储处理插件
import createPersistedstate from 'vuex-persistedstate'
// 用户状态
import user from './modules/user'
// 购物车状态
import cart from './modules/cart'

// vue2.0 创建仓库 new Vuex.Store({})
// vue3.0 创建仓库 createStore({})
export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    // 导入子模块
    user,
    cart
  },
  // 插件处理
  // plugins是vuex官方给的专门添加第三方插件的地方
  // 修改state中的数据即可触发同步机制，可以看到本地存储数据的的变化
  plugins: [
    // createPersistedstate是 vuex-persistedstate 插件的初始化函数，用于创建插件实例。
    createPersistedstate({
      // key是一个自定义的存储键（storage key），用于标识存储在本地存储中的 Vuex 状态。
      key: 'erabbit-client-pc-store',
      // paths: 里面是一个数组，其中包含你希望持久化的 Vuex 模块路径。
      paths: ['user', 'cart']
    }),
    createLogger()
  ]
})
