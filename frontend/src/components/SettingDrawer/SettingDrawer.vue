<template>
  <div class="setting-drawer" ref="settingDrawer">
    <!-- 设置抽屉组件 -->
    <a-drawer
      width="300"
      placement="right"
      @close="onClose"
      :closable="false"
      :visible="visible"
      :getContainer="() => $refs.settingDrawer"
      :style="{}"
    >
      <div class="setting-drawer-index-content">
        <!-- 整体风格设置 -->
        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">整体风格设置</h3>
          <div class="setting-drawer-index-blockChecbox">
            <!-- 暗色菜单风格选项 -->
            <a-tooltip>
              <!-- ... -->
            </a-tooltip>
            <!-- 亮色菜单风格选项 -->
            <a-tooltip>
              <!-- ... -->
            </a-tooltip>
          </div>
        </div>

        <!-- 主题色设置 -->
        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">主题色</h3>
          <div style="height: 20px">
            <!-- 主题色选择器 -->
            <a-tooltip v-for="(item, index) in colorList" :key="index">
              <!-- ... -->
            </a-tooltip>
          </div>
        </div>
        <a-divider />

        <!-- 导航模式设置 -->
        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">导航模式</h3>
          <div class="setting-drawer-index-blockChecbox">
            <!-- 侧边栏导航选项 -->
            <a-tooltip>
              <!-- ... -->
            </a-tooltip>
            <!-- 顶部栏导航选项 -->
            <a-tooltip>
              <!-- ... -->
            </a-tooltip>
          </div>
          <!-- 其他导航相关设置 -->
          <div :style="{ marginTop: '24px' }">
            <a-list :split="false">
              <!-- 内容区域宽度设置 -->
              <a-list-item>
                <!-- ... -->
              </a-list-item>
              <!-- 固定 Header 设置 -->
              <a-list-item>
                <!-- ... -->
              </a-list-item>
              <!-- 下滑时隐藏 Header 设置 -->
              <a-list-item>
                <!-- ... -->
              </a-list-item>
              <!-- 固定侧边菜单设置 -->
              <a-list-item>
                <!-- ... -->
              </a-list-item>
            </a-list>
          </div>
        </div>
        <a-divider />

        <!-- 其他设置 -->
        <div :style="{ marginBottom: '24px' }">
          <h3 class="setting-drawer-index-title">其他设置</h3>
          <div>
            <a-list :split="false">
              <!-- 色弱模式设置 -->
              <a-list-item>
                <!-- ... -->
              </a-list-item>
              <!-- 多页签模式设置 -->
              <a-list-item>
                <!-- ... -->
              </a-list-item>
            </a-list>
          </div>
        </div>
        <a-divider />

        <!-- 拷贝设置按钮和提示信息 -->
        <div :style="{ marginBottom: '24px' }">
          <a-button @click="doCopy" icon="copy" block>拷贝设置</a-button>
          <a-alert type="warning" :style="{ marginTop: '24px' }">
            <!-- ... -->
          </a-alert>
        </div>
      </div>

      <!-- 抽屉开关按钮 -->
      <div class="setting-drawer-index-handle" @click="toggle">
        <a-icon type="setting" v-if="!visible"/>
        <a-icon type="close" v-else/>
      </div>
    </a-drawer>
  </div>
</template>


<script>
import { DetailList } from '../../components'
import SettingItem from './SettingItem'
import config from '../../config/defaultSettings'
import { updateTheme, updateColorWeak, colorList } from './settingConfig'
import { mixin, mixinDevice } from '../../utils/mixin'

