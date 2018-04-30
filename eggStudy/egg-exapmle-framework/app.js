module.exports = app => {
  app.cache = 'cacheBasex';
  console.log('egg-exapmle')
  console.log(app.config.gzip)
  console.log(app.cache)
  console.log(app.config.framework)
};
