module.exports = app => {
  const {router, controller} = app;
  /*console.log(controller)
  router.get('/', controller.home.index);*/
  router.get('/', async function(){
    this.body = `framework: ${this.app.config.framework.name}, isIOS: ${this.isIOS}`;
  })
};