<template>
  <!-- 两步验证模态框 -->
  <a-modal
    centered
    v-model="visible"
    @cancel="handleCancel"
    :maskClosable="false"
  >
    <!-- 模态框标题 -->
    <div slot="title" :style="{ textAlign: 'center' }">两步验证</div>

    <!-- 模态框底部按钮 -->
    <template slot="footer">
      <div :style="{ textAlign: 'center' }">
        <a-button key="back" @click="handleCancel">返回</a-button>
        <a-button key="submit" type="primary" :loading="stepLoading" @click="handleStepOk">
          继续
        </a-button>
      </div>
    </template>

    <!-- 模态框内容 -->
    <a-spin :spinning="stepLoading">
      <a-form layout="vertical" :auto-form-create="(form)=>{this.form = form}">
        <div class="step-form-wrapper">
          <!-- 提示信息 -->
          <p style="text-align: center" v-if="!stepLoading">请在手机中打开 Google Authenticator 或两步验证 APP<br />输入 6 位动态码</p>
          <p style="text-align: center" v-else>正在验证..<br/>请稍后</p>

          <!-- 验证码输入框 -->
          <a-form-item
            :style="{ textAlign: 'center' }"
            hasFeedback
            fieldDecoratorId="stepCode"
            :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入 6 位动态码!', pattern: /^\d{6}$/, len: 6 }]}"
          >
            <a-input :style="{ textAlign: 'center' }" @keyup.enter.native="handleStepOk" placeholder="000000" />
          </a-form-item>

          <!-- 遗失手机链接 -->
          <p style="text-align: center">
            <a @click="onForgeStepCode">遗失手机?</a>
          </p>
        </div>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
export default {
  // 组件属性定义
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  // 组件数据
  data () {
    return {
      stepLoading: false, // 控制加载状态
      form: null // 存储表单实例
    }
  },
  methods: {
    // 处理验证码提交
    handleStepOk () {
      const vm = this
      this.stepLoading = true // 开始加载
      // 验证表单字段
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('values', values)
          // 模拟异步操作
          setTimeout(() => {
            vm.stepLoading = false // 结束加载
            // 触发成功事件，传递表单值
            vm.$emit('success', { values })
          }, 2000)
          return
        }
        this.stepLoading = false // 验证失败，结束加载
        // 触发错误事件，传递错误信息
        this.$emit('error', { err })
      })
    },
    // 处理取消操作
    handleCancel () {
      this.visible = false // 关闭模态框
      this.$emit('cancel') // 触发取消事件
    },
    // 处理遗失手机的情况（待实现）
    onForgeStepCode () {
      // dai
    }
  }
}

</script>
<style lang="less" scoped>
  .step-form-wrapper {
    margin: 0 auto;
    width: 80%;
    max-width: 400px;
  }
</style>
