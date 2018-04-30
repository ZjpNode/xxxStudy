/**
 * 开发环境配置
 */
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");//分离css单独打包
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  //target: 'web',
  entry: {
    app: "./src/app.js",
    //vendors: "./vendor.js"
    //vendor: ['es5-shim', 'es5-shim/es5-sham', 'console-polyfill','es6-promise','jquery','backbone']  //将公用库单独提取打包
  },
  externals: {
    jquery: "$"
  },
  output: {
    filename: "js/[name].js",
    chunkFilename: "js/[name].js",
    path: path.resolve(__dirname, 'dist2'),
    publicPath: '../' //当使用代码分割时，publicPath很重要，它将告诉webpack从哪儿去加载其他打包的文件
  },
  module: {
    loaders: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/,
        loaders: [
          // limit=10240 :小于10KB的图片会自动转成dataUrl
          'url-loader?limit=10240&name=img/[hash:8].[name].[ext]',
          //图片优化
          'image-webpack-loader?{bypassOnDebug:true, progressive:true,optimizationLevel:3,pngquant:{quality:"65-80",speed:4}}'
        ]
      },
      {
        test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/,
        loader: 'url-loader?limit=10000&name=fonts/[hash:8].[name].[ext]'
      },
      {
        test: /\.css$/,
        //loader: 'style-loader!css-loader'
        //loader:ExtractTextPlugin.extract("style-loader","css-loader")
        loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader'})   //webpack2.0的写法
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',	//使js支持ES6
        query: {
          presets: [
            [
              'es2015'/*,
                         {
                         "modules": false
                         //【慎用】如何开启webpack2的tree shaking功能？（Tree Shaking通过静态分析技术去除exports中没有用到的方法）
                         //首先，只有es6模块才能使用webpack2做静态依赖解析（静态依赖打包可以去掉很多无用的代码，减少文件体积）。
                         //因为现在大部分浏览器还不支持es6模块语法，所以我们得下载babel，利用babel对代码进行编译。
                         //正常使用Babel 6来转换，一般设置presets: ['es2015']。
                         //但是这种方式使用的 transform-es2015-modules-commonjs插件意味着Babel会将es6模块通过commonJs模块转换输出，
                         //然后webpack 2就不能进行tree-shaking分析了。

                         //As of Babel version v6.13.0, babel-preset-es2015 supports modules option.
                         //Use preset options to disable transformation of the ES6 module syntax.
                         //来源：https://www.npmjs.com/package/babel-preset-es2015-webpack
                         }*/
            ]
          ],
          plugins: ["syntax-dynamic-import"],
          comments: true
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],	//指定公共 bundle 的名字，vendor：公共代码；manifest：运行时代码
      //name:"common",
      //chunks:['test','vendor']
    }),
    //它会将所有的 入口chunk (entry chunks) 中的 require("****.css") 移动到单独的 css 包文件 (styles.css)当中,不再内联到 javascript 里面
    new ExtractTextPlugin("css/styles.css"),
    /*new UglifyJSPlugin({
        compress: {
            properties: false,  //(default true) -- 禁止使用点符号重写属性访问, 例如： 禁止把foo["default"]重写为foo.default,
                                //因为使用es3ify-webpack-plugin兼容ie8时，会用字符串“default”替代ie8保留字default
            warnings: false     //(default true) -- 禁止输出警告信息
        },
        output: {
            beautify: false,    //(default false) -- 禁止美化输出
            quote_keys: true    //(default false) -- pass true to quote all keys in literal objects
                                //设置为true的效果是，不会把{foo："default"：function（）{}}重写为{foo：default：function（）{}},
        },
        mangle: {

            screw_ie8: false    //(default true) -- 禁止把支持IE8的代码clear掉？
        },
    })*/
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.ejs'),
      filename: './html/index.html',  //其输出的路径是相对于output.path路径而言的
      //minify: { removeAttributeQuotes: true },
    })
  ]
};