/*
 * @Author: jiapeng.Zheng
 * @Date: 2019-12-19 11:44:40
 * @LastEditors  : jiapeng.Zheng
 * @LastEditTime : 2019-12-19 11:48:01
 * @Description: 
 */
const Controller = require('egg').Controller;

class NspController extends Controller {
  async exchange () {
    const { ctx, app } = this;
    const nsp = app.io.of('/');
    const message = ctx.args[0] || {};
    const socket = ctx.socket;
    const client = socket.id;

    try {
      const { target, payload } = message
      if (!target) return;
      const msg = ctx.helper.parseMsg('exchange', payload, { client, target })
      nsp.emit(target, msg)
    } catch (error) {
      app.logger.error(error)
    }

  }
}
module.exports = NspController;