/**
 * 将 JSON 字符串转换为 JavaScript 对象
 *
 * @param {string} json - 要解析的 JSON 字符串
 * @returns {Array|Object} 解析后的 JavaScript 对象，如果解析失败则返回空数组
 */
export function actionToObject (json) {
  try {
    // 尝试解析 JSON 字符串
    return JSON.parse(json)
  } catch (e) {
    // 如果解析失败，捕获异常并打印错误信息
    console.log('err', e.message)
  }
  // 如果解析失败，返回空数组作为默认值
  return []
}
