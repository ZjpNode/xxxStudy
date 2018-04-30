/**
 * main.js Created by Zjp on 2017/08/26.
 * 模块加载
 */
!function (globals, document) {
	var z_module = globals['Z_MODULE'] = globals['Z_MODULE'] || {};

	var MODULE_URL_CONFIG = {
		'baseUrl': '/DEMO/module'
		, 'moduleUrl': {
			'microTemplating': '/microTemplating.js'
			, 'designPatterns': '/designPatterns.js'
			, 'htmlEleOpt': '/htmlEleOpt.js'
			, 'util': '/util.js'
			, 'compressJpegWithExif': '/js-compress-JPEG-width-exif.js'
		}
	};

	//获取文件路径
	var getFileUrl = function (file) {
		return MODULE_URL_CONFIG.baseUrl + MODULE_URL_CONFIG.moduleUrl[file];
	};

	//同步加载js，并储存到localStorage
	var _loadJs = function (file) {
		if (!file || !getFileUrl(file)) {
			return false
		}
		var fileUrl = getFileUrl(file);
		var xhr = new XMLHttpRequest;
		xhr.open("GET", fileUrl, false);
		xhr.onreadystatechange = function () {
			if (xhr.readyState === 4) {
				if (xhr.status === 200) {
					localStorage.setItem(file, xhr.responseText);
					_reject(localStorage.getItem(file));
				} else {
				}
			}
		};
		xhr.send()
	};

	//解析并执行js
	var _reject = function (data) {

		/*var el = document.createElement("script");
		 el.type = "text/javascript";
		 /!*
		 关于如何执行LS中的源码，我们有三种方式
		 1. eval
		 2. new Function
		 3. 在一段script标签中插入源码，再将该script标签插入页码中

		 关于这三种方式的执行效率，我们内部初步测试的结果是不同的浏览器下效率各不相同
		 参考一些jsperf上的测试，执行效率甚至和具体代码有关。
		 *!/
		 el.appendChild(document.createTextNode(data));
		 document.getElementsByTagName("head")[0].appendChild(el);
		 callback && callback()*/
		var fn = new Function(data);
		fn();
	};

	z_module.LocalJs = {
		require: function (file) {
			var fileUrl = getFileUrl(file);
			if (!fileUrl) {
				return false;
			}
			/*
			 如果无法使用localstorage，则使用document.write把需要请求的脚本写在页面上
			 作为fallback，使用document.write确保已经加载了所需要的类库
			 */
			if (!localStorage.getItem(file)) {
				/*document.write('<script src="' + fileUrl + '" type="text/javascript"></script>');
				 var self = this;
				 /!*
				 并且3s后再请求一次，但这次请求的目的是为了获取jquery源码，写入localstorage中(见下方的_loadjs函数)
				 这次“一定”走缓存，不会发出多余的请求
				 为什么会延迟3s执行？为了确保通过document.write请求jQuery已经加载完成。但很明显3s也并非一个保险的数值
				 同时使用document.write也是出于需要故意阻塞的原因，而无法为其添加回调，所以延时3s
				 *!/
				 setTimeout(function () {
				 _loadJs(file)
				 }, 3e3)*/
				_loadJs(file)
			} else {
				// 如果可以使用localstorage，则执行注入
				z_module[file] ? '' : _reject(localStorage.getItem(file));
			}

			return z_module[file];
			//callback && callback()
		},
		clearAll: function () {
			localStorage.clear();
		},
		isSupport: function () {
			return !!window.localStorage
		}
	};

	var util = z_module.LocalJs.require('util');
	//浏览器环境初始化
	function browEnvInit() {
		globals.console.logTime = function (message) {
			console.log && console.log("[" + util.formatDate(new Date()) + "]");
			console.log && console.log(message);
		};
	}

	browEnvInit();

}(window, document);