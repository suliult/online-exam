import { message } from 'ant-design-vue/es'
// import defaultSettings from '../defaultSettings';

// 标记是否已经添加了 Less 相关的节点
let lessNodesAppended

// 定义可选的主题色列表
const colorList = [
  { key: '薄暮', color: '#F5222D' },
  { key: '火山', color: '#FA541C' },
  { key: '日暮', color: '#FAAD14' },
  { key: '明青', color: '#13C2C2' },
  { key: '极光绿', color: '#52C41A' },
  { key: '拂晓蓝（默认）', color: '#1890FF' },
  { key: '极客蓝', color: '#2F54EB' },
  { key: '酱紫', color: '#722ED1' }
]

// 更新主题色的函数
const updateTheme = primaryColor => {
  // 如果没有提供主题色，则直接返回
  if (!primaryColor) {
    return
  }

  // 显示加载消息
  const hideMessage = message.loading('正在编译主题！', 0)

  // 构建主题的函数
  function buildIt () {
    if (!window.less) {
      return
    }
    setTimeout(() => {
      window.less
        .modifyVars({
          '@primary-color': primaryColor
        })
        .then(() => {
          hideMessage()
        })
        .catch(() => {
          message.error('Failed to update theme')
          hideMessage()
        })
    }, 200)
  }

  // 如果还没有添加 Less 相关的节点，则添加它们
  if (!lessNodesAppended) {
    // 创建并添加 Less 样式、配置和脚本节点
    const lessStyleNode = document.createElement('link')
    const lessConfigNode = document.createElement('script')
    const lessScriptNode = document.createElement('script')
    lessStyleNode.setAttribute('rel', 'stylesheet/less')
    lessStyleNode.setAttribute('href', '/color.less')
    lessConfigNode.innerHTML = `
      window.less = {
        async: true,
        env: 'production',
        javascriptEnabled: true
      };
    `
    lessScriptNode.src = 'https://gw.alipayobjects.com/os/lib/less.js/3.8.1/less.min.js'
    lessScriptNode.async = true
    lessScriptNode.onload = () => {
      buildIt()
      lessScriptNode.onload = null
    }
    document.body.appendChild(lessStyleNode)
    document.body.appendChild(lessConfigNode)
    document.body.appendChild(lessScriptNode)
    lessNodesAppended = true
  } else {
    // 如果已经添加了 Less 节点，直接构建主题
    buildIt()
  }
}

// 更新色弱模式的函数
const updateColorWeak = colorWeak => {
  // 根据 colorWeak 参数添加或移除 'colorWeak' 类
  colorWeak ? document.body.classList.add('colorWeak') : document.body.classList.remove('colorWeak')
}

export { updateTheme, colorList, updateColorWeak }
