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
		Vue.component('anchored-heading', {
			render: function (createElement) {
				// @returns {VNode} 组件树中的 "所有" VNodes必须是唯一的
				return createElement(
					// {String | Object | Function}
					// 一个 HTML 标签字符串，组件选项对象，或者一个返回值类型为String/Object的函数，必要参数
					'h' + this.level   	// tag name 标签名称
					// {Object}
					// 一个包含模板相关属性的数据对象
					// 这样，您可以在 template 中使用这些属性.可选参数.

					//有一件事要注意：正如在模板语法中，v-bind:class 和 v-bind:style ，会被特别对待一样，
					// 在 VNode 数据对象中，下列属性名是级别最高的字段。
					// 该对象也允许你绑定普通的 HTML 特性，
					// 就像 DOM 属性一样，比如 innerHTML (这会取代 v-html 指令)。
					/*, {
					 // 和`v-bind:class`一样的 API
					 'class': {
					 foo: true,
					 bar: false
					 },
					 // 和`v-bind:style`一样的 API
					 style: {
					 color: 'red',
					 fontSize: '14px'
					 },
					 // 正常的 HTML 特性
					 attrs: {
					 id: 'foo'
					 },
					 // 组件 props
					 props: {
					 myProp: 'bar'
					 },
					 // DOM 属性
					 domProps: {
					 innerHTML: 'baz'
					 },
					 // 事件监听器基于 `on`
					 // 所以不再支持如 `v-on:keyup.enter` 修饰器
					 // 需要手动匹配 keyCode。
					 on: {
					 click: this.clickHandler
					 },
					 // 仅对于组件，用于监听原生事件，而不是组件内部使用 `vm.$emit` 触发的事件。
					 nativeOn: {
					 click: this.nativeClickHandler
					 },
					 // 自定义指令. 注意事项：不能对绑定的旧值设值
					 // Vue 会为您持续追踪
					 directives: [
					 {
					 name: 'my-custom-directive',
					 value: '2',
					 expression: '1 + 1',
					 arg: 'foo',
					 modifiers: {
					 bar: true
					 }
					 }
					 ],
					 // Scoped slots in the form of
					 // { name: props => VNode | Array<VNode> }
					 scopedSlots: {
					 default: props => createElement('span', props.text)
					 },
					 // 如果组件是其他组件的子组件，需为 slot 指定名称
					 slot: 'name-of-slot',
					 // 其他特殊顶层属性
					 key: 'myKey',
					 ref: 'myRef'
					 }*/
					, this.$slots.default 	// 子组件中的阵列
					// {String | Array}
					// 子节点 (VNodes)，由 `createElement()` 构建而成，
					// 或简单的使用字符串来生成“文本结点”。可选参数。
					/*,[
					 '先写一些文字'
					 , createElement('h1', '一则头条')
					 , createElement(MyComponent, {
					 props: {
					 someProp: 'foobar'
					 }
					 })
					 ]*/
				)
			},
			/*
			 上面的render函数生成的html与使用
			 template:
			 '<h1 v-if="level === 1">' + '<slot></slot></h1>' +
			 '<h2 v-else-if="level === 2"><slot></slot></h2>' +
			 '<h3 v-else-if="level === 3"><slot></slot></h3>' +
			 '<h4 v-else-if="level === 4"><slot></slot></h4>' +
			 '<h5 v-else-if="level === 5"><slot></slot></h5>' +
			 '<h6 v-else-if="level === 6"><slot></slot></h6>',
			 一致
			 * */
			props: {
				level: {
					type: Number,
					required: true
				}
			}
		});
		new Vue({
			el: 'anchored-heading'
		});
	}

	function example2Init() {

		var getChildrenTextContent = function (children) {
			return children.map(function (node) {
				return node.children
					? getChildrenTextContent(node.children)
					: node.text
			}).join('')
		};

		Vue.component('anchored-heading-two', {
			render: function (createElement) {
				// create kebabCase id
				debugger
				var headingId = getChildrenTextContent(this.$slots.default)
					.toLowerCase()
					.replace(/\W+/g, '-')
					.replace(/(^\-|\-$)/g, '')
				return createElement(
					'h' + this.level
					, [
						createElement(
							'a'
							, {
								attrs: {
									name: headingId,
									href: '#' + headingId
								}
							}
							, this.$slots.default
						)
					]
				);
			}
			, props: {
				level: {
					type: Number,
					required: true
				}
			}
		});

		new Vue({
			el: 'anchored-heading-two'
		});
	}


	function init() {
		exampleInit();
		example2Init()
	}

	window.ready(function () {
		init();
	});

})(window, document);