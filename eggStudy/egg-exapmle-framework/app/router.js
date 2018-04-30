module.exports = app => {
  const {router, controller} = app;
  router.get('/','home.index');
  // router.get('/test','news.list');
  router.get('/news', 'news.list');
  router.get('/content/:id', controller.news.contents);
  router.resources('api-users','/api/v1/users','api.v1.users');
}