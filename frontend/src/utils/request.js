import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import { VueAxios } from './axios'
import notification from 'ant-design-vue/es/notification'
import { ACCESS_TOKEN } from '../store/mutation-types'

// 创建 axios 实例
const service = axios.create({
  baseURL: '/api', // API 基础 URL
  timeout: 12000 // 请求超时时间（毫秒）
})

/**
 * 错误处理函数
 * @param {Error} error - Axios 错误对象
 */
const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = Vue.ls.get(ACCESS_TOKEN)

    // 处理 403 错误
    if (error.response.status === 403) {
      notification.error({
        message: 'Forbidden',
        description: data.message
      })
    }

    // 处理 401 错误（未授权）
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      notification.error({
        message: 'Unauthorized',
        description: 'Authorization verification failed'
      })
      // 如果存在 token，执行登出操作
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// 请求拦截器
service.interceptors.request.use(config => {
  const token = Vue.ls.get(ACCESS_TOKEN)
  if (token) {
    // 如果 localStorage 中有 ACCESS_TOKEN，则在请求头中添加
    config.headers['Access-Token'] = token
  }
  return config
}, err)

// 响应拦截器
service.interceptors.response.use((response) => {
  return response.data // 直接返回响应的数据部分
}, err)

// Vue 插件安装器
const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

// 导出 VueAxios 插件和 axios 实例
export {
  installer as VueAxios,
  service as axios
}
