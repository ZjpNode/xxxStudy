import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Filters from './filters'
import ElementUI from 'element-ui'
// import EasyScroll from '@components/scrollbar'
import EasyScroll from 'easyscroll'
import Cookies from 'js-cookie'
import _ from '@helper/lodash.js'
import locales from './locales'
import 'element-ui/lib/theme-default/index.css'
// import Icon from '@components/Icon/index.js'
import { globalComponentsRegister } from '@components'
import { $apis, $utils, $document, $auth } from '@helper'

Vue.use(VueI18n)
Vue.use(ElementUI)
Vue.use(EasyScroll)

/* inject i18n */
const browserLanguage = (window.navigator.language || window.navigator.browserLanguage).split('-')[0]
const lang = Cookies.get('lang') || (browserLanguage in locales ? browserLanguage : 'en')
Vue.config.lang = lang

Object.keys(locales).forEach(lang => {
  Vue.locale(lang, locales[lang])
})

for (let key in Filters) {
  Vue.filter(key, Filters[key])// 全局定义过滤器
}

/* 注册一个全局icon组件 */
// Vue.component('icon', Icon)

/* 注册components目录下的所有全局组件 */
globalComponentsRegister()

Vue.prototype.$_ = _
Vue.prototype.$apis = $apis
Vue.prototype.$utils = $utils
Vue.prototype.$auth = $auth
Vue.prototype.$document = $document
