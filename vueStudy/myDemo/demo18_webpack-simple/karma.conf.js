/**
 * Created by Zjp on 2017/09/05.
 */
// 我们只需要使用完全相同的 webpack 配置即可
// 但是，请记得删除原来的 entry，因为我们在测试期间不需要它
var webpackConfig = require('./webpack.config.js');
delete webpackConfig.entry;

// karma.conf.js
module.exports = function (config) {
	config.set({
		browser: ['PhantomJS'],
		frameworks: ['jasmine'],
		//这是所有测试的入口文件。
		files: ['test/index.js'],
		//把入口文件传递给webpack以进行打包。
		preprocessors: {
			'test/index.js': ['webpack']
		},
		//使用webpack配置
		webpack: webpackConfig,
		// avoid walls of useless text
		webpackMiddleware: {
			noInfo: true
		},
		singleRun: true
	});
};