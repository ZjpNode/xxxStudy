/*
 * @Author: jiapeng.Zheng
 * @Date: 2018-06-20 11:06:26
 * @Last Modified by: jiapeng.Zheng
 * @Last Modified time: 2018-07-03 17:34:09
 */
const d3 = require('d3')
const config = require('./config')

let margin = config.margin
// let chartColor = config.chartColor
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
    xNameDirection: 'horizontal',
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
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  // 在svg上添加x轴
  svg
    .append('g')
    .attr('class', 'x axis')
    .attr('id', `${id.replace('#', '')}-count-x-axis`)
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
  // x轴文字方向
  function setXnameDirection() {
    if (options.xNameDirection) {
      svg
        .selectAll(`${id} .x.axis .tick text`)
        .attr('dy', 0)
        .attr('transform', options.xNameDirection)
        .style('text-anchor', 'start')
    }
  }
  setXnameDirection()

  // 设置网格样式
  svg
    .selectAll('.axis.line line')
    .style('stroke-width', '.3px')
    .style('stroke', '#666')
    .style('stroke-dasharray', '2,3')

  // 删除
  svg.selectAll('.axis.line .domain').remove()

  // 重新绘制X轴
  function redrawXAxis(data) {
    // x轴比例尺
    var xScale = d3.scale
      .ordinal()
      .rangeRoundBands([0, width])
      .domain(
        data.map(function(d) {
          return d.name
        })
      )
    // 生成X轴
    let xAxis = d3.svg
      .axis()
      .scale(xScale)
      .orient('bottom')
    // 动画效果
    svg
      .select(`${id}-count-x-axis`)
      .transition()
      .duration(200)
      .ease('sin-in-out')
      .call(xAxis)
    svg
      .selectAll('.axis .tick line')
      .style('fill', 'none')
      .style('stroke', '#000')
      .style('shape-rendering', 'crispEdges')

    setXnameDirection()

    return { xScale }
  }

  return { svg, xScale, yScale, height, width, redrawXAxis }
}

export function generateGrid(id, data, options) {
  return generate(id, data, options)
}
