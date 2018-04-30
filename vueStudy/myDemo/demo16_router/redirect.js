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
		const Home = {template: '<router-view></router-view>'};
		const Default = {template: '<div>default</div>'};
		const Foo = {template: '<div>foo</div>'};
		const Bar = {template: '<div>bar</div>'};
		const Baz = {template: '<div>baz</div>'};
		const WithParams = {template: '<div>{{ $route.params.id }}</div>'};

		const router = new VueRouter({
			routes: [
				{ path: '/', component: Home,
					children: [
						{ path: '', component: Default ,meta: { requiresAuth: '' }},
						{ path: 'foo', component: Foo  ,meta: { requiresAuth: 'foo' }},
						{ path: 'bar', component: Bar,meta: { requiresAuth: 'bar' } },
						{ path: 'baz', name: 'baz', component: Baz,meta: { requiresAuth: 'baz' } },
						{ path: 'with-params/:id', component: WithParams ,meta: { requiresAuth: 'with-params/:id' }},
						// relative redirect to a sibling route
						{ path: 'relative-redirect', redirect: 'foo',meta: { requiresAuth: 'relative-redirect' } }
					]
				},
				// absolute redirect
				{ path: '/absolute-redirect', redirect: '/bar',meta: { requiresAuth: '/absolute-redirect' }  },
				// dynamic redirect, note that the target route `to` is available for the redirect function
				{ path: '/dynamic-redirect/:id?',
					redirect: to => {
						// 方法接收 目标路由 作为参数
						// return 重定向的 字符串路径/路径对象
						const { hash, params, query } = to
						if (query.to === 'foo') {
							return { path: '/foo', query: null }
						}
						if (hash === '#baz') {
							//重定向的目标也可以是一个命名的路由：
							return { name: 'baz', hash: '' }
						}
						if (params.id) {
							return '/with-params/:id'
						} else {
							return '/bar'
						}
					}
					,meta: { requiresAuth: '/dynamic-redirect/:id?' }
				},
				// named redirect
				{ path: '/named-redirect', redirect: { name: 'baz' },meta: { requiresAuth: '/named-redirect' }},

				// redirect with params
				{ path: '/redirect-with-params/:id', redirect: '/with-params/:id',meta: { requiresAuth: '/redirect-with-params/:id' } },

				// catch all redirect
				{ path: '*', redirect: '/',meta: { requiresAuth: '/' } }
			]
		});

		router.beforeEach((to, from, next) => {
			console.log(to.matched)
			next() // 确保一定要调用 next()
		})

		const app = new Vue({
			router,
			template: `
				<div id="app">
				  <h1>Redirect</h1>
				  <ul>
					<li><router-link to="/relative-redirect">
					  /relative-redirect (redirects to /foo)
					</router-link></li>
					<li><router-link to="/relative-redirect?foo=bar">
					  /relative-redirect?foo=bar (redirects to /foo?foo=bar)
					</router-link></li>
					<li><router-link to="/absolute-redirect">
					  /absolute-redirect (redirects to /bar)
					</router-link></li>
					<li><router-link to="/dynamic-redirect">
					  /dynamic-redirect (redirects to /bar)
					</router-link></li>
					<li><router-link to="/dynamic-redirect/123">
					  /dynamic-redirect/123 (redirects to /with-params/123)
					</router-link></li>
					<li><router-link to="/dynamic-redirect?to=foo">
					  /dynamic-redirect?to=foo (redirects to /foo)
					</router-link></li>
					<li><router-link to="/dynamic-redirect#baz">
					  /dynamic-redirect#baz (redirects to /baz)
					</router-link></li>
					<li><router-link to="/named-redirect">
					  /named-redirect (redirects to /baz)
					</router-link></li>
					<li><router-link to="/redirect-with-params/123">
					  /redirect-with-params/123 (redirects to /with-params/123)
					</router-link></li>
					<li><router-link to="/not-found">
					  /not-found (redirects to /)
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