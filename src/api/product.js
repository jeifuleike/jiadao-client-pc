// 获取商品相关的API函数
import request from '@/utils/request'
// 获取商品详情
export const GetProductGoods = id => request('/goods', 'get', { id })
