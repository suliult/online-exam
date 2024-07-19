<template>
  <div class="main user-layout-register">
    <h3><span>注册</span></h3>
    <!-- 注册表单 -->
    <a-form ref="formRegister" :form="form" id="formRegister">
      <!-- 邮箱输入框 -->
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="邮箱"
          v-decorator="['email', {rules: [{ required: true, type: 'email', message: '请输入邮箱地址' }], validateTrigger: ['change', 'blur']}]"
        ></a-input>
      </a-form-item>

      <!-- 密码强度提示弹出框 -->
      <a-popover placement="rightTop" trigger="click" :visible="state.passwordLevelChecked">
        <template slot="content">
          <div :style="{ width: '240px' }">
            <!-- 密码强度显示 -->
            <div :class="['user-register', passwordLevelClass]">强度：<span>{{ passwordLevelName }}</span></div>
            <a-progress :percent="state.percent" :showInfo="false" :strokeColor=" passwordLevelColor "/>
            <div style="margin-top: 10px;">
              <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
            </div>
          </div>
        </template>
        <!-- 密码输入框 -->
        <a-form-item>
          <a-input
            size="large"
            type="password"
            @click="handlePasswordInputClick"
            autocomplete="false"
            placeholder="至少6位密码，区分大小写"
            v-decorator="['password', {rules: [{ required: true, message: '至少6位密码，区分大小写'}, { validator: this.handlePasswordLevel }], validateTrigger: ['change', 'blur']}]"
          ></a-input>
        </a-form-item>
      </a-popover>

      <!-- 确认密码输入框 -->
      <a-form-item>
        <a-input
          size="large"
          type="password"
          autocomplete="false"
          placeholder="确认密码"
          v-decorator="['password2', {rules: [{ required: true, message: '至少6位密码，区分大小写' }, { validator: this.handlePasswordCheck }], validateTrigger: ['change', 'blur']}]"
        ></a-input>
      </a-form-item>

      <!-- 手机号输入框 -->
      <a-form-item>
        <a-input
          size="large"
          placeholder="11 位手机号"
          v-decorator="['mobile', {rules: [{ required: true, message: '请输入正确的手机号', pattern: /^1[3456789]\d{9}$/ }, { validator: this.handlePhoneCheck } ], validateTrigger: ['change', 'blur'] }]"
        >
          <!-- 国际区号选择 -->
          <a-select slot="addonBefore" size="large" defaultValue="+86">
            <a-select-option value="+86">+86</a-select-option>
            <a-select-option value="+87">+87</a-select-option>
          </a-select>
        </a-input>
      </a-form-item>

      <!-- 验证码输入和获取 -->
      <a-row :gutter="16">
        <a-col class="gutter-row" :span="16">
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="验证码"
              v-decorator="['captcha', {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}]"
            >
              <a-icon slot="prefix" type="mail" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <!-- 获取验证码按钮 -->
          <a-button
            class="getCaptcha"
            size="large"
            :disabled="state.smsSendBtn"
            @click.stop.prevent="getCaptcha"
          >
            {{ state.smsSendBtn ? `${state.time} s` : '获取验证码' }}
          </a-button>
        </a-col>
      </a-row>

      <!-- 注册按钮和登录链接 -->
      <a-form-item>
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="register-button"
          :loading="registerBtn"
          @click.stop.prevent="handleSubmit"
          :disabled="registerBtn">注册
        </a-button>
        <router-link class="login" :to="{ name: 'login' }">使用已有账户登录</router-link>
      </a-form-item>

    </a-form>
  </div>
</template>

