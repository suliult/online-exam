import api from './index'  // 导入 API 端点配置
import { axios } from '../utils/request'  // 导入封装好的 axios 实例

/**
 * 用户登录函数
 * @param {Object} parameter - 登录参数
 * @param {string} parameter.username - 用户名
 * @param {string} parameter.password - 密码
 * @param {boolean} parameter.remember_me - 是否记住登录状态
 * @param {string} parameter.captcha - 验证码
 * @returns {Promise} 返回一个 Promise 对象
 */
export function login (parameter) {
  return axios({
    url: api.UserLogin,  // 用户登录接口，需要根据实际情况修改
    method: 'post',
    data: parameter
  })
}

/**
 * 获取短信验证码
 * @param {Object} parameter - 获取短信验证码所需参数
 * @returns {Promise} 返回一个 Promise 对象
 */
export function getSmsCaptcha (parameter) {
  return axios({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

/**
 * 获取用户信息
 * @returns {Promise} 返回一个 Promise 对象，resolve 时包含用户信息
 */
export function getInfo () {
  return axios({
    url: api.UserInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * 用户登出
 * @returns {Promise} 返回一个 Promise 对象
 */
export function logout () {
  return axios({
    url: api.Logout,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}

/**
 * 获取用户两步验证码状态
 * @param {Object} parameter - 获取两步验证码状态所需参数
 * @returns {Promise} 返回一个 Promise 对象
 */
export function get2step (parameter) {
  return axios({
    url: api.twoStepCode,
    method: 'post',
    data: parameter
  })
}
