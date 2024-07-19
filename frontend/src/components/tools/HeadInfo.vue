<template>
  <!-- 头部信息组件的根元素 -->
  <!-- 根据 center 属性动态添加 'center' 类 -->
  <div class="head-info" :class="center && 'center'">
    <!-- 显示标题 -->
    <span>{{ title }}</span>

    <!-- 显示内容 -->
    <p>{{ content }}</p>

    <!-- 条件渲染：如果 bordered 为 true，则显示一个空的 em 元素作为边框 -->
    <em v-if="bordered"/>
  </div>
</template>


<script>
export default {
  // 组件名称
  name: 'HeadInfo',

  // 组件属性定义
  props: {
    // 标题文本
    title: {
      type: String,
      default: '' // 默认为空字符串
    },
    // 内容文本
    content: {
      type: String,
      default: '' // 默认为空字符串
    },
    // 是否显示边框
    bordered: {
      type: Boolean,
      default: false // 默认不显示边框
    },
    // 是否居中显示
    center: {
      type: Boolean,
      default: true // 默认居中显示
    }
  }
}

</script>

<style lang="less" scoped>
  .head-info {
    position: relative;
    text-align: left;
    padding: 0 32px 0 0;
    min-width: 125px;

    &.center {
      text-align: center;
      padding: 0 32px;
    }

    span {
      color: rgba(0, 0, 0, .45);
      display: inline-block;
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 4px;
    }
    p {
      color: rgba(0, 0, 0, .85);
      font-size: 24px;
      line-height: 32px;
      margin: 0;
    }
    em {
      background-color: #e8e8e8;
      position: absolute;
      height: 56px;
      width: 1px;
      top: 0;
      right: 0;
    }
  }
</style>
