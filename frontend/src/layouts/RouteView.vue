<script>
export default {
  // 组件名称
  name: 'RouteView',

  // 组件属性定义
  props: {
    keepAlive: {
      type: Boolean,
      default: true
    }
  },

  // 组件数据
  data () {
    return {}
  },

  // 渲染函数
  render () {
    // 解构获取路由元信息和 Vuex store 的 getters
    const { $route: { meta }, $store: { getters } } = this

    // 定义需要缓存的视图
    const inKeep = (
      <keep-alive>
        <router-view />
      </keep-alive>
    )

    // 定义不需要缓存的视图
    const notKeep = (
      <router-view />
    )

    // 判断是否需要缓存
    // 这里增加了 multiTab 的判断，当开启了 multiTab 时
    // 应当全部组件皆缓存，否则会导致切换页面后页面还原成原始状态
    // 若确实不需要，可改为 return meta.keepAlive ? inKeep : notKeep
    if (!getters.multiTab && meta.keepAlive === false) {
      return notKeep
    }

    // 根据条件返回缓存或非缓存的视图
    return this.keepAlive || getters.multiTab || meta.keepAlive ? inKeep : notKeep
  }
}
</script>
