import axios from 'axios'

/**
 * 与GPT模型进行对话的函数
 *
 * @param {Object} payload - 包含对话内容的负载对象
 * @returns {Promise<Object>} 返回API响应的Promise
 * @throws {Error} 如果API调用失败,则抛出错误
 */
export const chatWithGpt = async (payload) => {
  // 记录传入的payload,用于调试
  console.log('chatWithGpt called with payload:', payload)

  try {
    // 发送POST请求到'/api/chat'端点
    const response = await axios.post('/api/chat', payload)

    // 记录原始API响应,用于调试
    console.log('Raw API response:', response)

    // 返回API响应
    return response

  } catch (error) {
    // 如果发生错误,记录错误信息
    console.error('Error in chatWithGpt:', error)

    // 将错误抛出,以便调用者可以处理
    throw error
  }
}
