import Frame from '@views/Frame'
import {$utils} from '@helper'

export default [{
  path: '/',
  component: Frame,
  children: [
    {
      path: 'demo/form',
      meta: {
        title: $utils.titleLang('示例表单', 'Demo Form'),
        ignoreAuth: true
      },
      // 这个特殊的 require 语法告诉 webpack
      // 自动将编译后的代码分割成不同的块，
      // 这些块将通过 Ajax 请求自动下载.
      component: resolve => require(['../../views/demo/Form'], resolve)
    },
    {
      path: 'demo/list',
      meta: {
        title: $utils.titleLang('示例列表', 'Demo  List'),
        ignoreAuth: true
      },
      component: resolve => require(['../../views/demo/List'], resolve)
    },
    {
      path: 'demo/clock',
      meta: {
        title: $utils.titleLang('数字时钟', 'Digital clock'),
        ignoreAuth: true
      },
      component: resolve => require(['../../views/demo/myClock'], resolve)
    }
  ]
}]
