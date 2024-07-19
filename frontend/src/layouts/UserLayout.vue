<template>
  <!-- 用户布局组件 -->
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="container">
      <!-- 顶部区域 -->
      <div class="top">
        <!-- 头部区域 -->
        <div class="header">
          <a href="/">
            <!-- 网站 logo -->
            <img src="../assets/logo.svg" class="logo" alt="logo">
            <!-- 网站标题 -->
            <span class="title">Online Exam</span>
          </a>
        </div>
        <!-- 网站描述 -->
        <div class="desc">
          基于SpringBoot+Vue实现的在线考试系统
        </div>
      </div>

      <!-- 路由视图，用于显示子路由组件 -->
      <route-view></route-view>

      <!-- 页脚区域 -->
      <div class="footer">
        <!-- 相关链接 -->
        <div class="links">
          <a href="https://github.com/19920625lsg/spring-boot-online-exam" target="_blank">代码仓</a>
          <a href="https://19920625lsg.github.io" target="_blank">关于我</a>
          <a href="mailto:liangshanguang2@gmail.com">联系我</a>
        </div>
        <!-- 版权信息 -->
        <div class="copyright">
          Copyright &copy; 2020 Liang Shan Guang
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import RouteView from './RouteView'
import { mixinDevice } from '../utils/mixin'

export default {
  // 组件名称
  name: 'UserLayout',

  // 引入的子组件
  components: { RouteView },

  // 混入设备相关的方法和属性
  mixins: [mixinDevice],

  // 组件数据
  data () {
    return {}
  },

  // 组件挂载后的钩子函数
  mounted () {
    // 在 body 元素上添加 'userLayout' 类
    document.body.classList.add('userLayout')
  },

  // 组件销毁前的钩子函数
  beforeDestroy () {
    // 在组件销毁前，从 body 元素移除 'userLayout' 类
    document.body.classList.remove('userLayout')
  }
}

</script>

<style lang="less" scoped>
  #userLayout.user-layout-wrapper {
    height: 100%;

    &.mobile {
      .container {
        .main {
          max-width: 368px;
          width: 98%;
        }
      }
    }

    .container {
      width: 100%;
      min-height: 100%;
      background: #f0f2f5 url(../assets/background.svg) no-repeat 50%;
      background-size: 100%;
      padding: 110px 0 144px;
      position: relative;

      a {
        text-decoration: none;
      }

      .top {
        text-align: center;

        .header {
          height: 44px;
          line-height: 44px;

          .badge {
            position: absolute;
            display: inline-block;
            line-height: 1;
            vertical-align: middle;
            margin-left: -12px;
            margin-top: -10px;
            opacity: 0.8;
          }

          .logo {
            height: 44px;
            vertical-align: top;
            margin-right: 16px;
            border-style: none;
          }

          .title {
            font-size: 33px;
            color: rgba(0, 0, 0, .85);
            font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
            font-weight: 600;
            position: relative;
            top: 2px;
          }
        }

        .desc {
          font-size: 14px;
          color: rgba(0, 0, 0, 0.45);
          margin-top: 12px;
          margin-bottom: 40px;
        }
      }

      .main {
        min-width: 260px;
        width: 368px;
        margin: 0 auto;
      }

      .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 16px;
        margin: 48px 0 24px;
        text-align: center;

        .links {
          margin-bottom: 8px;
          font-size: 14px;

          a {
            color: rgba(0, 0, 0, 0.45);
            transition: all 0.3s;

            &:not(:last-child) {
              margin-right: 40px;
            }
          }
        }

        .copyright {
          color: rgba(0, 0, 0, 0.45);
          font-size: 14px;
        }
      }
    }
  }
</style>
