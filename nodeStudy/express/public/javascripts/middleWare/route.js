var path = require("path");
var fs = require("fs");
var log = require("./log").logger("route");
/**
 * nodejs 动态路由
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

	//动态路由的配置信息
	var routeConf = {
		"path":path.join(__dirname, "../../../routes/"),    //路由目录（routes）所在的绝对路径
		"app":null
	};

	/**
	 * 遍历目录
	 * @param dir 路由（routes）所在的目录
	 * */
	function listDir(dir){
		//读取dir目录下所有文件名称
		var fileList = fs.readdirSync(dir,'utf-8');
		for(var i=0;i<fileList.length;i++) {
			var stat = fs.lstatSync(dir + fileList[i]);
			// 判断是否是目录，需要继续
			if (stat.isDirectory()) {
				listDir(dir + fileList[i]  + '\\');
			} else {
				loadRoute(dir + fileList[i]);
			}
		}
	}

	/**
	 * 加载路由
	 * @param routeFile 路由文件的地址
	 * */
	function loadRoute(routeFile){
		var module = routeFile.substring(0,routeFile.lastIndexOf('.'));
		var route = require(module);
		// 在路由文件中定义了一个basePath变量，设置路由路径前缀
		if(route.basePath){
			routeConf.app.use(route.basePath,route);
		}else{
			routeConf.app.use(route);
		}
		log.info("加载路由："+ module);
	}

	/**
	 * 初始化入口
	 * @param app 系统主参数
	 * @param path 路由所在的目录
	 * */
	function init (app,path){
		if(!app){
			log.error("系统主参数App未设置");
			return false;
		}
		routeConf.app = app;
		routeConf.path = path?path:routeConf.path;
		listDir(routeConf.path);
		log.info("路由加载完成");
	}

	var publicFn = {
		init:init
	};

	return publicFn;

});