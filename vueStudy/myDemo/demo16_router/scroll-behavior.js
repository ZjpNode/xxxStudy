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
		const Home = { template: '<div>home</div>' };
		const Foo = { template: '<div>foo</div>' };
		const Bar = {
			template:
				`<div>
					  bar
					  <div style="height:500px"></div>
					  <p id="anchor">Anchor</p>
				</div>`
		};
		const scrollBehavior = function (to, from, savedPosition) {
			if(savedPosition){
				// 第三个参数 savedPosition 当且仅当 popstate 导航 (通过浏览器的 前进/后退 按钮触发) 时才可用。
				return savedPosition
			}else{
				const position = {}
				if (to.hash) {
					position.selector = to.hash
				}
				if (to.matched.some(m => m.meta.scrollToTop)) {
					// cords will be used if no selector is provided,
					// or if the selector didn't match any element.
					position.x = 0;
					position.y = 0;
				}
				/*
				  这个方法返回滚动位置的对象信息，长这样：
				 { x: number, y: number }
				 { selector: string }
				*/
				return position
			}
		};
		const routes = [
			{ path: '/', component: Home, meta: { scrollToTop: true }},
			{ path: '/foo', component: Foo },
			{ path: '/bar', component: Bar, meta: { scrollToTop: true } }
		];
		const router = new VueRouter({
			//注意: scrollBehavior这个功能只在 HTML5 history 模式下可用。
			// 当你使用 history 模式时，URL 就像正常的 url，例如 http://yoursite.com/user/id
			// 不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，
			// 如果后台没有正确的配置，当用户在浏览器直接访问 http://yoursite.com/user/id 就会返回 404，这就不好看了。
			scrollBehavior:scrollBehavior,
			routes:routes
		});
		const app = new Vue({
			router
			,template:
				`<div id="app" class="demo">
				  <p><b>注意: 这个功能只在 HTML5 history 模式下可用。</b></p>
				  <h1>Scroll Behavior</h1>
				  <ul>
					<li><router-link to="/">/</router-link></li>
					<li><router-link to="/foo">/foo</router-link></li>
					<li><router-link to="/bar">/bar</router-link></li>
					<li><router-link to="/bar#anchor">/bar#anchor</router-link></li>
				  </ul>
				  <router-view class="view"></router-view>
				</div>`
		}).$mount('#app');

	}


	function init() {
		exampleInit();
	}

	window.ready(function () {
		init();
	});

})(window, document);