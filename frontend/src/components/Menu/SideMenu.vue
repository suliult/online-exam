<template>
  <!-- 侧边栏组件 -->
  <a-layout-sider
    :class="[
      'sider',
      isDesktop() ? null : 'shadow', // 非桌面设备时添加阴影
      theme,
      fixSiderbar ? 'ant-fixed-sidemenu' : null // 固定侧边栏时添加类名
    ]"
    width="256px"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null">

    <!-- Logo 组件 -->
    <logo />

    <!-- 菜单组件 -->
    <s-menu
      :collapsed="collapsed"
      :menu="menus"
      :theme="theme"
      :mode="mode"
      @select="onSelect"
      style="padding: 16px 0px;">
    </s-menu>

  </a-layout-sider>
</template>


<script>
import Logo from '../../components/tools/Logo'
import SMenu from './index'
import { mixin, mixinDevice } from '../../utils/mixin'

export default {
  // 组件名称
  name: 'SideMenu',

  // 引入的子组件
  components: { Logo, SMenu },

  // 混入其他功能
  mixins: [mixin, mixinDevice],

  // 组件属性定义
  props: {
    // 菜单模式
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    // 主题颜色
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    // 是否可折叠
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    // 是否折叠状态
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    // 菜单数据
    menus: {
      type: Array,
      required: true
    }
  },

  // 组件方法
  methods: {
    // 菜单选择事件处理
    onSelect (obj) {
      // 触发自定义事件 'menuSelect'，将选中的菜单项信息传递给父组件
      this.$emit('menuSelect', obj)
    }
  }
}

</script>
