import { Tag } from 'ant-design-vue'
const { CheckableTag } = Tag

export default {
  name: 'TagSelectOption', // 组件名称

  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-tag-select-option' // 默认CSS类前缀
    },
    value: {
      type: [String, Number, Object],
      default: '' // 选项的值
    },
    checked: {
      type: Boolean,
      default: false // 是否选中的初始状态
    }
  },

  data() {
    return {
      localChecked: this.checked || false // 本地选中状态，初始化为 props 中的 checked 值
    }
  },

  watch: {
    // 监听 props 中的 checked 变化
    'checked'(val) {
      this.localChecked = val // 更新本地选中状态
    },
    // 监听父组件的 items 变化
    '$parent.items': {
      handler: function(val) {
        // 如果 value 存在且在父组件的 items 中，更新本地选中状态
        this.value && val.hasOwnProperty(this.value) && (this.localChecked = val[this.value])
      },
      deep: true // 深度监听
    }
  },

  render() {
    const { $slots, value } = this

    // 选中状态变化时的回调函数
    const onChange = (checked) => {
      this.$emit('change', { value, checked }) // 触发 change 事件
    }

    // 渲染可选中的标签
    return (
      <CheckableTag
        key={value}
        vModel={this.localChecked}
        onChange={onChange}
      >
        {$slots.default} // 插槽内容
      </CheckableTag>
    )
  }
}

