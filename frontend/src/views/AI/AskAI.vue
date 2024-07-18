<template>
  <div class="chat-container">
    <div class="sidebar">
      <a-button @click="newChat" type="primary" block icon="plus">新对话</a-button>
      <div class="chat-list">
        <div
          v-for="(chat, index) in chats"
          :key="index"
          @click="selectChat(index)"
          :class="{ 'active-chat': index === currentChatIndex }"
        >
          <a-icon type="message" />
          {{ chat.title }}
          <a-icon type="delete" @click.stop="deleteChat(index)" />
        </div>
      </div>
    </div>
    <div class="main-chat">
      <div class="chat-header">
        <h2>{{ currentChat.title }}</h2>
        <a-select v-model="selectedModel" style="width: 120px">
          <a-select-option v-for="model in availableModels" :key="model.value" :value="model.value">
            {{ model.label }}
          </a-select-option>
        </a-select>
      </div>
      <div ref="chatBody" class="chat-body">
        <div v-for="(message, index) in currentChat.messages" :key="index" :class="['message', message.role]">
          <div class="avatar">
            <a-avatar :src="message.role === 'user' ? userAvatar : assistantAvatar" />
          </div>
          <div class="content">
            <vue-markdown v-if="message.role === 'assistant'" :source="message.content"></vue-markdown>
            <div v-else>{{ message.content }}</div>
            <div class="message-actions">
              <a-button v-if="message.role === 'assistant'" size="small" @click="regenerateMessage(index)">重新生成</a-button>
              <a-button v-if="message.error" size="small" type="danger" @click="retryMessage(index)">重试</a-button>
            </div>
          </div>
        </div>
        <div v-if="isLoading" class="loading">
          <a-spin />
        </div>
      </div>
      <div class="chat-input">
        <a-input
          v-model="inputMessage"
          placeholder="输入消息..."
          @pressEnter="handleEnter"
          :disabled="isLoading"
          autoSize
        />
        <a-button @click="sendMessage" type="primary" :loading="isLoading" icon="send">发送</a-button>
      </div>
      <a-button @click="exportChat" type="default" icon="download" style="margin-top: 10px;">导出对话</a-button>
    </div>
  </div>
</template>

<script>
import { Input, Button, Select, message, Avatar, Icon, Spin } from 'ant-design-vue'
import VueMarkdown from 'vue-markdown'
import { chatWithGpt } from '@/api/chat'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'

