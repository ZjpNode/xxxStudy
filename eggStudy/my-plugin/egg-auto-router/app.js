module.exports = app => {

  app.beforeStart(async () => {
    const {controller} = app;
    
    for(let key in controller){
      console.log(key);
    }
    //router.get('/test','home.index');
    app.coreLogger.info('[egg-auto-router] router auto loading success.')
  });
  // router.get('/test','home.index');
};