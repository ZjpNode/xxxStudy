const path = require('path');
const egg = require('base-framework');
const EGG_PATH = Symbol.for('egg#eggPath');

class Application  extends egg.Application {
  get[EGG_PATH](){
    return path.dirname(__dirname);
  }
}

module.exports = Application ;