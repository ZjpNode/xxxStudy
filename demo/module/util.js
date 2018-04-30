/**
 * util.js Created by Zjp on 2017/08/30.
 * 常用的工具类（逐渐完善中......）
 */
;(function (root, factory) {
  if (typeof exports === 'object') {
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    define(factory);
  } else {
    var z_module = root['Z_MODULE'] = root['Z_MODULE'] || {LocalJs: {}};
    var require = z_module['LocalJs']['require'];
    z_module['util'] = factory(require);
  }
})(this, function (require) {

  /**
   * 深拷贝
   * @returns {*|{}}
   */
  var deepCopy = function () {
    var arg2 = arguments[1] || {};
    var arg1 = arguments[0] || (arg2.constructor === Array ? [] : {});
    for (var i in arg2) {
      if (arg2.hasOwnProperty(i)) {
        arg1[i] = typeof arg2[i] === "object" ? deepCopy(arg1[i], arg2[i]) : arg2[i];
      }
    }
    return arg1;
  };

  /**
   * 日期时间格式化
   * @param {String=} formatStr 时间格式  例如 YYYY-MM-dd hh：mm：ss
   *    YYYY或yyyy 表示年
   *    MM 月
   *    dd 或DD 日
   *    hh或 HH 小时
   *    mm  分钟
   *    ss 或 SS 秒
   * @param date date  国际标准时间
   * @returns  {String} str
   */
  var formatDate = function (date, formatStr) {
    var str = formatStr ? formatStr : 'YYYY-MM-dd hh:mm:ss';
    str = str.replace(/yyyy|YYYY/, date.getFullYear());
    str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));
    str = str.replace(/MM/, (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1));
    str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
    str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
    str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
    str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
    return str;
  };

  /**
   * 判断一个js对象是否一个DOM对象
   * 首先要对HTMLElement进行类型检查，因为即使在支持HTMLElement
   * 的浏览器中，类型却是有差别的，在Chrome,Opera中HTMLElement的
   * 类型为function，此时就不能用它来判断了
   * @type {Function}
   */
  var isDOM = ( typeof HTMLElement === 'object' ) ?
    function (obj) {
      return obj instanceof HTMLElement;
    } :
    function (obj) {
      return obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
    };

  /**
   * 生成36位的GUID
   * @returns {string}
   */
  var new36Guid = function () {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
      var n = Math.floor(Math.random() * 16.0).toString(16);
      guid += n;
      if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
        guid += "-";
    }
    return guid;
  };

  //生成32位的CUID
  var new32Guid = function () {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
      var n = Math.floor(Math.random() * 16.0).toString(16);
      guid += n;
    }
    return guid;
  };

  // 获取cookie
  function getCookie (c_name) {
    if (document.cookie.length > 0) {
      let c_start = document.cookie.indexOf(c_name + "=")
      if (c_start !== -1) {
        c_start = c_start + c_name.length + 1
        let c_end = document.cookie.indexOf(";", c_start)
        if (c_end === -1) {
          c_end = document.cookie.length
        }
        return unescape(document.cookie.substring(c_start, c_end))
      }
    }
    return ""
  }

  // 设置cookie
  function setCookie (c_name, value, expireDays) {
    let exdate = new Date()
    exdate.setDate(exdate.getDate() + expireDays)
    document.cookie = c_name + "=" + escape(value) +
      ((expireDays === null) ? "" : ";expires=" + exdate.toGMTString())
  }

  // 清除cookie
  function clearCookie (name) {
    setCookie(name, "", -1);
  }

  /**
 * 创建并返回一个像节流阀一样的函数，当重复调用函数的时候，最多每隔 wait毫秒调用一次该函数
 * @param func 执行函数
 * @param wait 时间间隔
 * @param options 如果你想禁用第一次首先执行的话，传递{leading: false}，
 *                如果你想禁用最后一次执行的话，传递{trailing: false}
 * @returns {Function}
 */
function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;
  if (!options) options = {};
  var later = function() {
      previous = options.leading === false ? 0 : new Date().getTime();
      timeout = null;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
  };
  return function() {
      var now = new Date().getTime();
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0 || remaining > wait) {
          if (timeout) {
              clearTimeout(timeout);
              timeout = null;
          }
          previous = now;
          result = func.apply(context, args);
          if (!timeout) context = args = null;
      } else if (!timeout && options.trailing !== false) {
          timeout = setTimeout(later, remaining);
      }
      return result;
  };
}
  /**
 * 防反跳。func函数在最后一次调用时刻的wait毫秒之后执行！
 * @param func 执行函数
 * @param wait 时间间隔
 * @param immediate 为true，debounce会在wai 时间间隔的开始调用这个函数
 * @returns {Function}
 */
function debounce(func, wait, immediate) {
  var timeout, args, context, timestamp, result;

  var later = function() {
      var last = new Date().getTime() - timestamp; // timestamp会实时更新

      if (last < wait && last >= 0) {
          timeout = setTimeout(later, wait - last);
      } else {
          timeout = null;
          if (!immediate) {
              result = func.apply(context, args);
              if (!timeout) context = args = null;
          }
      }
  };

  return function() {
      context = this;
      args = arguments;
      timestamp = new Date().getTime();
      var callNow = immediate && !timeout;

      if (!timeout) {
          timeout = setTimeout(later, wait);
      }
      if (callNow) {
          result = func.apply(context, args);
          context = args = null;
      }
      return result;
  };
}

  return {
    deepCopy: deepCopy
    , formatDate: formatDate
    , isDOM: isDOM
    , new36Guid: new36Guid
    , new32Guid: new32Guid
    , getCookie: getCookie
    , setCookie: setCookie
    , clearCookie: clearCookie
    , throttle:throttle
    , debounce:debounce
  }
});