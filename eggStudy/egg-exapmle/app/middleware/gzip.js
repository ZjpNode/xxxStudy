const isJSON = require('koa-is-json');
const zlib = require('zlib');

/**
 *
 * @param options 中间件的配置项，框架会将 app.config[${middlewareName}] 传递进来
 * @param app     当前应用 Application 的实例
 * @returns {gzip}
 */
module.exports = (options, app) => {
  return async function gzip (ctx, next) {
    await next();

    // 后续中间件执行完成后将响应体转换成 gzip
    let body = ctx.body;
    if (!body) return;

    // 支持 options.threshold
    if (options.threshold && ctx.length < options.threshold) return;

    if (isJSON(body)) body = JSON.stringify(body);

    // 设置 gzip body，修正响应头
    const stream = zlib.createGzip();
    stream.end(body);
    ctx.body = stream;
    ctx.set('Content-Encoding', 'gzip');
  };
};