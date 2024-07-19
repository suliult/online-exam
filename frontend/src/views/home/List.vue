<template>
  <!-- 主容器 -->
  <div>
    <!-- 列表容器，为每个数据源列表创建一个 ul -->
    <ul class="page1-box-wrapper" v-for="(list, index) in dataSource" :key="index">
      <!-- 遍历每个列表中的项目 -->
      <template v-for="item in list">
        <!-- 使用 ListItem 组件渲染每个项目 -->
        <list-item :item="item" :key="item.title"/>
      </template>
    </ul>
  </div>
</template>

<script>
import ListItem from './ListItem'

export default {
  // 组件名称
  name: 'List',

  // 注册子组件
  components: {
    ListItem
  },

  // 组件属性定义
  props: {
    dataSource: {
      type: Array,  // 属性类型为数组
      required: true,  // 属性是必须的
      default: () => {  // 默认值
        return []
      }
    }
  },

  // 监听属性变化
  watch: {
    // 监听 dataSource 属性的变化
    dataSource(val) {
      console.log('dataSource::update', val)
    }
  }
}

</script>

<style scoped>

</style>
