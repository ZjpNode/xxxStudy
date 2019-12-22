/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1576724425555_7496';

  // add your middleware config here
  config.middleware = [];

  config.io = {
    init: {},
    namespace: {
      "/": {
        connectionMiddleware: ['auth'],
        packetMiddleware: [],
      },
      "/example": {
        connectionMiddleware: [],
        packetMiddleware: [],
      }
    },
    redis: {
      host: '192.168.100.7',
      port: 6379,
      password: 'xzc',
      db: 0,
    }
  }

  config.redis = {
    client: {
      port: 6379,
      host: '192.168.100.7',
      password: 'xzc',
      db: 0,
    }
  }

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };




  return {
    ...config,
    ...userConfig,
  };
};
