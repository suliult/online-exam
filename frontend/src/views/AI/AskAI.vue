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
        <div class="model-selection">
          <a-select v-model="selectedModel" style="width: 150px" @change="handleModelChange">
            <a-select-option v-for="model in availableModels" :key="model.value" :value="model.value">
              {{ model.label }}
            </a-select-option>
          </a-select>
          <a-input v-if="selectedModel === 'custom'" v-model="customModel" placeholder="输入自定义模型名称" style="width: 200px; margin-left: 10px;" />
        </div>
      </div>
      <div ref="chatBody" class="chat-body">
        <div v-for="(message, index) in currentChat.messages" :key="index" :class="['message', message.role]">
          <div class="avatar">
            <a-avatar :src="message.role === 'user' ? userAvatar : assistantAvatar" />
          </div>
          <div class="content">
            <vue-markdown
              v-if="message.role === 'assistant'"
              :source="message.content"
              :breaks="true"
              :html="true"
              :linkify="true"
              :emoji="true"
              :typographer="true"
              :highlight="highlightCode"></vue-markdown>
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
        <a-textarea
          v-model="inputMessage"
          placeholder="输入消息..."
          :auto-size="{ minRows: 1, maxRows: 5 }"
          @pressEnter="handleEnter"
          :disabled="isLoading"
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
    ATextarea: Input.TextArea,
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
        { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
        { value: 'gpt-4', label: 'GPT-4' },
        { value: 'gpt-4o', label: 'GPT-4o' },
        { value: 'claude-3-5-sonnet-20240620', label: 'claude-3-5-sonnet-20240620' },
        { value: 'claude-3-opus-20240229', label: 'claude-3-opus-20240229' },
        { value: 'gemini-1.5-flash', label: 'gemini-1.5-flash' },
        { value: 'gemma-7b-it', label: 'gemma-7b-it' },
        { value: 'moonshot-v1-8k', label: 'moonshot-v1-8k' },
        { value: 'custom', label: '自定义模型' }
      ],
      customModel: '',
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
      if (e.ctrlKey) {
        e.preventDefault()
        this.sendMessage()
      }
    },
    async sendMessage () {
      if (!this.inputMessage.trim()) {
        this.$message.warning('请输入消息')
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
        this.$message.error({
          content: `获取回答失败: ${error.message || '请稍后再试'}`,
          duration: 5
        })
      } finally {
        this.isLoading = false
        this.scrollToBottom()
        this.saveChatsToStorage()
      }
    },
    async getAnswer (messages) {
      try {
        const modelToUse = this.selectedModel === 'custom' ? this.customModel : this.selectedModel
        const response = await chatWithGpt({
          model: modelToUse,
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
          requestAnimationFrame(typeWriter)
        } else {
          console.log('Typewriter effect completed')
          this.highlightCode()
        }
      }

      requestAnimationFrame(typeWriter)
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
    highlightCode (code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(lang, code, true).value
      }
      return hljs.highlightAuto(code).value
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
        this.$message.error(`重试失败: ${error.message || '请稍后再试'}`)
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
        this.$message.error(`重新生成失败: ${error.message || '请稍后再试'}`)
      } finally {
        this.isLoading = false
        this.scrollToBottom()
        this.saveChatsToStorage()
      }
    },
    async summarizeChat () {
      if (this.currentChat.messages.length < 2) return

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
    },
    handleModelChange (value) {
      if (value !== 'custom') {
        this.customModel = ''
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
  overflow: hidden;
}

.sidebar {
  width: 250px;
  background-color: #f0f2f5;
  padding: 20px;
  overflow-y: auto;
}

.main-chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.chat-input {
  padding: 20px;
  background-color: #fff;
  border-top: 1px solid #e8e8e8;
  display: flex;
  align-items: flex-end;
}

.chat-input .ant-input {
  flex: 1;
  margin-right: 10px;
  resize: none;
  min-height: 40px;
  max-height: 120px;
  overflow-y: auto;
}

.message {
  display: flex;
  margin-bottom: 20px;
}

.message .avatar {
  margin-left: 10px;
  margin-right: 10px;
}

.message .content {
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 18px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.message.user {
  flex-direction: row-reverse;
}

.message.user .content {
  background-color: #1890ff;
  color: #fff;
  border-radius: 18px 0 18px 18px;
}

.message.assistant .content {
  background-color: #f0f2f5;
  border-radius: 0 18px 18px 18px;
}

.message .content /deep/ pre {
  background-color: #282c34;
  border-radius: 6px;
  padding: 12px;
  overflow-x: auto;
}

.message .content /deep/ code {
  font-family: 'Courier New', Courier, monospace;
  font-size: 0.9em;
}

.message.user .content /deep/ pre,
.message.user .content /deep/ code {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.chat-list > div {
  padding: 10px;
  margin-bottom: 5px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.chat-list > div:hover {
  background-color: #e6f7ff;
}

.chat-list > div.active-chat {
  background-color: #1890ff;
  color: #fff;
}

.message-actions {
  margin-top: 10px;
  display: flex;
  justify-content: flex-start;
}

.message.user .message-actions {
  justify-content: flex-end;
}

.message-actions .ant-btn {
  margin-right: 10px;
}

.message.user .message-actions .ant-btn {
  margin-right: 0;
  margin-left: 10px;
}

.model-selection {
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .chat-container {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    height: auto;
    max-height: 30vh;
  }

  .main-chat {
    height: 70vh;
  }
}
</style>
