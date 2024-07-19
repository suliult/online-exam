<template>
  <!-- 模态框组件 -->
  <a-modal
    title="新建规则"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @ok="handleSubmit"
    @cancel="handleCancel"
  >
    <!-- 加载中状态包装器 -->
    <a-spin :spinning="confirmLoading">
      <!-- 表单组件 -->
      <a-form :form="form">
        <!-- 表单项：描述 -->
        <a-form-item
          label="描述"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <!-- 输入框组件 -->
          <a-input
            v-decorator="[
              'desc',
              {
                rules: [{
                  required: true,
                  min: 5,
                  message: '请输入至少五个字符的规则描述！'
                }]
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>


<script>
export default {
  // 组件的数据
  data() {
    return {
      // 标签列的响应式布局配置
      labelCol: {
        xs: { span: 24 },  // 在超小屏幕上占满宽度
        sm: { span: 7 }    // 在小屏幕及以上占 7 列
      },
      // 包装器列的响应式布局配置
      wrapperCol: {
        xs: { span: 24 },  // 在超小屏幕上占满宽度
        sm: { span: 13 }   // 在小屏幕及以上占 13 列
      },
      visible: false,      // 控制模态框的显示与隐藏
      confirmLoading: false,  // 控制确认按钮的加载状态

      // 创建表单实例
      form: this.$form.createForm(this)
    }
  },
  // 组件方法
  methods: {
    // 显示模态框
    add() {
      this.visible = true
    },
    // 处理表单提交
    handleSubmit() {
      const { form: { validateFields } } = this
      this.confirmLoading = true  // 开始加载

      // 验证表单字段
      validateFields((errors, values) => {
        if (!errors) {
          console.log('values', values)
          // 模拟异步操作
          setTimeout(() => {
            this.visible = false
            this.confirmLoading = false
            // 触发 'ok' 事件，并传递表单值
            this.$emit('ok', values)
          }, 1500)
        } else {
          this.confirmLoading = false
        }
      })
    },
    // 处理取消操作
    handleCancel() {
      this.visible = false
    }
  }
}

</script>
