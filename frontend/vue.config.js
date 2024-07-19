const path = require('path')
const webpack = require('webpack')

// 辅助函数,用于生成绝对路径
function resolve (dir) {
  return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
  // 注释掉的多页面配置
  /*
  pages: {
    index: {
      entry: 'src/main.js',
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  */

  // 配置 webpack
  configureWebpack: {
    plugins: [
      // 忽略 moment.js 的所有语言文件,减小打包体积
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      // 自动加载 jQuery,使其在每个模块中可用
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
    ]
  },

  // 链式 webpack 配置
  chainWebpack: (config) => {
    // 设置路径别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@api', resolve('src/api'))
      .set('@assets', resolve('src/assets'))
      .set('@comp', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@layout', resolve('src/layout'))
      .set('@static', resolve('src/static'))
      .set('jquery', resolve('node_modules/jquery/src/jquery'))

    // 配置 SVG 规则
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
  },

  // CSS 相关配置
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // 用于自定义 Ant Design 主题的 Less 变量
        },
        javascriptEnabled: true // 启用 Less 的 JavaScript 功能
      }
    }
  },

  // 开发服务器配置
  devServer: {
    port: 8000, // 开发服务器端口
    proxy: 'http://localhost:9527' // API 代理地址
  },

  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,

  // 是否在保存时使用 eslint-loader 进行检查
  lintOnSave: undefined,

  // babel-loader 是否忽略 node_modules 文件夹
  transpileDependencies: []
}
