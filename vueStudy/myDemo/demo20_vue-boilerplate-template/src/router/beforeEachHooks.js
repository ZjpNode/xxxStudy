/*
* 路由跳转权限控制
*/
import Vue from 'vue'
import {$auth} from '@helper'
import store from '../store'

export default {

  setTitle (to, from, next) {
    if (to.meta.title && to.meta.title[Vue.config.lang]) {
      document.title = to.meta.title[Vue.config.lang]
      // 设置激活的路由名称
      store.commit('$vuexSetActiveMenu', {activeMenu: to.meta.title})
      console.log(Vue.prototype.$_)
    }
    next()
  },

  // Check the login status
  checkLoginAuth (to, from, next) {
    if (to.meta && to.meta.ignoreAuth) {
      next()
    } else {
      if ($auth.checkSession()) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    }
  },

  // Check page permissions
  checkPageAuth (to, from, next) {
    if (to.meta && to.meta.ignoreAuth) {
      next()
    } else {
      // check user auth here....
      next()
    }
  }
}
