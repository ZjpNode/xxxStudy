/**
 * Created by Zjp on 2017/07/31.
 */
// eslint-disable-next-line
;(function (window, document) {
	window.ready = function (fn) {
		if (document.addEventListener) {		//标准浏览器
			document.addEventListener('DOMContentLoaded', function () {
				//注销时间，避免重复触发
				document.removeEventListener('DOMContentLoaded', arguments.callee, false);
				fn();		//运行函数
			}, false);
		} else if (document.attachEvent) {		//IE浏览器
			document.attachEvent('onreadystatechange', function () {
				if (document.readyState == 'complete') {
					document.detachEvent('onreadystatechange', arguments.callee);
					fn();		//函数运行
				}
			});
		}
	};

	function asyncExampleInit() {
		Vue.component('async-example', function (resolve, reject) {
			setTimeout(function () {
				resolve({
					template: '<div>' +
					'<h2>我是异步的子组件</h2>' +
					'</div>'
				})
			}, 1000);
		});
		new Vue({
			el: '#example'
		})
	}

	function init() {
		asyncExampleInit();

	}

	window.ready(function () {
		init();
	});

})(window, document);