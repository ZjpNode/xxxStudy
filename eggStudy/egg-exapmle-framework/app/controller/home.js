const {Controller} = require('example-framework');

class HomeController extends Controller {
  async index () {
    this.ctx.body = 'Hello';
  }
}

module.exports = HomeController