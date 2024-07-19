module.exports = {
  // 预设(presets)是一组Babel插件,用于支持特定的语言特性
  presets: [
    // Vue CLI 3的默认Babel预设,包含了Vue项目需要的大部分配置
    '@vue/app',
    [
      // @babel/preset-env用于根据目标环境自动确定需要的Babel插件和polyfills
      '@babel/preset-env',
      {
        // 'entry'表示在入口文件导入所有polyfills
        // 这会根据browserslist配置导入必要的polyfills
        'useBuiltIns': 'entry'
      }
    ]
  ]

  // 如果你需要按需导入ant-design-vue组件,可以取消下面的注释
  // ,
  // plugins: [
  //   [ 'import', {
  //     'libraryName': 'ant-design-vue',
  //     'libraryDirectory': 'es',
  //     'style': true // `style: true` 会加载 less 文件,而不是编译后的CSS
  //   } ]
  // ]
}
