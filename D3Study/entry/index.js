let d3Chart = require("../app/d3-chart");
let pie = d3Chart.pie;
pie.generate("#pre-1", [
  { name: "FreeTank", value: 12, data: {} },
  { name: "中国罐", value: 3, data: {} },
  { name: "污水处理设备", value: 5, data: {} },
  { name: "贝斯", value: 6, data: {} },
  { name: "耐斯", value: 4, data: {} }
]);