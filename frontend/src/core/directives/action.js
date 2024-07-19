import Vue from 'vue'
import store from '../../store'

/**
 * Action 权限指令
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method] , 如下：
 *    <i-button v-action:add >添加用户</a-button>
 *    <a-button v-action:delete>删除用户</a-button>
 *    <a v-action:edit @click="edit(record)">修改</a>
 *
 *  - 当前用户没有权限时，组件上使用了该指令则会被隐藏
 *  - 当后台权限跟 pro 提供的模式不同时，只需要针对这里的权限过滤进行修改即可
 */
const action = Vue.directive('action', {
  inserted: function (el, binding, vnode) {
    // 获取指令参数，即操作名称（如 add, delete, edit 等）
    const actionName = binding.arg
    // 从 store 中获取用户角色信息
    const roles = store.getters.roles
    // 获取当前路由的权限设置
    const elVal = vnode.context.$route.meta.permission
    // 确保权限 ID 是一个数组
    const permissionId = elVal instanceof String && [elVal] || elVal

    // 遍历用户的所有权限
    roles.permissions.forEach(p => {
      // 如果当前路由不在用户的权限列表中，直接返回
      if (!permissionId.includes(p.permissionId)) {
        return
      }
      // 如果用户有权限列表，但不包含当前操作，则隐藏或移除元素
      if (p.actionList && !p.actionList.includes(actionName)) {
        // 优先尝试移除元素，如果无法移除则隐藏元素
        el.parentNode && el.parentNode.removeChild(el) || (el.style.display = 'none')
      }
    })
  }
})

export default action
