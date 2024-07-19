// Vuex的getters，用于从store中获取状态
const getters = {
  // 获取设备类型
  device: state => state.app.device,

  // 获取主题设置
  theme: state => state.app.theme,

  // 获取颜色设置
  color: state => state.app.color,

  // 获取用户token
  token: state => state.user.token,

  // 获取用户头像
  avatar: state => state.user.avatar,

  // 获取用户昵称
  nickname: state => state.user.name,

  // 获取欢迎信息
  welcome: state => state.user.welcome,

  // 获取用户角色
  roles: state => state.user.roles,

  // 获取用户信息
  userInfo: state => state.user.info,

  // 获取动态添加的路由
  addRouters: state => state.permission.addRouters,

  // 获取多标签页设置
  multiTab: state => state.app.multiTab
}

export default getters
