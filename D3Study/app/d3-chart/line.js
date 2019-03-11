const d3 = require('d3')
const xyGrid = require('./xyGrid.js')
const config = require('./config')

let chartColor = config.chartColor
// let color = d3.scale.ordinal().range(chartColor)

function _addDataView(id) {
  let dataView = d3.select(`${id} svg g .dataView`)
  if (dataView[0][0] === null) {
    dataView = d3
      .select(`${id} svg g`)
      .append('svg')
      .attr('class', 'dataView')
  }
  return dataView
}

function _addPoint(id, data, { xScale, yScale }) {
  let points = _addDataView(id)
    .append('g')
    .attr('class', 'countPoints')
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
    .attr('r', '2px')
    .attr('stroke', chartColor[0])
    .attr('stroke-width', '1px')
    .attr('fill', '#fff')
    .on('mouseover', function(d) {
      d3
        .select(this)
        .transition()
        .duration(100)
        .attr('r', '4px')
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
        .attr('r', '2px')

      d3
        .select(id)
        .select(`${id}-title`)
        .remove()
    })
}

function _addLine(id, data, { xScale, yScale, lineType }) {
  let line = d3.svg
    .line()
    .interpolate(lineType)
    .x(function(d) {
      return xScale(d['name']) // + tranLength;
    })
    .y(function(d) {
      return yScale(d['value'])
    })
  let path = _addDataView(id)
    .append('g')
    .attr('class', 'countLine')

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
}

function dragLine(id, data, options) {
  let { width, yScale, redrawYAxis } = xyGrid.generateGrid(id, data, options)

  // x轴比例尺
  let xScale = d3.scale
    .ordinal()
    .rangeRoundBands([0, width])
    .domain(
      data.map(function(d) {
        return d.name
      })
    )

  function redraw(data) {}

  return { redraw }
}

function generate(id, data, options) {
  let defaultOptions = {
    lineType: 'linear'
  }
  Object.assign(defaultOptions, options)

  if (defaultOptions.canDrag) {
    return dragLine(id, data, defaultOptions)
  }

  let { xScale, yScale, redrawXAxis, redrawYAxis } = xyGrid.generateGrid(
    id,
    data,
    defaultOptions
  )

  function redraw(data) {
    let { xScale } = redrawXAxis(data)
    let { yScale } = redrawYAxis(data)

    d3.selectAll(id + ' .dataView').remove()

    _addLine(id, data, { xScale, yScale, ...defaultOptions })
    if (defaultOptions.hasPoint) {
      _addPoint(id, data, { xScale, yScale, ...defaultOptions })
    }
  }

  // -------------------------- draw -------------------------------

  if (defaultOptions.hasPoint) {
    _addPoint(id, data, { xScale, yScale, ...defaultOptions })
  }
  _addLine(id, data, { xScale, yScale, ...defaultOptions })

  return { redraw }
}

/**
 * 生成折线图
 * @param {String} id       元素id
 * @param {Array} data      数据
 * @param {Object} options  配置信息
 *options = {
    xName: 'x轴的名称', // 必填！！
    yName: 'y轴的名称', // 必填！！
    xNameDirection: 'rotate(25,-20,0)', // x坐标名称的方向，transform="rotate(25,-20,0)"
    lineType:'linear', // 分段线性片段，如折线 https://github.com/d3/d3/wiki/SVG-%E5%BD%A2%E7%8A%B6#line_interpolate
    hasPoint: true, // 是否存在点
    canDrag: false,  // 是否可拖拽
    showPoint:6      // 页面只能显示的点
  }
 */
function generateLine(id, data, options) {
  return generate(id, data, options)
}
export default {
  generateLine
}
