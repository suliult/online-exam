<template>
  <div class="user-wrapper">
    <div class="content-box">
      <!-- 用户下拉菜单 -->
      <a-dropdown>
        <!-- 触发下拉菜单的元素 -->
        <span class="action ant-dropdown-link user-dropdown-menu">
          <!-- 用户头像 -->
          <a-avatar class="avatar" size="small" :src="avatar()"/>
          <!-- 用户昵称 -->
          <span>{{ nickname() }}</span>
        </span>

        <!-- 下拉菜单内容 -->
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <!-- 账户设置菜单项 -->
          <a-menu-item key="1">
            <router-link :to="{ name: 'settings' }">
              <a-icon type="setting"/>
              <span>账户设置</span>
            </router-link>
          </a-menu-item>

          <!-- 菜单分割线 -->
          <a-menu-divider/>

          <!-- 退出登录菜单项 -->
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout"/>
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserMenu',
  methods: {
    // 从 Vuex store 中映射 actions
    ...mapActions(['Logout']), // 清除token和localStorage中的信息

    // 从 Vuex store 中映射 getters
    ...mapGetters(['nickname', 'avatar']), // 从全局变量中获取用户昵称和头像

    // 处理退出登录的方法
    handleLogout () {
      const that = this

      // 显示确认对话框
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk () {
          // 用户确认退出
          return that.Logout({}).then(() => {
            // 退出成功后刷新页面
            window.location.reload()
          }).catch(err => {
            // 退出失败时显示错误信息
            that.$message.error({
              title: '错误',
              description: err.message
            })
          })
        },
        onCancel () {
          // 用户取消退出，不执行任何操作
        }
      })
    }
  }
}

</script>
