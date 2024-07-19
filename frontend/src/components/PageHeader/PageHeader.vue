<template>
  <!-- 页面头部容器 -->
  <div class="page-header">
    <div class="page-header-index-wide">
      <!-- 面包屑导航组件 -->
      <s-breadcrumb />
      <div class="detail">
        <!-- 主要内容区域,根据路由meta决定是否隐藏 -->
        <div class="main" v-if="!$route.meta.hiddenHeaderContent">
          <div class="row">
            <!-- 如果有logo,显示logo -->
            <img v-if="logo" :src="logo" class="logo"/>
            <!-- 如果有标题,显示标题 -->
            <h1 v-if="title" class="title">{{ title }}</h1>
            <!-- 操作区域插槽 -->
            <div class="action">
              <slot name="action"></slot>
            </div>
          </div>
          <div class="row">
            <!-- 如果有头像,显示头像 -->
            <div v-if="avatar" class="avatar">
              <a-avatar :src="avatar" />
            </div>
            <!-- 内容插槽 -->
            <div v-if="this.$slots.content" class="headerContent">
              <slot name="content"></slot>
            </div>
            <!-- 额外信息插槽 -->
            <div v-if="this.$slots.extra" class="extra">
              <slot name="extra"></slot>
            </div>
          </div>
          <!-- 页面菜单插槽 -->
          <div>
            <slot name="pageMenu"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '../../components/tools/Breadcrumb'

export default {
  // 组件名称
  name: 'PageHeader',

  // 注册使用的子组件
  components: {
    's-breadcrumb': Breadcrumb
  },

  // 组件接收的属性
  props: {
    // 标题属性,可以是字符串或布尔值
    title: {
      type: [String, Boolean],
      default: true,
      required: false
    },
    // logo 图片的 URL
    logo: {
      type: String,
      default: '',
      required: false
    },
    // 头像图片的 URL
    avatar: {
      type: String,
      default: '',
      required: false
    }
  },

  // 组件的数据对象
  data () {
    return {}
  }
}

</script>

<style lang="less" scoped>
.page-header {
  background: #fff;
  padding: 16px 32px 0;
  border-bottom: 1px solid #e8e8e8;

  .breadcrumb {
    margin-bottom: 16px;
  }

  .detail {
    display: flex;
    /*margin-bottom: 16px;*/

    .avatar {
      flex: 0 1 72px;
      margin: 0 24px 8px 0;

      & > span {
        border-radius: 72px;
        display: block;
        width: 72px;
        height: 72px;
      }
    }

    .main {
      width: 100%;
      flex: 0 1 auto;

      .row {
        display: flex;
        width: 100%;

        .avatar {
          margin-bottom: 16px;
        }
      }

      .title {
        font-size: 20px;
        font-weight: 500;

        font-size: 20px;
        line-height: 28px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.85);
        margin-bottom: 16px;
        flex: auto;
      }
      .logo {
        width: 28px;
        height: 28px;
        border-radius: 4px;
        margin-right: 16px;
      }
      .content,
      .headerContent {
        flex: auto;
        color: rgba(0, 0, 0, 0.45);
        line-height: 22px;

        .link {
          margin-top: 16px;
          line-height: 24px;

          a {
            font-size: 14px;
            margin-right: 32px;
          }
        }
      }
      .extra {
        flex: 0 1 auto;
        margin-left: 88px;
        min-width: 242px;
        text-align: right;
      }
      .action {
        margin-left: 56px;
        min-width: 266px;
        flex: 0 1 auto;
        text-align: right;
        &:empty {
          display: none;
        }
      }
    }
  }
}

.mobile .page-header {
  .main {
    .row {
      flex-wrap: wrap;

      .avatar {
        flex: 0 1 25%;
        margin: 0 2% 8px 0;
      }

      .content,
      .headerContent {
        flex: 0 1 70%;

        .link {
          margin-top: 16px;
          line-height: 24px;

          a {
            font-size: 14px;
            margin-right: 10px;
          }
        }
      }

      .extra {
        flex: 1 1 auto;
        margin-left: 0;
        min-width: 0;
        text-align: right;
      }

      .action {
        margin-left: unset;
        min-width: 266px;
        flex: 0 1 auto;
        text-align: left;
        margin-bottom: 12px;

        &:empty {
          display: none;
        }
      }
    }
  }
}
</style>
