/*
 * @Author: jiapeng.Zheng
 * @Date: 2018-05-18 09:11:03
 * @Last Modified by: jiapeng.Zheng
 * @Last Modified time: 2018-05-18 16:18:43
 * @description:
 */
const d3 = require('d3')
const config = require('./config')

let margin = config.margin
let chartColor = config.chartColor
let color = d3.scale.ordinal().range(chartColor)
let legendSize = 10

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
  let radius = Math.min(width, height) / 2
  let defaultOptions = {
    outerRadius: radius - Math.max(margin.left, margin.right),
    innerRadius: (radius - Math.max(margin.left, margin.right)) * 0.8,
    maxScale: 0
  }
  Object.assign(defaultOptions, options)
  let outerRadius = defaultOptions.outerRadius
  let innerRadius = defaultOptions.innerRadius

  function innerRadiusFn(d) {
    return innerRadius !== 0 && defaultOptions.maxScale
      ? innerRadius / 2 // RoseDoughnut 环形南丁格尔玫瑰图(内环半径/2)
      : innerRadius
  }

  function outerRadiusFn(d) {
    // 如果是南丁格尔玫瑰图，则外环半径由value决定
    if (defaultOptions.maxScale) {
      if (innerRadiusFn(d) === 0) {
        return outerRadius * (d.data.value / defaultOptions.maxScale)
      } else {
        return (
          innerRadiusFn(d) * (d.data.value / defaultOptions.maxScale) +
          innerRadiusFn(d)
        )
      }
    }
    return outerRadius
  }

  // 弧度计算器
  let arc = d3.svg
    .arc()
    .innerRadius(innerRadiusFn)
    .outerRadius(outerRadiusFn)

  // 饼图布局
  let pie = d3.layout
    .pie()
    .sort(null)
    .value(function(d) {
      // 南丁格尔玫瑰图（弧度一致） || 饼图、环形图（弧度由value决定）
      return defaultOptions.maxScale || d.value
    })

  // 生成svg并添加到id下
  let svg = d3
    .select(id)
    .append('svg')
    .attr('width', containerWidth)
    .attr('height', containerHeight)
    .append('g')
    .attr('transform', 'translate(' + radius + ',' + radius + ')')

  // 生成每个圆环
  let g = svg
    .selectAll('.arc')
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'arc')

  // 为每个圆环填充颜色
  g
    .append('path')
    .attr('d', arc)
    .attr('class', 'solidArc')
    .style('cursor', 'pointer')
    .style('fill', function(d) {
      return color(d.data.name)
    })

  // 事件
  g
    .selectAll('.solidArc')
    .on('mouseover', function(d) {
      d3
        .select(this)
        .transition()
        .duration(200)
        .style('fill', function(d) {
          return d3.rgb(color(d.data.name)).brighter(0.5)
        })
        .attr(
          'd',
          arc.innerRadius(innerRadiusFn).outerRadius(function(d) {
            return outerRadiusFn(d) * 1.05
          })
        )

      if (innerRadiusFn(d) > 0) {
        // count the sum
        let count = 0
        for (let i = 0; i < data.length; i++) {
          count += data[i]['value'] * 1
        }
        svg
          .append('svg:text')
          .attr('class', 'donutCenterText')
          .attr('dy', '-.3em')
          .attr('text-anchor', 'middle')
          .transition()
          .duration(200)
          .text(d['data']['name'])

        svg
          .append('svg:text')
          .attr('class', 'donutCenterText')
          .attr('dy', '.8em')
          .attr('text-anchor', 'middle')
          .transition()
          .duration(200)
          .text(d3.format('.00%')(d['value'] / count))
      }
    })
    .on('mouseout', function(d) {
      d3
        .select(this)
        .transition()
        .duration(200)
        .attr('d', arc.innerRadius(innerRadiusFn).outerRadius(outerRadiusFn))
        .style('fill', function(d) {
          return color(d.data.name)
        })
      if (innerRadiusFn(d) > 0) {
        d3.selectAll('.donutCenterText').remove()
      }
    })

  // 设置文字
  // g
  //   .append('text')
  //   .attr('transform', function(d) {
  //     return 'translate(' + arc.centroid(d) + ')'
  //   })
  //   .attr('dy', '.35em')
  //   .attr('dx', '-2em')
  //   .text(function(d) {
  //     return d.data.name
  //   })
  //   .style('user-select', 'none')

  // g
  //   .append('text')
  //   .attr('transform', function(d) {
  //     return 'translate(' + arc.centroid(d) + ')'
  //   })
  //   .attr('dy', '1.5em')
  //   .text(function(d) {
  //     return d.data.value
  //   })
  //   .style('user-select', 'none')

  // 设置图例
  let legend = svg
    .selectAll('.legend')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function(d, i) {
      let translateX, translateY
      if (data.length > 3) {
        translateX = radius
        translateY = i * 30 - radius + margin.top * 2
      } else {
        translateX = i * 10 * legendSize
        translateY = height / 2 + margin.bottom - legendSize * 1.2
      }
      return `translate(${translateX},${translateY})`
    })

  // 图例样式
  legend
    .append('rect')
    .attr('width', legendSize)
    .attr('height', legendSize)
    .style('fill', function(d) {
      return color(d.name)
    })

  // 图例文字
  legend
    .append('text')
    .data(data)
    .attr('x', legendSize * 1.2)
    .attr('y', legendSize / 1.1)
    .text(function(d) {
      return d.name
    })
}

// 环形南丁格尔玫瑰图
function generateRoseDoughnut(id, data) {
  let formatData = JSON.parse(JSON.stringify(data))
  let maxScale = formatData.sort((a, b) => {
    return b.value - a.value
  })[0].value
  console.log(maxScale)
  generate(id, data, {
    maxScale
  })
}
// 南丁格尔玫瑰图
function generateRosePie(id, data) {
  let formatData = JSON.parse(JSON.stringify(data))
  let maxScale = formatData.sort((a, b) => {
    return b.value - a.value
  })[0].value
  generate(id, data, {
    maxScale,
    innerRadius: 0
  })
}

// 环形图
function generateDoughnut(id, data) {
  generate(id, data)
}
// 饼图
function generatePie(id, data) {
  generate(id, data, {
    innerRadius: 0
  })
}

export default {
  generateDoughnut,
  generatePie,
  generateRoseDoughnut,
  generateRosePie
}
