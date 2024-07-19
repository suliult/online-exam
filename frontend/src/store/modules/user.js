import Vue from 'vue'
import { login, getInfo, logout } from '../../api/login'
import { ACCESS_TOKEN } from '../../store/mutation-types'
import { welcome } from '../../utils/util'

// 用户模块的 Vuex store
const user = {
  // 状态
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  // 修改状态的方法
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { name, welcome }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  // 异步操作
  actions: {
    // 登录
    Login ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          if (response.code === 0) {
            const token = response.data
            // 将 token 存储到 localStorage，有效期为 1 天
            Vue.ls.set(ACCESS_TOKEN, token, 24 * 60 * 60 * 1000)
            // 更新 store 中的 token
            commit('SET_TOKEN', token)
            resolve()
          } else {
            reject(new Error('用户名或密码错误'))
          }
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          console.log('/user/info的响应如下：')
          console.log(response)
          const result = response.data

          if (result.role && result.role.permissions.length > 0) {
            const role = result.role
            role.permissions = result.role.permissions
            // 处理权限数据
            role.permissions.map(per => {
              if (per.actionEntitySet != null && per.actionEntitySet.length > 0) {
                const action = per.actionEntitySet.map(action => action.action)
                per.actionList = action
              }
            })
            // 生成权限 ID 列表
            role.permissionList = role.permissions.map(permission => permission.permissionId)

            commit('SET_ROLES', result.role)
            commit('SET_INFO', result)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          commit('SET_NAME', { name: result.name, welcome: welcome() })
          commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        // 清除 store 中的用户信息
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        // 从 localStorage 中移除 token
        Vue.ls.remove(ACCESS_TOKEN)

        // 调用登出 API
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        })
      })
    }
  }
}

export default user
