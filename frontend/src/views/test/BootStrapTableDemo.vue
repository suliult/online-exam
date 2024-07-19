<template>
  <div>
    <!-- BootstrapTable 组件用于显示数据表格 -->
    <BootstrapTable
      ref="table"
      :columns="columns"
      :data="data"
      :options="options"
    />
  </div>
</template>


<script>
import '../../plugins/bootstrap-table'
import $ from 'jquery'

export default {
  data() {
    const that = this // 保存 this 引用，用于在 bootstrap-table 中访问 methods

    return {
      columns: [
        {
          field: 'state',
          checkbox: true // 复选框列
        },
        {
          title: 'Item ID',
          field: 'id'
        },
        {
          field: 'name',
          title: 'Item Name'
        },
        {
          field: 'price',
          title: 'Item Price'
        },
        {
          field: 'actions',
          title: 'Actions',
          align: 'center',
          formatter: (value, row) => {
            // 自定义列内容，返回 HTML 字符串
            return '<button type="button" class="btn btn-success mybtn">Success</button>'
          },
          events: {
            // 为自定义按钮添加点击事件
            'click .mybtn': function(e, value, row, index) { // 双击是 dblclick
              that.clickRow(row, value, index)
            }
          }
        }
      ],
      data: {
        total: 5,
        rows: [
          // 表格数据
          { id: 1, name: 'Item 1', price: '\$1' },
          { id: 2, name: 'Item 2', price: '\$2' },
          { id: 3, name: 'Item 3', price: '\$3' },
          { id: 4, name: 'Item 4', price: '\$4' },
          { id: 5, name: 'Item 5', price: '\$5' }
        ]
      },
      options: {
        search: true, // 启用搜索功能
        showColumns: true, // 显示列选择器
        showExport: true, // 显示导出按钮
        showRefresh: true, // 显示刷新按钮
        advancedSearch: true, // 启用高级搜索
        idTable: 'advancedTable', // 高级搜索的表格 ID
        // 常用事件
        // onClickRow: that.clickRow, // 行点击事件
        // onClickCell: that.clickCell, // 单元格单击事件
        onDblClickCell: that.dblClickCell // 单元格双击事件
      }
    }
  },
  methods: {
    clickRow(row, value, index) {
      alert(JSON.stringify(row) + ', ' + index)
    },
    clickCell(field, value, row, $element) {
      alert(JSON.stringify(field))
    },
    /**
     * 单元格双击事件
     * @param field 字段名，如 id、name、price 等
     * @param value 字段值，如 Item 1、\$1 等
     * @param row 一行的值，如 {"id":3,"name":"Item 3","price":"\$3"}
     * @param $element 行所在的 DOM 元素，可以动态往里面加入页面元素，比如双击可编辑或者弹出富文本框等
     */
    dblClickCell(field, value, row, $element) {
      console.log($element.text()) // 获取元素的文本内容
      console.log($element.html()) // 获取元素的 HTML 内容

      const p = $('<p>弹框出现前修改内容</p>')
      $element.append(p) // 向单元格添加新内容

      console.log($element.text()) // 获取更新后的元素文本内容
      row[field] = $element.text() // 更新行数据
      alert(field + ':' + row + ', ' + JSON.stringify(row))

      const index = $element.parent().attr('data-index') // 获取当前行的索引
      row[field] = '弹框出现后修改内容'
      this.data.rows[index] = row // 更新数据源中的行数据

      this.$refs.table._initTable() // 重新渲染表格
    }
  }
}

</script>
