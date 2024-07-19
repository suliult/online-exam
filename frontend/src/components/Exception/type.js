// 定义不同类型的错误页面配置
const types = {
  // 403 错误：禁止访问
  403: {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg', // 403错误图片URL
    title: '403', // 页面标题
    desc: '抱歉，你无权访问该页面' // 错误描述
  },

  // 404 错误：页面未找到
  404: {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg', // 404错误图片URL
    title: '404', // 页面标题
    desc: '抱歉，你访问的页面不存在或仍在开发中' // 错误描述
  },

  // 500 错误：服务器内部错误
  500: {
    img: 'https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg', // 500错误图片URL
    title: '500', // 页面标题
    desc: '抱歉，服务器出错了' // 错误描述
  }
}

// 导出错误类型配置对象
export default types
