import request from '@/utils/request'

// 获取热门品牌
export const hotpp = (limit = 6) => request('/home/brand', 'GET', { limit })
// 一级类目
export const getTopCategory = id => request('/category', 'GET', { id })
// 二级类目
export const getSubFilter = id => request('/category/sub/filter', 'GET', { id })
// 获取分类商品
export const getSubGoods = params => request('/category/goods/temporary', 'POST', params)
