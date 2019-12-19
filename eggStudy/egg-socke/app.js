/*
 * @Author: jiapeng.Zheng
 * @Date: 2019-12-19 15:37:23
 * @LastEditors: jiapeng.Zheng
 * @LastEditTime: 2019-12-19 15:37:56
 * @Description: 
 */
module.exports = app => {
  app.beforeStart(async () => {
    const room = await app.redis.get('room:demo');
    if (!room) {
      await app.redis.set('room:demo', 'demo');
    }
  });
}