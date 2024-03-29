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
		const Home = {
			template: `
				<div class="home">
				  <h2>Home</h2>
				  <p>hello</p>
				</div>
			  `
		}

		const Parent = {
			data () {
				return {
					transitionName: 'slide-left'
				}
			},
			// dynamically set transition based on route change
			watch: {
				'$route'(to, from) {
					const toDepth = to.path.split('/').length
					const fromDepth = from.path.split('/').length
					this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
				}
			},
			template: `
				<div class="parent">
				  <h2>Parent</h2>
				  <transition :name="transitionName">
					<router-view class="child-view"></router-view>
				  </transition>
				</div>
			  `
		}

		const Default = {template: '<div class="default">default</div>'}
		const Foo = {template: '<div class="foo">foo</div>'}
		const Bar = {template: '<div class="bar">bar</div>'}

		const router = new VueRouter({
			routes: [
				{path: '/', component: Home},
				{
					path: '/parent', component: Parent,
					children: [
						{path: '', component: Default},
						{path: 'foo', component: Foo},
						{path: 'bar', component: Bar}
					]
				}
			]
		})

		new Vue({
			router,
			template: `
    <div id="app" class="demo">
      <h1>Transitions</h1>
      <ul>
        <li><router-link to="/">/</router-link></li>
        <li><router-link to="/parent">/parent</router-link></li>
        <li><router-link to="/parent/foo">/parent/foo</router-link></li>
        <li><router-link to="/parent/bar">/parent/bar</router-link></li>
      </ul>
      <transition name="fade" mode="out-in">
        <router-view class="view"></router-view>
      </transition>
    </div>
  `
		}).$mount('#app')
	}


	function init() {
		exampleInit();
	}

	window.ready(function () {
		init();
	});

})(window, document);