'use strict';
const path = require('path');
module.exports =  {
  framework:{
    name: 'example-framework'
  },
  // 配置 gzip 中间件的配置
  gzip: {
    threshold: 2
  },security: {
    csrf: {
      queryName: '_csrfxx', // 通过 query 传递 CSRF token 的默认字段为 _csrf
      bodyName: '_csrfxxx' // 通过 body 传递 CSRF token 的默认字段为 _csrf
    },
  }
};
module.exports = appInfo => {
  return {
    logrotator: {
      filesRotateByHour: [
        path.join(appInfo.root, 'logs', appInfo.name, 'common-error.log'),
      ],
    },
  };
};
