module.exports = app => {
  app.router.get('/isGzip', async function(ctx) {
    this.body = `isGzip`;
  });
  app.router.get('/isNotGzip', async function(ctx) {
    this.body = `isNotGzip`;
  });
};