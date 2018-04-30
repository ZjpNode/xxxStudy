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

	function arrayInit() {

		new Vue({
			el: '#array'
			, data: {
				numbers: [1, 2, 3, 4, 5]
			}
			, computed: {
				evenNumbers: function () {
					return this.numbers.filter(function (number) {
						return number % 2 === 0;
					});
				}
			}
			,methods: {
				even: function (numbers) {
					return numbers.filter(function (number) {
						return number % 2 === 0;
					});
				}
			}
		});
	}

	function init() {
		arrayInit();
	}

	window.ready(function () {
		init();
	});

})(window, document);