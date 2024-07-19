<template>
  <!-- 列表项容器 -->
  <li :key="item.title">
    <!-- 主要内容盒子 -->
    <div class="page1-box">
      <!-- 点状装饰元素 -->
      <div class="page1-point-wrapper"></div>

      <!-- 图片容器 -->
      <div class="page1-image" :style="{ boxShadow: `${item.shadowColor} 0px 6px 12px` }">
        <!-- 项目图片 -->
        <img :src="item.src" />
      </div>

      <!-- 项目标题 -->
      <h3>{{ item.title }}</h3>

      <!-- 项目内容 -->
      <p>{{ item.content }}</p>
    </div>
  </li>
</template>


<script>
export default {
  // 组件名称
  name: 'ListItem',

  // 组件属性定义
  props: {
    // 定义 item 属性
    item: {
      type: Object,  // 属性类型为对象
      required: true  // 该属性是必需的
    }
  }
}

</script>
