/**
 * nodejs 端的通用函数
 * @type {exports|module.exports}
 */
var path = require("path");
var utils = require('util');
var url=require('url');
var fs=require("fs");
var logger = require(path.resolve(__dirname+"/../middleWare/log")).logger("tplCommonFn");

(function(root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.tplCommonFn = factory();
    }
})(this, function() {
    /**
     * 获取配置内容
     * @param key
     * @returns {*}
     */
    var getTplConf=function(key){
        var AppConfTplConf_=global["AppConfTplConf_"];
        if(utils.isNullOrUndefined(AppConfTplConf_)){
            logger.info("AppConfTplConf_ is null .... ");
            var confFile=path.join(__dirname, "../config/tplConfs.json");
            logger.debug("confFilePath : " + confFile);
            if(utils.isNullOrUndefined(confFile)){
                logger.error("AppConfTplConf_ file is not exists.");
            }else{
                if(fs.existsSync(confFile)){
                    logger.info("loading AppConfTplConf_ .... ");
                    AppConfTplConf_=global["AppConfTplConf_"]=JSON.parse(fs.readFileSync(confFile, "utf8"));
                    logger.info("loading AppConfTplConf_ .... done.");
                }else{
                    logger.error("AppConfTplConf_ file is not exists 1.");
                }
            }
        }
        return AppConfTplConf_[key];
    };

    return {
        getTplConf:getTplConf
    };

});