import T from 'ant-design-vue/es/table/Table'
import get from 'lodash.get'

export default {
  data () {
    return {
      needTotalList: [], // 需要统计的列表
      selectedRows: [], // 选中的行
      selectedRowKeys: [], // 选中的行的 key
      localLoading: false, // 本地加载状态
      localDataSource: [], // 本地数据源
      localPagination: Object.assign({}, this.pagination) // 本地分页配置
    }
  },
  props: Object.assign({}, T.props, {
    // 自定义属性
    rowKey: {
      type: [String, Function],
      default: 'key'
    },
    data: {
      type: Function,
      required: true
    },
    pageNum: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    showSizeChanger: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'default'
    },
    alert: {
      type: [Object, Boolean],
      default: null
    },
    rowSelection: {
      type: Object,
      default: null
    },
    showAlertInfo: {
      type: Boolean,
      default: false
    },
    showPagination: {
      type: String | Boolean,
      default: 'auto'
    },
    pageURI: {
      type: Boolean,
      default: false
    }
  }),
  watch: {
    // 监听分页、页码等变化
    'localPagination.current' (val) {
      // 更新路由参数
      this.pageURI && this.$router.push({
        ...this.$route,
        name: this.$route.name,
        params: Object.assign({}, this.$route.params, {
          pageNo: val
        })
      })
    },
    pageNum (val) {
      // 更新本地分页当前页
      Object.assign(this.localPagination, {
        current: val
      })
    },
    pageSize (val) {
      // 更新本地分页大小
      Object.assign(this.localPagination, {
        pageSize: val
      })
    },
    showSizeChanger (val) {
      // 更新是否显示分页大小选择器
      Object.assign(this.localPagination, {
        showSizeChanger: val
      })
    }
  },
  created () {
    // 初始化分页和数据加载
    const { pageNo } = this.$route.params
    const localPageNum = this.pageURI && (pageNo && parseInt(pageNo)) || this.pageNum
    this.localPagination = ['auto', true].includes(this.showPagination) && Object.assign({}, this.localPagination, {
      current: localPageNum,
      pageSize: this.pageSize,
      showSizeChanger: this.showSizeChanger
    })
    this.needTotalList = this.initTotalList(this.columns)
    this.loadData()
  },
  methods: {
    // 刷新数据
    refresh (bool = false) {
      bool && (this.localPagination = Object.assign({}, {
        current: 1, pageSize: this.pageSize
      }))
      this.loadData()
    },
    // 加载数据
    loadData (pagination, filters, sorter) {
      // ... (loadData 方法的实现)
    },
    // 初始化需要统计的列表
    initTotalList (columns) {
      // ... (initTotalList 方法的实现)
    },
    // 更新选中的行
    updateSelect (selectedRowKeys, selectedRows) {
      // ... (updateSelect 方法的实现)
    },
    // 清空选中的行
    clearSelected () {
      // ... (clearSelected 方法的实现)
    },
    // 渲染清空按钮
    renderClear (callback) {
      // ... (renderClear 方法的实现)
    },
    // 渲染 alert 组件
    renderAlert () {
      // ... (renderAlert 方法的实现)
    }
  },

  render () {
    // 准备 props
    const props = {}
    const localKeys = Object.keys(this.$data)
    const showAlert = (typeof this.alert === 'object' && this.alert !== null && this.alert.show) && typeof this.rowSelection.selectedRowKeys !== 'undefined' || this.alert

    // 设置 props
    Object.keys(T.props).forEach(k => {
      // ... (props 设置逻辑)
    })

    // 渲染表格
    const table = (
      <a-table {...{ props, scopedSlots: { ...this.$scopedSlots } }} onChange={this.loadData}>
        { Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>)) }
      </a-table>
    )

    // 返回最终的渲染结果
    return (
      <div class="table-wrapper">
        { showAlert ? this.renderAlert() : null }
        { table }
      </div>
    )
  }
}
