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
    /* height, width, */
    width,
    redrawXAxis,
    redrawYAxis
  } = xyGrid.generateGrid(id, data, defaultOptions)

  let dataView = svg
    .append('svg')
    .attr('class', 'dataView')
    .attr('x', d3.min([xScale.rangeBand() / 2, 20]))
    .attr('width', d3.max([xScale.rangeBand() * (data.length - 1), width - 40]))

  function updateXAxisTick(data, xScale) {
    let xAxisTicks = d3.selectAll(`${id} ${id}-count-x-axis .tick`)
    let num = 0
    console.log('-------------------')
    xAxisTicks
      .attr('transform', function() {
        let tick = d3.select(this)
        let tickT = d3.transform(tick.attr('transform'))
        let tickDx =
          tickT.translate[0] + (2 * num - data.length) * xScale.rangeBand()
        console.log(
          tickT.translate[0],
          2 * num - data.length,
          xScale.rangeBand()
        )
        num++
        return 'translate(' + tickDx + ',0)'
      })
      .style('opacity', function() {
        let tick = d3.select(this)
        let tickT = d3.transform(tick.attr('transform'))
        if (
          tickT.translate[0] > 0 &&
          tickT.translate[0] < xScale.rangeBand() * (data.length - 1)
        ) {
          return 1
        } else {
          return 0
        }
      })
  }

  function initData(data) {
    let dataLn = data.length
    let FrontData = data.slice(0, dataLn / 3 + 1)
    let middleData = data.slice(dataLn / 3, dataLn / 3 * 2 + 1)
    let EndData = data.slice(dataLn / 3 * 2, dataLn)
    console.log(FrontData, middleData, EndData)
    return { FrontData, middleData, EndData }
  }

  function addLine(data, xScale, yScale) {
    let { FrontData, middleData, EndData } = initData(data)

    var line = d3.svg
      .line()
      .interpolate(defaultOptions.lineType)
      .x(function(d) {
        return xScale(d['name']) // + tranLength;
      })
      .y(function(d) {
        return yScale(d['value'])
      })

    // let yGrid = d3.select(`${id} ${id}-count-y-grid`)
    var path = dataView
      .append('g')
      .attr(
        'transform',
        'translate(' + -data.length * xScale.rangeBand() + ',0)scale(3,1)'
      )
      .attr('class', 'countLine')
    var path2 = dataView
      .append('g')
      .attr(
        'transform',
        'translate(' + -data.length * xScale.rangeBand() + ',0)scale(3,1)'
      )
      .attr('class', 'countLine')
    var path3 = dataView
      .append('g')
      .attr(
        'transform',
        'translate(' + -data.length * xScale.rangeBand() + ',0)scale(3,1)'
      )
      .attr('class', 'countLine')

    path
      .append('path')
      .attr('d', line(FrontData))
      // .attr('class', 'countLine')
      // .attr('transform', function(d) {
      //   return 'translate(' + xScale.rangeBand() + ',-1)'
      // })
      .attr('stroke', chartColor[0])
      .attr('fill', 'none')
      .attr('stroke-linejoin', 'round') // 描边转角的表现方式
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)

    path2
      .append('path')
      .attr('d', line(middleData))
      // .attr('class', 'countLine')
      // .attr('transform', function(d) {
      //   return 'translate(' + xScale.rangeBand() + ',-1)'
      // })
      .attr('stroke', chartColor[0])
      .attr('fill', 'none')
      .attr('stroke-linejoin', 'round') // 描边转角的表现方式
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)

    path3
      .append('path')
      .attr('d', line(EndData))
      // .attr('class', 'countLine')
      // .attr('transform', function(d) {
      //   return 'translate(' + xScale.rangeBand() + ',-1)'
      // })
      .attr('stroke', chartColor[0])
      .attr('fill', 'none')
      .attr('stroke-linejoin', 'round') // 描边转角的表现方式
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
  }

  function addPoint(data, xScale, yScale) {
    if (defaultOptions.hasPoint) {
      let points = dataView
        .append('g')
        .attr('class', 'countPoints')
        .attr(
          'transform',
          'translate(' + -data.length * xScale.rangeBand() + ',0)scale(3,1)'
        )
      points
        .selectAll('.tipCountPoints')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', 'tipCountPoints')
        // .attr('transform', function(d) {
        //   return 'translate(' + xScale.rangeBand() / 2 + ',-1)'
        // })
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
  }

  function onDrag(id) {
    let selection = d3.select(`${id} svg`)
    // var zoom = d3.behavior
    //   .zoom()
    //   .scaleExtent([1, 10])
    //   .on('zoom', zoomed)
    // function zoomed(d) {
    //   selection.attr(
    //     'transform',
    //     'translate(' + d3.event.translate + ')scale(' + d3.event.scale + ')'
    //   )
    // }
    // selection.call(zoom)

    var drag = d3.behavior
      .drag()
      // .origin(function(d) {
      //   return d
      // })
      .on('dragstart', d => {
        console.log('dragstart', d3.event)
      })
      .on('drag', d => {
        let countLine = d3.selectAll(`${id} .countLine`)
        let countPoint = d3.select(`${id} .countPoints`)
        let xAxisTicks = d3.selectAll(`${id} ${id}-count-x-axis .tick`)
        let { dx } = d3.event
        let lineT = d3.transform(countLine.attr('transform'))
        let lineDx = dx + lineT.translate[0]
        countLine.attr('transform', function() {
          let line = d3.select(this)
          let lineT = d3.transform(line.attr('transform'))
          let lineDx = dx + lineT.translate[0]
          return `translate(${lineDx},0)scale(3,1)`
        })
        countPoint.attr('transform', `translate(${lineDx},0)scale(3,1)`)
        xAxisTicks
          .attr('transform', function() {
            let tick = d3.select(this)
            let tickT = d3.transform(tick.attr('transform'))
            let tickDx = dx + tickT.translate[0]
            return `translate(${tickDx},0)`
          })
          .style('opacity', function() {
            let tick = d3.select(this)
            let tickT = d3.transform(tick.attr('transform'))
            if (
              tickT.translate[0] > 0 &&
              tickT.translate[0] < xScale.rangeBand() * (data.length - 1)
            ) {
              return 1
            } else {
              return 0
            }
          })
      })
      .on('dragend', d => {
        console.log('dragend', d3.event)
      })
    selection.call(drag)
  }

  function redraw(data) {
    let { xScale } = redrawXAxis(data)
    let { yScale } = redrawYAxis(data)

    d3.selectAll(id + ' .countLine').remove()
    d3.selectAll(id + ' .countPoints').remove()

    setTimeout(function() {
      updateXAxisTick(data, xScale)
    }, 300)
    addLine(data, xScale, yScale)
    addPoint(data, xScale, yScale)
  }

  updateXAxisTick(data, xScale)
  addLine(data, xScale, yScale)
  addPoint(data, xScale, yScale)
  onDrag(id)

  return { redraw }
}

function dragLine(id, data, options) {
  
}

function generateLine(id, data, options) {
  if (options.canDrop) {
    return dragLine(id, data, options)
  } else {
    return generate(id, data, options)
  }
}
export default {
  generateLine
}
