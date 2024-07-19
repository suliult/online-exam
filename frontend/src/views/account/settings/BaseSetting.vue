<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <a-form layout="vertical" @submit.prevent="handleSubmit">
          <a-form-item
            label="用户名"
            required
            :validate-status="usernameError ? 'error' : ''"
            :help="usernameError"
          >
            <a-input
              v-model="userInfo.username"
              placeholder="输入用户名"
              @blur="validateUsername"
            />
          </a-form-item>
          <a-form-item label="描述">
            <a-input v-model="userInfo.userDescription" placeholder="简短的个人描述" />
          </a-form-item>
          <a-form-item
            label="电子邮件"
            required
            :validate-status="emailError ? 'error' : ''"
            :help="emailError"
          >
            <a-input
              v-model="userInfo.userEmail"
              placeholder="exp@admin.com"
              @blur="validateEmail"
            />
          </a-form-item>
          <a-form-item
            label="登录密码"
            required
            :validate-status="passwordError ? 'error' : ''"
            :help="passwordError"
          >
            <a-input
              v-model="userInfo.userPassword"
              type="password"
              placeholder="请输入密码"
              @blur="validatePassword"
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">更新信息</a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <!--      <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">-->
      <!--        <div class="ant-upload-preview" @click="$refs.modal.edit(1)">-->
      <!--          <a-icon type="cloud-upload-o" class="upload-icon"/>-->
      <!--          <div class="mask">-->
      <!--            <a-icon type="plus" />-->
      <!--          </div>-->
      <!--          <img :src="option.img"/>-->
      <!--        </div>-->
      <!--      </a-col>-->
    </a-row>
    <avatar-modal ref="modal" @ok="handleAvatarOk"></avatar-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { updateUser } from '@/api/user'
import AvatarModal from './AvatarModal'

export default {
  components: {
    AvatarModal
  },
  data () {
    return {
      userInfo: {
        username: '',
        userDescription: '',
        userEmail: '',
        userPassword: ''
      },
      usernameError: '',
      emailError: '',
      passwordError: '',
      option: {
        img: '/avatar2.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        fixed: true,
        fixedNumber: [1, 1]
      }
    }
  },
  computed: {
    ...mapState({
      currentUser: state => state.user.info
    })
  },
  mounted () {
    this.loadUserInfo()
  },
  methods: {
    loadUserInfo () {
      if (this.currentUser) {
        this.userInfo = {
          username: this.currentUser.username || '',
          userDescription: this.currentUser.description || '',
          userEmail: this.currentUser.email || '',
          userPassword: ''
        }
      }
    },
    validateUsername () {
      if (!this.userInfo.username.trim()) {
        this.usernameError = '用户名不能为空'
      } else {
        this.usernameError = ''
      }
    },
    validateEmail () {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!this.userInfo.userEmail.trim()) {
        this.emailError = '邮箱地址不能为空'
      } else if (!emailRegex.test(this.userInfo.userEmail)) {
        this.emailError = '请输入有效的邮箱地址'
      } else {
        this.emailError = ''
      }
    },
    validatePassword () {
      if (!this.userInfo.userPassword) {
        this.passwordError = '密码不能为空'
      } else {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        if (!passwordRegex.test(this.userInfo.userPassword)) {
          this.passwordError = '密码必须至少8个字符，包含大小写字母、数字和特殊字符'
        } else {
          this.passwordError = ''
        }
      }
    },
    handleSubmit () {
      this.validateUsername()
      this.validateEmail()
      this.validatePassword()

      if (this.usernameError || this.emailError || this.passwordError) {
        this.$message.error('请修正表单中的错误')
        return
      }

      const updatedInfo = {
        ...this.userInfo
      }

      updateUser(this.currentUser.id, updatedInfo)
        .then(response => {
          if (response.code === 0) {
            this.$message.success('用户信息更新成功')
            // 更新Vuex中的用户信息
            this.$store.dispatch('GetInfo')
          } else {
            this.$message.error(response.message || '更新失败')
          }
        })
        .catch(error => {
          console.error('更新用户信息时出错:', error)
          this.$message.error('更新用户信息时出错')
        })
    },
    handleAvatarOk (data) {
      this.option.img = data.url
      // 这里可以调用updateUser来更新头像
    }
  }
}
</script>

<style lang="less" scoped>
// ... (保持原有样式不变)
</style>
