module.exports = {
  keys: 'my-cookie-secret-key',
  // 配置需要的中间件，数组顺序即为中间件的加载顺序
  middleware: ['robot'],
  // 配置 robot 中间件的配置
  robot: {
    ua: [/Baiduspider/i]
  },
  // 配置 gzip 中间件的配置
  gzip: {
    threshold: 2, // 小于 2bytes 的响应体不压缩
  }
};