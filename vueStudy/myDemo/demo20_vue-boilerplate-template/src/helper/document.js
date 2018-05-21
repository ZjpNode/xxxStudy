export default {
  toggleClass (el, className) {
    if (el.classList) {
      el.classList.toggle(className)
    } else {
      var classes = el.className.split(' ')
      var existingIndex = classes.indexOf(className)

      if (existingIndex >= 0) {
        classes.splice(existingIndex, 1)
      } else {
        classes.push(className)
      }
      el.className = classes.join(' ')
    }
  },

  addClass (el, className) {
    if (el.classList) {
      el.classList.add(className)
    } else {
      el.className += ` ${className}`
    }
  },

  removeClass (el, className) {
    if (el.classList) {
      el.classList.remove(className)
    } else {
      el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ')
    }
  },

  getStyle (el, attr) {
    if (el.currentStyle) {
      return el.currentStyle[attr]
    } else {
      return window.getComputedStyle(el, null)[attr]
    }
  },

  setStyle (el, attr, val) {
    if (el.style) {
      el.style[attr] = val
    }
  },

  /**
   * 事件绑定
   * @param ele   要绑定事件的元素
   * @param ev    要绑定的事件
   * @param fn    绑定事件的函数
   */
  bindEvent (el, ev, fn) {
    if (el.attachEvent) {
      el.attachEvent('on' + ev, fn)
    } else {
      el.addEventListener(ev, fn, false)
    }
  }

}
