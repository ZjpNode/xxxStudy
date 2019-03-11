let d3Chart = require('../app/d3-chart')
let pie = d3Chart.pie
let bar = d3Chart.bar
let line = d3Chart.line
pie.pie('#pre-1', [
  { name: 'FreeTank', value: 12, data: {} },
  { name: '中国罐', value: 3, data: {} },
  { name: '污水处理设备', value: 5, data: {} },
  { name: '贝斯', value: 6, data: {} },
  { name: '耐斯', value: 4, data: {} }
])
pie.doughnut('#pre-2', [
  { name: 'FreeTank', value: 12, data: {} },
  { name: '中国罐', value: 3, data: {} },
  { name: '污水处理设备', value: 5, data: {} },
  { name: '贝斯', value: 6, data: {} },
  { name: '耐斯', value: 4, data: {} }
])
pie.rosePie('#pre-3', [
  { name: 'FreeTank', value: 12, data: {} },
  { name: '中国罐', value: 3, data: {} },
  { name: '污水处理设备', value: 5, data: {} },
  { name: '贝斯', value: 6, data: {} },
  { name: '耐斯', value: 4, data: {} }
])
pie.roseDoughnut('#pre-4', [
  { value: 10, name: 'rose1', data: {} },
  { value: 5, name: 'rose2', data: {} },
  { value: 15, name: 'rose3', data: {} },
  { value: 25, name: 'rose4', data: {} },
  { value: 20, name: 'rose5', data: {} },
  { value: 35, name: 'rose6', data: {} },
  { value: 30, name: 'rose7', data: {} },
  { value: 40, name: 'rose8', data: {} }
])
let per5Data = [
  { name: 'FreeTank', value: 12, data: {} },
  { name: '中国罐', value: 3, data: {} },
  { name: '污水处理设备', value: 5, data: {} },
  { name: '贝斯', value: 6, data: {} },
  { name: '耐斯', value: 4, data: {} }
]
var pre5 = bar.generateBar('#pre-5', per5Data, {
  xName: '设备类型',
  yName: '数量'
})

let per6Data = [
  { name: '电1', value: 13, data: { Unit: '台' } },
  { name: '电2', value: 14, data: { Unit: '台' } },
  { name: '电3', value: 11, data: { Unit: '台' } },
  { name: '电4', value: 9, data: { Unit: '台' } },
  { name: '电5', value: 10, data: { Unit: '台' } },
  { name: '电6', value: 3, data: { Unit: '台' } },
  { name: '电7', value: 4, data: { Unit: '台' } },
  { name: '电8', value: 8, data: { Unit: '台' } },
  { name: '电9', value: 7, data: { Unit: '台' } },
  { name: '电10', value: 6, data: { Unit: '台' } },
  { name: '电11', value: 6, data: { Unit: '台' } },
  { name: '电12', value: 7, data: { Unit: '台' } },
  { name: '电13', value: 9, data: { Unit: '台' } },
  { name: '电14', value: 1, data: { Unit: '台' } },
  { name: '电15', value: 14, data: { Unit: '台' } },
  { name: '电16', value: 11, data: { Unit: '台' } },
  { name: '电17', value: 9, data: { Unit: '台' } },
  { name: '电18', value: 10, data: { Unit: '台' } }
  // ,
  // { name: "中国罐", value: 3, data: {} },
  // { name: "污水处理设备", value: 5, data: {} },
  // { name: "贝斯", value: 6, data: {} },
  // { name: "耐斯", value: 4, data: {} }
]

var pre6 = line.generateLine('#pre-6', per6Data, {
  xName: '设备类型',
  yName: '数量/台',
  xNameDirection: 'rotate(25,-20,0)',
  hasPoint: true,
  canDrag: true
})

// setTimeout(() => {
//   let value = Math.round(Math.random() * 16)
//   per6Data.push({
//     name: `电${Math.random()}`,
//     value: value,
//     data: { Unit: '台' }
//   })
//   // console.log(per6Data)
//   // let data = per6Data.slice(
//   //   per6Data.length - 6 < 0 ? 0 : per6Data.length - 6,
//   //   per6Data.length
//   // )
//   // if (Object.keys(per6Data).length === 6) per6Data.shift()
//   pre6.redraw(per6Data)
// }, 3000)

// --------------------------- hot-reload ----------------------------------------
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true')

hotClient.subscribe(function(event) {
  if (event.action === 'reload') {
    window.location.reload()
  }
})
