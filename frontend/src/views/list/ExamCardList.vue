<template>
  <!-- 卡片列表容器 -->
  <div class="card-list" ref="content">
    <!-- 使用 a-list 组件展示卡片列表 -->
    <a-list
      :grid="{gutter: 24, lg: 3, md: 2, sm: 1, xs: 1}"
    :dataSource="dataSource"
    >
    <!-- 自定义列表项渲染 -->
    <a-list-item slot="renderItem" slot-scope="item">
      <!-- 可悬停的卡片，点击触发 joinExam 方法 -->
      <a-card :hoverable="true" @click="joinExam(item.id)">
        <!-- 卡片元数据 -->
        <a-card-meta>
          <!-- 卡片标题 -->
          <div style="margin-bottom: 3px" slot="title">{{ item.title }}</div>
          <!-- 卡片头像 -->
          <a-avatar class="card-avatar" slot="avatar" :src="item.avatar | imgSrcFilter" size="large" />
          <!-- 卡片描述内容 -->
          <div class="meta-content" slot="description">{{ item.content }}</div>
        </a-card-meta>
        <!-- 卡片底部操作区 -->
        <template class="ant-card-actions" slot="actions">
          <!-- 显示满分信息 -->
          <a>满分：{{ item.score }}分</a>
          <!-- 显示限时信息 -->
          <a>限时：{{ item.elapse }}分钟</a>
        </template>
      </a-card>
    </a-list-item>
    </a-list>
  </div>
</template>


<script>
import { getExamCardList } from '../../api/exam'

export default {
  name: 'ExamCardList',
  data () {
    return {
      description: '您可以随意点击下面的考试卡片开始一场属于您的考试',
      extraImage: 'https://gw.alipayobjects.com/zos/rmsportal/RzwpdLnhmvDJToTdfDPe.png',
      dataSource: []
    }
  },
  methods: {
    joinExam (id) {
      const routeUrl = this.$router.resolve({
        path: `/exam/${id}`
      })
      window.open(routeUrl.href, '_blank')
    }
  },
  mounted () {
    // 从后端数据获取考试列表，适配前端卡片
    getExamCardList().then(res => {
      console.log(res)
      if (res.code === 0) {
        this.dataSource = res.data
      } else {
        this.$notification.error({
          message: '获取考试列表失败',
          description: res.msg
        })
      }
    }).catch(err => {
      // 失败就弹出警告消息
      this.$notification.error({
        message: '获取考试列表失败',
        description: err.message
      })
    })
  }
}
</script>

<style lang="less" scoped>
  .card-avatar {
    width: 48px;
    height: 48px;
    border-radius: 48px;
  }

  .ant-card-actions {
    background: #f7f9fa;

    li {
      float: left;
      text-align: center;
      margin: 12px 0;
      color: rgba(0, 0, 0, 0.45);
      width: 50%;

      &:not(:last-child) {
        border-right: 1px solid #e8e8e8;
      }

      a {
        color: rgba(0, 0, 0, .45);
        line-height: 22px;
        display: inline-block;
        width: 100%;

        &:hover {
          color: #1890ff;
        }
      }
    }
  }

  .new-btn {
    background-color: #fff;
    border-radius: 2px;
    width: 100%;
    height: 188px;
  }

  .meta-content {
    position: relative;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    height: 64px;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
</style>
