/**
 * Created by Administrator on 2016/10/11.
 */
var extend=require("util")._extend;
var log = require("./log").logger("HttpRequest");
var requests = require("request");

/**
 * nodejs HTTP请求
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

	//Http请求所需的参数
	var option = {
		url:"",
		cookie:"",
		form:{}
	};

	//Http请求返回的数据格式
	var result = {
		"success":false,
		"msg":"",
		"data":{}
	};

	/**
	 * POST方法
	 * @param opt 参数
	 * @param fn 回调函数
	 * */
	var post = function (opt,fn) {

		option = extend(option,opt);

		log.info(option);

		if(option.url == undefined || option.url == ""){
			result.msg = "请求地址为空";
			log.error(result.msg);
			fn(result);
		}else{
			//设置cookies
			var j = requests.jar();
			for(var cookieStr in option.cookie){
				var cookie = requests.cookie(cookieStr+"="+ option.cookie[cookieStr]);
				j.setCookie(cookie, option.url);
				log.info("set cookies["+cookieStr+":"+option.cookie[cookieStr]+"]");
			}
			requests = requests.defaults({jar:j});
			//调用Request模块的POST方法
			requests.post(option.url,{form:option.form},function(error,response,body){
				if (!error && response.statusCode == 200) {
					result.success = true;
					result.data = body;
					log.info("POST SUCCESS:" + JSON.stringify(result));
					log.info(result);
				}else {
					result.msg = error;
					log.error("POST ERROR:" + JSON.stringify(result));
				}
				fn(result);
			});
		}
	};

	var publicFn = {
		post:post
	};

	return publicFn;

});