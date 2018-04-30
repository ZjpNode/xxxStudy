module.exports = app => {
  app.cache = 'cache';
  console.log('base-framework')
  console.log(app.config.gzip)
  console.log(app.config.framework)
};
