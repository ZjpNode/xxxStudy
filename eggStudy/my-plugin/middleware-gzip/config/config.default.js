'use strict';

module.exports = {
  // 配置 gzip 中间件的配置
  gzip: {
    threshold: 2, // 小于 2bytes 的响应体不压缩
    /**
     * match 和 ignore 支持的参数都一样，只是作用完全相反，match 和 ignore 不允许同时配置。
     * match 和 ignore 支持多种类型的配置方式
     * 字符串：当参数为字符串类型时，配置的是一个 url 的路径前缀，所有以配置的字符串作为前缀的 url 都会匹配上。
     * 正则：当参数为正则时，直接匹配满足正则验证的 url 的路径。
     * 函数：当参数为一个函数时，会将请求上下文传递给这个函数，最终取函数返回的结果（ture/false）来判断是否匹配。
     */
    match(ctx) {
      // 只有 ios 设备才开启
      const reg = /iphone|ipad|ipod/i;
      return reg.test(ctx.get('user-agent'));
    }
  }
};