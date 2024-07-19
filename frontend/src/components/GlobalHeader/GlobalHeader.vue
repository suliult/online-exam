<template>
  <!-- 使用过渡效果来显示/隐藏头部 -->
  <transition name="showHeader">
    <div v-if="visible" class="header-animat">
      <!-- 布局头部组件 -->
      <a-layout-header
        v-if="visible"
        :class="[
          fixedHeader && 'ant-header-fixedHeader',
          sidebarOpened ? 'ant-header-side-opened' : 'ant-header-side-closed'
        ]"
        :style="{ padding: '0' }"
      >
        <!-- 侧边菜单模式下的头部 -->
        <div v-if="mode === 'sidemenu'" class="header">
          <!-- 移动设备上的折叠/展开图标 -->
          <a-icon
            v-if="device==='mobile'"
            class="trigger"
            :type="collapsed ? 'menu-fold' : 'menu-unfold'"
            @click="toggle"
          />
          <!-- 非移动设备上的折叠/展开图标 -->
          <a-icon
            v-else
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="toggle"
          />
          <!-- 用户菜单组件 -->
          <user-menu></user-menu>
        </div>

        <!-- 顶部菜单模式下的头部 -->
        <div v-else :class="['top-nav-header-index', theme]">
          <div class="header-index-wide">
            <div class="header-index-left">
              <!-- Logo组件 -->
              <logo class="top-nav-header" :show-title="device !== 'mobile'"/>
              <!-- 非移动设备上显示水平菜单 -->
              <s-menu
                v-if="device !== 'mobile'"
                mode="horizontal"
                :menu="menus"
                :theme="theme"
              />
              <!-- 移动设备上显示折叠/展开图标 -->
              <a-icon
                v-else
                class="trigger"
                :type="collapsed ? 'menu-fold' : 'menu-unfold'"
                @click="toggle"
              />
            </div>
            <!-- 右侧用户菜单 -->
            <user-menu class="header-index-right"></user-menu>
          </div>
        </div>
      </a-layout-header>
    </div>
  </transition>
</template>


<script>
import UserMenu from '../tools/UserMenu'
import SMenu from '../Menu/'
import Logo from '../tools/Logo'
import { mixin } from '../../utils/mixin'

export default {
  name: 'GlobalHeader',
  components: {
    UserMenu,
    SMenu,
    Logo
  },
  mixins: [mixin],
  props: {
    mode: {
      type: String,
      // sidemenu: 侧边菜单模式, topmenu: 顶部菜单模式
      default: 'sidemenu'
    },
    menus: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    device: {
      type: String,
      required: false,
      default: 'desktop'
    }
  },
  data () {
    return {
      visible: true,  // 控制头部是否可见
      oldScrollTop: 0 // 记录上一次滚动位置
    }
  },
  mounted () {
    // 添加滚动事件监听器
    document.body.addEventListener('scroll', this.handleScroll, { passive: true })
  },
  methods: {
    // 处理页面滚动
    handleScroll () {
      if (!this.autoHideHeader) {
        return
      }

      const scrollTop = document.body.scrollTop + document.documentElement.scrollTop
      if (!this.ticking) {
        this.ticking = true
        // 使用 requestAnimationFrame 优化性能
        requestAnimationFrame(() => {
          // 根据滚动方向和位置决定是否显示头部
          if (this.oldScrollTop > scrollTop) {
            this.visible = true
          } else if (scrollTop > 300 && this.visible) {
            this.visible = false
          } else if (scrollTop < 300 && !this.visible) {
            this.visible = true
          }
          this.oldScrollTop = scrollTop
          this.ticking = false
        })
      }
    },
    // 触发折叠/展开侧边栏
    toggle () {
      this.$emit('toggle')
    }
  },
  beforeDestroy () {
    // 组件销毁前移除滚动事件监听器
    document.body.removeEventListener('scroll', this.handleScroll, true)
  }
}

</script>

<style lang="less">
.header-animat{
  position: relative;
  z-index: 2;
}
.showHeader-enter-active {
  transition: all 0.25s ease;
}
.showHeader-leave-active {
  transition: all 0.5s ease;
}
.showHeader-enter, .showHeader-leave-to {
  opacity: 0;
}
</style>
