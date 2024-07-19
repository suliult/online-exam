'use strict'
const path = require('path')

// 辅助函数,用于生成绝对路径
function resolve (dir) {
  return path.join(__dirname, '.', dir)
}

module.exports = {
  // 设置项目的上下文路径,即项目根目录
  context: path.resolve(__dirname, './'),

  // 配置模块如何解析
  resolve: {
    // 自动解析确定的扩展名,使导入模块时可以不带扩展名
    extensions: ['.js', '.vue', '.json'],

    // 创建import或require的别名,来确保模块引入变得更简单
    alias: {
      // 设置 '@' 指向 'src' 目录
      '@': resolve('src')
    }
  }
}
