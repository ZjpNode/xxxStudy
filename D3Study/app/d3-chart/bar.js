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
  let width = containerWidth - margin.right - margin.left
  let height = containerHeight - margin.top - margin.bottom

  //   let defaultOptions = {
  //   }
  //   Object.assign(defaultOptions, options)

  var x = d3.scale
    .ordinal()
    .rangeRoundBands([0, width])
    .domain(
      data.map(function(d) {
        return d.name
      })
    )

  // var x1 = d3.scale.ordinal()
  var y = d3.scale
    .linear()
    .range([height, 0])
    .domain([
      0,
      d3.max(data, function(d) {
        return d['value'] + 5
      })
    ])

  var xAxis = d3.svg
    .axis()
    .scale(x)
    .ticks(data.length)
    .orient('bottom')

  var yAxis = d3.svg
    .axis()
    .scale(y)
    .ticks(10)
    .orient('left')

  var svg = d3
    .select(id)
    .append('svg')
    .attr('id', 'svg-bar-chart')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

  svg
    .append('g')
    .attr('class', 'x axis')
    .attr('id', 'count-x-axis')
    .attr('transform', 'translate(' + 0 + ',' + height + ')')
    .call(xAxis)

  svg
    .append('g')
    .attr('class', 'y axis')
    .call(yAxis)

  var stat = svg
    .selectAll('.countBpath')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'countBpath')
    .attr('transform', function(d) {
      return 'translate(' + x(d['name']) + ',0)'
    })

  stat
    .selectAll('.countOne')
    .data(function(d) {
      return d.value
    })
    .enter()
    .append('rect')
    .attr('class', 'countOne')
    .attr('width', x.rangeBand())
    .attr('x', function(d) {
      return x(d['name'])
    })
    .attr('y', function(d) {
      return y(d['value'])
    })
    .attr('height', function(d) {
      return height - y(d['value'])
    })
    .style('fill', function(d) {
      return '#000'
    })
}

function generateBar(id, data) {
  generate(id, data)
}
export default {
  generateBar
}
