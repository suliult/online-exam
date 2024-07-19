const VueAxios = {
  // 用于存储 Vue 实例
  vm: {},

  // Vue 插件安装方法
  install (Vue, instance) {
    // 检查插件是否已经安装
    if (this.installed) {
      return
    }
    this.installed = true

    // 检查是否提供了 axios 实例
    if (!instance) {
      console.error('You have to install axios')
      return
    }

    // 将 axios 实例添加到 Vue 构造函数上
    Vue.axios = instance

    // 在 Vue 原型上定义 axios 和 $http 属性
    Object.defineProperties(Vue.prototype, {
      axios: {
        get: function get () {
          return instance
        }
      },
      $http: {
        get: function get () {
          return instance
        }
      }
    })
  }
}

// 导出 VueAxios 对象
export {
  VueAxios
}
