<template>
  <!-- 更新考试的模态框 -->
  <a-modal title="更新考试" :width="640" :visible="visible" :confirmLoading="confirmLoading" @cancel="handleCancel">
    <!-- 加载中状态包装器 -->
    <a-spin :spinning="confirmLoading">
      <!-- 步骤条，显示当前步骤 -->
      <a-steps :current="currentStep" :style="{ marginBottom: '28px' }" size="small">
        <a-step title="考试描述" />
        <a-step title="每题分数" />
        <a-step title="选择题目" />
      </a-steps>

      <!-- 表单 -->
      <a-form :form="form">
        <!-- 步骤1：考试描述 -->
        <div v-show="currentStep === 0">
          <!-- 考试名称输入 -->
          <a-form-item label="考试名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-model="name" />
          </a-form-item>
          <!-- 考试限时设置 -->
          <a-form-item label="考试限时" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input-number :min="1" :max="200" v-model="elapse" />
            分钟
          </a-form-item>
          <!-- 考试简述输入 -->
          <a-form-item label="考试简述" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-textarea :rows="2" v-model="desc"></a-textarea>
          </a-form-item>
          <!-- 考试封面提示 -->
          <a-form-item label="考试封面" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <p>直接点击列表图片修改，建议图片不要大于80*80</p>
          </a-form-item>
        </div>

        <!-- 步骤2：每题分数设置 -->
        <div v-show="currentStep === 1">
          <!-- 单选题分数 -->
          <a-form-item label="单选题" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input-number :min="1" :max="20" v-model="radioScore" />
            分
          </a-form-item>
          <!-- 多选题分数 -->
          <a-form-item label="多选题" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input-number :min="1" :max="20" v-model="checkScore" />
            分
          </a-form-item>
          <!-- 判断题分数 -->
          <a-form-item label="判断题" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input-number :min="1" :max="20" v-model="judgeScore" />
            分
          </a-form-item>
        </div>

        <!-- 步骤3：选择题目 -->
        <div v-show="currentStep === 2">
          <!-- 选择单选题 -->
          <a-form-item label="选择单选题" :labelCol="labelCol" :wrapperCol="wrapperCol" enterButton="Search">
            <a-select
              mode="multiple"
              :size="size"
              :default-value="defaultRadios"
              v-if="visible"
              placeholder="请选择单选题"
              style="width: 100%"
              @popupScroll="popupScroll"
              @change="handleRadioChange"
            >
              <a-select-option v-for="radio in radios" :value="radio.name" :key="radio.id">
                {{ radio.name }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <!-- 选择多选题 -->
          <a-form-item label="选择多选题" :labelCol="labelCol" :wrapperCol="wrapperCol" enterButton="Search">
            <a-select
              mode="multiple"
              :size="size"
              :default-value="defaultChecks"
              v-if="visible"
              placeholder="请选择多选题"
              style="width: 100%"
              @popupScroll="popupScroll"
              @change="handleCheckChange"
            >
              <a-select-option v-for="check in checks" :value="check.name" :key="check.id">
                {{ check.name }}
              </a-select-option>
            </a-select>
          </a-form-item>

          <!-- 选择判断题 -->
          <a-form-item label="选择判断题" :labelCol="labelCol" :wrapperCol="wrapperCol" enterButton="Search">
            <a-select
              mode="multiple"
              :size="size"
              :default-value="defaultJudges"
              v-if="visible"
              placeholder="请选择判断题"
              style="width: 100%"
              @popupScroll="popupScroll"
              @change="handleJudgeChange">
              <a-select-option v-for="judge in judges" :value="judge.name" :key="judge.id">
                {{ judge.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
        </div>
      </a-form>
    </a-spin>

    <!-- 模态框底部按钮 -->
    <template slot="footer">
      <a-button key="back" @click="backward" v-if="currentStep > 0" :style="{ float: 'left' }">上一步</a-button>
      <a-button key="cancel" @click="handleCancel">取消</a-button>
      <a-button key="forward" :loading="confirmLoading" type="primary" @click="handleNext(currentStep)">
        {{ currentStep === 2 && '完成' || '下一步' }}
      </a-button>
    </template>
  </a-modal>
</template>


<script>
import { getExamQuestionTypeList, examUpdate } from '../../../api/exam'

const stepForms = [
  ['name', 'elapse', 'desc', 'avatar'],
  ['radioScore', 'checkScore', 'judgeScore'],
  ['option']
]

export default {
  name: 'ExamEditModal',
  data () {
    return {
      // 表单布局配置
      labelCol: { xs: { span: 24 }, sm: { span: 7 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 13 } },
      size: 'default',

      visible: false, // 控制模态框显示
      confirmLoading: false, // 控制确认按钮加载状态
      currentStep: 0, // 当前步骤
      mdl: {}, // 模型对象
      form: this.$form.createForm(this), // 创建表单实例

      // 考试相关数据
      exam: {}, // 考试对象
      name: '', // 考试名称
      elapse: 0, // 考试时长
      desc: '', // 考试描述
      avatar: '', // 考试头像
      radioScore: 0, // 单选题分数
      checkScore: 0, // 多选题分数
      judgeScore: 0, // 判断题分数

      // 题目列表
      radios: [], // 单选题列表
      checks: [], // 多选题列表
      judges: [], // 判断题列表

      // 默认选中的题目
      defaultRadios: [],
      defaultChecks: [],
      defaultJudges: []
    }
  },
  methods: {
    // 编辑考试
    edit (exam) {
      Object.assign(this.exam, exam) // 深度拷贝考试对象
      this.visible = true

      // 重置数据
      this.resetData()

      // 设置考试基本信息
      this.setExamInfo(exam)

      // 获取题目列表
      this.fetchQuestionList()
    },

    // 重置数据
    resetData() {
      this.radios = []
      this.checks = []
      this.judges = []
      this.defaultRadios = []
      this.defaultChecks = []
      this.defaultJudges = []
    },

    // 设置考试基本信息
    setExamInfo(exam) {
      this.name = exam.name
      this.elapse = exam.elapse
      this.desc = exam.desc
      this.avatar = exam.avatar
      this.radioScore = exam.radioScore
      this.checkScore = exam.checkScore
      this.judgeScore = exam.judgeScore
    },

    // 获取题目列表
    fetchQuestionList() {
      const that = this
      getExamQuestionTypeList().then(res => {
        if (res.code !== 0) {
          that.$notification.error({
            message: '获取问题列表失败',
            description: res.msg
          })
          return
        }

        that.radios = res.data.radios
        that.checks = res.data.checks
        that.judges = res.data.judges

        // 设置默认选中的题目
        that.setDefaultQuestions()
      }).catch(err => {
        that.$notification.error({
          message: '获取问题列表失败',
          description: err.message
        })
      })
    },

    // 设置默认选中的题目
    setDefaultQuestions() {
      this.setDefaultQuestionsByType('radios')
      this.setDefaultQuestionsByType('checks')
      this.setDefaultQuestionsByType('judges')
    },

    // 根据题目类型设置默认选中的题目
    setDefaultQuestionsByType(type) {
      const that = this
      that.exam[type].forEach(question => {
        that[`default${type.charAt(0).toUpperCase() + type.slice(1)}`].push(question.name)
      })
      that[`handle${type.charAt(0).toUpperCase() + type.slice(1)}Change`](that[`default${type.charAt(0).toUpperCase() + type.slice(1)}`])
    },

    popupScroll () {
      console.log('popupScroll')
    },

    // 处理下一步或完成事件
    handleNext (step) {
      const { form: { validateFields } } = this
      const currentStep = step + 1
      if (currentStep <= 2) {
        // 验证当前步骤的表单
        validateFields(stepForms[this.currentStep], (errors, values) => {
          if (!errors) {
            this.currentStep = currentStep
          }
        })
        return
      }

      // 最后一步，提交考试更新
      this.submitExamUpdate()
    },

    // 提交考试更新
    submitExamUpdate() {
      this.confirmLoading = true
      this.updateExamData()

      const that = this
      examUpdate(that.exam).then(res => {
        that.confirmLoading = false
        if (res.code === 0) {
          that.$notification.success({
            message: '更新成功',
            description: '考试更新成功'
          })
          that.closeModal()
          that.$emit('ok')
        }
      }).catch(err => {
        that.confirmLoading = false
        that.$notification.error({
          message: '考试更新失败',
          description: err.message
        })
      })
    },

    // 更新考试数据
    updateExamData() {
      this.exam.name = this.name
      this.exam.elapse = this.elapse
      this.exam.desc = this.desc
      this.exam.avatar = this.avatar
      this.exam.radioScore = this.radioScore
      this.exam.checkScore = this.checkScore
      this.exam.judgeScore = this.judgeScore
      this.exam.radios = this.radios
      this.exam.checks = this.checks
      this.exam.judges = this.judges
    },

    // 关闭模态框
    closeModal() {
      this.visible = false
      this.currentStep = 0
    },

    backward () {
      this.currentStep--
    },

    handleCancel () {
      this.closeModal()
    },

    // 处理题目选择变化
    handleQuestionChange(values, type) {
      this[type].forEach(question => {
        question.checked = values.includes(question.name)
      })
    },

    // 处理单选题选择变化
    handleRadioChange (values) {
      this.handleQuestionChange(values, 'radios')
    },

    // 处理多选题选择变化
    handleCheckChange (values) {
      this.handleQuestionChange(values, 'checks')
    },

    // 处理判断题选择变化
    handleJudgeChange (values) {
      this.handleQuestionChange(values, 'judges')
    }
  }
}

</script>
