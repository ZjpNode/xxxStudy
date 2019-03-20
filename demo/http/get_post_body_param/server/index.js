const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  ctx.response.set('Access-Control-Allow-Origin', '*')
  next()
})

app.use(async ctx => {
  console.log(ctx.method)
  let postData = ''
  ctx.req.addListener('data', data => {
    postData += data
  })
  ctx.req.addListener('end', () => {
    console.log('end_body ', postData)
    console.log('end_url ', ctx.query)
  })
  ctx.body = 'Hello World'
})

app.listen(3000)
