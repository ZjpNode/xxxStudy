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
			el: '#demo'
			, data: {
				show: true
			}
		});
	}

	function example() {
		new Vue({
			el: '#example-1',
			data: {
				show: true
			}
		})
	}

	function example2() {
		new Vue({
			el: '#example-2',
			data: {
				show: true
			}
		})
	}

	function example3() {
		new Vue({
			el: '#example-3',
			data: {
				show: true
			}
		})
	}

	function example4() {
		new Vue({
			el: '#example-4',
			data: {
				show: false
			},
			methods: {
				beforeEnter: function (el) {
					el.style.opacity = 0
					el.style.transformOrigin = 'left'
				},
				enter: function (el, done) {
					Velocity(el, { opacity: 1, fontSize: '1.4em' }, { duration: 300 })
					Velocity(el, { fontSize: '1em' }, { complete: done })
				},
				leave: function (el, done) {
					Velocity(el, { translateX: '15px', rotateZ: '50deg' }, { duration: 600 })
					Velocity(el, { rotateZ: '100deg' }, { loop: 2 })
					Velocity(el, {
						rotateZ: '45deg',
						translateY: '30px',
						translateX: '30px',
						opacity: 0
					}, { complete: done })
				}
			}
		})
	}

	function btnInit() {
		var vm = new Vue({
			el: '#btn'
			, data: {
				show: true
				,show2: true
				,show3: true
			}
		});
	}

	function example5() {
		var vm = new Vue({
			el: '#example-5'
			, data: {
				view: 'v-a'
			}
			,components:{
				'v-a': {
					template: '<div>Component A</div>'
				},
				'v-b': {
					template: '<div>Component B</div>'
				}
			}
		});
	}

	function init() {
		demoInit();
		example();
		example2();
		example3();
		example4();
		btnInit();
		example5();
	}

	window.ready(function () {
		init();
	});

})(window, document);