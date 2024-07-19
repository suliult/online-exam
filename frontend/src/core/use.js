import Vue from 'vue'
import VueStorage from 'vue-ls'
import config from '../config/defaultSettings'

// 基础库
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import VueCropper from 'vue-cropper'
import 'ant-design-vue/dist/antd.less'

// 扩展库
import VueClipboard from 'vue-clipboard2'
import PermissionHelper from '../utils/helper/permission'
// import '../components/use'  // 注释掉的组件使用导入
import './directives/action'

// 配置 VueClipboard
VueClipboard.config.autoSetContainer = true

// 使用 Ant Design Vue 组件库
Vue.use(Antd)

// 使用 Viser 图表库
Vue.use(Viser)

// 使用 Vue 本地存储，配置来自 defaultSettings
Vue.use(VueStorage, config.storageOptions)

// 使用剪贴板功能
Vue.use(VueClipboard)

// 使用权限助手
Vue.use(PermissionHelper)

// 使用图片裁剪功能
Vue.use(VueCropper)
