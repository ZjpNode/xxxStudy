const path = require('path');
const egg = require('base-framework');
const EGG_PATH = Symbol.for('egg#eggPath');

class Agent extends egg.Agent {
  get[EGG_PATH](){
    return path.dirname(__dirname);
  }
}

module.exports = Agent;