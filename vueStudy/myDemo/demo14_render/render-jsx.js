/**
 * Created by Zjp on 2017/07/31.
 */
import AnchoredHeading from './AnchoredHeading.vue';
// eslint-disable-next-line
(function (window, document) {
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


	function exampleForJSX() {

		new Vue({
			el: '#demo',
			//将 h 作为 createElement 的别名是 Vue 生态系统中的一个通用惯例，
			// 实际上也是 JSX 所要求的，如果在作用域中 h 失去作用， 在应用中会触发报错。
			render (h) {
				return (
					<AnchoredHeading level={1}>
						<span>Hello</span> world!
					</AnchoredHeading>
				)
			}
		})
	}

	function init() {
		exampleForJSX();
	}

	window.ready(function () {
		init();
	});

})(window, document);