import request from '@/utils/request'

/**
 * 获取结算信息
 */
export const findCheckoutInfo = () => request('/member/order/pre', 'get')

// 添加收货地址
export const addAddress = (address) => {
  let url = '/member/address'
  if (address.id) {
    url = `/member/address/${address.id}`
    delete address.id
  }

  return request(url, 'post', address)
}

// 提交订单
export const createOrder = (order) => request('/member/order', 'post', order)

// 获取订单详情
export const findOrder = (id) => request('/member/order/' + id, 'get')

// 查询订单列表
export const findOrderList = ({ orderState, page, pageSize }) => request('/member/order', 'get', { orderState, page, pageSize })

// 取消订单
export const cancelOrder = (orderId, cancelReason) => request(`/member/order/${orderId}/cancel`, 'put', { cancelReason })

// 删除订单
export const delteOrder = (ids) => request('/member/order', 'delete', { ids })

// 确认收货
export const confirmOrder = (orderId) => request(`/member/order/${orderId}/receipt`, 'put')

// 查看物流
export const logisticsOrder = (id) => request(`/member/order/${id}/logistics`, 'get')

// 再次购买
export const findOrderRepurchase = (id) => request(`/member/order/repurchase/${id}`, 'get')
