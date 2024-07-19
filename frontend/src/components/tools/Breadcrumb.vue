<template>
  <!-- 面包屑导航组件 -->
  <a-breadcrumb class="breadcrumb">
    <!-- 遍历 breadList 数组，为每个项目创建一个面包屑项 -->
    <a-breadcrumb-item v-for="(item, index) in breadList" :key="item.name">
      <!-- 条件渲染：如果不是当前页面且不是第二个项目，则渲染为可点击的链接 -->
      <router-link
        v-if="item.name != name && index != 1"
        :to="{ path: item.path === '' ? '/' : item.path }"
      >
        {{ item.meta.title }}
      </router-link>
      <!-- 否则渲染为普通文本 -->
      <span v-else>{{ item.meta.title }}</span>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  // 组件的数据
  data() {
    return {
      name: '', // 当前路由的名称
      breadList: [] // 面包屑导航列表
    }
  },

  // 组件创建时执行
  created() {
    this.getBreadcrumb() // 初始化面包屑导航
  },

  methods: {
    // 获取并设置面包屑导航数据
    getBreadcrumb() {
      this.breadList = [] // 清空现有的面包屑列表

      // 注释掉的代码：添加首页到面包屑列表
      // this.breadList.push({name: 'index', path: '/dashboard/', meta: {title: '首页'}})

      this.name = this.$route.name // 获取当前路由的名称

      // 遍历匹配的路由记录，构建面包屑列表
      this.$route.matched.forEach(item => {
        // 注释掉的代码：排除 'index' 路由
        // item.name !== 'index' && this.breadList.push(item)
        this.breadList.push(item) // 将每个匹配的路由记录添加到面包屑列表
      })
    }
  },

  // 监听路由变化
  watch: {
    $route() {
      this.getBreadcrumb() // 路由变化时重新获取面包屑导航
    }
  }
}

</script>

<style scoped>
</style>
