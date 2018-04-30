/**
 * Created by Zjp on 2017/07/28.
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

	function hwInit() {
		new Vue({
			el: '#hwInput'
			, data: {
				message: 'Hello World!'
			}
		});
	}

	function hwInputInit() {
		Vue.component('my-hw', {
			template: ' <div><p>{{s}}</p><p>{{s}}</p></div>'
			, data: function () {
				return {s: 's'};
			}
		});
		new Vue({
			el: 'my-hw'
		});
	}

	function init() {
		hwInit();
		hwInputInit();
	}

	window.ready(function () {
		init();
	});

})(window, document);