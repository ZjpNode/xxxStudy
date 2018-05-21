/*
* 通用路由配置，需要放在配置项数组的末端
*/
import NotFound from '@views/exception/NotFound'
import {$utils} from '@helper'

export default [
  {
    path: '/login',
    meta: {
      title: $utils.titleLang('登录', 'Login'),
      ignoreAuth: true
    },
    component: resolve => require(['../views/Login'], resolve)
    // 以下是自定义chunk名称的写法
    // resolve => require.ensure([],()=>resolve(require('../views/Login')),'login')
    // webpack2.0 引用 syntax-dynamic-import,也可以使用
    // .babelrc 配置文件的comments属性必须为true，否则无法正常输出ChunkName
    // 因为comments为false时会删除所有的注释，comments默认值是true
    // () => import(/* webpackChunkName: "login" */ '../views/Login')
  },
  {
    path: '/',
    redirect: '/demo/form'
  },
  {
    path: '*',
    meta: {
      title: $utils.titleLang('页面未找到', 'Page Not Found'),
      ignoreAuth: true
    },
    component: NotFound
  }
]
