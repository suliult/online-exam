import { Spin } from 'ant-design-vue'

export default {
  // 组件名称
  name: 'PageLoading',

  // 渲染函数
  render () {
    // 使用 JSX 语法返回组件的模板
    return (
      <div style={{ paddingTop: 100, textAlign: 'center' }}>
        {/* 使用 Ant Design Vue 的 Spin 组件 */}
        <Spin size="large" />
      </div>
    )
  }
}
