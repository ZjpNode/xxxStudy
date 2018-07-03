let d3Chart = require("../app/d3-chart");
let pie = d3Chart.pie;
let bar = d3Chart.bar;
let line = d3Chart.line;
pie.pie("#pre-1", [
  { name: "FreeTank", value: 12, data: {} },
  { name: "中国罐", value: 3, data: {} },
  { name: "污水处理设备", value: 5, data: {} },
  { name: "贝斯", value: 6, data: {} },
  { name: "耐斯", value: 4, data: {} }
]);
pie.doughnut("#pre-2", [
  { name: "FreeTank", value: 12, data: {} },
  { name: "中国罐", value: 3, data: {} },
  { name: "污水处理设备", value: 5, data: {} },
  { name: "贝斯", value: 6, data: {} },
  { name: "耐斯", value: 4, data: {} }
]);
pie.rosePie("#pre-3", [
  { name: "FreeTank", value: 12, data: {} },
  { name: "中国罐", value: 3, data: {} },
  { name: "污水处理设备", value: 5, data: {} },
  { name: "贝斯", value: 6, data: {} },
  { name: "耐斯", value: 4, data: {} }
]);
pie.roseDoughnut("#pre-4", [
  { value: 10, name: "rose1" },
  { value: 5, name: "rose2" },
  { value: 15, name: "rose3" },
  { value: 25, name: "rose4" },
  { value: 20, name: "rose5" },
  { value: 35, name: "rose6" },
  { value: 30, name: "rose7" },
  { value: 40, name: "rose8" }
]);
let per5Data = [
  { name: "FreeTank", value: 12, data: {} },
  { name: "中国罐", value: 3, data: {} },
  { name: "污水处理设备", value: 5, data: {} },
  { name: "贝斯", value: 6, data: {} },
  { name: "耐斯", value: 4, data: {} }
];
var pre5 = bar.generateBar("#pre-5", per5Data, {
  xName: "设备类型",
  yName: "数量"
});


let per6Data = [
  { name: "电13", value: 13, data: {} },
  { name: "电14", value: 14, data: {} },
  { name: "电11", value: 11, data: {} },
  { name: "电9", value: 9, data: {} }
  // ,
  // { name: "中国罐", value: 3, data: {} },
  // { name: "污水处理设备", value: 5, data: {} },
  // { name: "贝斯", value: 6, data: {} },
  // { name: "耐斯", value: 4, data: {} }
];

var pre6 = line.generateLine(
  "#pre-6",
  per6Data,
  { xName: "设备类型", yName: "数量",xNameDirection:'rotate(25,-20,0)' }
);

setInterval(() => {
  let value = Math.round(Math.random() * 16);
  per6Data.push({ name: `电${Math.random()}`, value: value, data: {} })
  if (Object.keys(per6Data).length === 6) per6Data.shift();
  pre6.redraw(per6Data);
}, 3000);

//--------------------------- hot-reload ----------------------------------------
var hotClient = require("webpack-hot-middleware/client?noInfo=true&reload=true");

hotClient.subscribe(function(event) {
  if (event.action === "reload") {
    window.location.reload();
  }
});
