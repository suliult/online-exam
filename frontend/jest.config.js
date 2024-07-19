module.exports = {
  // 指定Jest可以解析的文件扩展名
  moduleFileExtensions: [
    'js',
    'jsx',
    'json',
    'vue'
  ],

  // 指定如何转换不同类型的文件
  transform: {
    // 使用vue-jest处理.vue文件
    '^.+\\.vue$': 'vue-jest',
    // 使用jest-transform-stub处理静态资源文件
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    // 使用babel-jest处理.js和.jsx文件
    '^.+\\.jsx?$': 'babel-jest'
  },

  // 模块名称映射,用于简化导入路径
  moduleNameMapper: {
    // 将@/开头的导入路径映射到src目录
    '^@/(.*)$': '<rootDir>/src/\$1'
  },

  // 快照序列化器,用于生成Vue组件的快照
  snapshotSerializers: [
    'jest-serializer-vue'
  ],

  // 指定测试文件的匹配模式
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],

  // 设置测试环境的URL
  testURL: 'http://localhost/'
}
