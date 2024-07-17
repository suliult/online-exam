import axios from 'axios'

export const chatWithGpt = async (payload) => {
  console.log('chatWithGpt called with payload:', payload)
  try {
    const response = await axios.post('/api/chat', payload)
    console.log('Raw API response:', response)
    return response
  } catch (error) {
    console.error('Error in chatWithGpt:', error)
    throw error
  }
}