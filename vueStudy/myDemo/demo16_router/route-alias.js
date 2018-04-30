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
		const Home = {template: '<div><h1>Home</h1><router-view></router-view></div>'}
		const Foo = {template: '<div>foo</div>'}
		const Bar = {template: '<div>bar</div>'}
		const Baz = {template: '<div>baz</div>'}

		const router = new VueRouter({
			routes: [
				{ path: '/home', component: Home,
					children: [
						// absolute alias
						{ path: 'foo', component: Foo, alias: '/foo' },
						// relative alias (alias to /home/bar-alias)
						{ path: 'bar', component: Bar, alias: 'bar-alias' },
						// multiple aliases
						{ path: 'baz', component: Baz, alias: ['/baz', 'baz-alias'] }
					]
				}
			]
		});

		const app = new Vue({
			router,
			template:
				`<div id="app">
					  <h1>Route Alias</h1>
					  <ul>
						<li><router-link to="/foo">
						  /foo (renders /home/foo)
						</router-link></li>
						<li><router-link to="/home/bar-alias">
						  /home/bar-alias (renders /home/bar)
						</router-link></li>
						<li><router-link to="/baz">
						  /baz (renders /home/baz)</router-link>
						</li>
						<li><router-link to="/home/baz-alias">
						  /home/baz-alias (renders /home/baz)
						</router-link></li>
					  </ul>
					  <router-view class="view"></router-view>
				</div>`
		}).$mount('#app')
	}


	function init() {
		exampleInit();
	}

	window.ready(function () {
		init();
	});

})(window, document);