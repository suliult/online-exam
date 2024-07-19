<template>
  <div>
    <!-- Summernote 富文本编辑器容器 -->
    <div id="summernote"></div>

    <!-- 按钮用于获取富文本内容 -->
    <button @click="getContent()">查看富文本内容</button>

    <!-- 按钮用于设置富文本内容 -->
    <button @click="setContent()">设置富文本内容</button>
  </div>
</template>

<script>
import '../../plugins/summernote'
import $ from 'jquery'

export default {
  name: 'NoteDemo',
  data() {
    return {
      richContent: '' // 用于存储富文本内容
    }
  },
  methods: {
    // 获取富文本内容并打印到控制台
    getContent() {
      console.log($('#summernote').summernote('code'))
    },
    // 设置富文本内容
    setContent() {
      $('#summernote').summernote('code', 'hello world!')
    }
  },
  mounted() {
    // 在组件挂载后初始化 Summernote
    $('#summernote').summernote({
      lang: 'zh-CN', // 设置语言为中文
      placeholder: '请输入内容', // 占位符文本
      height: 300, // 编辑器高度
      width: 600, // 编辑器宽度
      htmlMode: true, // 启用 HTML 模式
      toolbar: [
        // 自定义工具栏
        ['style', ['bold', 'italic', 'underline', 'clear']],
        ['fontsize', ['fontsize']],
        ['fontname', ['fontname']],
        ['color', ['color']],
        ['para', ['ul', 'ol', 'paragraph']],
        ['insert', ['link', 'picture']],
        ['mybutton', ['myVideo']] // 自定义按钮
      ],
      fontSizes: ['8', '9', '10', '11', '12', '14', '18', '24', '36'], // 可选字体大小
      fontNames: [
        // 可选字体
        'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New',
        'Helvetica Neue', 'Helvetica', 'Impact', 'Lucida Grande',
        'Tahoma', 'Times New Roman', 'Verdana'
      ],
      callbacks: {
        // 提交回调函数
        onSubmit: function() {
          this.richContent = $('#summernote').summernote('code')
        }
      }
    })
  }
}

</script>
