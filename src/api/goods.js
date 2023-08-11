import request from '@/utils/request'

// 同类商品推荐，当没传入id时为猜你喜欢
export const getRelevant = (id, limit = 16) => request('/goods/relevant', 'get', { id, limit })

// 24小时热榜
export const getGoodsHot = ({ id, type, limit = 3 }) => request('/goods/hot', 'get', { id, type, limit })

// 获取商品评价标题
// export const getEvaluate = id => request(`/goods/${id}/evaluate`, 'get')
export const getEvaluate = id => request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate`, 'get')

// 获取具体商品评价
export const getCommentListByGoods = (id, reqParams) => request(`https://mock.boxuegu.com/mock/1175/goods/${id}/evaluate/page`, 'get', reqParams)
