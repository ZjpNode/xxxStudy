import Vue from 'vue'
import Moment from 'moment'
import _ from '@helper/lodash.js'

if (typeof String.prototype.startsWith !== 'function') {
  Window.String.prototype.startsWith = function (prefix) {
    return this.slice(0, prefix.length) === prefix
  }
}

export default {
  resMsg (res) {
    let key = {
      zh: 'Chinese',
      en: 'English'
    }[Vue.config.lang]
    try {
      let obj = JSON.parse(res.Message)
      return obj[key] || obj.Chinese
    } catch (e) {
      return res && res.Message
    }
  },

  serverUrl (apiName) {
    return `app/${apiName}`
  },

  titleLang (zhStr, enStr) {
    return {
      zh: zhStr,
      en: enStr
    }
  },

  query (search) {
    let str = search || window.location.search
    let objURL = {}

    str.replace(
      new RegExp('([^?=&]+)(=([^&]*))?', 'g'),
      ($0, $1, $2, $3) => {
        objURL[$1] = $3
      }
    )
    return objURL
  },

  queryString (url, query) {
    let str = []
    for (let key in query) {
      str.push(key + '=' + query[key])
    }
    return url + '?' + str.join('&')
  },

  /* -----------------------------localStorage------------------------------------ */
  /*
   * set localStorage
   */
  setStorage (name, content) {
    if (!name) return
    if (typeof content !== 'string') {
      content = JSON.stringify(content)
    }
    window.localStorage.setItem(name, content)
  },

  /**
   * get localStorage
   */
  getStorage (name) {
    if (!name) return
    return window.localStorage.getItem(name)
  },

  /**
   * delete localStorage
   */
  removeStorage (name) {
    if (!name) return
    window.localStorage.removeItem(name)
  },
  /* -----------------------------DateTime------------------------------------ */

  /**
   * 判断日期是否为空
   * @param {String|Date} dateTime
   * @returns {boolean}
   */
  dateTimeIsEmpty (dateTime) {
    return _.isDate(dateTime) ? false : _.isEmpty(dateTime)
  },

  /**
   * 判断开始时间是否大于等于结束时间
   * start和end只要有一个为空就返回true
   *
   * @param {String|Date} start 开始时间，可为空
   * @param {String|Date} end   结束时间，可为空
   * @returns {Number}
   */
  dateCompare (start, end, format) {
    /*
    let isTrue = this.dateTimeIsEmpty(start) ||
      this.dateTimeIsEmpty(end) ||
      Moment(start).isSame(end) ||
      Moment(start).isBefore(end)
    if (isTrue) {
      Moment(start).diff(Moment(Moment), format)
    } else {
      return 0
    }
    */

    let result = Moment(start).diff(Moment(end), format)
    if (_.isNaN(result)) {
      result = 0
    }
    return result
  },

  dateConvert (time) {
    return time && Moment(time).format('YYYY-MM-DD HH:mm:ss')
  },
  dayConvert (time) {
    return time && Moment(time).format('YYYY-MM-DD')
  },
  timeConvert (time) {
    return time && Moment(time).format('HH:mm:ss')
  }

}
