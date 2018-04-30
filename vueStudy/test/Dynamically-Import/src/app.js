const mods = () => import(/* webpackChunkName: "group-foo" */ './mod.js')
const mod2 = () => import(/* webpackChunkName: "group-foo2" */ './mod2.js')
alert('Dynamically-Import')
var bindEvent = function (el, ev, fn) {
  if (el.attachEvent) {
    el.attachEvent('on' + ev, fn)
  } else {
    el.addEventListener(ev, fn, false)
  }
}
var m = document.getElementById('mods')
bindEvent(m, 'click', function () {
  var start = async function () {
    let fn = await mods();
    let s = await mod2();
    fn.default(s.default);
  };
  start();
})