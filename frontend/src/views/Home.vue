<template>
  <!-- 使用 PageView 组件作为整体布局容器 -->
  <page-view :title="false">
    <!-- Banner 组件，可能用于显示页面顶部的横幅或主要视觉元素 -->
    <banner/>

    <!-- Page1 组件，可能包含页面的主要内容 -->
    <page1/>
  </page-view>
</template>


<script>
import { PageView } from '../layouts'
import Banner from './home/Banner'
import Page1 from './home/Page1'

export default {
  // 组件名称
  name: 'Home',

  // 注册在该组件中使用的子组件
  components: {
    PageView,  // 页面视图组件，可能用于整体布局
    Banner,    // 横幅组件，可能用于展示主要信息或广告
    Page1      // 页面内容组件，可能是首页的主要内容区域
  }
}

</script>