export default {
  components: {
    DetailList,
    SettingItem
  },
  mixins: [mixin, mixinDevice],
  data () {
    return {
      visible: true,
      colorList,
      baseConfig: Object.assign({}, config)
    }
  },
  watch: {
    // 可以在这里添加需要监听的属性
  },
  mounted () {
    const vm = this
    // 延迟16ms后隐藏抽屉
    setTimeout(() => {
      vm.visible = false
    }, 16)
    // 当主题色不是默认色时，进行主题编译
    if (this.primaryColor !== config.primaryColor) {
      updateTheme(this.primaryColor)
    }
    // 更新色弱模式
    if (this.colorWeak !== config.colorWeak) {
      updateColorWeak(this.colorWeak)
    }
  },
  methods: {
    // 显示抽屉
    showDrawer () {
      this.visible = true
    },
    // 关闭抽屉
    onClose () {
      this.visible = false
    },
    // 切换抽屉显示状态
    toggle () {
      this.visible = !this.visible
    },
    // 切换色弱模式
    onColorWeak (checked) {
      this.baseConfig.colorWeak = checked
      this.$store.dispatch('ToggleWeak', checked)
      updateColorWeak(checked)
    },
    // 切换多标签页模式
    onMultiTab (checked) {
      this.baseConfig.multiTab = checked
      this.$store.dispatch('ToggleMultiTab', checked)
    },
    // 切换菜单主题
    handleMenuTheme (theme) {
      this.baseConfig.navTheme = theme
      this.$store.dispatch('ToggleTheme', theme)
    },
    // 复制配置
    doCopy () {
      const text = `export default {
        // ... 配置对象
      }`
      this.$copyText(text).then(message => {
        console.log('copy', message)
        this.$message.success('复制完毕')
      }).catch(err => {
        console.log('copy.err', err)
        this.$message.error('复制失败')
      })
    },
    // 切换布局模式
    handleLayout (mode) {
      this.baseConfig.layout = mode
      this.$store.dispatch('ToggleLayoutMode', mode)
      // 顶部菜单模式下不能固定左侧菜单栏
      this.handleFixSiderbar(false)
    },
    // 更改内容区宽度
    handleContentWidthChange (type) {
      this.baseConfig.contentWidth = type
      this.$store.dispatch('ToggleContentWidth', type)
    },
    // 更改主题色
    changeColor (color) {
      this.baseConfig.primaryColor = color
      if (this.primaryColor !== color) {
        this.$store.dispatch('ToggleColor', color)
        updateTheme(color)
      }
    },
    // 切换固定头部
    handleFixedHeader (fixed) {
      this.baseConfig.fixedHeader = fixed
      this.$store.dispatch('ToggleFixedHeader', fixed)
    },
    // 切换自动隐藏头部
    handleFixedHeaderHidden (autoHidden) {
      this.baseConfig.autoHideHeader = autoHidden
      this.$store.dispatch('ToggleFixedHeaderHidden', autoHidden)
    },
    // 切换固定侧边栏
    handleFixSiderbar (fixed) {
      if (this.layoutMode === 'topmenu') {
        this.baseConfig.fixSiderbar = false
        this.$store.dispatch('ToggleFixSiderbar', false)
        return
      }
      this.baseConfig.fixSiderbar = fixed
      this.$store.dispatch('ToggleFixSiderbar', fixed)
    }
  }
}
</script>

<style lang="less" scoped>

  .setting-drawer-index-content {

    .setting-drawer-index-blockChecbox {
      display: flex;

      .setting-drawer-index-item {
        margin-right: 16px;
        position: relative;
        border-radius: 4px;
        cursor: pointer;

        img {
          width: 48px;
        }

        .setting-drawer-index-selectIcon {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          padding-top: 15px;
          padding-left: 24px;
          height: 100%;
          color: #1890ff;
          font-size: 14px;
          font-weight: 700;
        }
      }
    }
    .setting-drawer-theme-color-colorBlock {
      width: 20px;
      height: 20px;
      border-radius: 2px;
      float: left;
      cursor: pointer;
      margin-right: 8px;
      padding-left: 0px;
      padding-right: 0px;
      text-align: center;
      color: #fff;
      font-weight: 700;

      i {
        font-size: 14px;
      }
    }
  }

  .setting-drawer-index-handle {
    position: absolute;
    top: 240px;
    background: #1890ff;
    width: 48px;
    height: 48px;
    right: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    pointer-events: auto;
    z-index: 1001;
    text-align: center;
    font-size: 16px;
    border-radius: 4px 0 0 4px;

    i {
      color: rgb(255, 255, 255);
      font-size: 20px;
    }
  }
</style>
