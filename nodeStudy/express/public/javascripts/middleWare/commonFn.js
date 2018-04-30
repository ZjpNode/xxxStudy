/**
 * nodejs 端的通用函数
 * @type {exports|module.exports}
 */
var path = require("path");
var utils = require('util');
var url=require('url');
var fs=require("fs");
var logger = require(path.resolve(__dirname+"/log")).logger("commonFn");

(function(root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.commonFn = factory();
    }
})(this, function() {
    /**
     * TODO:这是一个需要优化的方法，页面也要优化
     * @param req
     * @param res
     * @param next
     * @param mgs
     */
    var goToErrorPage=function(req, res, next,mgs){
        res.redirect("/errorPage");
    };

    var getNameCookieStr=function(req,name) {
        var Cookies = this.getCookieArr(req);
        if(utils.isNullOrUndefined(Cookies[name])){
            return Cookies[name];
        }
        return null;
    };

    var getCookieArr= function(req) {
        var Cookies = {};
        req.headers.cookie && req.headers.cookie.split(';').forEach(function( Cookie ) {
            var parts = Cookie.split('=');
            Cookies[ parts[ 0 ].trim() ] = ( parts[ 1 ] || '' ).trim();
            /*cookie 需要放到生产环境，使用正确域名、通过nginx代理访问 才能获得*/
            console.log("name: "+parts[ 0 ].trim() +" val: "+( parts[ 1 ] || '' ).trim(),req);
        });
        return Cookies;
    };
    /**
     *
     * @param req request对象
     * @param retOptions 需要请求其它服务时，设置cookie。
     * @param res 返回给浏览器的response对象
     *
     * @desc 从传入的req中获取全部cookie，如果retOptions不为空，将cookie以请求服务格式设置
     * 否则以应答浏览器格式设置到res中
     */
    var setCookie= function(req,retOptions,res) {

        var isRes=false;

        if(!utils.isNullOrUndefined(res)){
            isRes=true;
        }

        retOptions = retOptions || {};

        retOptions.headers=retOptions.headers || {};

        var cookieStr="";
        var cookieArr=[];

        console.log("req.headers.cookie : "+req.headers.cookie,req);

        !utils.isNullOrUndefined(req.headers.cookie) && req.headers.cookie.split(';').forEach(function( Cookie ) {
            var parts = Cookie.split('=');
            var cookieName=parts[ 0 ].trim();
            var cookieVal=parts[ 1 ] || ''.trim();

            if(isRes){
                cookieArr.push(this.genClientCookie(cookieName,cookieVal));
            }else{
                cookieStr+=cookieName+"="+cookieVal+";"
            }
            /*cookie 需要放到生产环境，使用正确域名、通过nginx代理访问 才能获得*/
            console.log("name: "+parts[ 0 ].trim() +" val: "+( parts[ 1 ] || '' ).trim(),req);
        });

        if(!isRes && cookieStr!=""){
            retOptions.headers.Cookie=cookieStr;
            return retOptions;
        }else if(isRes && cookieArr.length>0){
            res.setHeader('Set-Cookie', cookieArr);
        }
    };

    var genClientCookie= function(name, val, opt) {
        var pairs = [name + '=' + val];
        opt = opt || {};

        if (opt.maxAge) pairs.push('Max-Age=' + opt.maxAge);
        if (opt.domain) pairs.push('Domain=' + opt.domain);

        if (opt.path){
            pairs.push('Path=' + opt.path);
        }else{
            pairs.push('Path=/');
        }

        if (opt.expires){
            pairs.push('Expires=' + opt.exppires.toUTCString());
        }else{
            var date=new Date();
            date.setTime(date.getTime()+365*24*3600*1000);
            pairs.push('Expires=' + date.toUTCString());
        }

        if (opt.httpOnly && opt.httpOnly=="false"){

        }else{
            pairs.push('HttpOnly');
        }
        if (opt.secure) pairs.push('Secure');

        return pairs.join(';');
    };

    /**
     * 获取配置内容
     * @param key
     * @returns {*}
     */
    var getAppConf=function(key){
        var AppConf_=global["AppConf_"];
        if(utils.isNullOrUndefined(AppConf_)){
            logger.info("AppConf_ is null .... ");
            var confFile=path.join(__dirname, "../config/appConfs.json");
            logger.debug("confFilePath : " + confFile);
            if(utils.isNullOrUndefined(confFile)){
                logger.error("conf file is not exists.");
            }else{
                if(fs.existsSync(confFile)){
                    logger.info("loading confs .... ");
                    AppConf_=global["AppConf_"]=JSON.parse(fs.readFileSync(confFile, "utf8"));
                    logger.info("loading confs .... done.");
                }else{
                    logger.error("conf file is not exists 1.");
                }
            }
        }
        return AppConf_[key];
    };

    return {
        goToErrorPage:goToErrorPage,
        getNameCookieStr:getNameCookieStr,
        getCookieArr:getCookieArr,
        setCookie:setCookie,
        genClientCookie:genClientCookie,
        getAppConf:getAppConf
    };

});