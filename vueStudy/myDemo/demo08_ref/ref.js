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
		Vue.component('user-profile', {
			template:
			'<div>' +
				'<h2>我是子组件的标题</h2>' +
			'</div>'
		});

		var parent = new Vue({
			el: '#example'
		});

		// 访问子组件
		var child = parent.$refs;
		/*
		* $refs 只在组件渲染完成后才填充，并且它是非响应式的。
		* 它仅仅作为一个直接访问子组件的应急方案
		* 应当避免在模版或计算属性中使用 $refs。
		* */
		console.log(child)
	}

	function init() {
		childomponentInit();
	}

	window.ready(function () {
		init();
	});

})(window, document);