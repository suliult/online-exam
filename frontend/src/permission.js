import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from './utils/domUtil'
import { ACCESS_TOKEN } from './store/mutation-types'

// 配置 NProgress
NProgress.configure({ showSpinner: false })

// 定义免登录白名单
const whiteList = ['login', 'register', 'registerResult']

// 全局前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start() // 开始显示进度条

  // 设置页面标题
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))

  // 检查是否有访问令牌
  if (Vue.ls.get(ACCESS_TOKEN)) {
    // 已登录状态
    if (to.path === '/user/login') {
      // 如果已登录用户访问登录页，重定向到工作台
      next({ path: '/dashboard/workplace' })
      NProgress.done()
    } else {
      // 检查用户角色是否已加载
      if (store.getters.roles.length === 0) {
        // 获取用户信息
        store.dispatch('GetInfo')
          .then(res => {
            const roles = res.data && res.data.role
            // 根据角色生成可访问的路由
            store.dispatch('GenerateRoutes', { roles }).then(() => {
              // 动态添加可访问路由
              router.addRoutes(store.getters.addRouters)

              // 处理重定向
              const redirect = decodeURIComponent(from.query.redirect || to.path)
              if (to.path === redirect) {
                next({ ...to, replace: true })
              } else {
                next({ path: redirect })
              }
            })
          })
          .catch(() => {
            // 获取用户信息失败
            notification.error({
              message: '错误',
              description: '请求用户信息失败，请重试'
            })
            // 登出并重定向到登录页
            store.dispatch('Logout').then(() => {
              next({ path: '/user/login', query: { redirect: to.fullPath } })
            })
          })
      } else {
        next()
      }
    }
  } else {
    // 未登录状态
    if (whiteList.includes(to.name)) {
      // 在免登录白名单中，直接进入
      next()
    } else {
      // 其他无访问权限的页面重定向到登录页面
      next({ path: '/user/login', query: { redirect: to.fullPath } })
      NProgress.done()
    }
  }
})

// 全局后置钩子
router.afterEach(() => {
  NProgress.done() // 结束进度条
})
