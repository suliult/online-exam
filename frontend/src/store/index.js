import Vue from 'vue'
import Vuex from 'vuex'

// 导入各个模块
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'

// 安装Vuex插件
Vue.use(Vuex)

// 创建并导出Vuex store实例
export default new Vuex.Store({
  // 注册模块
  modules: {
    app,        // 应用程序相关状态
    user,       // 用户相关状态
    permission  // 权限相关状态
  },
  // 根级别的state（此处为空，因为使用了模块）
  state: {

  },
  // 根级别的mutations（此处为空，因为使用了模块）
  mutations: {

  },
  // 根级别的actions（此处为空，因为使用了模块）
  actions: {

  },
  // 注册全局getters
  getters
})
