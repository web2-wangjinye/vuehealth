import request from '@/utils/request'
import qs from 'qs'
//  判断是否登录
export function isLogin() {
  return request({
    url: 'isLogin.html',
    method: 'get'
  })
}
// 登录方法
export function login(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: '/login.html',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 获取用户详细信息
export function getInfo() {
  return request({
    url: '/getUser.html',
    method: 'get'
  })
}

// 退出方法
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

// 获取验证码
export function getCodeImg() {
  return request({
    url: '/captchaImage',
    method: 'get'
  })
}