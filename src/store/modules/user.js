// 用户状态
export default {
  namespaced: true,
  state: () => ({
    profile: {
      id: '',
      avatar: '',
      nickname: '',
      account: '',
      mobile: '',
      token: ''
    },
    // 登录后的回跳路径
    redirectUrl: '/'
  }),
  mutations: {
    // 修改用户信息，payload就是用户信息对象
    setUser (state, payload) {
      state.profile = payload
    },
    // 修改回调地址
    setRedirectUrl (state, url) {
      state.redirectUrl = url
    }
  }
}
