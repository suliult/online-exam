/**
 * components util
 * 组件工具函数集合
 */

/**
 * 清理空值，对象
 * 过滤掉不包含 tag 属性且 text 属性为空的子元素
 * @param {Array} children - 要过滤的子元素数组
 * @returns {Array} 过滤后的子元素数组
 */
export function filterEmpty (children = []) {
  return children.filter(c => c.tag || (c.text && c.text.trim() !== ''))
}

/**
 * 获取字符串长度，英文字符长度1，中文字符长度2
 * @param {string} str - 要计算长度的字符串
 * @returns {number} 字符串的全长度
 */
export const getStrFullLength = (str = '') =>
  str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    // ASCII字符的范围是0-128，将其视为长度1
    if (charCode >= 0 && charCode <= 128) {
      return pre + 1
    }
    // 非ASCII字符（如中文）视为长度2
    return pre + 2
  }, 0)

/**
 * 截取字符串，根据 maxLength 截取后返回
 * 考虑到中英文混合的情况，按全长度计算和截取
 * @param {string} str - 要截取的字符串
 * @param {number} maxLength - 最大允许的全长度
 * @returns {string} 截取后的字符串
 */
export const cutStrByFullLength = (str = '', maxLength) => {
  let showLength = 0
  return str.split('').reduce((pre, cur) => {
    const charCode = cur.charCodeAt(0)
    // 计算当前字符的长度
    if (charCode >= 0 && charCode <= 128) {
      showLength += 1
    } else {
      showLength += 2
    }
    // 如果累计长度不超过最大长度，则保留当前字符
    if (showLength <= maxLength) {
      return pre + cur
    }
    // 否则返回之前的结果，即停止添加新字符
    return pre
  }, '')
}
