/**
 * Created by Zjp on 2017/08/11.
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
		const Foo = { template: '<div>foo</div>' }
		const Bar = { template: '<div>bar</div>' }
		const Baz = { template: '<div>baz</div>' }
		const home = {
			template: '<div>home</div>'
		};
		// 3. 创建 router 实例，然后传 `routes` 配置
		// 你还可以传别的配置参数, 不过先这么简单着吧。
		const router = new VueRouter({
			routes: [
				// 动态路径参数 以冒号开头
				{ path: '/',
					//一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。
					// 确保正确使用 components 配置（带上 s）：
					components:{
						default: Baz,
						a: Bar,
						b: Foo
					}
				},
				{ path: '/other',
					components:{
						default: Foo,
						a: Bar,
						b: Baz
					}
				},
				{ path: '', component: home },
			]
		});
		const app = new Vue({
			router
		}).$mount('#app');

		// 现在，应用已经启动了！


	}


	function init() {
		exampleInit();

	}

	window.ready(function () {
		init();
	});

})(window, document);