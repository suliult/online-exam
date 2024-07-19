import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from '../config/router.config'

// 安装 Vue Router 插件
Vue.use(Router)

// 创建并导出 Router 实例
export default new Router({
  // 使用 HTML5 的 History 模式
  // 这种模式利用 history.pushState API 来实现 URL 导航而无须重新加载页面
  mode: 'history',

  // 应用的基路径
  // 如果整个单页应用服务在 /app/ 下，然后 base 就应该设为 "/app/"
  base: process.env.BASE_URL,

  // 定义滚动行为
  // 这里设置为每次导航后滚动到页面顶部
  scrollBehavior: () => ({ y: 0 }),

  // 路由配置
  // constantRouterMap 包含应用的所有路由定义
  routes: constantRouterMap
})
