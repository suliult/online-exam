import Vue from 'vue'
import moment from 'moment'
import 'moment/locale/zh-cn'
import $ from 'jquery'

// 设置 moment 的语言环境为中文
moment.locale('zh-cn')

/**
 * 数字格式化过滤器
 * 将数字转换为带千位分隔符的字符串
 */
Vue.filter('NumberFormat', function (value) {
  if (!value) {
    return '0'
  }
  // 使用正则表达式在每三位数字前添加逗号
  const intPartFormat = value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '\$1,')
  return intPartFormat
})

/**
 * 日期格式化过滤器 (使用 moment.js)
 * @param {string|Date} dataStr - 要格式化的日期
 * @param {string} pattern - 日期格式模式，默认为 'YYYY-MM-DD HH:mm:ss'
 */
Vue.filter('dayjs', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

/**
 * 日期格式化过滤器 (使用 moment.js)
 * 与 'dayjs' 过滤器功能相同，保留为了兼容性
 */
Vue.filter('moment', function (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
  return moment(dataStr).format(pattern)
})

/**
 * 图片源过滤器
 * 从 HTML 内容中提取第一个 img 标签的 src 属性
 * @param {string} content - 包含 HTML 的字符串
 */
Vue.filter('imgSrcFilter', function (content) {
  return $(content).children('img').attr('src')
})
