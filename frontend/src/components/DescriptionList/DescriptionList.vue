<template>
  <!-- 主容器，根据 size 和 layout 属性动态设置类名 -->
  <div :class="['description-list', size, layout === 'vertical' ? 'vertical': 'horizontal']">
    <!-- 如果有标题，则显示标题 -->
    <div v-if="title" class="title">{{ title }}</div>
    <!-- 使用 a-row 组件作为列表项的容器 -->
    <a-row>
      <slot></slot>
    </a-row>
  </div>
</template>

<script>
import { Col } from 'ant-design-vue/es/grid/'

// 定义 DetailListItem 组件
const Item = {
  name: 'DetailListItem',
  props: {
    term: {
      type: String,
      default: '',
      required: false
    }
  },
  inject: {
    col: {
      type: Number
    }
  },
  render () {
    return (
      <Col {...{ props: responsive[this.col] }}>
        <div class="term">{this.$props.term}</div>
        <div class="content">{this.$slots.default}</div>
      </Col>
    )
  }
}

// 响应式布局配置
const responsive = {
  1: { xs: 24 },
  2: { xs: 24, sm: 12 },
  3: { xs: 24, sm: 12, md: 8 },
  4: { xs: 24, sm: 12, md: 6 }
}

export default {
  name: 'DetailList',
  Item: Item, // 将 Item 组件作为 DetailList 的子组件
  components: {
    Col
  },
  props: {
    title: {
      type: String,
      default: '',
      required: false
    },
    col: {
      type: Number,
      required: false,
      default: 3
    },
    size: {
      type: String,
      required: false,
      default: 'large'
    },
    layout: {
      type: String,
      required: false,
      default: 'horizontal'
    }
  },
  provide () {
    // 为子组件提供 col 值
    return {
      col: this.col > 4 ? 4 : this.col
    }
  }
}
</script>

<style lang="less" scoped>
.description-list {
  .title {
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 16px;
  }

  /deep/ .term {
    color: rgba(0, 0, 0, .85);
    display: table-cell;
    line-height: 20px;
    margin-right: 8px;
    padding-bottom: 16px;
    white-space: nowrap;

    &:not(:empty):after {
      content: ":";
      margin: 0 8px 0 2px;
      position: relative;
      top: -.5px;
    }
  }

  /deep/ .content {
    color: rgba(0, 0, 0, .65);
    display: table-cell;
    min-height: 22px;
    line-height: 22px;
    padding-bottom: 16px;
    width: 100%;

    &:empty {
      content: ' ';
      height: 38px;
      padding-bottom: 16px;
    }
  }

  // 小尺寸样式
  &.small {
    // ...
  }

  // 大尺寸样式
  &.large {
    // ...
  }

  // 垂直布局样式
  &.vertical {
    // ...
  }
}
</style>
