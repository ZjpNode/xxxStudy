import {$utils} from '@helper'

export default {
  id: 'demo',
  title: $utils.titleLang('示例模块', 'Demo Moudle'),
  icon: 'star-on',
  children: [{
    id: 'test',
    title: $utils.titleLang('测试吧', 'test'),
    icon: 'star-off',
    children: [{
      id: 'clock',
      title: $utils.titleLang('数字时钟数字时钟1', 'Digital clock1'),
      icon: 'time',
      children: [{
        id: 'clock',
        title: $utils.titleLang('数字时钟2', 'Digital clock2'),
        icon: 'time',
        path: '/demo/clock'
      }]
    }]
  }, {
    id: 'form2123',
    title: $utils.titleLang('示例表单', 'Demo Form'),
    icon: 'star-off',
    path: '/demo/form'
  }, {
    id: 'form21223',
    title: $utils.titleLang('示例表单', 'Demo Form'),
    icon: 'star-off',
    path: '/demo/form'
  }, {
    id: 'form2123',
    title: $utils.titleLang('示例表单', 'Demo Form'),
    icon: 'star-off',
    path: '/demo/form'
  }, {
    id: 'form2123',
    title: $utils.titleLang('示例表单', 'Demo Form'),
    icon: 'star-off',
    path: '/demo/form'
  }, {
    id: 'form2123',
    title: $utils.titleLang('示例表单', 'Demo Form'),
    icon: 'star-off',
    path: '/demo/form'
  }, {
    id: 'form2123',
    title: $utils.titleLang('示例表单', 'Demo Form'),
    icon: 'star-off',
    path: '/demo/form'
  }, {
    id: 'form2123',
    title: $utils.titleLang('示例表单', 'Demo Form'),
    icon: 'star-off',
    path: '/demo/form'
  }, {
    id: 'form2123',
    title: $utils.titleLang('示例表单', 'Demo Form'),
    icon: 'star-off',
    path: '/demo/form'
  }, {
    id: 'form2',
    title: $utils.titleLang('示例表单', 'Demo Form'),
    icon: 'star-off',
    path: '/demo/form'
  }, {
    id: 'form',
    title: $utils.titleLang('示例表单', 'Demo Form'),
    icon: 'star-off',
    path: '/demo/form'
  }, {
    id: 'list',
    title: $utils.titleLang('示例列表', 'Demo  List'),
    icon: 'star-off',
    path: '/demo/list'
  }]
}
