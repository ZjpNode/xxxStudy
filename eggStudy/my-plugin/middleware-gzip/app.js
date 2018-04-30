module.exports = app => {
  // 框架和插件不支持在 config.default.js 中匹配 middleware，需要通过以下方式
  app.config.coreMiddleware.unshift('gzip');
};