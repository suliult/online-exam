/**
 * 项目默认配置项
 * primaryColor - 默认主题色
 * navTheme - sidebar theme ['dark', 'light'] 两种主题
 * colorWeak - 色盲模式
 * layout - 整体布局方式 ['sidemenu', 'topmenu'] 两种布局
 * fixedHeader - 固定 Header : boolean
 * fixSiderbar - 固定左侧菜单栏 ： boolean
 * autoHideHeader - 向下滚动时，隐藏 Header : boolean
 * contentWidth - 内容区布局： 流式 |  固定
 *
 * storageOptions: {} - Vue-ls 插件配置项 (localStorage/sessionStorage)
 *
 */

export default {
  // Ant Design 的主题色
  primaryColor: '#1890FF',

  // 导航菜单主题，可选 'dark' 或 'light'
  navTheme: 'dark',

  // 整体布局方式，可选 'sidemenu'（侧边菜单） 或 'topmenu'（顶部菜单）
  layout: 'topmenu',

  // 内容区布局，仅在 layout 为 'topmenu' 时生效
  // 可选 'Fluid'（流式） 或 'Fixed'（固定宽度）
  contentWidth: 'Fixed',

  // 是否固定头部
  fixedHeader: true,

  // 是否固定侧边栏（仅在 layout 为 'sidemenu' 时生效）
  fixSiderbar: false,

  // 是否在向下滚动时自动隐藏头部
  autoHideHeader: false,

  // 是否启用色弱模式
  colorWeak: false,

  // 是否启用多标签页模式
  multiTab: false,

  // 是否为生产环境（根据环境变量判断）
  production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true',

  // Vue-ls 插件配置项，用于本地存储
  storageOptions: {
    namespace: 'pro__', // 存储键的前缀
    name: 'ls', // Vue 实例上的属性名，可通过 this.$ls 访问
    storage: 'local' // 存储方式，可选 'local'（localStorage）, 'session'（sessionStorage）, 'memory'（内存存储）
  }
}
