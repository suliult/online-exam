<template>
  <!-- 主页面容器 -->
  <div class="home-page page1">
    <!-- 页面内容包装器 -->
    <div class="home-page-wrapper" id="page1-wrapper">
      <!-- 背景文字，带有动态平移效果 -->
      <div class="page1-bg" style="transform: translate(0px, 200.953px);">Feature</div>

      <!-- 主标题 -->
      <h2>What can <span>Online System</span> do for you </h2>

      <!-- 标题下方的装饰线 -->
      <div class="title-line-wrapper page1-line"></div>

      <!-- 特性列表组件 -->
      <list :data-source="features" />
    </div>
  </div>
</template>


<script>
import List from './List'
const featuresCN = [
  {
    title: '优雅美观',
    content: '基于 Ant Design 体系精心设计',
    src: 'https://gw.alipayobjects.com/zos/rmsportal/VriUmzNjDnjoFoFFZvuh.svg',
    color: '#13C2C2',
    shadowColor: 'rgba(19,194,194,.12)'
  },
  {
    title: '常见设计模式',
    content: '提炼自中后台应用的典型页面和场景',
    src: 'https://gw.alipayobjects.com/zos/rmsportal/smwQOoxCjXVbNAKMqvWk.svg',
    color: '#2F54EB',
    shadowColor: 'rgba(47,84,235,.12)'
  },
  {
    title: '最新技术栈',
    content: '使用 Vue/vuex/antd 等前端前沿技术开发',
    src: 'https://gw.alipayobjects.com/zos/rmsportal/hBbIHzUsSbSxrhoRFYzi.svg',
    color: '#F5222D',
    shadowColor: 'rgba(245,34,45,.12)'
  },
  {
    title: '响应式',
    content: '针对不同屏幕大小设计',
    src: 'https://gw.alipayobjects.com/zos/rmsportal/BISfzKcCNCYFmTYcUygW.svg',
    color: '#1AC44D',
    shadowColor: 'rgba(26,196,77,.12)'
  },
  {
    title: '最佳实践',
    content: '良好的工程实践助你持续产出高质量代码',
    src: 'https://gw.alipayobjects.com/zos/rmsportal/pbmKMSFpLurLALLNliUQ.svg',
    color: '#FA8C16',
    shadowColor: 'rgba(250,140,22,.12)'
  },
  {
    title: 'UI 测试',
    content: '自动化测试保障前端产品质量',
    src: 'https://gw.alipayobjects.com/zos/rmsportal/RpJIQitGbSCHwLMimybX.svg',
    color: '#1890FF',
    shadowColor: 'rgba(24,144,255,.12)'
  }
]

export default {
  // 组件名称
  name: 'Page1',

  // 注册使用的子组件
  components: {
    List
  },

  // 组件的数据
  data() {
    return {
      features: featuresCN // 初始化 features 数据，使用 featuresCN 数组
    }
  },

  // 组件创建时的生命周期钩子
  created() {
    this.updateFeatures() // 组件创建时更新 features 数据
  },

  // 组件方法
  methods: {
    // 更新 features 数据的方法
    updateFeatures() {
      const arr = featuresCN // 使用 featuresCN 数组
      const newArr = [[], [], []] // 创建一个包含三个空数组的新数组

      // 遍历原数组，将元素分配到三个子数组中
      arr.forEach((item, index) => {
        newArr[Math.floor(index / 3)].push(item)
      })

      // 更新 features 数据
      this.features = newArr
    }
  }
}

</script>
