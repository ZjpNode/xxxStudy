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
				count: 2
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
				components: {Counter},
				computed: Vuex.mapState({//一下使用了三种不同的传值方式
					// 箭头函数可使代码更简练
					count: state => state.count,

					// 传字符串参数 'count' 等同于 `state => state.count`
					countAlias: 'count',

					// 为了能够使用 `this` 获取局部状态，必须使用常规函数
					countPlusLocalState (state) {
						return state.count + this.localCount
					}
				})
				/*//经过 mapState 函数调用后的结果，如下所示
				 ,computed: {
					count(){
						return this.$store.state.count
					},
					countAlias(){
						return this.$store.state['count']
					}
					,
					countPlusLocalState(){
						return this.$store.state.count + this.localCount
					}
				}*/
				/*//当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
				,computed: mapState([
					// 映射 this.count 为 store.state.count
					'count'
				])*/
				, template: `
				<div class="app demo">
				  <counter></counter>
				  <span>__{{count}}__</span>
				</div>
			  `
			})
			;

	}


	function init() {
		example();
	}

	window.ready(function () {
		init();
	});

})(window, document);