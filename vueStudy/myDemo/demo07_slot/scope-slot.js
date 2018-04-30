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
		Vue.component('my-awesome-list', {
			props: ['items','children']
			, template: '<ul>' +
			'<slot name="itemSlot" v-for="item in items" :text="item.text" :id="children"> ' +
			'<!-- 这里写入备用内容 --> ' +
			'</slot>' +
			'</ul>'
		});

		new Vue({
			el: 'my-awesome-list'
			, data: {items: [{'text': '1'}, {'text': '22'}, {'text': '6'}],parents:'parentData'}
		});
	}

	function init() {
		childomponentInit();
	}

	window.ready(function () {
		init();
	});

})(window, document);