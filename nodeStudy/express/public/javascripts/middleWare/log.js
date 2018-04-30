var path = require("path");
var log4js = require("log4js");
/**
 * nodejs 日志
 * @type {exports|module.exports}
 */
(function(root, factory) {
	if (typeof exports === 'object') {
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		define(factory);
	} else {
		root.happyComLogger = factory();
	}
})(this, function() {

	//读取log4js的配置信息
	log4js.configure(path.join(__dirname, "../config/log4js.json"));

	/**
	 * 暴露到应用的日志接口
	 * @param name 指定log4js配置文件中的category。依此找到对应的appender。
	 *             如果appender没有写上category，则为默认的category。可以有多个
	 * @returns {Logger}
	 * */
	function logger(name){
		var dateFileLog = log4js.getLogger(name);
		//设置日志的输出等级
		dateFileLog.setLevel(log4js.levels.DEBUG);
		return dateFileLog;
	}

	/**
	 * 用于express中间件
	 * @returns {Function|*}
	 * */
	function useLog(){
		return log4js.connectLogger(log4js.getLogger("app"), {level: log4js.levels.INFO});
	}

	var publicFn = {
		logger:logger,
		useLog:useLog
	};

	return publicFn;

});