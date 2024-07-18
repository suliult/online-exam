<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">
        <a-form layout="vertical" @submit.prevent="handleSubmit">
          <a-form-item label="昵称">
            <a-input v-model="nickname" placeholder="给自己起个名字" />
          </a-form-item>
          <a-form-item label="电子邮件" :required="false">
            <a-input v-model="newEmail" placeholder="exp@admin.com" />
          </a-form-item>
          <a-form-item label="登录密码" :required="false">
            <a-input v-model="password" type="password" placeholder="密码" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit">提交</a-button>
            <a-button style="margin-left: 8px" @click="handleSave">保存</a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>

    <avatar-modal ref="modal"></avatar-modal>
  </div>
</template>

<script>
import AvatarModal from './AvatarModal'
import axios from 'axios'

export default {
  components: {
    AvatarModal
  },
  data () {
    return {
      nickname: '',
      email: '',
      password: '',
      newEmail: '',
      userId: '' // Initialize userId
    }
  },
  created () {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo () {
      try {
        const response = await axios.get('/api/user/info')
        if (response.data.code === 200) {
          const userInfo = response.data.data
          this.userId = userInfo.id
          this.nickname = userInfo.username // assuming username is displayed as nickname
          this.email = userInfo.email
        } else {
          this.$message.error('获取用户信息失败：' + response.data.msg)
        }
      } catch (error) {
        console.error('获取用户信息失败:', error)
        this.$message.error('获取用户信息失败')
      }
    },
    async handleSubmit () {
      if (!this.userId) {
        this.$message.error('用户ID未获取成功')
        return
      }

      try {
        const response = await axios.put(`/api/user/${this.userId}`, {
          username: this.nickname, // update the fieldnames to match actual payload keys
          email: this.newEmail,
          password: this.password
        })
        if (response.data.code === 0) {
          this.$message.success('更新成功')
        } else {
          this.$message.error('更新失败：' + response.data.msg)
        }
      } catch (error) {
        console.error('更新失败:', error)
        this.$message.error('更新失败')
      }
    },

    handleSave () {
      // 处理保存逻辑, 这个例子仅为演示，没有实际的数据处理
      this.$message.success('保存成功')
    }
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
    background: rgba(0, 0, 0, 0.4);
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
