<template>
  <div class="main">
    <!-- 登录表单 -->
    <a-form
      id="formLogin"
      class="user-layout-login"
      ref="formLogin"
      :form="form"
      @submit="handleSubmit"
    >
      <!-- 标签页组件 -->
      <a-tabs
        :activeKey="customActiveKey"
        :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }"
        @change="handleTabClick"
      >
        <!-- 登录标签页 -->
        <a-tab-pane key="tab1" tab="在线考试系统登录">
          <!-- 用户名输入框 -->
          <a-form-item>
            <a-input
              size="large"
              type="text"
              placeholder="请输入帐户名/邮箱/手机号"
              v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入帐户名/邮箱/手机号' }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
              ]"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>

          <!-- 密码输入框 -->
          <a-form-item>
            <a-input
              size="large"
              type="password"
              autocomplete="false"
              placeholder="请输入密码"
              v-decorator="[
                'password',
                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
              ]"
            >
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
        </a-tab-pane>
      </a-tabs>

      <!-- 自动登录选项和注册链接 -->
      <a-form-item>
        <a-checkbox v-decorator="['rememberMe']">自动登录</a-checkbox>
        <router-link class="register" :to="{ name: 'register' }" style="float: right;">注册账户</router-link>
      </a-form-item>

      <!-- 登录按钮 -->
      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="state.loginBtn"
          :disabled="state.loginBtn"
        >确定
        </a-button>
      </a-form-item>
    </a-form>

    <!-- 两步验证组件 -->
    <two-step-captcha
      v-if="requiredTwoStepCaptcha"
      :visible="stepCaptchaVisible"
      @success="stepCaptchaSuccess"
      @cancel="stepCaptchaCancel"
    ></two-step-captcha>
  </div>
</template>


<script>
import TwoStepCaptcha from '../../components/tools/TwoStepCaptcha'
import { mapActions } from 'vuex'
import { timeFix } from '../../utils/util'
import { getSmsCaptcha, get2step } from '../../api/login'

export default {
  components: {
    TwoStepCaptcha // 两步验证组件
  },
  data () {
    return {
      customActiveKey: 'tab1', // 当前激活的标签页
      loginBtn: false, // 登录按钮状态
      loginType: 0, // 登录类型：0 邮箱, 1 用户名, 2 电话
      requiredTwoStepCaptcha: false, // 是否需要两步验证
      stepCaptchaVisible: false, // 两步验证是否可见
      form: this.$form.createForm(this), // 创建表单实例
      state: {
        time: 60, // 倒计时时间
        loginBtn: false, // 登录按钮状态
        loginType: 0, // 登录类型
        smsSendBtn: false // 发送短信按钮状态
      }
    }
  },
  created () {
    // 获取是否需要两步验证
    get2step({})
      .then(res => {
        this.requiredTwoStepCaptcha = res.result.stepCode
      })
      .catch(() => {
        this.requiredTwoStepCaptcha = false
      })
  },
  methods: {
    ...mapActions(['Login', 'Logout']), // 从 Vuex 映射 actions

    // 处理用户名或邮箱输入
    handleUsernameOrEmail (rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      state.loginType = regex.test(value) ? 0 : 1 // 设置登录类型
      callback()
    },

    // 处理标签页点击
    handleTabClick (key) {
      this.customActiveKey = key
    },

    // 处理表单提交
    handleSubmit (e) {
      e.preventDefault()
      const { form: { validateFields }, state, customActiveKey, Login } = this

      state.loginBtn = true

      const validateFieldsKey = customActiveKey === 'tab1' ? ['username', 'password'] : ['mobile', 'captcha']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        console.log(values) // 打印用户的登录参数
        if (!err) {
          const loginParams = {} // 声明登录的参数
          // delete loginParams.username
          // loginParams[!state.loginType ? 'email' : 'username'] = values.username
          loginParams.loginType = state.loginType // 登录类型，0 email, 1 username
          loginParams.userInfo = values.username // 设置用户信息，因为email还是username不确定，所以用userinfo字段来代替
          loginParams.password = values.password // 用户的密码，无加密
          console.log(loginParams)
          Login(loginParams) // 请求登录接口
            .then((res) => this.loginSuccess(res)) // 成功
            .catch(err => this.requestFailed(err)) // 失败
            .finally(() => {
              state.loginBtn = false // 不管登录成功与否，都要把按钮置灰，防止用户重复点击
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },

    // 获取短信验证码
    getCaptcha (e) {
      // ... (省略代码，处理获取短信验证码逻辑)
    },

    // 两步验证成功
    stepCaptchaSuccess () {
      this.loginSuccess()
    },

    // 取消两步验证
    stepCaptchaCancel () {
      this.Logout().then(() => {
        this.loginBtn = false
        this.stepCaptchaVisible = false
      })
    },

    // 登录成功处理
    loginSuccess (res) {
      console.log(res)
      this.$router.push({ name: 'dashboard' })
      setTimeout(() => {
        this.$notification.success({
          message: '欢迎',
          description: `${timeFix()}，欢迎回来`
        })
      }, 1000)
    },

    // 请求失败处理
    requestFailed (err) {
      this.$notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '用户名或密码错误',
        duration: 4
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .user-layout-login {
    label {
      font-size: 14px;
    }

    .getCaptcha {
      display: block;
      width: 100%;
      height: 40px;
    }

    .forge-password {
      font-size: 14px;
    }

    button.login-button {
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;
    }

    .user-login-other {
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .item-icon {
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: #1890ff;
        }
      }

      .register {
        float: right;
      }
    }
  }
</style>
