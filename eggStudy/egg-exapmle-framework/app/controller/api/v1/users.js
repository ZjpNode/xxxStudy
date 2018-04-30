// GET	/posts
exports.index = async (ctx) => {
  ctx.body = {data: `_csrf=${ctx.csrf}`}
};
// GET	/posts/new
exports.new = async (ctx) => {
  ctx.body = {data: 'new'}
};
// GET	/posts/:id
exports.show = async (ctx) => {
  ctx.body = {data: `get id ${ctx.params.id}`}
};
// GET	/posts/:id/edit
exports.edit = async (ctx) => {
  ctx.body = {data: `edit id ${ctx.params.id}`}
};
// POST	/posts
exports.create = async (ctx) => {
  ctx.body = {data: `post`}
};
// PUT	/posts/:id
exports.update = async (ctx) => {
  ctx.body = {data: `update id ${ctx.params.id}`}
};
// DELETE	/posts/:id
/*
exports.destroy = async (ctx) => {
  ctx.body = {data: `delete id ${ctx.params.id}`}
};
*/
