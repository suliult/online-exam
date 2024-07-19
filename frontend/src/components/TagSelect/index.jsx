import PropTypes from 'ant-design-vue/es/_util/vue-types'
import Option from './TagSelectOption.jsx'
import { filterEmpty } from '../../components/_util/util'

export default {
  Option, // 导出 Option 组件
  name: 'TagSelect',
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-tag-select' // CSS类前缀
    },
    defaultValue: {
      type: PropTypes.array,
      default: null // 默认选中的值
    },
    value: {
      type: PropTypes.array,
      default: null // 当前选中的值
    },
    expandable: {
      type: Boolean,
      default: false // 是否可展开
    },
    hideCheckAll: {
      type: Boolean,
      default: false // 是否隐藏"全选"选项
    }
  },
  data() {
    return {
      expand: false, // 展开状态
      localCheckAll: false, // 本地全选状态
      items: this.getItemsKey(filterEmpty(this.$slots.default)), // 所有选项的键值对
      val: this.value || this.defaultValue || [] // 当前选中值
    }
  },
  methods: {
    // 单个选项变化时的处理
    onChange(checked) {
      const key = Object.keys(this.items).filter(key => key === checked.value)
      this.items[key] = checked.checked
      // 检查是否全部选中
      const bool = Object.values(this.items).lastIndexOf(false)
      this.localCheckAll = bool === -1
    },
    // 全选按钮的处理
    onCheckAll(checked) {
      Object.keys(this.items).forEach(v => {
        this.items[v] = checked.checked
      })
      this.localCheckAll = checked.checked
    },
    // 获取所有选项的键
    getItemsKey(items) {
      const totalItem = {}
      items.forEach(item => {
        totalItem[item.componentOptions.propsData && item.componentOptions.propsData.value] = false
      })
      return totalItem
    },
    // 渲染全选按钮
    renderCheckAll() {
      return !this.hideCheckAll && (
        <Option key={'total'} checked={this.localCheckAll} onChange={this.onCheckAll}>All</Option>
      ) || null
    },
    // 渲染可展开部分（未实现）
    renderExpandable() {
      // 待实现
    },
    // 渲染选项标签
    renderTags(items) {
      const listeners = {
        change: (checked) => {
          this.onChange(checked)
          this.$emit('change', checked)
        }
      }

      return items.map(vnode => {
        const options = vnode.componentOptions
        options.listeners = listeners
        return vnode
      })
    }
  },
  // 渲染函数
  render() {
    const { $props: { prefixCls } } = this
    const classString = {
      [`${prefixCls}`]: true
    }
    const tagItems = filterEmpty(this.$slots.default)
    return (
      <div class={classString}>
        {this.renderCheckAll()}
        {this.renderTags(tagItems)}
      </div>
    )
  }
}

