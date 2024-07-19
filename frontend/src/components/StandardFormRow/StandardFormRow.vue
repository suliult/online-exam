<template>
  <div :class="[prefixCls, lastCls, blockCls, gridCls]">
    <!-- 主容器，应用动态类名 -->

    <!-- 标题部分，仅在提供 title 时显示 -->
    <div v-if="title" class="antd-pro-components-standard-form-row-index-label">
      <span>{{ title }}</span>
    </div>

    <!-- 内容部分，用于放置子元素 -->
    <div class="antd-pro-components-standard-form-row-index-content">
      <slot></slot>
    </div>
  </div>
</template>


<script>
const classes = [
  'antd-pro-components-standard-form-row-index-standardFormRowBlock',
  'antd-pro-components-standard-form-row-index-standardFormRowGrid',
  'antd-pro-components-standard-form-row-index-standardFormRowLast'
]
export default {
  name: 'StandardFormRow', // 组件名称
  props: {
    // 组件的属性定义
    prefixCls: {
      type: String,
      default: 'antd-pro-components-standard-form-row-index-standardFormRow'
      // 默认的CSS类名前缀
    },
    title: {
      type: String,
      default: undefined
      // 表单行的标题，可选
    },
    last: {
      type: Boolean
      // 是否为最后一行，影响样式
    },
    block: {
      type: Boolean
      // 是否为块级元素，影响样式
    },
    grid: {
      type: Boolean
      // 是否使用网格布局，影响样式
    }
  },
  computed: {
    // 计算属性，用于动态生成CSS类名
    lastCls () {
      // 如果是最后一行，返回对应的CSS类名
      return this.last ? classes[2] : null
    },
    blockCls () {
      // 如果是块级元素，返回对应的CSS类名
      return this.block ? classes[0] : null
    },
    gridCls () {
      // 如果使用网格布局，返回对应的CSS类名
      return this.grid ? classes[1] : null
    }
  }
}

</script>

<style lang="less" scoped>
@import '../index.less';

.antd-pro-components-standard-form-row-index-standardFormRow {
  display: flex;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px dashed @border-color-split;

  /deep/ .ant-form-item {
    margin-right: 24px;
  }
  /deep/ .ant-form-item-label label {
    margin-right: 0;
    color: @text-color;
  }
  /deep/ .ant-form-item-label,
  .ant-form-item-control {
    padding: 0;
    line-height: 32px;
  }

  .antd-pro-components-standard-form-row-index-label {
    flex: 0 0 auto;
    margin-right: 24px;
    color: @heading-color;
    font-size: @font-size-base;
    text-align: right;
    & > span {
      display: inline-block;
      height: 32px;
      line-height: 32px;
      &::after {
        content: '：';
      }
    }
  }

  .antd-pro-components-standard-form-row-index-content {
    flex: 1 1 0;
    /deep/ .ant-form-item:last-child {
      margin-right: 0;
    }
  }

  &.antd-pro-components-standard-form-row-index-standardFormRowLast {
    margin-bottom: 0;
    padding-bottom: 0;
    border: none;
  }

  &.antd-pro-components-standard-form-row-index-standardFormRowBlock {
    /deep/ .ant-form-item,
    div.ant-form-item-control-wrapper {
      display: block;
    }
  }

  &.antd-pro-components-standard-form-row-index-standardFormRowGrid {
      /deep/ .ant-form-item,
      div.ant-form-item-control-wrapper {
        display: block;
      }
      /deep/ .ant-form-item-label {
        float: left;
      }
  }
}

</style>
