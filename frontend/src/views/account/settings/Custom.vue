<script>
import { colorList } from '../../../components/SettingDrawer/settingConfig'
import ASwitch from 'ant-design-vue/es/switch'
import AList from 'ant-design-vue/es/list'
import AListItem from 'ant-design-vue/es/list/Item'
import { mixin } from '../../../utils/mixin'

const Meta = AListItem.Meta

export default {
  components: {
    AListItem,
    AList,
    ASwitch,
    Meta
  },
  mixins: [mixin], // 混合使用 mixin
  data () {
    return {
    }
  },
  filters: {
    themeFilter (theme) { // 主题过滤器，将主题代码转换为中文描述
      const themeMap = {
        'dark': '暗色',
        'light': '白色'
      }
      return themeMap[theme]
    }
  },
  methods: {
    colorFilter (color) { // 颜色过滤器，将颜色代码转换为中文描述
      const c = colorList.filter(o => o.color === color)[0] // 查找颜色列表中对应颜色的项
      return c && c.key // 返回颜色中文描述，如果未找到则返回 null
    },

    onChange (checked) { // 切换主题事件处理函数
      if (checked) { // 如果选中
        this.$store.dispatch('ToggleTheme', 'dark') // 派发切换主题事件，将主题设置为暗色
      } else { // 如果未选中
        this.$store.dispatch('ToggleTheme', 'light') // 派发切换主题事件，将主题设置为白色
      }
    }
  },
  render () {
    return (

      <AList itemLayout="horizontal">
        // 使用 AList 组件创建列表，设置横向布局
      <AListItem>  // 列表项
        <Meta>  // 元数据组件
          <a slot="title">风格配色</a>  // 标题
          <span slot="description">
                整体风格配色设置
          </span>  // 描述
        </Meta>
        <div slot="actions">  // 操作区域
          <ASwitch checkedChildren="暗色" unCheckedChildren="白色" defaultChecked={this.navTheme === 'dark' && true || false} onChange={this.onChange} />  // 使用 ASwitch 组件创建开关，设置默认选中状态，绑定 onChange 事件
        </div>
      </AListItem>
      <AListItem>  // 列表项
        <Meta>  // 元数据组件
          <a slot="title">主题色</a>  // 标题
          <span slot="description">
                页面风格配色： <a domPropsInnerHTML={ this.colorFilter(this.primaryColor) }/>  // 描述，使用 colorFilter 过滤器获取主题色中文描述
          </span>
        </Meta>
      </AListItem>
      </AList>
    )
  }
}

</script>

<style scoped>

</style>
