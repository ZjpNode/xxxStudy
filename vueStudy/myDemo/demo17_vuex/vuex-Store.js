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

	function example() {
		const Counter = {
			template: `<div>{{ count }}</div>`,
			computed: {
				count () {
					return this.$store.state.count//子组件能通过 this.$store 访问到
				}
			}
		}

		const store = new Vuex.Store({
			state: {
				count: 0
			}
			, mutations: {
				increment(state){
					state.count++;
				}
			}
		});

		const app = new Vue({
			el: '#app',
			// 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
			store,
			components: { Counter },
			template: `
				<div class="app demo">
				  <counter></counter>
				</div>
			  `
		});

		//通过 store.state 来获取状态对象，
		console.log(store.state.count) // -> 0
		//以及通过 store.commit 方法触发状态变更：
		store.commit('increment')
		//通过 store.state 来获取状态对象，
		console.log(store.state.count) // -> 1
		//以及通过 store.commit 方法触发状态变更：
		store.commit('increment')
		//-----------------------------------------
		/*store.state.count=10
		console.log(store.state.count)
		store.commit('increment')
		console.log(store.state.count)*/
	}


	function init() {
		example();
	}

	window.ready(function () {
		init();
	});

})(window, document);