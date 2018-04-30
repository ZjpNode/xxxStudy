/**
 * nodejs 端的通用函数
 * @type {exports|module.exports}
 */
var fs=require("fs");
var async = require('/usr/lib/node_modules/async');
var logger = require('./h').logger;
(function(root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory();
    } else if (typeof define === 'function' && define.amd) {
        define(factory);
    } else {
        root.happyComUtils = factory();
    }
})(this, function() {

    // module

});