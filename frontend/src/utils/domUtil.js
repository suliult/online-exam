/**
 * 设置文档标题，并解决微信浏览器在iOS设备上的标题不更新问题
 * @param {string} title - 要设置的标题
 */
export const setDocumentTitle = function (title) {
  // 设置文档标题
  document.title = title

  // 获取用户代理字符串
  const ua = navigator.userAgent

  // 定义微信浏览器的正则表达式
  // eslint-disable-next-line
  const regex = /\bMicroMessenger\/([\d\.]+)/

  // 检查是否在微信浏览器中且是iOS设备
  if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    // 创建一个隐藏的iframe元素
    const i = document.createElement('iframe')
    i.src = '/favicon.ico'
    i.style.display = 'none'

    // iframe加载完成后的回调
    i.onload = function () {
      // 9毫秒后移除iframe
      setTimeout(function () {
        i.remove()
      }, 9)
    }

    // 将iframe添加到文档体中
    document.body.appendChild(i)
  }
}

// 默认文档标题
export const domTitle = 'Online Exam'
