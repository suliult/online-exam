// 导入自定义组件
import STable from '../components/Table'           // 高级表格组件
import MultiTab from '../components/MultiTab'      // 多标签页组件
import Result from '../components/Result'          // 结果页组件
import TagSelect from '../components/TagSelect'    // 标签选择组件
import ExceptionPage from '../components/Exception'// 异常页面组件
import StandardFormRow from '../components/StandardFormRow'  // 标准表单行组件
import DescriptionList from '../components/DescriptionList'  // 描述列表组件

// 导出组件，使其可以在其他文件中使用
export {
  ExceptionPage,
  Result,
  STable,
  MultiTab,
  TagSelect,
  StandardFormRow,
  DescriptionList as DetailList  // 将 DescriptionList 重命名为 DetailList 导出
}
