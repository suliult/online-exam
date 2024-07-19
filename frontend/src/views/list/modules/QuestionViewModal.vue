<template>
  <!-- 题目信息模态框 -->
  <a-modal
    title="题目信息"
    :width="640"
    :visible="visible"
    :confirmLoading="confirmLoading"
    @cancel="handleCancel"
  >
    <!-- 加载中状态 -->
    <a-spin :spinning="confirmLoading">
      <a-form :form="form">
        <!-- 题干部分 -->
        <h3><b>题干：</b></h3>
        <!-- 使用v-html渲染题干内容，支持HTML格式 -->
        <div v-html="question.name"></div>
        <br>

        <!-- 选项部分 -->
        <h3><b>选项：</b></h3>
        <ul>
          <!-- 遍历并显示所有选项 -->
          <li v-for="option in question.options" :key="option.id" v-html="option.content"/>
        </ul>
        <br>

        <!-- 答案部分 -->
        <h3><b>答案：</b></h3>
        <ul>
          <!-- 遍历选项，只显示正确答案 -->
          <li v-for="option in question.options" :key="option.id" v-show="option.answer===true" v-html="option.content"/>
        </ul>
        <br>

        <!-- 解析部分 -->
        <h3><b>解析：</b></h3>
        <!-- 使用v-html渲染解析内容，支持HTML格式 -->
        <div v-html="question.description"></div>
      </a-form>
    </a-spin>

    <!-- 模态框底部按钮 -->
    <template slot="footer">
      <a-button key="cancel" @click="handleCancel">关闭</a-button>
    </template>
  </a-modal>
</template>


<script>

export default {
  // 问题查看的弹出框，用于查看问题/修改问题
  name: 'QuestionViewModal',
  data () {
    return {
      visible: false,
      confirmLoading: false,

      form: this.$form.createForm(this),
      // 每个问题
      question: {},
      options: [],
      answerOption: ''
    }
  },
  methods: {
    edit (record) {
      this.visible = true
      // 把当前的记录赋值到data中的变量
      this.question = record
    },

    handleCancel () {
      // clear form & currentStep
      this.visible = false
    }
  }
}
</script>
