module.exports = {
  keys: 'my-cookie-secret-key',
  view: {
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.tpl': 'nunjucks',
    }
  },
  /*security: {
    csrf: {
      queryName: '_csrf', // 通过 query 传递 CSRF token 的默认字段为 _csrf
      bodyName: '_csrf' // 通过 body 传递 CSRF token 的默认字段为 _csrf
    },
  },*/
  // 配置需要的中间件，数组顺序即为中间件的加载顺序
  middleware: ['robot'],
  // 配置 robot 中间件的配置
  robot: {
    ua: [/Baiduspider/i]
  },
  // 配置 gzip 中间件的配置
  gzip: {
    threshold: 3, // 小于 3bytes 的响应体不压缩
    match (ctx) {
      // 只有 非ios 设备才开启
      const reg = /iphone|ipad|ipod/i;
      return !reg.test(ctx.get('user-agent'));
    }
  },
  // 添加 news 的配置项
  news: {
    pageSize: 5,
    serverUrl: 'https://cnodejs.org/api/v1',
  },
  /*mysql: {
    // 单数据库信息配置
    client: {
      // host
      host: '172.16.0.155',
      // 端口号
      port: '3306',
      // 用户名
      user: 'hcjiaban',
      // 密码
      password: 'pws1214',
      // 数据库名
      database: 'rhp_formal',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  }*/
};