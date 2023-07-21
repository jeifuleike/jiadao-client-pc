import request from '@/utils/request'

// 获取热门品牌
export const hotpp = (limit = 6) => request('/home/brand', 'GET', { limit })
