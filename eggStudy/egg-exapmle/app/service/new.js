const Service = require('egg').Service;


class NewService extends Service {
  async list (page = 1) {
    // read config
    const {serverUrl, pageSize} = this.config.news;
    const {data: result} = await this.ctx.curl(`${serverUrl}/topics`, {
      /*data: {
        orderBy: '"$key"',
        startAt: `"${pageSize * (page - 1)}"`,
        endAt: `"${pageSize * page - 1}"`,
      },*/
      // 自动解析 JSON response
      dataType: 'json',
      // 3 秒超时
      timeout: 3000
    });


    return result.data;
  }

  async content (id) {

    const {serverUrl} = this.config.news;
    const {data: result} = await this.ctx.curl(`${serverUrl}/topic/${id}`, {
      dataType: 'json'
    });

    return result
  }

}

module.exports = NewService;