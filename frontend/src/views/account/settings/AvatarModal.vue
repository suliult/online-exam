<template>
  <a-modal
    title="修改头像"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    :width="800"
    @cancel="cancelHandel"> <!-- 取消按钮点击事件 -->
    <a-row> <!-- 使用 Ant Design 的 Row 组件进行布局 -->
      <a-col :xs="24" :md="12" :style="{height: '350px'}">  <!-- 使用 Ant Design 的 Col 组件进行列布局，设置不同屏幕尺寸下的列数 -->
        <!-- 使用 vue-cropper 组件进行图片裁剪 -->
        <vue-cropper
          ref="cropper"
          :img="options.img"
          :info="true"
          :autoCrop="options.autoCrop"
          :autoCropWidth="options.autoCropWidth"
          :autoCropHeight="options.autoCropHeight"
          :fixedBox="options.fixedBox"
          @realTime="realTime"
        >
        </vue-cropper>
      </a-col>
      <a-col :xs="24" :md="12" :style="{height: '350px'}">  <!-- 显示裁剪后的预览图 -->
        <div class="avatar-upload-preview">
          <img :src="previews.url" :style="previews.img"/>  <!-- 使用 img 标签显示预览图 -->
        </div>
      </a-col>
    </a-row>

    <template slot="footer">  <!-- 模态框底部按钮区域 -->
      <a-button key="back" @click="cancelHandel">取消</a-button>
      <a-button key="submit" type="primary" :loading="confirmLoading" @click="okHandel">保存</a-button>
    </template>
  </a-modal>
</template>
<script>
// import { VueCropper } from 'vue-cropper'

export default {
  /*
  components: {
    VueCropper
  },
  */
  data () {
    return {
      visible: false,
      id: null,
      confirmLoading: false,

      options: {
        img: '/avatar2.jpg',
        autoCrop: true,
        autoCropWidth: 200,
        autoCropHeight: 200,
        fixedBox: true
      },
      previews: {}
    }
  },
  methods: {
    edit (id) {
      this.visible = true
      this.id = id
      /* 获取原始头像 */
    },
    close () {
      this.id = null
      this.visible = false
    },
    cancelHandel () {
      this.close()
    },
    okHandel () {
      const vm = this

      vm.confirmLoading = true
      setTimeout(() => {
        vm.confirmLoading = false
        vm.close()
        vm.$message.success('上传头像成功')
      }, 2000)
    },

    realTime (data) {
      this.previews = data
    }
  }
}
</script>

<style lang="less" scoped>

  .avatar-upload-preview {
    position: absolute;
    top: 50%;
    transform: translate(50%, -50%);
    width: 180px;
    height: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }
</style>
