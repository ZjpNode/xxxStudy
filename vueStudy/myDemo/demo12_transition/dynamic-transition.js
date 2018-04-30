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
			el: '#dynamic-fade-demo'
			, data: {
				show: true,
				fadeInDuration: 1000,
				fadeOutDuration: 1000,
				maxFadeDuration: 1500,
				stop: true
			}, mounted: function () {
				this.show = false
			}
			, methods: {
				beforeEnter: function (el) {
					el.style.opacity = 0
				},
				enter: function (el, done) {
					var vm = this
					Velocity(el,
						{opacity: 1},
						{
							duration: this.fadeInDuration,
							complete: function () {
								done()
								if (!vm.stop) vm.show = false
							}
						}
					)
				},
				leave: function (el, done) {
					var vm = this
					Velocity(el,
						{opacity: 0},
						{
							duration: this.fadeOutDuration,
							complete: function () {
								done()
								vm.show = true
							}
						}
					)
				}
			}
		});
	}

	function init() {
		demoInit();
	}

	window.ready(function () {
		init();
	});

})(window, document);