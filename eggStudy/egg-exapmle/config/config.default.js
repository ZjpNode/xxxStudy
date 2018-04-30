module.exports = {
  keys: 'my-cookie-secret-key',
  view: {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    }
  },
  // 配置需要的中间件，数组顺序即为中间件的加载顺序
  middleware: ['robot', 'gzip'],
  // 配置 robot 中间件的配置
  robot: {
    ua: [/Baiduspider/i]
  },
  // 配置 gzip 中间件的配置
  gzip: {
    threshold: 1024, // 小于 1k 的响应体不压缩
  },
  // 添加 news 的配置项
  news: {
    pageSize: 5,
    serverUrl: 'https://cnodejs.org/api/v1',
  }
};