// 创建一个新的axios实例
import axios from 'axios'
import store from '@/store'
import router from '@/router'
// 导出基准地址
export const baseURL = 'https://apipc-xiaotuxian-front.itheima.net'
const instance = axios.create({
  // axios 的一些配置
  baseURL,
  timeout: 5000
})

// 请求拦截器，如果有token进行头部携带
instance.interceptors.request.use(config => {
  // 拦截的业务逻辑
  // 进行请求配置的修改
  // 如果本地又token就在头部携带
  // 获取用户信息对象
  const { profile } = store.state.user
  if (profile.token) {
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => {
  // 拦截失败的逻辑
  return Promise.request(err)
})
// 响应拦截器：1.剥离无效数据 2.处理token失效
// res.data可以直接返回我们需要的data
instance.interceptors.response.use(res => res.data, err => {
  // 如果是401状态码说明用户token有问题,就加入此处逻辑处理
  if (err.response && err.response.status === 401) {
    // 清空无效用户信息
    store.commit('user/setUser', {})
    // 跳转到登录界面
    // 跳转传参给登录页码
    // 组件里面拿到路由路径'/user?a = 10' $route.path === /user $route.fullPath === /user?a=10
    // js模块中：router.currentRoute.value.fullPath拿到当前路由路径
    router.push('/login?redirectUrl=' + encodeURIComponent(router.currentRoute.value.fullPath))
  }
  return Promise.reject(err)
})
// 导出一个函数，调用当前的axios实例发请求，返回promise
// 请求工具函数
export default (url, method, submitData) => {
  // 负责发请求
  return instance({
    url,
    method,
    // 1.如果是get请求，需要用params
    // 2.不是get 需要使用data
    // [] 设置一个动态的key，写js表达式
    // method参数有可能是大小写混搭，所以全部转换为小写再判断
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
