'use strict';

module.exports = {
  framework:{
    name: 'base-framework'
  },
  // 配置 gzip 中间件的配置
  gzip: {
    threshold: 1
  },security: {
  csrf: {
    queryName: '_csrfBase', // 通过 query 传递 CSRF token 的默认字段为 _csrf
      bodyName: '_csrfBasexxx' // 通过 body 传递 CSRF token 的默认字段为 _csrf
  },
}
};