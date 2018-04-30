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

	function myComponentInit() {
		Vue.component('button-counter', {
			template: '<button v-on:click="incrementCounter">{{ counter }}</button>'
			, data: function () {
				return {
					counter: 0
				};
			}
			, methods: {
				incrementCounter: function () {
					this.counter += 1;
					this.$emit('increment');//使用 $emit(eventName) 触发事件
				}
			}
		});
		new Vue({
			el: '#counter-event-example'
			, data: {
				total: 0
			}
			, methods: {
				incrementTotal: function () {
					this.total += 1;
				}
			}
			, components: {
				'button-counter-native': {
					template: '<button v-on:click="incrementCounter">{{ counter }}</button>'
					, data: function () {
						return {
							counter: 0
						};
					}
					, methods: {
						incrementCounter: function () {
							this.counter += 1;
							//有时候，你可能想在某个组件的根元素上监听一个原生事件。可以使用 .native 修饰 v-on。
							//this.$emit('click');//使用 $emit(eventName) 触发事件
						}
					}
				}
			}
		});
	}

	function init() {
		myComponentInit();
	}

	window.ready(function () {
		init();
	});

})(window, document);