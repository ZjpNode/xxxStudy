let d3Chart = require('../app/d3-chart')
let pie = d3Chart.pie
let bar = d3Chart.bar
pie.generatePie('#pre-1', [
  { name: 'FreeTank', value: 12, data: {} },
  { name: '中国罐', value: 3, data: {} },
  { name: '污水处理设备', value: 5, data: {} },
  { name: '贝斯', value: 6, data: {} },
  { name: '耐斯', value: 4, data: {} }
])
pie.generateDoughnut('#pre-2', [
  { name: 'FreeTank', value: 12, data: {} },
  { name: '中国罐', value: 3, data: {} },
  { name: '污水处理设备', value: 5, data: {} },
  { name: '贝斯', value: 6, data: {} },
  { name: '耐斯', value: 4, data: {} }
])
pie.generateRosePie('#pre-3', [
  { name: 'FreeTank', value: 12, data: {} },
  { name: '中国罐', value: 3, data: {} },
  { name: '污水处理设备', value: 5, data: {} },
  { name: '贝斯', value: 6, data: {} },
  { name: '耐斯', value: 4, data: {} }
])
pie.generateRoseDoughnut('#pre-4', [
  { value: 10, name: 'rose1' },
  { value: 5, name: 'rose2' },
  { value: 15, name: 'rose3' },
  { value: 25, name: 'rose4' },
  { value: 20, name: 'rose5' },
  { value: 35, name: 'rose6' },
  { value: 30, name: 'rose7' },
  { value: 40, name: 'rose8' }
])
bar.generateBar('#pre-5', [
  { value: 10, name: 'rose1' },
  { value: 5, name: 'rose2' },
  { value: 15, name: 'rose3' },
  { value: 25, name: 'rose4' },
  { value: 20, name: 'rose5' },
  { value: 35, name: 'rose6' },
  { value: 30, name: 'rose7' },
  { value: 40, name: 'rose8' }
])
