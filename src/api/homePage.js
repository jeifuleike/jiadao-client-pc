import request from '@/utils/request'

// 头部分类模块
export const getClassification = () => request('/home/category/head', 'GET')
// 广告轮播图照片
export const getHomeBanner = () => request('/home/banner', 'GET')
// 新鲜好物
export const getNew = () => request('/home/new', 'GET')
// 人气推荐
export const getHot = () => request('/home/hot', 'GET')
// 产品区块
export const getGoods = () => request('/home/goods', 'GET')
// 最新专题
export const getSpecial = (limit = 3) => request('/home/special', 'GET', { limit })
