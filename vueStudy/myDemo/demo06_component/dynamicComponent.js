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

	/**
	 * 事件绑定
	 * @param ele   要绑定事件的元素
	 * @param ev    要绑定的事件
	 * @param fn    绑定事件的函数
	 */
	function bindEvent(ele, ev, fn) {
		ele = document.getElementById(ele);
		if (ele.attachEvent) {
			ele.attachEvent("on" + ev, fn);
		}
		else {
			ele.addEventListener(ev, fn, false);
		}
	}

	function eventBind() {
		bindEvent('changBtn', 'click', function () {
			vm.currentView = vm.currentView =='simple-counter'?'local-component':'simple-counter'
		})
	}

	var vm;

	function myComponentInit() {

		vm = new Vue({
			el: '#example'
			, data: {
				message: '?'
				, parentMsg: 'PARENT-MSG'
				, pa: 123
				, currentView: 'local-component'
			}
			, components: {
				'local-component': {
					template: '<div><input type="text"></div>'
				}
				, 'simple-counter': {
					template: '<button v-on:click="counter += 1">{{ counter }}</button>'
					, data: function () {	//在组件中 data 必须是一个函数
						return {counter: 0};
					}
				}
			}
		});
	}

	function init() {
		myComponentInit();
		eventBind()
	}

	window.ready(function () {
		init();
	});

})(window, document);