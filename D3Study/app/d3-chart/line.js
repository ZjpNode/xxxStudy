const d3 = require('d3')
const xyGrid = require('./xyGrid.js')
const config = require('./config')

let chartColor = config.chartColor
// let color = d3.scale.ordinal().range(chartColor)

function generate(id, data, options) {
  // https://github.com/d3/d3/wiki/SVG-%E5%BD%A2%E7%8A%B6#line_interpolate
  let defaultOptions = {
    lineType: 'linear ' // 分段线性片段，如折线
  }
  Object.assign(defaultOptions, options)

  let {
    svg,
    xScale,
    yScale,
    /* height, width, */ redrawXAxis
  } = xyGrid.generateGrid(id, data, defaultOptions)

  var line = d3.svg
    .line()
    .interpolate(defaultOptions.lineType)
    .x(function(d) {
      return xScale(d['name']) // + tranLength;
    })
    .y(function(d) {
      return yScale(d['value'])
    })
  var path = svg.append('g').attr('class', 'countLines')

  path
    .append('path')
    .attr('d', line(data))
    .attr('class', 'countLine')
    .attr('transform', function(d) {
      return 'translate(' + xScale.rangeBand() / 2 + ',-1)'
    })
    .attr('stroke', chartColor[0])
    .attr('fill', 'none')
    .attr('stroke-linejoin', 'round') // 描边转角的表现方式
    .attr('stroke-linecap', 'round')
    .attr('stroke-width', 1.5)

  function addPoint(data, xScale) {
    if (defaultOptions.hasPoint) {
      d3
        .select(id)
        .selectAll('.countPoints')
        .remove()
      let points = svg.append('g').attr('class', 'countPoints')
      points
        .selectAll('.tipCountPoints')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'tipCountPoints')
        .attr('transform', function(d) {
          return 'translate(' + xScale.rangeBand() / 2 + ',-1)'
        })
        .attr('cx', function(d) {
          return xScale(d['name'])
        })
        .attr('cy', function(d) {
          return yScale(d['value'])
        })
        .attr('r', '6px')
        .attr('stroke', '#fff')
        .attr('stroke-width', '2px')
        .attr('fill', chartColor[0])
        .on('mouseover', function(d) {
          d3
            .select(this)
            .transition()
            .duration(100)
            .attr('r', '8px')
          d3
            .select(id)
            .select('svg')
            .append('title')
            .attr('id', `${id.replace('#', '')}-title`)
            .text(`${d['value']}${d['data']['Unit']}`)
        })
        .on('mouseout', function(d) {
          d3
            .select(this)
            .transition()
            .duration(100)
            .attr('r', '6px')

          d3
            .select(id)
            .select(`${id}-title`)
            .remove()
        })
    }
  }

  addPoint(data, xScale)

  function redraw(data) {
    let { xScale } = redrawXAxis(data)

    d3.selectAll(id + ' .countLine').remove()

    var line = d3.svg
      .line()
      .interpolate(defaultOptions.lineType)
      .x(function(d) {
        return xScale(d['name']) // + tranLength;
      })
      .y(function(d) {
        return yScale(d['value'])
      })
    var path = svg.append('g').attr('class', 'countLine')

    path
      .append('path')
      .attr('d', line(data))
      .attr('class', 'countLine')
      .attr('transform', function(d) {
        return 'translate(' + xScale.rangeBand() / 2 + ',-1)'
      })
      .attr('stroke', chartColor[0])
      .attr('fill', 'none')
      .attr('stroke-linejoin', 'round') // 描边转角的表现方式
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
    addPoint(data, xScale)
  }

  return { redraw }
}

function generateLine(id, data, options) {
  return generate(id, data, options)
}
export default {
  generateLine
}
