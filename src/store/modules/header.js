import { getClassificationAPI } from '@/api'
// 首页数据
export default {
  namespaced: true,
  state: () => ({
    // 头部分类模块数据
    list: []
  }),
  mutations: {
    // 修改头部分类模块数据
    setList (state, payload) {
      state.list = payload
    }
  },
  actions: {
    async loadGetClassification ({ commit }) {
      const { result } = await getClassificationAPI()
      commit('setList', result)
    }
  }
}
