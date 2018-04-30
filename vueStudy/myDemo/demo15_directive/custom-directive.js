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

	function exampleInit() {
		// 注册一个全局自定义指令 v-focus
		Vue.directive('focus', {
			/*
			 * 指令定义函数提供了几个钩子函数（可选）：
			 bind: 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
			 inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
			 update: 所在组件的 VNode 更新时调用，但是可能发生在其孩子的 VNode 更新之前。指令的值可能发生了改变也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
			 componentUpdated: 所在组件的 VNode 及其孩子的 VNode 全部更新时调用。
			 unbind: 只调用一次， 指令与元素解绑时调用。
			 接下来我们来看一下钩子函数的参数 (包括 el，binding，vnode，oldVnode) 。
			 * */
			// 钩子函数inserted ： 当绑定元素插入到 DOM 中。
			inserted: function (el) {
				// 聚焦元素
				el.focus()

			}
		});

		new Vue({
			el: '#demo'
		});
	}

	function example2Init() {
		// 注册一个全局自定义指令 v-focus
		Vue.directive('demo', {
			/*
			 * 指令定义函数提供了几个钩子函数（可选）：
			 bind: 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
			 inserted: 被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于 document 中）。
			 update: 所在组件的 VNode 更新时调用，但是可能发生在其孩子的 VNode 更新之前。指令的值可能发生了改变也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。
			 componentUpdated: 所在组件的 VNode 及其孩子的 VNode 全部更新时调用。
			 unbind: 只调用一次， 指令与元素解绑时调用。
			 接下来我们来看一下钩子函数的参数 (包括 el，binding，vnode，oldVnode) 。
				 el: 指令所绑定的元素，可以用来直接操作 DOM 。
				 binding: 一个对象，包含以下属性：
					 name: 指令名，不包括 v- 前缀。
					 value: 指令的绑定值， 例如： v-my-directive="1 + 1", value 的值是 2。
					 oldValue: 指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
					 expression: 绑定值的字符串形式。 例如 v-my-directive="1 + 1" ， expression 的值是 "1 + 1"。
					 arg: 传给指令的参数。例如 v-my-directive:foo， arg 的值是 "foo"。
					 modifiers: 一个包含修饰符的对象。 例如： v-my-directive.foo.bar, 修饰符对象 modifiers 的值是 { foo: true, bar: true }。
				 vnode: Vue 编译生成的虚拟节点，查阅 VNode API 了解更多详情。
				 oldVnode: 上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
			 * */
			// 钩子函数bind
			bind: function (el, binding, vnode) {
				var s = JSON.stringify;
				el.innerHTML =
					'name: ' + s(binding.name) + '<br>' +
					'value: ' + s(binding.value) + '<br>' +
					'expression: ' + s(binding.expression) + '<br>' +
					'argument: ' + s(binding.arg) + '<br>' +
					'modifiers: ' + s(binding.modifiers) + '<br>' +
					'vnode keys: ' + Object.keys(vnode).join(', ');
			}
		});

		new Vue({
			el: '#hook-arguments-example',
			data: {
				message: 'hello!'
			}
		});
	}

	function example3Init() {
		// 注册一个全局自定义指令 v-focus
		Vue.directive('color-swatch', {
			bind: function (el, binding) {
				el.style.backgroundColor = binding.value;
			}
		});

		new Vue({
			el: '#example3',
			data: {
				color: 'blue'
			}
		});
	}

	function init() {
		exampleInit();
		example2Init();
		example3Init();
	}

	window.ready(function () {
		init();
	});

})(window, document);