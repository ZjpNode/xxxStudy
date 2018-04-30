/**
 * htmlEleOpt.js Created by Zjp on 2017/08/30.
 * html元素原生操作（逐渐完善中......）
 */
;(function (root, factory) {
	if (typeof exports === 'object') {
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		define(factory);
	} else {
		var z_module = root['Z_MODULE'] = root['Z_MODULE'] || {};
		var require = z_module['LocalJs']['require'];
		z_module['htmlEleOpt'] = factory(require);
	}
})(this, function (require) {
	/**
	 * ID选择器
	 * @param {String} eleId 元素ID
	 * @returns {Element}
	 */
	var queryEleById = function (eleId) {
		return document.getElementById(eleId);
	};
	/**
	 * 创建节点
	 * @param {String} node 节点名称
	 * @returns {Element}
	 */
	var createEle = function (node) {
		return document.createElement(node);
	};
	/**
	 * 设置节点属性
	 * @param setArrObject
	 * example：
	 *    {
                node: createEle('div'),	//必填
                attribute: [{
                    key: 'class',
                    value: 'myClass'
                }, {
                    key: 'id',
                    value: 'myId'
                }]
           }
	 */
	var setAttr = function (setArrObject) {
		for (var i = 0, len = setArrObject.attribute.length; i < len; i++) {
			setArrObject.node.setAttribute(setArrObject.attribute[i].key, setArrObject.attribute[i].value);
		}
	};

	/**
	 * 元素删除
	 * @param parentId      要删除的元素的父节点的ID
	 * @param childrenId    要删除的元素的ID
	 */
	function delEle(parentId, childrenId) {
		var ele = queryEleById(parentId);
		var childrenEle = queryEleById(childrenId);
		if (!!childrenEle) {
			ele.removeChild(childrenEle)
		}
	}

	/**
	 * 事件绑定
	 * @param ele   要绑定事件的元素
	 * @param ev    要绑定的事件
	 * @param fn    绑定事件的函数
	 */
	function bindEvent(ele, ev, fn) {
		if (ele.attachEvent) {
			ele.attachEvent("on" + ev, fn);
		}
		else {
			ele.addEventListener(ev, fn, false);
		}
	}

	function convertImgToBase64(url, callback, outputFormat) {
		var canvas = document.createElement('CANVAS'),
			ctx = canvas.getContext('2d'),
			img = new Image;
			img.crossOrigin = 'Anonymous';
			img.onload = function () {
				canvas.height = img.height;
				canvas.width = img.width;
				ctx.drawImage(img, 0, 0);
				var dataURL = canvas.toDataURL(outputFormat || 'image/png');
				callback.call(this, dataURL);
				canvas = null;
			};
		img.src = url;
	}

	function createDownload(fileName, content) {
        var blob = new Blob([content]);
        var link = document.createElement("a");
        link.innerHTML = fileName;
        link.download = fileName;
        link.href = URL.createObjectURL(blob);
        document.getElementsByTagName("body")[0].appendChild(link);
    }

	return {
		queryEleById: queryEleById
		, createEle: createEle
		, setAttr: setAttr
		, delEle: delEle
		, bindEvent: bindEvent
		, convertImgToBase64: convertImgToBase64
		, createDownload: createDownload
	}
});