<template>
  <div class="user-management">
    <h1>用户管理</h1>
    <a-table :columns="columns" :data-source="users" :loading="loading" :rowKey="record => record.userId">
      <template slot="userRoleId" slot-scope="text">
        {{ getRoleName(text) }}
      </template>
      <template slot="action" slot-scope="text, record">
        <a-button type="link" @click="handleEdit(record)">编辑</a-button>
        <a-divider type="vertical" />
        <a-popconfirm
          title="确定删除该用户吗？"
          ok-text="是"
          cancel-text="否"
          @confirm="handleDelete(record.userId)"
        >
          <a-button type="link">删除</a-button>
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
      <a-form-model :model="currentUser" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
        <a-form-model-item label="用户名">
          <a-input v-model="currentUser.userUsername" />
        </a-form-model-item>
        <a-form-model-item label="昵称">
          <a-input v-model="currentUser.userNickname" />
        </a-form-model-item>
        <a-form-model-item label="角色">
          <a-select v-model="currentUser.userRoleId">
            <a-select-option :value="1">管理员</a-select-option>
            <a-select-option :value="2">教师</a-select-option>
            <a-select-option :value="3">学生</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="邮箱">
          <a-input v-model="currentUser.userEmail" />
        </a-form-model-item>
        <a-form-model-item label="电话">
          <a-input v-model="currentUser.userPhone" />
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
      columns: [
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
      users: [],
      loading: false,
      modalVisible: false,
      confirmLoading: false,
      currentUser: {}
    }
  },
  created () {
    this.fetchUsers()
  },
  methods: {
    getRoleName (role) {
      const roles = {
        1: '管理员',
        2: '教师',
        3: '学生'
      }
      return roles[role] || '未知'
    },
    async fetchUsers() {
      this.loading = true
      try {
        const response = await getUsers()
        this.users = response.data
      } catch (error) {
        this.$message.error('获取用户列表失败')
      } finally {
        this.loading = false
      }
    },

    handleEdit(record) {
      this.currentUser = { ...record }
      this.modalVisible = true
    },

    async handleDelete(userId) {
      try {
        await deleteUser(userId)
        this.$message.success('删除成功')
        this.fetchUsers()
      } catch (error) {
        this.$message.error('删除失败')
      }
    },

    async handleSave() {
      this.confirmLoading = true
      try {
        await updateUser(this.currentUser.userId, this.currentUser)
        this.$message.success('保存成功')
        this.modalVisible = false
        this.fetchUsers()
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