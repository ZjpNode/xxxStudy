/**
 * Created by Zjp on 2017/06/03.
 */

var $ = require('jquery');
//var $ = require('jquery');
//es5-shim和es5-sham的引用是必要的，因为它是解决通用性的es3环境下es5 API的缺失问题，就像babel-polyfill一样
//使用es5-shim和es5-sham来使IE8支持Object.defineProperty
/**
 * CANNOT use `import` to import `es5-shim`,
 * because `import` will be transformed to `Object.defineProperty` by babel,
 * `Object.defineProperty` doesn't exists in IE8,
 * (but will be polyfilled after `require('es5-shim')` executed).
 */
require('es5-shim');
require('es5-shim/es5-sham');
require('console-polyfill');

var testCss = require('./../../skin/css/test.css');
var Es6Promise = require('es6-promise') ;
Es6Promise.polyfill();
/**
 * CANNOT use `import` to import `us` 
 * because `import` will run `us` before `require('es5-shim')`.
 */
//import {us} from './hello3.js';
var hello3 = require('./hello3.js');

console.log(hello3.us); // 125
var str = require('./hello');
function main() {
 $('body').html('Welcome ' + str);
}

function addOtherModule(){
	$("#test").on('click','a',function (event) {
		console.log(event.target.id);
	})
	$("#test2").append('<a id="6">6</a>');
	$("#addOtherModule").click(function () {
		require.ensure([/*'./hello2'*/], function(require){
	    	var str2 = require('./hello2');
	    	console.log(str2);
	    	alert(str2);
		}/*,'hello22r'*/);
	})
}

addOtherModule();
//main();