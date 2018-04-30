const Controller = require('base-framework').Controller;

class HomeController extends Controller {
  async index(){
    this.body = `framework: ${this.app.config.framework.name}, isIOS: ${this.isIOS}`;
  }
}

module.exports = HomeController