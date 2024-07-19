// eslint-disable-next-line
import { UserLayout, BasicLayout, RouteView, BlankLayout, PageView } from '../layouts'
import { examList, examAdmin, questionAdmin } from '../core/icons'

// 异步路由配置
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '在线考试系统' },
    redirect: '/dashboard/home',
    children: [
      // 首页路由
      {
        path: '/dashboard',
        name: 'dashboard',
        redirect: '/dashboard/home',
        component: RouteView,
        hideChildrenInMenu: true,
        meta: { title: '首页', keepAlive: true, icon: 'home', permission: ['dashboard'] },
        children: [
          {
            path: '/dashboard/home',
            name: 'Workplace',
            component: () => import('../views/Home'),
            meta: { title: '简介', keepAlive: true, permission: ['dashboard'] }
          }
        ]
      },

      // 考试卡片路由
      {
        path: '/exam-card',
        name: 'exam-card',
        redirect: '/list/exam-card',
        component: PageView,
        hideChildrenInMenu: true,
        meta: { title: '考试卡片', keepAlive: true, icon: examList, permission: ['exam-card'] },
        children: [
          {
            path: '/list/exam-card',
            name: 'ExamCardList',
            component: () => import('../views/list/ExamCardList'),
            meta: { title: '考试卡片列表', keepAlive: true, permission: ['exam-card'] }
          }
        ]
      },

      // 问题管理路由
      {
        path: '/question-admin',
        name: 'question-admin',
        redirect: '/list/question-table-list',
        component: PageView,
        hideChildrenInMenu: true,
        meta: { title: '问题管理', keepAlive: true, icon: questionAdmin, permission: ['question-admin'] },
        children: [
          {
            path: '/list/question-table-list',
            name: 'QuestionTableListWrapper',
            hideChildrenInMenu: true,
            component: () => import('../views/list/QuestionTableList'),
            meta: { title: '问题列表', keepAlive: true, permission: ['question-admin'] }
          }
        ]
      },

      // 考试管理路由
      {
        path: '/list/exam-table-list',
        name: 'exam-table-list',
        component: PageView,
        redirect: '/list/exam-table-list',
        hideChildrenInMenu: true,
        meta: { title: '考试管理', icon: examAdmin, permission: ['exam-table-list'] },
        children: [
          {
            path: '/list/exam-table-list',
            name: 'ExamTableListWrapper',
            hideChildrenInMenu: true,
            component: () => import('../views/list/ExamTableList'),
            meta: { title: '考试列表', keepAlive: true, permission: ['exam-table-list'] }
          }
        ]
      },

      // 我的考试路由
      {
        path: '/exam-record-list',
        name: 'exam-record-list',
        redirect: '/list/exam-record-list',
        component: PageView,
        hideChildrenInMenu: true,
        meta: { title: '我的考试', keepAlive: true, icon: 'user', permission: ['exam-record-list'] },
        children: [
          {
            path: '/list/exam-record-list',
            name: 'ExamRecordList',
            component: () => import('../views/list/ExamRecordList'),
            meta: { title: '我参与过的考试列表', keepAlive: true, permission: ['exam-record-list'] }
          }
        ]
      },

      // 问问AI路由
      {
        path: '/ask-ai',
        name: 'ask-ai',
        component: PageView,
        hideChildrenInMenu: true,
        meta: { title: '问问AI', keepAlive: true, icon: 'robot', permission: ['ask-ai'] },
        children: [
          {
            path: '/ask-ai',
            name: 'AskAI',
            component: () => import('../views/AI/AskAI'),
            meta: { title: '问问AI', keepAlive: true }
          }
        ]
      },

      // 用户管理路由
      {
        path: '/admin',
        name: 'Admin',
        component: PageView,
        hideChildrenInMenu: true,
        meta: { title: '用户管理', icon: 'setting', permission: ['admin'] },
        children: [
          {
            path: '/admin',
            name: 'Admin',
            component: () => import('../views/admin/admin.vue'),
            meta: { title: '用户管理' }
          }
        ]
      },

      // 个人页路由（隐藏）
      {
        path: '/account',
        component: RouteView,
        redirect: '/account/center',
        name: 'account',
        hidden: true,
        meta: { title: '个人页', icon: 'user', keepAlive: true, permission: ['user'] },
        children: [
          {
            path: '/account/settings',
            name: 'settings',
            component: () => import('../views/account/settings/Index'),
            meta: { title: '个人设置', hideHeader: true, permission: ['user'] },
            redirect: '/account/settings/base',
            hideChildrenInMenu: true,
            children: [
              {
                path: '/account/settings/base',
                name: 'BaseSettings',
                component: () => import('../views/account/settings/BaseSetting'),
                meta: { title: '基本设置', hidden: true, permission: ['user'] }
              },
              {
                path: '/account/settings/custom',
                name: 'CustomSettings',
                component: () => import('../views/account/settings/Custom'),
                meta: { title: '个性化设置', hidden: true, keepAlive: true, permission: ['user'] }
              }
            ]
          }
        ]
      }
    ]
  },

  // 404路由
  {
    path: '*', redirect: '/404', hidden: true
  }
]

/**
 * 基础路由，不在主菜单上展示，独立的路由
 * @type { *[] }
 */
export const constantRouterMap = [
  // 用户相关路由（登录、注册等）
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '../views/user/Login')
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@views/user/Register.vue')
      },
      {
        path: 'register-result',
        name: 'registerResult',
        component: () => import(/* webpackChunkName: "user" */ '../views/user/RegisterResult')
      }
    ]
  },

  // 测试相关路由
  {
    path: '/test',
    component: BlankLayout,
    redirect: '/test/home',
    children: [
      {
        path: 'home',
        name: 'TestHome',
        component: () => import('../views/Home')
      },
      {
        path: 'note',
        name: 'NoteTest',
        component: () => import('@views/test/SummerNoteDemo')
      },
      {
        path: 'table',
        name: 'TableTest',
        component: () => import('@views/test/BootStrapTableDemo')
      }
    ]
  },

  // 404页面路由
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '../views/exception/404')
  },

  // 考试详情路由
  {
    path: '/exam/:id',
    component: () => import(/* webpackChunkName: "fail" */ '../views/list/ExamDetail')
  },

  // 考试记录详情路由
  {
    path: '/exam/record/:exam_id/:record_id',
    component: () => import(/* webpackChunkName: "fail" */ '../views/list/ExamRecordDetail')
  }
]
