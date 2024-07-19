// 定义权限枚举对象，包含各种操作权限
const PERMISSION_ENUM = {
  'add': { key: 'add', label: '新增' },
  'delete': { key: 'delete', label: '删除' },
  'edit': { key: 'edit', label: '修改' },
  'query': { key: 'query', label: '查询' },
  'get': { key: 'get', label: '详情' },
  'enable': { key: 'enable', label: '启用' },
  'disable': { key: 'disable', label: '禁用' },
  'import': { key: 'import', label: '导入' },
  'export': { key: 'export', label: '导出' }
}

function plugin (Vue) {
  // 如果插件已经安装，直接返回
  if (plugin.installed) {
    return
  }

  // 在 Vue 原型上定义 $auth 方法，用于检查权限
  !Vue.prototype.$auth && Object.defineProperties(Vue.prototype, {
    $auth: {
      get () {
        const _this = this
        return (permissions) => {
          // 将权限字符串分割为权限和操作
          const [permission, action] = permissions.split('.')
          // 从 Vuex store 中获取权限列表
          const permissionList = _this.$store.getters.roles.permissions
          // 检查是否存在对应的权限和操作
          return permissionList.find((val) => {
            return val.permissionId === permission
          }).actionList.findIndex((val) => {
            return val === action
          }) > -1
        }
      }
    }
  })

  // 在 Vue 原型上定义 $enum 方法，用于获取权限枚举值
  !Vue.prototype.$enum && Object.defineProperties(Vue.prototype, {
    $enum: {
      get () {
        return (val) => {
          let result = PERMISSION_ENUM
          // 如果提供了值，则根据点号分割的路径查找对应的枚举值
          val && val.split('.').forEach(v => {
            result = result && result[v] || null
          })
          return result
        }
      }
    }
  })
}

export default plugin
