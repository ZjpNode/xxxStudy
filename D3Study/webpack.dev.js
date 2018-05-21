const webpack = require('webpack')
const merg = require('webpack-merge')
const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const app = express()
let baseWebpackConfig = require('./webpack.base.conf')
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
  baseWebpackConfig.entry[name] = ['webpack-hot-middleware/client'].concat(
    baseWebpackConfig.entry[name]
  )
})
app.use('/', require('connect-history-api-fallback')())
app.use('/', express.static('public'))

baseWebpackConfig = merg(baseWebpackConfig, {
  output: {
    path: '/' // publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
})

let webpackCompiled = webpack(baseWebpackConfig)

// 配置运行时打包
app.use(
  webpackDevMiddleware(webpackCompiled, {
    publicPath: '/',
    stats: { colors: true },
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    }
  })
)

// 配置热更新
app.use(webpackHotMiddleware(webpackCompiled))

let server = app.listen(2000, function() {
  let port = server.address().port
  console.log('Open http://localhost:%s', port)
})
