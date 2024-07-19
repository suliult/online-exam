<template>
  <div class="user-management">
    <h1>用户管理</h1>
    <a-table :columns="columns" :data-source="users" :loading="loading" :rowKey="record => record.userId">
      <template slot="userRoleId" slot-scope="text">  <!-- 角色列模板 -->
        {{ getRoleName(text) }}
      </template>
      <template #action="{ text, record }">  <!-- 操作列模板 -->
        <a-button type="link" @click="handleEdit(record)">编辑</a-button>  <!-- 编辑按钮 -->
        <a-divider type="vertical" />  <!-- 分割线 -->
        <a-popconfirm
          title="确定删除该用户吗？"
          ok-text="是"
          cancel-text="否"
          @confirm="handleDelete(record.userId)"
        >
          <a-button type="link">删除</a-button>  <!-- 删除按钮 -->
        </a-popconfirm>
      </template>
    </a-table>

    <a-modal
      title="编辑用户"
      :visible="modalVisible"
      @ok="handleSave"
      @cancel="modalVisible = false"
      :confirmLoading="confirmLoading"
    >
      <a-form-model :model="currentUser" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">  <!-- 表单模型 -->
        <a-form-model-item label="用户名">  <!-- 用户名表单项 -->
          <a-input v-model="currentUser.userUsername" />  <!-- 用户名输入框 -->
        </a-form-model-item>
        <a-form-model-item label="昵称">  <!-- 昵称表单项 -->
          <a-input v-model="currentUser.userNickname" />  <!-- 昵称输入框 -->
        </a-form-model-item>
        <a-form-model-item label="角色">  <!-- 角色表单项 -->
          <a-select v-model="currentUser.userRoleId">  <!-- 角色下拉选择框 -->
            <a-select-option :value="1">管理员</a-select-option>  <!-- 管理员选项 -->
            <a-select-option :value="2">教师</a-select-option>  <!-- 教师选项 -->
            <a-select-option :value="3">学生</a-select-option>  <!-- 学生选项 -->
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="邮箱">  <!-- 邮箱表单项 -->
          <a-input v-model="currentUser.userEmail" />  <!-- 邮箱输入框 -->
        </a-form-model-item>
        <a-form-model-item label="电话">  <!-- 电话表单项 -->
          <a-input v-model="currentUser.userPhone" />  <!-- 电话输入框 -->
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { getUsers, updateUser, deleteUser } from '@/api/user'

export default {
  data () {
    return {
      columns: [  // 表格列配置
        { title: 'ID', dataIndex: 'userId', key: 'userId' },
        { title: '用户名', dataIndex: 'userUsername', key: 'userUsername' },
        { title: '昵称', dataIndex: 'userNickname', key: 'userNickname' },
        { title: '角色', dataIndex: 'userRoleId', key: 'userRoleId', scopedSlots: { customRender: 'userRoleId' } },
        { title: '邮箱', dataIndex: 'userEmail', key: 'userEmail' },
        { title: '电话', dataIndex: 'userPhone', key: 'userPhone' },
        { title: '创建时间', dataIndex: 'createTime', key: 'createTime' },
        { title: '更新时间', dataIndex: 'updateTime', key: 'updateTime' },
        { title: '操作', key: 'action', scopedSlots: { customRender: 'action' } }
      ],
      users: [],  // 用户列表数据
      loading: false,  // 加载状态
      modalVisible: false,  // 模态框显示状态
      confirmLoading: false,  // 确认按钮加载状态
      currentUser: {}  // 当前编辑的用户数据
    }
  },
  created () {
    this.fetchUsers()  // 在组件创建时获取用户列表数据
  },
  methods: {
    getRoleName (role) {  // 获取角色名称
      const roles = {
        1: '管理员',
        2: '教师',
        3: '学生'
      }
      return roles[role] || '未知'
    },
    async fetchUsers() {  // 获取用户列表数据
      this.loading = true
      try {
        const response = await getUsers()  // 调用 getUsers 函数获取用户列表数据
        this.users = response.data
      } catch (error) {
        this.$message.error('获取用户列表失败')
      } finally {
        this.loading = false
      }
    },

    handleEdit(record) {  // 编辑用户事件处理函数
      this.currentUser = { ...record }  // 将用户数据复制到 currentUser
      this.modalVisible = true  // 显示模态框
    },

    async handleDelete(userId) {  // 删除用户事件处理函数
      try {
        await deleteUser(userId)  // 调用 deleteUser 函数删除用户
        this.$message.success('删除成功')
        this.fetchUsers()  // 获取更新后的用户列表数据
      } catch (error) {
        this.$message.error('删除失败')
      }
    },

    async handleSave() {  // 保存用户事件处理函数
      this.confirmLoading = true
      try {
        await updateUser(this.currentUser.userId, this.currentUser)  // 调用 updateUser 函数更新用户数据
        this.$message.success('保存成功')
        this.modalVisible = false  // 关闭模态框
        this.fetchUsers()  // 获取更新后的用户列表数据
      } catch (error) {
        this.$message.error('保存失败')
      } finally {
        this.confirmLoading = false
      }
    }
  }
}
</script>

<style scoped>
.user-management {
  padding: 20px;
}
</style>