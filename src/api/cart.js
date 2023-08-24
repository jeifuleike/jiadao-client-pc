// 封装购物车相关的API函数
import request from '@/utils/request'

// 查询商品信息是否有效
export const getNewCartGoods = (skuId) => request(`/goods/stock/${skuId}`, 'GET')

// 获取商品详情
export const getSpecsAndSkus = (skuId) => request(`/goods/sku/${skuId}`, 'get')

// 合并购物车
export const mergeLocalCart = (cartList) => request('/member/cart/merge', 'post', cartList)

// 拿到购物车
export const getCart = () => request('/member/cart', 'get')

// 添加购物车
export const insertCart = ({ skuId, count }) => request('/member/cart', 'POST', { skuId, count })

// 删除购物车商品
export const deleteCart = (ids) => request('/member/cart', 'delete', { ids })

// 修改数量
export const updateCart = (goods) => request('/member/cart/' + goods.skuId, 'put', goods)

// 全选反选
export const checkAllCart = ({ selected, ids }) => request('/member/cart/selected', 'put', { selected, ids })
