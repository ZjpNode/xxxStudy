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

	function formInit() {

		new Vue({
			el: '#my-form'
			, data: {
				message: ''
				, MultiMessage: ''
				, checked: false
				, checkeds: ['world', 'hello']
				, radio: 'radio1'
				, select: ''
				, MultiSelect: []
				, dynamicSelect: ''
				, dynamicOption: [{text: 'One', value: 'A'}
					, {text: 'Two', value: 'B'}
					, {text: 'Three', value: 'C'}]
				, lazyMsg: 'lazyMsg'
				, msg: 'msg'
				, trimMsg: ''
			}
		});
	}

	function init() {
		formInit();
	}

	window.ready(function () {
		init();
	});

})(window, document);