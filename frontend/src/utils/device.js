import enquireJs from 'enquire.js'

// 定义设备类型常量
export const DEVICE_TYPE = {
  DESKTOP: 'desktop',
  TABLET: 'tablet',
  MOBILE: 'mobile'
}

/**
 * 设备查询函数
 * @param {Function} callback - 当设备类型变化时调用的回调函数
 */
export const deviceEnquire = function (callback) {
  // 桌面设备匹配对象
  const matchDesktop = {
    match: () => {
      callback && callback(DEVICE_TYPE.DESKTOP)
    }
  }

  // 平板设备匹配对象
  const matchLablet = {
    match: () => {
      callback && callback(DEVICE_TYPE.TABLET)
    }
  }

  // 移动设备匹配对象
  const matchMobile = {
    match: () => {
      callback && callback(DEVICE_TYPE.MOBILE)
    }
  }

  // 使用 enquireJs 注册媒体查询
  enquireJs
    // 移动设备：屏幕宽度小于等于 576px
    .register('screen and (max-width: 576px)', matchMobile)
    // 平板设备：屏幕宽度在 576px 到 1199px 之间
    .register('screen and (min-width: 576px) and (max-width: 1199px)', matchLablet)
    // 桌面设备：屏幕宽度大于等于 1200px
    .register('screen and (min-width: 1200px)', matchDesktop)
}
