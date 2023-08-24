import Mock from 'mockjs'
import qs from 'qs'

// 基本配置
Mock.setup({
  timeout: '500-1000'
})

// 拦截接口 /member/collect/
// 1. 接口地址路径规则
// 2. 请求方式
// 3. 返回数据
Mock.mock(/\/member\/collect/, 'get', config => {
  const queryString = config.url.split('?')[1]
  const queryObject = qs.parse(queryString)
  console.log(queryObject)
  const items = []
  for (let i = 0; i < +queryObject.pageSize; i++) {
    items.push(Mock.mock({
      id: '@id',
      name: '@ctitle(10,20)',
      desc: '@ctitle(4,10)',
      price: '@float(100,200,2,2)',
      picture: '@image(200x100, #894FC4)'
    }))
  }
  return {
    msg: '获取商品成功',
    result: {
      counts: 35,
      pageSize: +queryObject.pageSize,
      page: +queryObject.page,
      items: items
    }
  }
})
