const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development",
  entry: __dirname + "/entry/index.js",
  output: {
    path: __dirname + "/output",
    filename: "bundle.js"
  },
  plugins: [
    new webpack.BannerPlugin("原来是注释啊"),
    new HtmlWebpackPlugin({
      template: __dirname + "/entry/index.html" //new 一个这个插件的实例，并传入相关的参数
    })
  ]
};
