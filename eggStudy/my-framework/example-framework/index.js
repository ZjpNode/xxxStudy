const Application = require('./lib/application');
const Agent = require('./lib/agent');
const egg = require('base-framework');
//const egg = require('egg');
const BaseController = require('./app/core/base_controller');
// clone egg API
Object.assign(exports, egg);
// override Application and Agent
exports.Application = Application;
exports.Agent = Agent;
exports.BaseController = BaseController;