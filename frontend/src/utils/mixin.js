// import Vue from 'vue'
import { deviceEnquire, DEVICE_TYPE } from '../utils/device'
import { mapState } from 'vuex'

// Vue 合并策略（已注释掉，可能用于自定义合并行为）
// const mixinsComputed = Vue.config.optionMergeStrategies.computed
// const mixinsMethods = Vue.config.optionMergeStrategies.methods

/**
 * 主要的 mixin，包含布局相关的计算属性和方法
 */
const mixin = {
  computed: {
    ...mapState({
      // 映射 Vuex state 到组件的计算属性
      layoutMode: state => state.app.layout,
      navTheme: state => state.app.theme,
      primaryColor: state => state.app.color,
      colorWeak: state => state.app.weak,
      fixedHeader: state => state.app.fixedHeader,
      fixSiderbar: state => state.app.fixSiderbar,
      fixSidebar: state => state.app.fixSiderbar,
      contentWidth: state => state.app.contentWidth,
      autoHideHeader: state => state.app.autoHideHeader,
      sidebarOpened: state => state.app.sidebar,
      multiTab: state => state.app.multiTab
    })
  },
  methods: {
    // 判断是否为顶部菜单模式
    isTopMenu () {
      return this.layoutMode === 'topmenu'
    },
    // 判断是否为侧边菜单模式
    isSideMenu () {
      return !this.isTopMenu()
    }
  }
}

/**
 * 设备相关的 mixin，包含设备类型的计算属性和判断方法
 */
const mixinDevice = {
  computed: {
    ...mapState({
      device: state => state.app.device
    })
  },
  methods: {
    // 判断是否为移动设备
    isMobile () {
      return this.device === DEVICE_TYPE.MOBILE
    },
    // 判断是否为桌面设备
    isDesktop () {
      return this.device === DEVICE_TYPE.DESKTOP
    },
    // 判断是否为平板设备
    isTablet () {
      return this.device === DEVICE_TYPE.TABLET
    }
  }
}

/**
 * 设备查询 mixin，用于在组件挂载时检测设备类型并更新 Vuex store
 */
const AppDeviceEnquire = {
  mounted () {
    const { $store } = this
    deviceEnquire(deviceType => {
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          $store.commit('TOGGLE_DEVICE', 'desktop')
          $store.dispatch('setSidebar', true)
          break
        case DEVICE_TYPE.TABLET:
          $store.commit('TOGGLE_DEVICE', 'tablet')
          $store.dispatch('setSidebar', false)
          break
        case DEVICE_TYPE.MOBILE:
        default:
          $store.commit('TOGGLE_DEVICE', 'mobile')
          $store.dispatch('setSidebar', true)
          break
      }
    })
  }
}

export { mixin, AppDeviceEnquire, mixinDevice }
