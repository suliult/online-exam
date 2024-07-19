/**
 * 设置本地存储
 *
 * @param {string} name - 存储项的名称
 * @param {*} content - 要存储的内容
 * @param {number|null} maxAge - 存储项的最大存活时间（秒），可选
 */
export const setStore = (name, content, maxAge = null) => {
  // 检查是否在浏览器环境且name有效
  if (!global.window || !name) {
    return
  }

  // 如果content不是字符串，转换为JSON字符串
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }

  const storage = global.window.localStorage

  // 存储内容
  storage.setItem(name, content)

  // 如果设置了maxAge，添加过期时间
  if (maxAge && !isNaN(parseInt(maxAge))) {
    const timeout = parseInt(new Date().getTime() / 1000)
    storage.setItem(`${name}_expire`, timeout + maxAge)
  }
}

/**
 * 获取本地存储的内容
 *
 * @param {string} name - 存储项的名称
 * @returns {*} 存储的内容，如果已过期或不存在则返回undefined
 */
export const getStore = name => {
  // 检查是否在浏览器环境且name有效
  if (!global.window || !name) {
    return
  }

  const content = window.localStorage.getItem(name)
  const _expire = window.localStorage.getItem(`${name}_expire`)

  // 检查是否过期
  if (_expire) {
    const now = parseInt(new Date().getTime() / 1000)
    if (now > _expire) {
      return // 已过期，返回undefined
    }
  }

  // 尝试解析JSON，如果失败则返回原始内容
  try {
    return JSON.parse(content)
  } catch (e) {
    return content
  }
}

/**
 * 清除指定的本地存储项
 *
 * @param {string} name - 要清除的存储项的名称
 */
export const clearStore = name => {
  // 检查是否在浏览器环境且name有效
  if (!global.window || !name) {
    return
  }

  window.localStorage.removeItem(name)
  window.localStorage.removeItem(`${name}_expire`)
}

/**
 * 清除所有本地存储
 */
export const clearAll = () => {
  // 检查是否在浏览器环境
  if (!global.window) {
    return
  }

  window.localStorage.clear()
}
