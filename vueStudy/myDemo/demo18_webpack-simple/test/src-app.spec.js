/**
 * Created by Zjp on 2017/09/05.
 */
var vue = require('vue');
var srcApp = require('../src/App.vue');
describe('app.vue',function () {
	// JavaScript 选项断言
	it('should have a correct message',function () {
		expect(srcApp.data().msg).toBe('Welcome to Your Vue.js App！！')
	});
	// 组件实际渲染的渲染结果断言
	/*it('should render correct message',function () {
		var vm = new Vue()
	});*/
});