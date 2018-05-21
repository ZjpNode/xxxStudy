const d3 = require('d3')
const config = require('./config')

let margin = config.margin
let chartColor = config.chartColor
// let color = d3.scale.ordinal().range(chartColor)

function generate(id, data, options) {
  let containerWidth = d3
    .select(id)
    .style('width')
    .replace('px', '')
  let containerHeight = d3
    .select(id)
    .style('height')
    .replace('px', '')

  let defaultOptions = {
    xName: '',
    yName: ''
  }
  Object.assign(defaultOptions, options)

  margin.right =
    containerWidth * 0.15 > margin.right ? containerWidth * 0.15 : margin.right

  let width = containerWidth - margin.right - margin.left
  let height = containerHeight - margin.top - margin.bottom

  // x轴比例尺
  var xScale = d3.scale
    .ordinal()
    .rangeRoundBands([0, width])
    .domain(
      data.map(function(d) {
        return d.name
      })
    )

  // y轴比例尺
  var yScale = d3.scale
    .linear()
    .range([height, 0])
    .domain([
      0,
      d3.max(data, function(d) {
        return d['value'] + 5
      })
    ])

  // 生成X轴
  let xAxis = d3.svg
    .axis()
    .scale(xScale)
    .orient('bottom')

  // 生成横向网格
  let xGrid = d3.svg
    .axis()
    .scale(xScale)
    .ticks(data.length)
    .tickSize(-height)
    .tickFormat('')
    .orient('bottom')

  // 生成y轴
  let yAxis = d3.svg
    .axis()
    .scale(yScale)
    .orient('left')

  // 生成纵向网格
  let yGrid = d3.svg
    .axis()
    .scale(yScale)
    .ticks(10)
    .tickSize(-width)
    .tickFormat('')
    .orient('left')

  // 往页面上添加svg
  let svg = d3
    .select(id)
    .append('svg')
    .attr('id', 'svg-bar-chart')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // 在svg上添加x轴
  svg
    .append('g')
    .attr('class', 'x axis')
    .attr('id', 'count-x-axis')
    .attr('transform', 'translate(' + 0 + ',' + height + ')')
    .call(xAxis)
    .append('text')
    .attr('dy', '1.25em')
    .attr('dx', '6')
    .style('text-anchor', 'start')
    .attr('transform', 'translate(' + width + ',0)')
    .text(defaultOptions.xName)

  // 在svg上添加y轴
  svg
    .append('g')
    .attr('class', 'y axis')
    .call(yAxis)
    .append('text')
    .attr('dy', '-1em')
    .attr('dx', '-2em')
    .style('text-anchor', 'start')
    .text(defaultOptions.yName)

  // 在svg上添加横向网格
  svg
    .append('g')
    .attr('class', 'x axis line')
    .attr('transform', 'translate(' + 0 + ',' + height + ')')
    .call(xGrid)

  // 在svg上添加纵向网格
  svg
    .append('g')
    .attr('class', 'y axis line')
    .call(yGrid)

  // 设置X轴和Y轴的样式
  svg
    .selectAll('.axis .domain')
    .style('fill', 'none')
    .style('stroke', '#000')
    .style('shape-rendering', 'crispEdges')
  svg
    .selectAll('.axis .tick line')
    .style('fill', 'none')
    .style('stroke', '#000')
    .style('shape-rendering', 'crispEdges')

  // 设置网格样式
  svg
    .selectAll('.axis.line line')
    .style('stroke-width', '.3px')
    .style('stroke', '#666')
    .style('stroke-dasharray', '2,3')

  // 删除
  svg.selectAll('.axis.line .domain').remove()

  // 设置条形图
  svg
    .selectAll('.countBpath')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'countBpath')
    .attr('transform', function(d) {
      return 'translate(' + xScale.rangeBand() / 4 + ',-1)'
    })
    .attr('width', function(d) {
      return xScale.rangeBand() / 2
    })
    .attr('x', function(d) {
      return xScale(d['name'])
    })
    .attr('y', function(d) {
      return yScale(0)
    })
    .attr('height', function(d) {
      return 0
    })
    .style('fill', function(d) {
      return chartColor[0]
    })
    .style('cursor', 'pointer')
    .transition() // 设置动画
    .ease('bounce') // 动画效果
    .duration(1500) // 持续时间
    .attr('y', function(d) {
      return yScale(d['value'])
    })
    .attr('height', function(d) {
      return height - yScale(d['value'])
    })

  svg
    .selectAll('.countBpath')
    .on('mouseover', function(d) {
      d3
        .select(this)
        .transition()
        .duration(200)
        .style('fill', function(d) {
          return d3.rgb(chartColor[0]).brighter(0.5)
        })
    })
    .on('mouseout', function(d) {
      d3
        .select(this)
        .transition()
        .duration(200)
        .style('fill', function(d) {
          return chartColor[0]
        })
    })

  // 在条形图上添加文字
  svg
    .selectAll('.text')
    .data(data)
    .enter()
    .append('text')
    .attr('class', 'text')
    .attr('text-anchor', 'middle')
    .attr('transform', function(d) {
      return 'translate(0,-2)'
    })
    .attr('x', function(d) {
      return xScale(d['name']) + xScale.rangeBand() / 2
    })
    .attr('y', function(d) {
      return yScale(d['value'])
    })
    .text(function(d) {
      return ''
    })
    .transition()
    .delay(2000)
    .delay(function(d, i) {
      return (i + 1) * 200
    })
    .duration(2000)
    .ease('bounce') // 设定过渡样式
    .text(function(d) {
      return d.value
    })
}

function generateBar(id, data, options) {
  generate(id, data, options)
}
export default {
  generateBar
}
