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

	function childomponentInit() {
		Vue.component('child-component', {
			template:
			'<div>' +
				'<h2>我是子组件的标题</h2>' +
				'<slot name="header">只有在没有要分发的内容时才会显示。</slot>' +
				'<slot>只有在没有要分发的内容时才会显示。</slot>' +
				'<slot name="footer">只有在没有要分发的内容时才会显示。</slot>' +
			'</div>'
		});

		new Vue({
			el: '#example'
		});
	}

	function init() {
		childomponentInit();
	}

	window.ready(function () {
		init();
	});

})(window, document);