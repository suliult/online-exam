<template>
  <!-- 页脚容器 -->
  <div class="footer">
    <!-- 链接区域 -->
    <div class="links">
      <!-- 个人主页链接 -->
      <a href="https://github.com/suliult" target="_blank">关于我</a>
      <!-- 邮件联系链接 -->
      <a href="mailto:2306934678@qq.com">联系我</a>
    </div>

    <!-- 版权信息区域 -->
    <div class="copyright">
      Copyright
      <!-- 版权图标 -->
      <a-icon type="copyright" />
      2024
      <!-- 版权所有者名称 -->
      <span>suliult</span>
    </div>
  </div>
</template>


<script>
export default {
  name: 'GlobalFooter', // 组件名称
  data () {
    return {} // 当前组件不需要响应式数据
  }
}
</script>

<style lang="less" scoped>
.footer {
  padding: 0 16px;
  margin: 24px 0 24px;
  text-align: center; // 居中对齐

  .links {
    margin-bottom: 8px;

    a {
      color: rgba(0, 0, 0, 0.45); // 链接默认颜色

      &:hover {
        color: rgba(0, 0, 0, 0.65); // 鼠标悬停时的颜色
      }

      &:not(:last-child) {
        margin-right: 40px; // 除最后一个链接外，其他链接右侧有间距
      }
    }
  }
  .copyright {
    color: rgba(0, 0, 0, 0.45); // 版权信息颜色
    font-size: 14px; // 版权信息字体大小
  }
}
</style>
