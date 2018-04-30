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

	function asyncExampleInit() {
		Vue.component('tree-folder', {
			props: ['folder']
			, template: '<span>' +
			'<span>{{folder.name}}</span>' +
			'<tree-folder-contents :children="folder.children"></tree-folder-contents>' +
			'</span>'
		});
		Vue.component('tree-folder-contents', {
			props: ['children']
			, template: '<ul>' +
			'<li v-for="child in children">' +
			'<tree-folder v-if="child.children" :folder="child"/>' +
			'<span v-else>{{ child.name }}</span>' +
			'</li>' +
			'</ul>'
		});
		new Vue({
			el: '#example'
			, data: {
				folder: {
					name: 'example1',
					children: [
						{name: 'example1-1'},
						{name: 'example1-2'},
						{
							name: 'example1-3',
							children: [
								{name: 'example1-3-1'},
								{
									name: 'example1-3-2',
									children: [
										{name: 'example1-3-2-1'},
										{name: 'example1-3-2-2'},
										{name: 'example1-3-2-3'}
									]
								},
								{name: 'example1-3-3'}
							]
						}
					]
				}
			}
		})
	}

	function init() {
		asyncExampleInit();
	}

	window.ready(function () {
		init();
	});

})(window, document);