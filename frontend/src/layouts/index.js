// 导入各种布局组件
import UserLayout from './UserLayout'
import BlankLayout from './BlankLayout'
import BasicLayout from './BasicLayout'
import RouteView from './RouteView'
import PageView from './PageView'

// 导出所有布局组件，使它们可以在其他文件中被引用
export {
  UserLayout,   // 用户相关页面的布局，如登录、注册等
  BasicLayout,  // 基本应用布局，通常包括侧边栏、顶部导航等
  BlankLayout,  // 空白布局，不包含任何预定义结构
  RouteView,    // 路由视图组件，用于嵌套路由
  PageView      // 页面视图组件，通常包含页面标题、面包屑等元素
}
