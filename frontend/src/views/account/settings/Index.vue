<template>
  <!-- 主容器 -->
  <div class="page-header-index-wide">
    <!-- 使用 Ant Design Vue 的卡片组件 -->
    <a-card :bordered="false" :bodyStyle="{ padding: '16px 0', height: '100%' }" :style="{ height: '100%' }">
      <!-- 账户设置信息主体 -->
      <div class="account-settings-info-main" :class="device">
        <!-- 左侧菜单 -->
        <div class="account-settings-info-left">
          <!-- Ant Design Vue 菜单组件 -->
          <a-menu
            :mode="device == 'mobile' ? 'horizontal' : 'inline'"
            :style="{ border: '0', width: device == 'mobile' ? '560px' : 'auto'}"
            :defaultSelectedKeys="defaultSelectedKeys"
            type="inner"
            @openChange="onOpenChange"
          >
            <!-- 基本设置菜单项 -->
            <a-menu-item key="/account/settings/base">
              <router-link :to="{ name: 'BaseSettings' }">
                基本设置
              </router-link>
            </a-menu-item>
            <!-- 个性化设置菜单项 -->
            <a-menu-item key="/account/settings/custom">
              <router-link :to="{ name: 'CustomSettings' }">
                个性化
              </router-link>
            </a-menu-item>
          </a-menu>
        </div>
        <!-- 右侧内容区 -->
        <div class="account-settings-info-right">
          <!-- 标题 -->
          <div class="account-settings-info-title">
            <span>{{ $route.meta.title }}</span>
          </div>
          <!-- 路由视图 -->
          <route-view></route-view>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
import { PageView, RouteView } from '../../../layouts'
import { mixinDevice } from '../../../utils/mixin.js'

export default {
  components: {
    RouteView,
    PageView
  },
  mixins: [mixinDevice], // 混合使用 mixinDevice
  data () {
    return {
      // 控制菜单的显示方式
      mode: 'inline',

      openKeys: [], // 当前打开的菜单项
      defaultSelectedKeys: [], // 默认选中的菜单项

      // 图片裁剪
      preview: {}, // 预览图片信息
      option: {
        img: '/avatar2.jpg', // 裁剪图片的源路径
        info: true, // 是否显示裁剪信息
        size: 1, // 裁剪区域大小比例
        outputType: 'jpeg', // 输出图片格式
        canScale: false, // 是否允许缩放
        autoCrop: true, // 是否自动裁剪
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180, // 自动裁剪宽度
        autoCropHeight: 180, // 自动裁剪高度
        fixedBox: true, // 是否固定裁剪框
        // 开启宽度和高度比例
        fixed: true, // 是否固定比例
        fixedNumber: [1, 1] // 固定比例
      },

      pageTitle: '' // 页面标题
    }
  },
  created () {
    this.updateMenu() // 在组件创建时更新菜单
  },
  methods: {
    onOpenChange (openKeys) { // 菜单打开事件处理函数
      this.openKeys = openKeys // 更新当前打开的菜单项
    },
    updateMenu () { // 更新菜单函数
      const routes = this.$route.matched.concat() // 获取当前路由匹配到的所有路由
      this.defaultSelectedKeys = [ routes.pop().path ] // 获取最后一个路由的路径，并设置为默认选中的菜单项
    }
  }
}
</script>

<style lang="less" scoped>
  .account-settings-info-main {
    width: 100%;
    display: flex;
    height: 100%;
    overflow: auto;

    &.mobile {
      display: block;

      .account-settings-info-left {
        border-right: unset;
        border-bottom: 1px solid #e8e8e8;
        width: 100%;
        height: 50px;
        overflow-x: auto;
        overflow-y: scroll;
      }
      .account-settings-info-right {
        padding: 20px 40px;
      }
    }

    .account-settings-info-left {
      border-right: 1px solid #e8e8e8;
      width: 224px;
    }

    .account-settings-info-right {
      flex: 1 1;
      padding: 8px 40px;

      .account-settings-info-title {
        color: rgba(0,0,0,.85);
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        margin-bottom: 12px;
      }
      .account-settings-info-view {
        padding-top: 12px;
      }
    }
  }

</style>
