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
		const User = {
			//一个『路径参数』使用冒号 : 标记。当匹配到一个路由时，参数值会被设置到 this.$route.params，可以在每个组件内使用
			template: '<div>User {{ $route.params.id }}</div>'
		};
		const Users = {
			template: '<div>Users</div>'
		};
		const Users2 = {
			template: '<div>Users2</div>'
		};

		// 3. 创建 router 实例，然后传 `routes` 配置
		// 你还可以传别的配置参数, 不过先这么简单着吧。
		const router = new VueRouter({
			routes: [
				// 动态路径参数 以冒号开头
				{ path: '/user/:id', component: User },
				//有时候，同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高。
				{ path: '/user', component: Users2 },
				{ path: '/user', component: Users },
			]
		});
		// 4. 创建和挂载根实例。
		// 记得要通过 router 配置参数注入路由，
		// 从而让整个应用都有路由功能
		const app = new Vue({
			router
		}).$mount('#app')

		// 现在，应用已经启动了！
	}


	function init() {
		exampleInit();
	}

	window.ready(function () {
		init();
	});

})(window, document);