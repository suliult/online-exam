<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <a-form :form="form" layout="vertical" @submit="handleSubmit">
          <a-form-item label="昵称">
            <a-input
              v-decorator="['nickname', {
                rules: [{ required: true, message: '请输入昵称' }]
              }]"
              placeholder="给自己起个名字"
            />
          </a-form-item>
          <a-form-item label="Bio">
            <a-textarea
              v-decorator="['bio', {
                rules: [{ max: 300, message: 'Bio不能超过300字符' }]
              }]"
              :rows="4"
              placeholder="You are not alone."
            />
          </a-form-item>
          <a-form-item label="电子邮件">
            <a-input
              v-decorator="['email', {
                rules: [
                  { type: 'email', message: '请输入有效的邮箱地址' },
                  { required: true, message: '请输入邮箱地址' }
                ]
              }]"
              placeholder="exp@admin.com"
            />
          </a-form-item>
          <a-form-item label="登录密码">
            <a-input
              v-decorator="['password', {
                rules: [{ min: 6, message: '密码至少6个字符' }]
              }]"
              type="password"
              placeholder="如需修改密码请输入新密码"
            />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" :loading="submitting">提交</a-button>
            <a-button style="margin-left: 8px" @click="handleSave">保存</a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview" @click="$refs.modal.edit(1)">
          <a-icon type="cloud-upload-o" class="upload-icon"/>
          <div class="mask">
            <a-icon type="plus" />
          </div>
          <img :src="option.img"/>
        </div>
      </a-col>
    </a-row>
    <avatar-modal ref="modal" @ok="handleAvatarOk"></avatar-modal>
  </div>
</template>

<script>
import AvatarModal from './AvatarModal'
import { getUserInfo, updateUserInfo } from '@/api/user' // 假设这些API函数存在

export default {
  components: {
    AvatarModal
  },
  data () {
    return {
      form: this.$form.createForm(this),
      submitting: false,
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
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          this.submitting = true
          try {
            await updateUserInfo(values)
            this.$message.success('个人信息更新成功')
            this.fetchUserInfo() // 重新获取用户信息
          } catch (error) {
            this.$message.error('更新失败: ' + error.message)
          } finally {
            this.submitting = false
          }
        }
      })
    },
    handleSave () {
      // 保存草稿功能
      const formData = this.form.getFieldsValue()
      console.log('保存草稿', formData)
      this.$message.info('草稿已保存')
    },
    async fetchUserInfo () {
      try {
        const userInfo = await getUserInfo()
        this.form.setFieldsValue({
          nickname: userInfo.nickname,
          bio: userInfo.bio,
          email: userInfo.email
        })
        this.option.img = userInfo.avatar || '/avatar2.jpg'
      } catch (error) {
        this.$message.error('获取用户信息失败: ' + error.message)
      }
    },
    handleAvatarOk (data) {
      this.option.img = data.url
      // 这里可以调用updateUserInfo来更新头像
    }
  },
  mounted () {
    this.fetchUserInfo()
  }
}
</script>

<style lang="less" scoped>
.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}

.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;

  .upload-icon {
    position: absolute;
    top: 0;
    right: 10px;
    font-size: 1.4rem;
    padding: 0.5rem;
    background: rgba(222, 221, 221, 0.7);
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
  .mask {
    opacity: 0;
    position: absolute;
    background: rgba(0,0,0,0.4);
    cursor: pointer;
    transition: opacity 0.4s;

    &:hover {
      opacity: 1;
    }

    i {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -1rem;
      margin-top: -1rem;
      color: #d6d6d6;
    }
  }

  img, .mask {
    width: 100%;
    max-width: 180px;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
  }
}
</style>
