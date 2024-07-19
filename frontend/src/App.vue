<template>
  <!-- 使用 a-locale-provider 组件来提供国际化支持 -->
  <a-locale-provider :locale="locale">
    <!-- 应用的根容器 -->
    <div id="app">
      <!-- 路由视图组件，用于根据当前路由动态渲染相应的页面组件 -->
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { AppDeviceEnquire } from './utils/mixin'

export default {
  // 混入 AppDeviceEnquire，可能包含了设备查询相关的方法和属性
  mixins: [AppDeviceEnquire],

  // 组件的数据对象
  data () {
    return {
      // 设置默认语言环境为中文
      locale: zhCN
    }
  },

  // 组件挂载后的生命周期钩子
  mounted () {
    // 组件挂载到 DOM 后执行的操作
    // 目前为空，可以在这里添加需要在组件挂载后执行的逻辑
  }
}

</script>
<style>
#app {
  height: 100%;
}

h1, h2, h3, h4, h5, h6 {
  line-height: inherit !important;
  font-size: initial !important;
  font-weight: initial !important;
}

.page-header .breadcrumb {
  background-color: transparent !important;
  padding: inherit !important;
}

.row {
  margin-left: inherit !important;
}

a:hover {
  text-decoration: none !important;
  line-height: inherit !important;
}

i > svg {
  vertical-align: initial !important;
}

ul {
  margin-bottom: inherit !important;
}
</style>
