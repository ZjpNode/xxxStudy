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
			template:
			'<div>' +
				'<h1>User {{ $route.params.id }}</h1>' +
				//一个被渲染组件同样可以包含自己的嵌套 <router-view>。
				'<router-view></router-view>' +
			'</div>'
		};
		const UserPosts = {
			template: '<div>UserPosts</div>'
		};
		const UserProfile = {
			template: '<div>UserProfile</div>'
		};
		const home = {
			template: '<div>This is HomePage</div>'
		};
		const UserHome = {
			template: '<div>暂无界面</div>'
		};

		// 3. 创建 router 实例，然后传 `routes` 配置
		// 你还可以传别的配置参数, 不过先这么简单着吧。
		const router = new VueRouter({
			routes: [
				// 动态路径参数 以冒号开头
				{ path: '/user/:id', component: User,
					name:'user',	//命名路由
					children:[
						// 当 /user/:id/profile 匹配成功，
						// UserProfile 会被渲染在 User 的 <router-view> 中
						{ path: 'profile', component: UserProfile },
						// 当 /user/:id/posts 匹配成功
						// UserPosts 会被渲染在 User 的 <router-view> 中
						{ path: 'posts', component: UserPosts },
						{ path: '', component: UserHome }
					]
				},
				{ path: '', component: home },
			]
		});
		const app = new Vue({
			router
			, methods: {
				test:function () {
					//编程式的导航
					console.log(".....")
					router.push({ name: 'user', params: { id: 'test' }})
				}
			}
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