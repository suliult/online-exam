<template>
  <!-- 主横幅包装器 -->
  <div class="banner-wrapper">
    <!-- 标题区域包装器 -->
    <div class="banner-title-wrapper">
      <!-- 标题线条动画包装器 -->
      <div class="title-line-wrapper" style="opacity: 1; transform: translate(0px, 0px);">
        <div class="title-line" style="transform: translateX(-64px);"></div>
      </div>
      <!-- 主标题 -->
      <h1 class="" style="opacity: 1; transform: translate(0px, 0px);">Online Exam</h1>
      <!-- 副标题/描述 -->
      <p style="opacity: 1; transform: translate(0px, 0px);">
        <span>基于SpringBoot+Vue技术栈开发的在线考试系统</span>
      </p>
      <!-- 按钮组 -->
      <div class="button-wrapper">
        <!-- 预览按钮 -->
        <a href="https://exam.suliult.me">
          <a-button type="primary">预览</a-button>
        </a>
        <!-- 开始使用按钮 -->
        <a @click="$router.push({ name: 'docs' })">
          <a-button style="margin: 0 16px;">开始使用</a-button>
        </a>
      </div>
    </div>
    <!-- 图片轮播包装器 -->
    <div class="banner-image-wrapper" style="opacity: 1;">
      <!-- 轮播组件 -->
      <a-carousel arrows autoplay>
        <!-- 轮播项目 -->
        <div v-for="i in 5" :key="i">
          <img :src="`/home/cover${i}.jpg`" style="height: 324px"/>
        </div>
      </a-carousel>
    </div>
  </div>
</template>


<script>
export default {
  name: 'Banner'
}
</script>

<style lang="less">
  @import "home";
</style>
