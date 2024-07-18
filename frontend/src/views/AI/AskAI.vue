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
            <a-button v-if="message.error" size="small" type="danger" @click="retryMessage(index)">重试</a-button>
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
        console.log('Processed response:', response) // 添加日志
        if (response && (typeof response === 'string' || typeof response.content === 'string')) {
          const content = typeof response === 'string' ? response : response.content
          this.typewriterEffect({ role: 'assistant', content: content })
          if (this.currentChat.messages.length === 2) {
            this.currentChat.title = this.generateTitle(currentInput)
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
        console.log('API Response:', response) // 添加日志
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
    generateTitle (content) {
      return content.slice(0, 20) + (content.length > 20 ? '...' : '')
    },
    typewriterEffect (response) {
      console.log('Starting typewriter effect with:', response) // 添加日志
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
          console.log('Typewriter effect completed') // 添加日志
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
    retryMessage (index) {
      const messagesToRetry = this.currentChat.messages.slice(0, index + 1)
      this.currentChat.messages = messagesToRetry
      this.sendMessage()
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
  font-family: Arial, sans-serif;
}

.sidebar {
  width: 250px;
  padding: 20px;
  background-color: #f0f2f5;
  overflow-y: auto;
  border-right: 1px solid #e8e8e8;
}

.chat-list > div {
  padding: 10px;
  margin-bottom: 5px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.chat-list > div:hover {
  background-color: #e6f7ff;
}

.active-chat {
  background-color: #1890ff !important;
  color: white;
}

.main-chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e8e8e8;
}

.chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
}

.chat-input {
  display: flex;
  margin-top: 20px;
}

.chat-input .ant-input {
  flex: 1;
  margin-right: 10px;
  resize: none;
}

.message {
  display: flex;
  margin-bottom: 20px;
  width: 100%;
}

.message .avatar {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.message .content {
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 18px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.user {
  flex-direction: row-reverse;
}

.user .avatar {
  margin-left: 10px;
}

.user .content {
  background-color: #1890ff;
  color: white;
  margin-right: 10px;
}

.assistant {
  flex-direction: row;
}

.assistant .avatar {
  margin-right: 10px;
}

.assistant .content {
  background-color: #f0f2f5;
  color: black;
  margin-left: 10px;
}

.loading {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

pre {
  background-color: #f6f8fa;
  border-radius: 6px;
  padding: 16px;
  overflow-x: auto;
}

code {
  font-family: 'Courier New', Courier, monospace;
}
</style>
