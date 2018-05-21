// 使用 require.context，可以通过正则匹配引入相应的文件模块，从而实现路由"去中心化"管理2
const files = require.context('.', true, /\.js$/)

var configArray = []

files.keys().forEach((key) => {
  if (key === './index.js') return
  configArray = configArray.concat(files(key).default)
})
export default configArray
