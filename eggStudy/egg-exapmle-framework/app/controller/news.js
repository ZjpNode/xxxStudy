const BaseController = require('example-framework').BaseController;

class NewController extends BaseController {
  async list () {

    const ctx = this.ctx;

    this.logger.info(this.user)
    this.logger.info(ctx.isIOS)
    this.logger.info(this.userx)
    const page = ctx.query.page || 1;
    const newList = await ctx.service.new.list(page);

    await this.ctx.render('news/list.tpl', {list: newList});
  }

  async contents () {
    const ctx = this.ctx;
    const newContent = await ctx.service.new.content(ctx.params.id);
    await this.ctx.render('news/contents.tpl', {content: newContent.data});
  }

}

module.exports = NewController