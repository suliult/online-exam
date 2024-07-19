<template>
  <!-- 结果展示组件 -->
  <div class="result">
    <!-- 图标部分 -->
    <div>
      <a-icon
        :class="{ 'icon': true, [`${type}`]: true }"
        :type="localIsSuccess ? 'check-circle' : 'close-circle'"
      />
    </div>

    <!-- 标题部分 -->
    <div class="title">
      <slot name="title">
        {{ title }}
      </slot>
    </div>

    <!-- 描述部分 -->
    <div class="description">
      <slot name="description">
        {{ description }}
      </slot>
    </div>

    <!-- 额外内容部分,只有在有默认插槽内容时才显示 -->
    <div class="extra" v-if="$slots.default">
      <slot></slot>
    </div>

    <!-- 操作部分,只有在有名为action的插槽内容时才显示 -->
    <div class="action" v-if="$slots.action">
      <slot name="action"></slot>
    </div>
  </div>
</template>


<script>
const resultEnum = ['success', 'error']

export default {
  name: 'Result',
  props: {
    /** @Deprecated 已废弃的属性,建议使用 type 替代 */
    isSuccess: {
      type: Boolean,
      default: false
    },
    // 结果类型,用于决定显示的图标和样式
    type: {
      type: String,
      default: resultEnum[0], // 默认使用 resultEnum 的第一个值
      validator (val) {
        // 验证输入的 type 是否在预定义的 resultEnum 中
        return (val) => resultEnum.includes(val)
      }
    },
    // 结果标题
    title: {
      type: String,
      default: ''
    },
    // 结果描述
    description: {
      type: String,
      default: ''
    }
  },
  computed: {
    // 计算属性: 根据 type 判断是否为成功状态
    localIsSuccess: function () {
      return this.type === resultEnum[0] // 假设 resultEnum[0] 代表成功状态
    }
  }
}

</script>

<style lang="less" scoped>
  .result {
    text-align: center;
    width: 72%;
    margin: 0 auto;
    padding: 24px 0 8px;

    .icon {
      font-size: 72px;
      line-height: 72px;
      margin-bottom: 24px;
    }
    .success {
      color: #52c41a;
    }
    .error {
      color: red;
    }
    .title {
      font-size: 24px;
      color: rgba(0, 0, 0, .85);
      font-weight: 500;
      line-height: 32px;
      margin-bottom: 16px;
    }
    .description {
      font-size: 14px;
      line-height: 22px;
      color: rgba(0, 0, 0, 0.45);
      margin-bottom: 24px;
    }
    .extra {
      background: #fafafa;
      padding: 24px 40px;
      border-radius: 2px;
      text-align: left;
    }
    .action {
      margin-top: 32px;
    }
  }

  .mobile {
    .result {
      width: 100%;
      margin: 0 auto;
      padding: unset;
    }
  }
</style>
