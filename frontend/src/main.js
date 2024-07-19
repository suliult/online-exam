// 为 IE 浏览器提供 polyfill 支持
import '@babel/polyfill'

// 导入 Vue 核心库
import Vue from 'vue'
// 导入根组件
import App from './App.vue'
// 导入路由配置
import router from './router'
// 导入 Vuex store
import store from './store/'
// 导入封装的 axios 插件
import { VueAxios } from './utils/request'

// 导入启动引导函数
import bootstrap from './core/bootstrap'
// 导入核心使用模块（可能包含全局组件注册等）
import './core/use'
// 导入权限控制模块
import './permission' // permission control
// 导入全局过滤器
import './utils/filter' // global filter

// 设置为生产环境，关闭 Vue 的生产提示
Vue.config.productionTip = false

// 将 axios 挂载到 Vue 实例上，可以通过 Vue.$http 和 this.$http 访问
Vue.use(VueAxios)

// 创建 Vue 根实例
new Vue({
  router,  // 注入路由
  store,   // 注入 Vuex store
  created () {
    // 在 Vue 实例创建后立即调用 bootstrap 函数
    bootstrap()
  },
  // 渲染函数，将 App 组件渲染为应用的根组件
  render: h => h(App)
}).$mount('#app')  // 将 Vue 实例挂载到 #app 元素上