export default {
  name: 'ChatInterface',
  components: {
    AInput: Input,
    AButton: Button,
    ASelect: Select,
    ASelectOption: Select.Option,
    AAvatar: Avatar,
    AIcon: Icon,
    ASpin: Spin,
    VueMarkdown
  },
  data () {
    return {
      chats: [{ title: '新对话', messages: [] }],
      currentChatIndex: 0,
      inputMessage: '',
      isLoading: false,
      selectedModel: 'gpt-3.5-turbo',
      availableModels: [
        { value: 'gpt-3.5-turbo', label: 'GPT-3.5' },
        { value: 'gpt-4', label: 'GPT-4' }
      ],
      userAvatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      assistantAvatar: 'https://www.gstatic.com/lamda/images/sparkle_resting_v2_1ff6f6a71f2d298b1a31.gif'
    }
  },
  computed: {
    currentChat () {
      return this.chats[this.currentChatIndex]
    }
  },
  mounted () {
    this.loadChatsFromStorage()
    this.highlightCode()
  },
  methods: {
    newChat () {
      this.chats.push({ title: '新对话', messages: [] })
      this.currentChatIndex = this.chats.length - 1
      this.saveChatsToStorage()
    },
    selectChat (index) {
      this.currentChatIndex = index
    },
    deleteChat (index) {
      this.chats.splice(index, 1)
      if (this.chats.length === 0) {
        this.newChat()
      }
      if (this.currentChatIndex >= this.chats.length) {
        this.currentChatIndex = this.chats.length - 1
      }
      this.saveChatsToStorage()
    },
    handleEnter (e) {
      if (e.ctrlKey || e.shiftKey) {
        return
      }
      e.preventDefault()
      this.sendMessage()
    },
    async sendMessage () {
      if (!this.inputMessage.trim()) {
        message.warning('请输入消息')
        return
      }

      const userMessage = { role: 'user', content: this.inputMessage.trim() }
      this.currentChat.messages.push(userMessage)
      const currentInput = this.inputMessage
      this.inputMessage = ''
      this.isLoading = true

      try {
        const response = await this.getAnswer(this.currentChat.messages)
        console.log('Processed response:', response)
        if (response && (typeof response === 'string' || typeof response.content === 'string')) {
          const content = typeof response === 'string' ? response : response.content
          this.typewriterEffect({ role: 'assistant', content: content })
          if (this.currentChat.messages.length === 2) {
            this.summarizeChat()
          }
        } else {
          throw new Error('Invalid response format')
        }
      } catch (error) {
        console.error('Error in sendMessage:', error)
        this.currentChat.messages.push({
          role: 'assistant',
          content: `错误: ${error.message || '未知错误，请稍后再试'}`,
          error: true
        })
        message.error(`获取回答失败: ${error.message || '请稍后再试'}`)
      } finally {
        this.isLoading = false
        this.scrollToBottom()
        this.saveChatsToStorage()
      }
    },
    async getAnswer (messages) {
      try {
        const response = await chatWithGpt({
          model: this.selectedModel,
          messages: messages
        })
        console.log('API Response:', response)
        if (response && response.data) {
          return response.data
        } else {
          throw new Error('Unexpected response format')
        }
      } catch (error) {
        console.error('Error in getAnswer:', error)
        throw error
      }
    },
    scrollToBottom () {
      this.$nextTick(() => {
        const container = this.$refs.chatBody
        container.scrollTop = container.scrollHeight
      })
    },
    typewriterEffect (response) {
      console.log('Starting typewriter effect with:', response)
      let i = 0
      const speed = 30
      const content = response.content
      if (!content) {
        console.error('Invalid content in typewriterEffect:', response)
        return
      }
      const tempMessage = { role: 'assistant', content: '' }
      this.currentChat.messages.push(tempMessage)

      const typeWriter = () => {
        if (i < content.length) {
          tempMessage.content += content.charAt(i)
          i++
          this.$forceUpdate()
          this.scrollToBottom()
          setTimeout(typeWriter, speed)
        } else {
          console.log('Typewriter effect completed')
          this.highlightCode()
        }
      }

      typeWriter()
    },
    saveChatsToStorage () {
      localStorage.setItem('chats', JSON.stringify(this.chats))
    },
    loadChatsFromStorage () {
      const savedChats = localStorage.getItem('chats')
      if (savedChats) {
        this.chats = JSON.parse(savedChats)
      }
    },
    exportChat () {
      const chatContent = this.currentChat.messages
        .map(msg => `${msg.role}: ${msg.content}`)
        .join('\n\n')
      const blob = new Blob([chatContent], { type: 'text/plain;charset=utf-8' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `chat_export_${new Date().toISOString()}.txt`
      link.click()
      URL.revokeObjectURL(url)
    },
    highlightCode () {
      this.$nextTick(() => {
        document.querySelectorAll('pre code').forEach((block) => {
          hljs.highlightBlock(block)
        })
      })
    },
    async retryMessage (index) {
      const messagesToRetry = this.currentChat.messages.slice(0, index)
      this.currentChat.messages = messagesToRetry
      this.isLoading = true

      try {
        const response = await this.getAnswer(messagesToRetry)
        if (response && (typeof response === 'string' || typeof response.content === 'string')) {
          const content = typeof response === 'string' ? response : response.content
          this.typewriterEffect({ role: 'assistant', content: content })
        } else {
          throw new Error('Invalid response format')
        }
      } catch (error) {
        console.error('Error in retryMessage:', error)
        this.currentChat.messages.push({
          role: 'assistant',
          content: `错误: ${error.message || '未知错误，请稍后再试'}`,
          error: true
        })
        message.error(`重试失败: ${error.message || '请稍后再试'}`)
      } finally {
        this.isLoading = false
        this.scrollToBottom()
        this.saveChatsToStorage()
      }
    },
    async regenerateMessage (index) {
      const messagesToRegenerate = this.currentChat.messages.slice(0, index + 1)
      this.isLoading = true

      try {
        const response = await this.getAnswer(messagesToRegenerate)
        if (response && (typeof response === 'string' || typeof response.content === 'string')) {
          const content = typeof response === 'string' ? response : response.content
          this.currentChat.messages[index] = { role: 'assistant', content: content }
        } else {
          throw new Error('Invalid response format')
        }
      } catch (error) {
        console.error('Error in regenerateMessage:', error)
        this.currentChat.messages[index] = {
          role: 'assistant',
          content: `错误: ${error.message || '未知错误，请稍后再试'}`,
          error: true
        }
        message.error(`重新生成失败: ${error.message || '请稍后再试'}`)
      } finally {
        this.isLoading = false
        this.scrollToBottom()
        this.saveChatsToStorage()
      }
    },
    async summarizeChat () {
      const summaryPrompt = '请总结以下对话的主要内容，用一句简短的话概括：'
      const messagesToSummarize = this.currentChat.messages.map(msg => `${msg.role}: ${msg.content}`).join('\n')

      try {
        const response = await this.getAnswer([{ role: 'user', content: summaryPrompt + messagesToSummarize }])
        if (response && (typeof response === 'string' || typeof response.content === 'string')) {
          const content = typeof response === 'string' ? response : response.content
          this.currentChat.title = content.slice(0, 50) + (content.length > 50 ? '...' : '')
        } else {
          throw new Error('Invalid summary response format')
        }
      } catch (error) {
        console.error('Error in summarizeChat:', error)
        this.currentChat.title = '无法生成摘要'
      } finally {
        this.saveChatsToStorage()
      }
    }
  },
  watch: {
    'currentChat.messages': {
      handler () {
        this.highlightCode()
      },
      deep: true
    }
  }
}
</script>

<style scoped>
.chat-container {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background: #f0f0f0;
  overflow-y: auto;
  border-right: 1px solid #d9d9d9;
}

.chat-list .active-chat {
  background: #e6f7ff;
}

.chat-list > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #d9d9d9;
}

.main-chat {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #fafafa;
  border-bottom: 1px solid #d9d9d9;
}

.chat-body {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #fff;
  position: relative;
}

.message {
  display: flex;
  margin-bottom: 20px;
}

.message.user .content {
  background: #e6f7ff;
  border-radius: 10px 10px 0 10px;
  padding: 10px;
}

.message.assistant .content {
  background: #f6f6f6;
  border-radius: 10px 10px 10px 0;
  padding: 10px;
}

.avatar {
  margin-right: 10px;
}

.message .content {
  flex: 1;
}

.message-actions {
  margin-top: 10px;
}

.message-actions .ant-btn {
  margin-right: 10px;
}

.chat-input {
  display: flex;
  padding: 15px;
  border-top: 1px solid #d9d9d9;
  background: #fafafa;
}

.loading {
  position: absolute;
  bottom: 20px;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
