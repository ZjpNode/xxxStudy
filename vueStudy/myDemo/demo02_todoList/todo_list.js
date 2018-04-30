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

	function todoListInit() {
		Vue.component('todo-item', {
			template:
			'<li>' +
				'{{indexs}}:{{title}}' +
				'<button v-on:click="$emit(\'remove\')">X</button>' +
			'</li>'
			, props: ['title','indexs']
		});
		new Vue({
			el: '#tod-list'
			, data: {
				newTodoText: ''
				, todos: [
					'Do the dishes'
					, 'Take out the trash'
					, 'Mow the lawn'
				]
			}
			, methods: {
				addNewTodo: function () {
					this.todos.push(this.newTodoText);
					this.newTodoText = '';
				}
			}
		});
	}

	function init() {
		todoListInit();
	}

	window.ready(function () {
		init();
	});

})(window, document);