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

	function demoInit() {
		var vm = new Vue({
			el: '#list-demo'
			, data: {
				items: [1, 2, 3, 4, 5, 6, 7, 8, 9]
				, nextNum: 10
			}
			, methods: {
				randomIndex: function () {
					return Math.floor(Math.random() * this.items.length)
				},
				add: function () {
					this.items.splice(this.randomIndex(), 0, this.nextNum++)
				},
				remove: function () {
					this.items.splice(this.randomIndex(), 1)
				}
			}
		});
	}

	function demo2Init() {
		var vm = new Vue({
			el: '#flip-list-demo'
			, data: {
				items: [1, 2, 3, 4, 5, 6, 7, 8, 9]
				, nextNum: 10
			}
			, methods: {
				shuffle: function () {
					this.items = _.shuffle(this.items)
				}
			}
		});
	}

	function demo3Init() {
		var vm = new Vue({
			el: '#list-complete-demo'
			, data: {
				items: [1, 2, 3, 4, 5, 6, 7, 8, 9]
				, nextNum: 10
			}
			, methods: {
				randomIndex: function () {
					return Math.floor(Math.random() * this.items.length)
				},
				add: function () {
					this.items.splice(this.randomIndex(), 0, this.nextNum++)
				},
				remove: function () {
					this.items.splice(this.randomIndex(), 1)
				},
				shuffle: function () {
					this.items = _.shuffle(this.items)
				}
			}
		});
	}

	function demo4Init() {
		var vm = new Vue({
			el: '#sudoku-demo'
			, data: {
				cells: Array.apply(null, {length: 81})
					.map(function (_, index) {
						return {
							id: index,
							number: index % 9 + 1
						}
					})
			}
			, methods: {
				shuffle: function () {
					this.cells = _.shuffle(this.cells)
				}
			}
		});

	}

	function demo5Init() {
		var vm = new Vue({
			el: '#staggered-list-demo'
			, data: {
				query: ''
				, css: ''
				, list: [{msg: 'Bruce Lee'},
					{msg: 'Jackie Chan'},
					{msg: 'Chuck Norris'},
					{msg: 'Jet Li'},
					{msg: 'Kung Fury'}]
			}
			, computed: {
				computedList: function () {
					var vm = this;
					return this.list.filter(function (item) {
						return item.msg.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
					})
				}
			}
			, methods: {
				beforeEnter: function (el) {
					el.style.opacity = 0
					el.style.height = 0
				},
				/*当只用 JavaScript 过渡的时候，
				 在 enter 和 leave 中，回调函数 done 是必须的 。
				 否则，它们会被同步调用，过渡会立即完成。*/
				enter: function (el, done) {
					var delay = el.dataset.index * 150
					setTimeout(function () {
						Velocity(
							el,
							{opacity: 1, height: '1.6em'},
							{complete: done}
						)
					}, delay)
				},
				leave: function (el, done) {
					var delay = el.dataset.index * 150
					setTimeout(function () {
						Velocity(
							el,
							{opacity: 0, height: 0},
							{complete: done}
						)
					}, delay)
				}
			}
		});
	}

	function init() {
		demoInit();
		demo2Init();
		demo3Init();
		demo4Init();
		demo5Init();
	}

	window.ready(function () {
		init();
	});

})(window, document);