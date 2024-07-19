// 导入 Bootstrap 的 CSS
import 'bootstrap/dist/css/bootstrap.min.css'

// 导入 BootstrapVue 的 CSS
import 'bootstrap-vue/dist/bootstrap-vue.css'

// 导入 Bootstrap Table 的 CSS
import 'bootstrap-table/dist/bootstrap-table.min.css'

// 导入 Font Awesome 的 CSS
import '@fortawesome/fontawesome-free/css/all.min.css'

// 导入 Vue
import Vue from 'vue'

// 导入 Bootstrap 的 JavaScript
import 'bootstrap'

// 导入 FileSaver 库，用于文件保存功能
import 'tableexport.jquery.plugin/libs/FileSaver/FileSaver.min.js'

// 导入 TableExport 插件，用于表格导出功能
import 'tableexport.jquery.plugin/tableExport.min.js'

// 导入 Bootstrap Table 的核心 JavaScript
import 'bootstrap-table/dist/bootstrap-table'

// 导入 Bootstrap Table 的 Vue 组件
import BootstrapTable from 'bootstrap-table/dist/bootstrap-table-vue.esm'

// 导入 Bootstrap Table 的导出扩展
import 'bootstrap-table/dist/extensions/export/bootstrap-table-export'

// 导入 Bootstrap Table 的工具栏扩展
import 'bootstrap-table/dist/extensions/toolbar/bootstrap-table-toolbar.min'

// 导入 jQuery
import jQuery from 'jquery'

// 将 jQuery 挂载到全局 window 对象上
window.jQuery = jQuery
window.$ = jQuery

// 将 BootstrapTable 注册为全局 Vue 组件
Vue.component('BootstrapTable', BootstrapTable)
