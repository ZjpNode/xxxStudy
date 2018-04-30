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
		const Foo = {template: '<div>foo</div>'};
		const Bar = {template: '<div>bar</div>'};
		const post = {
			template:
				'<div class="post">' +
					'<div class="loading" v-if="loading">' +
						'Loading... ' +
					'</div>' +
					'<div v-if="error" class="error">{{ error }}</div>' +
					'<div v-if="post" class="content">' +
						'<h2>{{ post.title }}</h2>' +
						'<p>{{ post.body }}</p>' +
					'</div>' +
				'</div>'
			,data(){
				return {
					loading: false,
					post: null,
					error: null
				}
			}, created () {
				// 组件创建完后获取数据，
				// 此时 data 已经被 observed 了
				this.fetchData()
			}
			/*, watch: {
				// 如果路由有变化，会再次执行该方法
				'$route': 'fetchData'
			}*/
			, methods:{
				fetchData(){
					this.error = this.post = null;
					this.loading = true;
					// replace getPost with your data fetching util / API wrapper
					(function (that) {
						setTimeout(function () {
							that.loading = false
							if(parseInt(Math.random()*10)%2 == true){
								that.error = "Error"
							}else{
								that.post = {title:'myTitle',body:new Date()}
							}
						},1000);
					})(this)

				}
			}
		};
		const post2 = {
			template:
				'<div class="post">' +
					'<div class="loading" v-if="loading">' +
						'Loading... ' +
					'</div>' +
					'<div v-if="error" class="error">{{ error }}</div>' +
					'<div v-if="post" class="content">' +
						'<h2>{{ post.title }}</h2>' +
						'<p>{{ post.body }}</p>' +
					'</div>' +
				'</div>'
			,data(){
				return {
					loading: false,
					post: null,
					error: null
				}
			}
			//我们在导航转入新的路由前获取数据。我们可以在接下来的组件的 beforeRouteEnter 钩子中获取数据，
			// 当数据获取成功后只调用 next 方法。
			,beforeRouteEnter (to, from, next){
				console.log('post2 start to change');
				// replace getPost with your data fetching util / API wrapper
				(function (that) {
					setTimeout(function () {
						//that.loading = false
						if(parseInt(Math.random()*10)%2 == true){
							// display some global error message
							alert('error')
							next(false)//通过 next(false) 来取消导航。
						}else{
							next(function (vm) {
								vm.post = {title:'myTitle2',body:new Date()}
							})
						}
					},1000);
				})(this)
			}
			/*, watch: {
			 	// 如果路由有变化，会再次执行该方法
				// 路由改变前，组件就已经渲染完了
				$route(){
					this.post = null;
					//this.error = this.post = null;
					//this.loading = true;
					// replace getPost with your data fetching util / API wrapper
					(function (that) {
						setTimeout(function () {
							//that.loading = false
							if(parseInt(Math.random()*10)%2 == true){
								that.error = "Error"
							}else{
								that.post = {title:'myTitle22',body:new Date()}
							}
						},1000);
					})(this)
				}
			}*/
		};
		const routes = [
			{ path: '/foo', component: Foo },
			{ path: '/bar', component: Bar },
			{ path: '/post', component: post },
			{ path: '/post2', component: post2 }
		];
		const router = new VueRouter({
			routes
		});
		const app = new Vue({
			router
		}).$mount('#app');

	}


	function init() {
		exampleInit();
	}

	window.ready(function () {
		init();
	});

})(window, document);