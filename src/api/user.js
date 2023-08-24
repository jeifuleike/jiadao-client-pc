// 用户相关的

import request from '@/utils/request'

// 账号密码登入
export const userAccontLogin = ({ account, password }) => request('/login', 'post', { account, password })

// 发送验证码
export const userCloudCode = mobile => request('/login/code', 'GET', { mobile })

// 手机验证码登入
export const userLoderCode = ({ mobile, code }) => request('/login/code', 'POST', { mobile, code })

// 用户QQ登录
export const userQQLogin = (unionId, source = 1) => request('/login/social', 'post', { unionId, source })

// QQ登录绑定手机的验证码
export const userQQBindCode = mobile => request('login/social/code', 'get', { mobile })

// QQ登录-绑定帐号
export const userQQBindLogin = ({ unionId, mobile, code }) => request('/login/social/bind', 'post', { unionId, mobile, code })

// 校验帐号是否存在
export const userCheckAccount = (account) => request('/register/check', 'get', { account })

// 注册用的发送验证码
export const addMobileUser = mobile => request('/register/code', 'get', { mobile })

// QQ登入时的注册用户
export const QQuserRegister = ({ unionId, account, mobile, code, password }) => request(`/login/social/${unionId}/complement`, 'POST', { account, mobile, code, password })

// 注册用户
export const userRegister = ({ account, mobile, code, password }) => request('/register', 'POST', { account, mobile, code, password })
