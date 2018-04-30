webpackJsonp([2],[
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

var mods = function mods() {
  return __webpack_require__.e/* import() */(1).then(__webpack_require__.bind(null, 1));
};
var mod2 = function mod2() {
  return __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 2));
};
alert('Dynamically-Import');
var bindEvent = function bindEvent(el, ev, fn) {
  if (el.attachEvent) {
    el.attachEvent('on' + ev, fn);
  } else {
    el.addEventListener(ev, fn, false);
  }
};
var m = document.getElementById('mods');
bindEvent(m, 'click', function () {
  var start = async function start() {
    var fn = await mods();
    var s = await mod2();
    fn.default(s.default);
  };
  start();
});

/***/ })
],[0]);