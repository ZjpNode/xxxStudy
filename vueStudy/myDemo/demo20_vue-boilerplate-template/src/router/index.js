import Vue from 'vue'
import _ from '@helper/lodash.js'
import Router from 'vue-router'
import beforeEachHooks from './beforeEachHooks'
import RoutesMapConfig from './routes'
import commonRoutesMap from './commonRoutes'

Vue.use(Router)

const routerInstance = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  scrollBehavior: () => ({y: 0}), // 当切换到新路由时，页面滚到顶部
  routes: RoutesMapConfig.concat(commonRoutesMap)
})

_.values(beforeEachHooks).forEach((hook) => {
  routerInstance.beforeEach(hook)
})

export default routerInstance
