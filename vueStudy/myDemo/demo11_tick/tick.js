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

	function example2Init() {
		var vm = new Vue({
			el: '#example2'
			, data: {
				message:'123'
			}
			,components:{
				'example':{
					template: '<button @click="updateMessages">按鈕</button>'
					,methods:{
						updateMessages:function () {
							this.$emit('click');//使用 $emit(eventName) 触发事件
						}
					}
				}
			}
			,methods:{
				updateMessage:function () {
					this.message = '更新完成';
					console.log(this.$el.textContent); // => '没有更新'
					this.$nextTick(function () {
						console.log(this.$el.textContent); // => '更新完成'
					})
				}
			}
		});
	}
	
	function exampleInit() {
		var vm = new Vue({
			el: '#example'
			, data: {
				message:'123'
			}
		});
		// 当你设置 vm.someData = 'new value' ，
		// 该组件不会立即重新渲染。当刷新队列时，
		// 组件会在事件循环队列清空时的下一个“tick”更新。
		vm.message = 'new message';
		console.log(vm.$el.textContent);		//123
		Vue.nextTick(function () {
			console.log(vm.$el.textContent);	//new message
		})
	}

	function init() {
		exampleInit();
		example2Init();
	}

	window.ready(function () {
		init();
	});

})(window, document);