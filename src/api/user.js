import request from '../utils/request'

/**
 * 用户登录
 * @param {Object} data - 登录参数
 * @param {string} data.email - 邮箱
 * @param {string} data.password - 密码
 * @returns {Promise}
 */
export function login(data) {
  return request.post('/user/login', data)
}

/**
 * 用户注册
 * @param {Object} data - 注册参数
 * @param {string} data.email - 邮箱
 * @param {string} data.password - 密码
 * @param {string} data.nickname - 昵称
 * @param {string} data.code - 验证码
 * @returns {Promise}
 */
export function register(data) {
  return request.post('/user/register', data)
}

/**
 * 发送验证码
 * @param {Object} data - 发送验证码参数
 * @param {string} data.email - 邮箱
 * @returns {Promise}
 */
export function sendCode(data) {
  return request.get('/sendMail', { params: { to: data.email } })
}

/**
 * 获取当前用户信息
 * @returns {Promise}
 */
export function getUserInfo() {
  return request.get('/user/me')
}

/**
 * 用户登出
 * @returns {Promise}
 */
export function logout() {
  return request.post('/user/logout')
} 