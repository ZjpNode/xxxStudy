/**
 * z_module_designPatterns.js Created by Zjp on 2017/08/26.
 * @link  http://web.jobbole.com/29454/ 来源
 * 23种设计模式（1/23）（逐渐完善中......）
 *        1、单例模式            singleton
 *        2、简单工厂模式        objectFactory
 *        3、观察者模式            Observer
 *        4、适配器模式
 */
;(function (root, factory) {
	if (typeof exports === 'object') {
		module.exports = factory();
	} else if (typeof define === 'function' && define.amd) {
		define(factory);
	} else {
		var z_module = root['Z_MODULE'] = root['Z_MODULE'] || {};
		var require = z_module['LocalJs']['require'];
		z_module['designPatterns'] = factory(require);
	}
})(this, function (require) {

		/**
		 * 1、单例模式
		 * @description : 使用单例模式创建遮罩层
		 * 单例模式的定义是产生一个类的唯一实例，但js本身是一种“无类”语言。
		 * 很多讲js设计模式的文章把{}当成一个单例来使用也勉强说得通。
		 * 因为js生成对象的方式有很多种，我们来看下另一种更有意义的单例。
		 */
		var createMask = function () {
			var mask;
			return function () {
				return mask || ( mask = document.body.appendChild(document.createElement('div')));
			}
		};

		/**
		 * 单例模式的包装器：其实是桥接模式
		 * @param  {Function} fn
		 */
		var singleton = function (fn) {
			var result;
			return function () {
				return result || (result = fn.apply(this, arguments));
			}
		};

		/**
		 * 2、简单工厂模式
		 * 简单工厂模式是由一个方法来决定到底要创建哪个类的实例, 而这些实例经常都拥有相同的接口.
		 * 这种模式主要用在所实例化的类型在编译期并不能确定， 而是在执行期决定的情况。
		 * 说的通俗点，就像公司茶水间的饮料机，要咖啡还是牛奶取决于你按哪个按钮。
		 * @returns {{}}
		 * @constructor
		 */
		var objectFactory = function () {

			var obj = {}
				, Constructor = Array.prototype.shift.call(arguments);
			obj.__proto__ = typeof Constructor.prototype === 'number' ? Object.prototype : Constructor.prototype;
			var ret = Constructor.apply(obj, arguments);
			return typeof ret === 'object' ? ret : obj;
		};

		/**
		 * 3、观察者模式( 又叫发布者-订阅者模式 )
		 */
		var observerEvents = function () {
			var listen, log, obj, one, remove, trigger, __this;
			obj = {};
			__this = this;

			listen = function (key, eventfn) {  //把简历扔盒子, key就是联系方式.
				var stack, _ref;  //stack是盒子
				stack = ( _ref = obj[key] ) != null ? _ref : obj[key] = [];
				return stack.push(eventfn);
			};

			one = function (key, eventfn) {
				remove(key);
				return listen(key, eventfn);
			};

			remove = function (key) {
				var _ref;
				return ( _ref = obj[key] ) != null ? _ref.length = 0 : void 0;
			};

			trigger = function () {  //面试官打电话通知面试者
				var fn, stack, _i, _len, _ref, key;
				key = Array.prototype.shift.call(arguments);
				stack = ( _ref = obj[key] ) != null ? _ref : obj[key] = [];
				for (_i = 0, _len = stack.length; _i < _len; _i++) {
					fn = stack[_i];
					if (fn.apply(__this, arguments) === false) {
						return false;
					}
				}
				return _i;
			};

			return {
				listen: listen,
				one: one,
				remove: remove,
				trigger: trigger
			}
		};

		return {
			singleton: singleton
			, objectFactory: objectFactory
			, observerEvents: observerEvents
		}
	}
);