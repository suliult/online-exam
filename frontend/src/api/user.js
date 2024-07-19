// api/user.js
// 用户相关的 API 请求函数

import api from './index'
import { axios } from '../utils/request'

/**
 * 用户登录
 * @param {Object} parameter - 登录参数，可能包含用户名和密码
 * @returns {Promise} 返回一个 Promise 对象
 */
export function login (parameter) {
  return axios({
    url: api.UserLogin,
    method: 'post',
    data: parameter
  })
}

/**
 * 用户注册
 * @param {Object} parameter - 注册参数，可能包含用户名、密码、邮箱等
 * @returns {Promise} 返回一个 Promise 对象
 */
export function register (parameter) {
  return axios({
    url: api.UserRegister,
    method: 'post',
    data: parameter
  })
}

/**
 * 获取用户列表
 * @returns {Promise} 返回一个 Promise 对象，resolve 时包含用户列表数据
 */
export function getUsers () {
  return axios({
    url: api.UserList,
    method: 'get'
  })
}

/**
 * 更新用户信息
 * @param {string|number} id - 要更新的用户 ID
 * @param {Object} parameter - 更新的用户信息
 * @returns {Promise} 返回一个 Promise 对象
 */
export function updateUser (id, parameter) {
  return axios({
    url: api.UserUpdate.replace(':id', id),
    method: 'put',
    data: parameter
  })
}

/**
 * 删除用户
 * @param {string|number} id - 要删除的用户 ID
 * @returns {Promise} 返回一个 Promise 对象
 */
export function deleteUser (id) {
  return axios({
    url: api.UserDelete.replace(':id', id),
    method: 'delete'
  })
}
