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

	function counterAddInit() {

		new Vue({
			el: '#counterAdd'
			, data: {
				counter: 0
				, name: 'v-on'
			}
			, methods: {
				add: function () {
					return this.counter += 1;
				}
				, alert: function (event) {
					// `this` 在方法里指当前 Vue 实例
					alert('Hello ' + this.name + '!');
					// `event` 是原生 DOM 事件
					if (event) {
						alert(event.target.tagName);
					}
				}
				, say: function (message, msg) {
					alert(message + msg);
				}
				, warn: function (message, event) {
					// 现在我们可以访问原生事件对象
					if (event) {
						event.preventDefault();
					}
					if (event) {
						alert(event.target.tagName);
					}
					alert(message);
				}
				, left: function () {
					alert('left');
				}
				, right: function () {
					alert('right');
				}
				, middle: function () {
					alert('middle');
				}
			}
		});
	}

	function init() {
		counterAddInit();
	}

	window.ready(function () {
		init();
	});

})(window, document);