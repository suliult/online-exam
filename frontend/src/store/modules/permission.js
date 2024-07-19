import { asyncRouterMap, constantRouterMap } from '../../config/router.config'

/**
 * 检查用户是否拥有特定权限，并从加载列表中过滤菜单
 *
 * @param {Array} permission - 用户的权限列表
 * @param {Object} route - 路由对象
 * @returns {boolean} - 是否有权限访问该路由
 */
function hasPermission (permission, route) {
  if (route.meta && route.meta.permission) {
    let flag = false
    for (let i = 0, len = permission.length; i < len; i++) {
      flag = route.meta.permission.includes(permission[i])
      if (flag) {
        return true
      }
    }
    return false
  }
  return true
}

/**
 * 检查单账户多角色时，是否有权限访问特定路由
 *
 * @param {Object} roles - 用户角色对象
 * @param {Object} route - 路由对象
 * @returns {boolean} - 是否有权限访问该路由
 */
// eslint-disable-next-line
function hasRole(roles, route) {
  if (route.meta && route.meta.roles) {
    return route.meta.roles.includes(roles.id)
  } else {
    return true
  }
}

/**
 * 根据用户角色过滤异步路由
 *
 * @param {Array} routerMap - 异步路由映射
 * @param {Object} roles - 用户角色对象
 * @returns {Array} - 过滤后的路由列表
 */
function filterAsyncRouter (routerMap, roles) {
  const accessedRouters = routerMap.filter(route => {
    if (hasPermission(roles.permissionList, route)) {
      if (route.children && route.children.length) {
        route.children = filterAsyncRouter(route.children, roles)
      }
      return true
    }
    return false
  })
  return accessedRouters
}

// 权限管理的 Vuex 模块
const permission = {
  state: {
    routers: constantRouterMap, // 常量路由
    addRouters: [] // 动态添加的路由
  },
  mutations: {
    // 设置路由
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    // 生成路由
    GenerateRoutes ({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data
        const accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default permission
