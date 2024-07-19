<template>
  <!-- Logo 组件的根元素 -->
  <div class="logo">
    <!-- 使用 router-link 组件创建到 dashboard 的链接 -->
    <router-link :to="{name:'dashboard'}">
      <!-- 显示 Logo SVG 图像 -->
      <LogoSvg alt="logo" />
      <!-- 条件渲染：如果 showTitle 为 true，则显示标题 -->
      <h1 v-if="showTitle">{{ title }}</h1>
    </router-link>
  </div>
</template>


<script>
import LogoSvg from '../../assets/logo.svg?inline'

export default {
  // 组件名称
  name: 'Logo',

  // 引入的子组件
  components: {
    LogoSvg // Logo SVG 组件
  },

  // 组件属性定义
  props: {
    // 标题文本
    title: {
      type: String,
      default: 'Online Exam', // 默认标题
      required: false // 非必填
    },
    // 是否显示标题
    showTitle: {
      type: Boolean,
      default: true, // 默认显示标题
      required: false // 非必填
    }
  }
}

</script>
