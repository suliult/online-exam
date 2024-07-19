<template>
  <div class="exception">
    <!-- 左侧图片区域 -->
    <div class="imgBlock">
      <!-- 根据错误类型动态设置背景图片 -->
      <div class="imgEle" :style="{backgroundImage: `url(${config[type].img})`}">
      </div>
    </div>
    <!-- 右侧内容区域 -->
    <div class="content">
      <!-- 错误标题 -->
      <h1>{{ config[type].title }}</h1>
      <!-- 错误描述 -->
      <div class="desc">{{ config[type].desc }}</div>
      <!-- 操作按钮区域 -->
      <div class="actions">
        <!-- 返回首页按钮 -->
        <a-button type="primary" @click="handleToHome">返回首页</a-button>
      </div>
    </div>
  </div>
</template>

<script>
// 导入错误类型配置
import types from './type'

export default {
  name: 'Exception',
  props: {
    // 接收错误类型作为属性
    type: {
      type: String,
      default: '404' // 默认为404错误
    }
  },
  data () {
    return {
      config: types // 将错误类型配置赋值给config
    }
  },
  methods: {
    // 处理返回首页的点击事件
    handleToHome () {
      // 使用Vue Router导航到dashboard页面
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>

<style lang="less">
@import "~ant-design-vue/lib/style/index";

.exception {
  display: flex;
  align-items: center;
  height: 80%;
  min-height: 500px;

  .imgBlock {
    flex: 0 0 62.5%;
    width: 62.5%;
    padding-right: 152px;
    zoom: 1;
    &::before,
    &::after {
      content: ' ';
      display: table;
    }
    &::after {
      clear: both;
      height: 0;
      font-size: 0;
      visibility: hidden;
    }
  }

  .imgEle {
    float: right;
    width: 100%;
    max-width: 430px;
    height: 360px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: contain;
  }

  .content {
    flex: auto;

    h1 {
      margin-bottom: 24px;
      color: #434e59;
      font-weight: 600;
      font-size: 72px;
      line-height: 72px;
    }

    .desc {
      margin-bottom: 16px;
      color: @text-color-secondary;
      font-size: 20px;
      line-height: 28px;
    }

    .actions {
      button:not(:last-child) {
        margin-right: 8px;
      }
    }
  }
}

@media screen and (max-width: @screen-xl) {
  .exception {
    .imgBlock {
      padding-right: 88px;
    }
  }
}

@media screen and (max-width: @screen-sm) {
  .exception {
    display: block;
    text-align: center;
    .imgBlock {
      margin: 0 auto 24px;
      padding-right: 0;
    }
  }
}

@media screen and (max-width: @screen-xs) {
  .exception {
    .imgBlock {
      margin-bottom: -24px;
      overflow: hidden;
    }
  }
}
</style>
