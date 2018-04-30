const Application = require('./lib/application');
const Agent = require('./lib/agent');
const BaseController = require('./app/core/base_controller');
const egg = require('egg');

// clone egg API
Object.assign(exports, egg);

// override Application and Agent
exports.Application = Application;
exports.Agent = Agent;
exports.BaseController = BaseController;