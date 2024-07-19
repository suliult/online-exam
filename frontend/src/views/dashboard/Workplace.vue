<template>
  <page-view :avatar="avatar" :title="false">
    <a-row :gutter="16">
      <a-col>
        <!-- 轮播图组件 -->
        <a-carousel :afterChange="onChange" autoplay>
          <div><img src="https://i.loli.net/2019/11/02/qgXokaYh4bINzUP.jpg" class="carousel-img" alt=""></div>
          <div><img src="https://i.loli.net/2019/11/02/stbkA5xBDejJ2If.jpg" class="carousel-img" alt=""></div>
          <div><img src="https://i.loli.net/2019/11/02/6KOX21wl8CTkfQS.jpg" class="carousel-img" alt=""></div>
          <div><img src="https://i.loli.net/2019/11/02/uvCyWOmreo47Txw.jpg" class="carousel-img" alt=""></div>
        </a-carousel>
      </a-col>
    </a-row>
    <a-row :gutter="16">
      <a-col :span="6">
        <!-- 卡片组件 -->
        <a-card hoverable style="width: 100%;height: 100%">
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            slot="cover"
          />
          <a-card-meta title="卡片标题" description="这是描述">
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-card-meta>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card hoverable style="width: 100%;height: 100%">
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            slot="cover"
          />
          <a-card-meta title="卡片标题" description="这是描述">
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-card-meta>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card hoverable style="width: 100%;height: 100%">
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            slot="cover"
          />
          <a-card-meta title="卡片标题" description="这是描述">
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-card-meta>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card hoverable style="width: 100%;height: 100%">
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
            slot="cover"
          />
          <a-card-meta title="卡片标题" description="这是描述">
            <a-avatar
              slot="avatar"
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            />
          </a-card-meta>
        </a-card>
      </a-col>
    </a-row>
  </page-view>
</template>

<script>

import { PageView } from '../../layouts'

export default {
  // 组件名称
  name: 'Workplace',

  // 引入的子组件
  components: {
    PageView
  },

  // 组件数据
  data () {
    return {
      avatar: '' // 头像URL
    }
  },

  // 计算属性
  computed: {},

  // 组件创建时的钩子函数
  created () {
    // 组件创建时的逻辑可以放在这里
  },

  // 组件挂载到DOM后的钩子函数
  mounted () {
    // 组件挂载后的逻辑可以放在这里
  },

  // 组件方法
  methods: {
    // 轮播图变化时的回调函数
    onChange (a, b, c) {
      console.log(a, b, c) // 打印轮播图变化的相关参数
    }
  }
}
</script>

<style scoped>
  .carousel-img {
    width: 100%;
    height: 100%;
  }
</style>
