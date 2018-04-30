module.exports = app => {
  app.cache = 'cachex';
  console.log('example-framework')
  console.log(app.config.gzip)
  console.log(app.config.framework)
};
