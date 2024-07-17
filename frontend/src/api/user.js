// api/user.js

import api from './index'
import { axios } from '../utils/request'

export function login (parameter) {
  return axios({
    url: api.UserLogin,
    method: 'post',
    data: parameter
  })
}

export function register (parameter) {
  return axios({
    url: api.UserRegister,
    method: 'post',
    data: parameter
  })
}

export function getUsers () {
  return axios({
    url: api.UserList,
    method: 'get'
  })
}

export function updateUser (id, parameter) {
  return axios({
    url: api.UserUpdate.replace(':id', id),
    method: 'put',
    data: parameter
  })
}

export function deleteUser (id) {
  return axios({
    url: api.UserDelete.replace(':id', id),
    method: 'delete'
  })
}