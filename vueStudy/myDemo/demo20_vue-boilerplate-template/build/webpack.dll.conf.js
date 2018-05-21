var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    vendor: [
      'babel-polyfill',
      'js-cookie',
      'moment',
      'q',
      'axios',
      'vue/dist/vue.common.js',
      'vue-i18n',
      'vue-router',
      'vuex',
      'vuex-persistedstate',
      'easyscroll'
    ]
  },
  output: {
    path: path.resolve(__dirname, '../static/js'),
    filename: '[name].dll.js',
    library: '[name]_library'
  },
  resolve: {
    //自动解析确定的扩展。默认值为： [".js", ".json"]，能够使用户在引入模块时不带扩展
    extensions: ['.js', '.vue', '.json']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        //exclude: /node_modules/,
        include:[path.join(__dirname, '..', 'node_modules/easyscroll')]
      }
    ]
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en-gb/),
    new webpack.DllPlugin({
      path: path.join(__dirname, '.', '[name]-manifest.json'),
      libraryTarget: 'commonjs2',
      name: '[name]_library'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
}
