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

		Vue.component('my-component', {
			/*
			 * 组件实例的作用域是孤立的。
			 * 这意味着不能 (也不应该) 在子组件的模板内直接引用父组件的数据。
			 * 要让子组件使用父组件的数据，我们需要通过子组件的 props 选项。
			 * */
			props: ['myMsg', 'parentMsg']	//子组件要显式地用 props 选项声明它期待获得的数据：
			/*
			 prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。这是为了防止子组件无意修改了父组件的状态——这会让应用的数据流难以理解。
			 另外，每次父组件更新时，子组件的所有 prop 都会更新为最新值。这意味着你不应该在子组件内部改变 prop。如果你这么做了，Vue 会在控制台给出警告。
			 为什么我们会有修改 prop 中数据的冲动呢？通常是这两种原因：
			 1、prop 作为初始值传入后，子组件想把它当作局部数据来用；
			 2、prop 作为初始值传入，由子组件处理成其它数据输出。
			 * */
			, computed: {
				//定义一个计算属性，处理 prop 的值并返回。
				normalizedParentMsg: function () {
					return this.parentMsg.trim().toLowerCase();
				}
			}
			, template: '<div>This is my first VUE component ' +
			'<br><span>myMsg:{{myMsg}}</span>' +
			'<br><span>parentMsg:{{parentMsg}}</span>' +
			'<br><span>normalizedParentMsg:{{normalizedParentMsg}}</span>' +
			'</div>'
		});

		var data = {counter: 0};

		new Vue({
			el: '#example'
			, data: {
				message: '?'
				, parentMsg: 'PARENT-MSG'
				, pa: 123
			}
			, components: {
				'local-component': {
					template: '<div>This is local component</div>'
				}
				, 'simple-counter': {
					template: '<button v-on:click="counter += 1">{{ counter }}</button>'
					// 技术上 data 的确是一个函数了，因此 Vue 不会警告，
					// 但是我们返回给每个组件的实例的却引用了同一个data对象
					, data: function () {	//在组件中 data 必须是一个函数
						return data;
					}
				}
				, 'no-simple-counter': {
					template: '<button v-on:click="counter += 1">{{ counter }}</button>'
					, data: function () {	//在组件中 data 必须是一个函数
						return {counter: 0};
					}
				}
				, 'props-validate': {
					template:
					'<div>' +
					'<span>{{propA}}</span><br>' +
					'<span>{{propF}}</span><br>' +
					'</div>'
					//要指定验证规格，需要用对象的形式，而不能用字符串数组：
					/**
					 * type 可以是下面原生构造器：
					 String
					 Number
					 Boolean
					 Function
					 Object
					 Array
					 Symbol
					 type 也可以是一个自定义构造器函数，使用 instanceof 检测。
					 当 prop 验证失败，Vue 会在抛出警告 (如果使用的是开发版本)。

					 注意 props 会在组件实例创建之前进行校验，
					 所以在 default 或 validator 函数里，
					 诸如 data、computed 或 methods 等实例属性还无法使用。
					 */
					, props: {// 基础类型检测 (`null` 意思是任何类型都可以)
						propA: Number
						// 多种类型
						, propB: [String, Number]
						// 必传且是字符串
						/*, propC: {
						 type: String
						 , required: true
						 }*/
						// 数字，有默认值
						, propD: {
							type: Number
							, default: 100
						}
						// 数组/对象的默认值应当由一个工厂函数返回
						, propE: {
							type: Object
							, default: function () {
								return {message: 'hello'};
							}
						}
						// 自定义验证函数
						, propF: {
							validator: function (value) {
								return value > 10;
							}
						}
					}
				}
				,'no-prop-attr':{
					/*
						对于多数特性来说，传递给组件的值会覆盖组件本身设定的值。
						即例如传递 type="large" 将会覆盖 type="date" 且有可能破坏该组件！
						索性我们对待 class 和 style 特性会更聪明一些，这两个特性的值都会做合并 (merge) 操作
					*/
					template:
					'<div class="class1" type="date">' +
					'<span class="class2">no-prop-attr</span><br>' +
					'</div>'
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