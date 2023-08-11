// 用户相关的

import request from '@/utils/request'

// 账号密码登入
export const userAccontLogin = ({ account, password }) => request('/login', 'post', { account, password })

// 发送验证码
export const userCloudCode = moblie => request('/login/code', 'GET', { moblie })

// 手机验证码登入
export const userLoderCode = ({ mobile, code }) => request('/login/code', 'POST', { mobile, code })
