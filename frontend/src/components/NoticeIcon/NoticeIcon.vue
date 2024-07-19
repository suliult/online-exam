<template>
  <!-- 通知弹出框组件 -->
  <a-popover
    v-model="visible"
    trigger="click"
    placement="bottomRight"
    overlayClassName="header-notice-wrapper"
    :autoAdjustOverflow="true"
    :arrowPointAtCenter="true"
    :overlayStyle="{ width: '300px', top: '50px' }"
  >
    <!-- 弹出框内容 -->
    <template slot="content">
      <!-- 加载中状态 -->
      <a-spin :spinning="loadding">
        <!-- 通知类型选项卡 -->
        <a-tabs>
          <!-- 通知选项卡 -->
          <a-tab-pane tab="通知" key="1">
            <a-list>
              <!-- 通知列表项 -->
              <a-list-item>
                <a-list-item-meta title="你收到了 14 份新周报" description="一年前">
                  <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png"/>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-list-item-meta title="你推荐的 曲妮妮 已通过第三轮面试" description="一年前">
                  <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png"/>
                </a-list-item-meta>
              </a-list-item>
              <a-list-item>
                <a-list-item-meta title="这种模板可以区分多种通知类型" description="一年前">
                  <a-avatar style="background-color: white" slot="avatar" src="https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png"/>
                </a-list-item-meta>
              </a-list-item>
            </a-list>
          </a-tab-pane>
          <!-- 消息选项卡 -->
          <a-tab-pane tab="消息" key="2">
            123
          </a-tab-pane>
          <!-- 待办选项卡 -->
          <a-tab-pane tab="待办" key="3">
            123
          </a-tab-pane>
        </a-tabs>
      </a-spin>
    </template>
    <!-- 触发通知弹出框的按钮 -->
    <span @click="fetchNotice" class="header-notice">
      <a-badge count="12">
        <a-icon style="font-size: 16px; padding: 4px" type="bell" />
      </a-badge>
    </span>
  </a-popover>
</template>


<script>
export default {
  // 组件名称
  name: 'HeaderNotice',

  // 组件的数据对象
  data () {
    return {
      loadding: false, // 控制加载状态
      visible: false   // 控制通知弹出框的可见性
    }
  },

  // 组件的方法
  methods: {
    // 获取通知的方法
    fetchNotice () {
      if (!this.visible) {
        // 如果弹出框当前不可见，则显示加载状态
        this.loadding = true
        // 模拟异步加载，2秒后结束加载状态
        setTimeout(() => {
          this.loadding = false
        }, 2000)
      } else {
        // 如果弹出框当前可见，则直接结束加载状态
        this.loadding = false
      }
      // 切换弹出框的可见性
      this.visible = !this.visible
    }
  }
}

</script>

<style lang="css">
  .header-notice-wrapper {
    top: 50px !important;
  }
</style>
<style lang="less" scoped>
  .header-notice{
    display: inline-block;
    transition: all 0.3s;

    span {
      vertical-align: initial;
    }
  }
</style>