<script>
import { mixinDevice } from '../../utils/mixin.js'
import { register } from '../../api/user'
import axios from 'axios'
const levelNames = {
  0: '低',
  1: '低',
  2: '中',
  3: '强'
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success'
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a'
}
let code = '初始值'
export default {
  name: 'Register',
  components: {},
  mixins: [mixinDevice],
  data () {
    return {
      form: this.$form.createForm(this),

      state: {
        time: 60,                 // 验证码倒计时
        smsSendBtn: false,        // 是否禁用发送验证码按钮
        passwordLevel: 0,         // 密码强度等级
        passwordLevelChecked: false, // 是否显示密码强度提示
        percent: 10,              // 密码强度进度条百分比
        progressColor: '#FF0000'  // 密码强度进度条颜色
      },
      registerBtn: false          // 是否禁用注册按钮
    }
  },
  computed: {
    // 计算密码强度等级对应的样式类
    passwordLevelClass () {
      return levelClass[this.state.passwordLevel]
    },
    // 计算密码强度等级对应的名称
    passwordLevelName () {
      return levelNames[this.state.passwordLevel]
    },
    // 计算密码强度等级对应的颜色
    passwordLevelColor () {
      return levelColor[this.state.passwordLevel]
    }
  },
  methods: {
    // 处理密码强度检查
    handlePasswordLevel (rule, value, callback) {
      let level = 0

      // 判断密码中是否包含数字、字母和特殊字符
      if (/[0-9]/.test(value)) level++
      if (/[a-zA-Z]/.test(value)) level++
      if (/[^0-9a-zA-Z_]/.test(value)) level++

      this.state.passwordLevel = level
      this.state.percent = level * 30

      // 根据密码强度决定是否通过验证
      if (level >= 2) {
        if (level >= 3) this.state.percent = 100
        callback()
      } else {
        if (level === 0) this.state.percent = 10
        callback(new Error('密码强度不够'))
      }
    },

    // 检查两次输入的密码是否一致
    handlePasswordCheck (rule, value, callback) {
      const password = this.form.getFieldValue('password')
      if (value === undefined) {
        callback(new Error('请输入密码'))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error('两次密码不一致'))
      }
      callback()
    },

    // 手机号检查（此处未实现具体逻辑）
    handlePhoneCheck (rule, value, callback) {
      callback()
    },

    // 处理密码输入框点击事件
    handlePasswordInputClick () {
      this.state.passwordLevelChecked = !this.isMobile()
    },

    // 处理表单提交
    handleSubmit () {
      const captcha = this.form.getFieldValue('captcha')
      console.log('接收到的code:' + code)
      console.log('输入的code:' + captcha)
      if (captcha !== code) {
        console.log('验证码错误')
        alert(Error('验证码错误'))
      } else {
        const { form: { validateFields }, $router, $message } = this
        validateFields({ force: true }, (err, values) => {
          if (!err) {
            register(values).then(res => {
              // 注册成功，跳转到结果页面
              console.log(res)
              $router.push({ name: 'registerResult', params: { ...values } })
            }).catch(() => {
              // 注册失败，显示错误消息
              $message.error('请勿重复创建用户')
            })
          }
        })
      }
    },

    // 获取验证码
    async getCaptcha () {
      if (this.state.smsSendBtn) return

      // 开始倒计时
      this.state.smsSendBtn = true
      const interval = setInterval(() => {
        this.state.time--
        if (this.state.time === 0) {
          clearInterval(interval)
          this.state.time = 60
          this.state.smsSendBtn = false
        }
      }, 1000)

      // 生成随机验证码
      code = ''
      const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
      for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length)
        code += chars[randomIndex]
      }

      // 发送验证码到用户邮箱
      try {
        const response = await axios.post('http://localhost:9527/api/user/sendSMS', {
          email: this.form.getFieldValue('email'),
          code: code
        })
        console.log('验证码发送成功:', response.data)
      } catch (error) {
        console.error('验证码发送失败:', error)
      }
    }
  }
}
</script>
<style lang="less">
  .user-register {

    &.error {
      color: #ff0000;
    }

    &.warning {
      color: #ff7e05;
    }

    &.success {
      color: #52c41a;
    }

  }

  .user-layout-register {
    .ant-input-group-addon:first-child {
      background-color: #fff;
    }
  }
</style>
<style lang="less" scoped>
  .user-layout-register {

    & > h3 {
      font-size: 16px;
      margin-bottom: 20px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .register-button {
      width: 50%;
    }

    .login {
      float: right;
      line-height: 40px;
    }
  }
</style>
