/**
 * nodejs 端的通用函数
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

    // module

});