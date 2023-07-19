import request from '@/utils/request'

// 头部分类模块
export const getClassification = () => request('/home/category/head', 'GET')
