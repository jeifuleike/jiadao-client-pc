import { getClassification } from '@/api/homePage'
// 首页数据
export default {
  namespaced: true,
  state: () => ({
    // 头部分类模块数据
    list: [{ name: '居家' }, { name: '美食' }, { name: '服饰' }, { name: '母婴' }, { name: '个护' }, { name: '严选' }, { name: '数码' }, { name: '运动' }, { name: '杂项' }]
  }),
  mutations: {
    // 修改头部分类模块数据
    setList (state, payload) {
      state.list = payload
    },
    // 定义show和hide函数，控制当前分类的二级分类显示和隐藏
    show (state, id) {
      const findId = state.list.find(item => item.id === id)
      findId.open = true
    },
    hide (state, id) {
      const findId = state.list.find(item => item.id === id)
      findId.open = false
    }
  },
  actions: {
    async loadGetClassification ({ commit }) {
      // 获取数据
      const { result } = await getClassification()
      // 给每个分类加上控制二级分类显示隐藏的数据
      result.forEach(element => {
        element.open = false
      })
      console.log(result)
      commit('setList', result)
    }
  }
}
