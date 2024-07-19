<template>
  <!-- 主布局容器 -->
  <a-layout :class="['layout', device]">
    <!-- 移动设备侧边菜单抽屉 -->
    <a-drawer
      v-if="isMobile()"
      placement="left"
      :wrapClassName="`drawer-sider ${navTheme}`"
      :closable="false"
      :visible="collapsed"
      @close="drawerClose"
    >
      <!-- 移动端侧边菜单 -->
      <side-menu
        mode="inline"
        :menus="menus"
        :theme="navTheme"
        :collapsed="false"
        :collapsible="true"
        @menuSelect="menuSelect"
      ></side-menu>
    </a-drawer>

    <!-- 桌面端侧边菜单 -->
    <side-menu
      v-else-if="isSideMenu()"
      mode="inline"
      :menus="menus"
      :theme="navTheme"
      :collapsed="collapsed"
      :collapsible="true"
    ></side-menu>

    <!-- 主内容区域布局 -->
    <a-layout :class="[layoutMode, `content-width-${contentWidth}`]" :style="{ paddingLeft: contentPaddingLeft, minHeight: '100vh' }">
      <!-- 全局头部 -->
      <global-header
        :mode="layoutMode"
        :menus="menus"
        :theme="navTheme"
        :collapsed="collapsed"
        :device="device"
        @toggle="toggle"
      />

      <!-- 内容区域 -->
      <a-layout-content :style="{ height: '100%', margin: '24px 24px 0', paddingTop: fixedHeader ? '64px' : '0' }">
        <!-- 多标签页组件 -->
        <multi-tab v-if="multiTab"></multi-tab>
        <!-- 路由视图，使用过渡效果 -->
        <transition name="page-transition">
          <route-view />
        </transition>
      </a-layout-content>

      <!-- 页脚 -->
      <a-layout-footer>
        <global-footer />
      </a-layout-footer>

      <!-- 设置抽屉（仅在开发模式下显示） -->
      <setting-drawer v-if="!production"></setting-drawer>
    </a-layout>
  </a-layout>
</template>


<script>
import { triggerWindowResizeEvent } from '../utils/util'
import { mapState, mapActions } from 'vuex'
import { mixin, mixinDevice } from '../utils/mixin'
import config from '../config/defaultSettings'

import RouteView from './RouteView'
import MultiTab from '../components/MultiTab'
import SideMenu from '../components/Menu/SideMenu'
import GlobalHeader from '../components/GlobalHeader'
import GlobalFooter from '../components/GlobalFooter'
import SettingDrawer from '../components/SettingDrawer'

export default {
  name: 'BasicLayout',
  mixins: [mixin, mixinDevice], // 混入通用方法和设备相关方法
  components: {
    RouteView,
    MultiTab,
    SideMenu,
    GlobalHeader,
    GlobalFooter,
    SettingDrawer
  },
  data () {
    return {
      production: config.production, // 是否为生产环境
      collapsed: false, // 侧边栏是否折叠
      menus: [] // 菜单数据
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters
    }),
    // 计算内容区左侧padding
    contentPaddingLeft () {
      if (!this.fixSidebar || this.isMobile()) {
        return '0'
      }
      return this.sidebarOpened ? '256px' : '80px'
    }
  },
  watch: {
    // 监听侧边栏打开状态，更新折叠状态
    sidebarOpened (val) {
      this.collapsed = !val
    }
  },
  created () {
    // 初始化菜单数据和折叠状态
    this.menus = this.mainMenu.find(item => item.path === '/').children
    this.collapsed = !this.sidebarOpened
  },
  mounted () {
    // Edge浏览器兼容性处理
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
  },
  methods: {
    ...mapActions(['setSidebar']),
    // 切换侧边栏折叠状态
    toggle () {
      this.collapsed = !this.collapsed
      this.setSidebar(!this.collapsed)
      triggerWindowResizeEvent()
    },
    // 计算内容区左侧padding
    paddingCalc () {
      let left = ''
      if (this.sidebarOpened) {
        left = this.isDesktop() ? '256px' : '80px'
      } else {
        left = (this.isMobile() && '0') || ((this.fixSidebar && '80px') || '0')
      }
      return left
    },
    // 菜单选择处理
    menuSelect () {
      if (!this.isDesktop()) {
        this.collapsed = false
      }
    },
    // 抽屉关闭处理
    drawerClose () {
      this.collapsed = false
    }
  }
}

</script>

<style lang="less">
@import url('../components/global.less');

/*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */

.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
