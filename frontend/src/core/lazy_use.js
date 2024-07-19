import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '../config/defaultSettings'

// 基础库
import '../core/lazy_lib/components_use'  // 导入懒加载的组件
import Viser from 'viser-vue'  // 导入数据可视化库

// 扩展库
import VueClipboard from 'vue-clipboard2'  // 剪贴板功能
import PermissionHelper from '../utils/helper/permission'  // 权限辅助工具
import './directives/action'  // 导入自定义指令

// 配置 VueClipboard
VueClipboard.config.autoSetContainer = true

// 使用 Viser 图表库
Vue.use(Viser)

// 使用 Vue 本地存储，配置来自 defaultSettings
Vue.use(VueStorage, config.storageOptions)

// 使用剪贴板功能
Vue.use(VueClipboard)

// 使用权限辅助工具
Vue.use(PermissionHelper)
