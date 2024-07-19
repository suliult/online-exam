<template>
  <!-- 使用 result 组件来显示注册结果 -->
  <result
    :isSuccess="true">
    <!--
    设置结果为成功
    -->
    :content="false"   <!-- 不显示默认内容 -->
    :title="email"     <!-- 显示用户邮箱作为标题 -->
    :description="description">  <!-- 显示描述信息 -->

    <!-- 自定义操作按钮 -->
    <template slot="action">
      <!-- 查看邮箱按钮 -->
      <a-button size="large" type="primary">查看邮箱</a-button>

      <!-- 返回首页按钮，点击时触发 goHomeHandle 方法 -->
      <a-button size="large" style="margin-left: 8px" @click="goHomeHandle">返回首页</a-button>
    </template>

  </result>
</template>

<script>
import { Result } from '../../components'

export default {
  name: 'RegisterResult', // 组件名称
  components: {
    Result // 引入 Result 组件
  },
  data () {
    return {
      // 注册成功后的描述信息
      description: '激活邮件已发送到你的邮箱中，邮件有效期为24小时。请及时登录邮箱，点击邮件中的链接激活帐户。',
      form: {} // 用于存储注册表单数据
    }
  },
  computed: {
    email () {
      // 计算属性：根据表单中的邮箱生成标题
      const v = this.form && this.form.email || 'xxx' // 如果没有邮箱，使用 'xxx' 作为默认值
      const title = `你的账户：${v} 注册成功`
      return title
    }
  },
  created () {
    // 生命周期钩子：组件创建时从路由参数中获取表单数据
    this.form = this.$route.params
  },
  methods: {
    goHomeHandle () {
      // 处理"返回首页"按钮点击事件，跳转到登录页面
      this.$router.push({ name: 'login' })
    }
  }
}

</script>

<style scoped>

</style>
