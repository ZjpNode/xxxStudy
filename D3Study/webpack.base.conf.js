const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  mode: 'development',
  entry: resolve('/entry/index.js'), // __dirname + '/entry/index.js',
  output: {
    path: resolve('/output'), // __dirname + '/output',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.BannerPlugin('原来是注释啊'),
    new HtmlWebpackPlugin({
      template: resolve('/entry/index.html') // __dirname + '/entry/index.html' // new 一个这个插件的实例，并传入相关的参数
    })
  ]
}
