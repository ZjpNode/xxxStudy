/*
 * @Author: jiapeng.Zheng
 * @Date: 2018-05-18 09:11:03
 * @Last Modified by: jiapeng.Zheng
 * @Last Modified time: 2018-07-11 11:02:54
 * @description:
 */

// import { $utils } from '@helper'

const d3 = require('d3')
const config = require('./config')

let margin = config.margin
let chartColor = config.chartColor
let color = d3.scale.ordinal().range(chartColor)
let legendSize = 12
let textOffset = 14

// 根据data和options生成配置信息
function getConfig(id, options) {
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
  // 生成svg并添加到id下
  let svg = d3
    .select(id)
    .append('svg')
    .attr('width', containerWidth)
    .attr('height', containerHeight)
    .append('g')
    .attr('transform', 'translate(' + (radius * 2 + margin.left) + ',' + (radius + margin.top) + ')')

  let defaultOptions = {
    outerRadius: radius,
    innerRadius: radius * 0.8,
    maxScale: 0,
    radius,
    svg,
    width,
    height
  }

  Object.assign(defaultOptions, options)
  // let outerRadius = defaultOptions.outerRadius
  // let innerRadius = defaultOptions.innerRadius

  return defaultOptions
}

// 获取顶级节点
function getAncestors(node) {
  let path = []
  let current = node
  while (current.parent) {
    path.unshift(current)
    current = current.parent
  }
  return path
}

// 图形生成器
function generate(id, data, options) {
  let { outerRadius, innerRadius, maxScale, radius, svg, height, width } = getConfig(id, options)

  // 内圆半径计算公式
  function innerRadiusFn(d) {
    return innerRadius !== 0 && maxScale
      ? innerRadius / 2 // RoseDoughnut 环形南丁格尔玫瑰图(内环半径/2)
      : innerRadius
  }
  // 外圆半径计算公式
  function outerRadiusFn(d) {
    // 如果是南丁格尔玫瑰图，则外环半径由value决定
    if (maxScale) {
      if (innerRadiusFn(d) === 0) {
        return outerRadius * (d.data.value / maxScale)
      } else {
        return innerRadiusFn(d) * (d.data.value / maxScale) + innerRadiusFn(d)
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
      return maxScale || d.value
    })

  // 生成每个圆环
  let g = svg
    .selectAll('.arc')
    .data(pie(data))
    .enter()
    .append('g')
    .attr('class', 'arc')
    .style('cursor', 'pointer')

  // 为每个圆环填充颜色
  g.append('path')
    .attr('class', 'solidArc')
    .attr('d', arc)
    .style('fill', function(d) {
      return color(d.data.name)
    })
    .transition() // 设置动画
    .ease('bounce') // 动画效果
    .duration(1500) // 持续时间
    .attrTween('d', tweenPie) // 两个属性之间平滑的过渡。
  // .transition()
  // .ease('elastic')
  // .delay(function(d, i) {
  //   return 2000 + i * 50
  // }) // 设置了一个延迟时间，让每一个内半径不在同一个时间缩小。
  // .duration(750)
  // .attrTween('d', tweenDonut)

  function tweenPie(b) {
    // 这里将每一个的弧的开始角度和结束角度都设置成了0
    // 然后向他们原始的角度(b)开始过渡，完成动画。
    b.innerRadius = 0
    let i = d3.interpolate({ startAngle: 0, endAngle: 0 }, b)
    // 下面的函数就是过渡函数，他是执行多次最终达到想要的状态。
    return function(t) {
      return arc(i(t))
    }
  }

  // function tweenDonut(b) {
  //   // 设置内半径不为0
  //   b.innerRadius = radius * 0.6
  //   // 然后内半径由0开始过渡
  //   let i = d3.interpolate({ innerRadius: 0 }, b)
  //   return function(t) {
  //     return arc(i(t))
  //   }
  // }

  // 设置文字
  let textLabels = g
    .append('text')
    .attr('class', 'label-text')
    .attr('transform', function(d) {
      // 根据开始和结束的弧度，通过三角函计算x,y坐标
      return (
        'translate(' +
        Math.cos((d.startAngle + d.endAngle - Math.PI) / 2) * (radius + textOffset) +
        ',' +
        Math.sin((d.startAngle + d.endAngle - Math.PI) / 2) * (radius + textOffset) +
        ')'
      )
    })
    .attr('dx', function(d) {
      let centroid = arc.centroid(d)
      let midAngle = Math.atan2(centroid[1], centroid[0])
      let x1 = Math.cos(midAngle) * (radius + textOffset)
      centroid = arc.centroid(d)
      return x1 > 0 ? '1.5em' : '-1.5em'
    })
    .attr('dy', '0.3em')
    .attr('text-anchor', function(d) {
      if ((d.startAngle + d.endAngle) / 2 < Math.PI) {
        return 'beginning'
      } else {
        return 'end'
      }
    })
    .text(function(d) {
      return d.data.value ? d.data.name : ''
    })
    .style('user-select', 'none')
    .style('fill', function(d) {
      return color(d.data.name)
    })

  function addLine(d, addValue) {
    let x0 = arc.centroid(d)[0]
    let y0 = arc.centroid(d)[1]
    let centroid = arc.centroid(d)
    let midAngle = Math.atan2(centroid[1], centroid[0])
    let x1 = Math.cos(midAngle) * (radius + textOffset)
    centroid = arc.centroid(d)
    let x2 = x1 > 0 ? x1 + textOffset : x1 - textOffset
    midAngle = Math.atan2(centroid[1], centroid[0])
    centroid = arc.centroid(d)
    midAngle = Math.atan2(centroid[1], centroid[0])
    let y1 = Math.sin(midAngle) * (radius + textOffset)
    let ret = []
    ret.push('M', x0, y0, 'L', x1, y1 + addValue, 'L', x2, y1 + addValue)
    return ret.join(' ')
  }

  // 为文字添加方位线
  let textLines = g
    .append('path')
    .attr('class', 'label-line')
    .attr('d', function(d, i) {
      return addLine(d, 0)
    })
    .style('stroke', function(d) {
      return color(d.data.name)
    })
  // g.append('text')
  //   .attr('transform', function(d) {
  //     return 'translate(' + arc.centroid(d) + ')'
  //   })
  //   .attr('dy', '1.5em')
  //   .text(function(d) {
  //     return d.data.value
  //   })
  //   .style('user-select', 'none')

  // 调整文字和方位线
  function relax() {
    let spacing = 12
    let alpha = 6.5
    // again = false
    textLabels.each(function(d, i) {
      let a = this
      // console.log(a)
      let da = d3.select(a)
      // console.log(da)
      let y1 =
        da
          .attr('transform')
          .match(/translate\((.*?)\)/)[1]
          .split(',')[1] * 1
      textLabels.each(function(d, j) {
        let b = this
        // a & b are the same element and don't collide.
        if (a === b) return
        let db = d3.select(b)
        // a & b are on opposite sides of the chart and
        // don't collide
        if (da.attr('text-anchor') !== db.attr('text-anchor')) return
        // Now let's calculate the distance between
        // these elements.
        let y2 =
          db
            .attr('transform')
            .match(/translate\((.*?)\)/)[1]
            .split(',')[1] * 1
        let deltaY = y1 - y2

        // If spacing is greater than our specified spacing,
        // they don't collide.
        if (Math.abs(deltaY) > spacing) return

        // If the labels collide, we'll push each
        // of the two labels up and down a little bit.
        // again = true
        let sign = deltaY > 0 ? 1 : -1
        let adjust = sign * alpha
        da.attr('y', adjust)
        db.attr('y', -1 * adjust)
        d3.select(textLines[0][i]).attr('d', function(d, i) {
          return addLine(d, adjust)
        })
        d3.select(textLines[0][j]).attr('d', function(d, i) {
          return addLine(d, -1 * adjust)
        })
      })
    })
    // Adjust our line leaders here
    // so that they follow the labels.
    // if (again) {
    //   console.log('yizhi??????????????????')
    //   setTimeout(relax, 20)
    // }
  }

  // 重新调整文字和方位线，防止文字重叠
  relax()

  // 设置图例
  let legend = g
    .append('g')
    .attr('class', 'legend')
    .attr('transform', function(d, i) {
      let translateX, translateY
      if (data.length > 3) {
        translateX = width - radius * 4
        translateY = i * 30 - radius
      } else {
        translateX = i * 10 * legendSize
        translateY = height / 2 + margin.bottom - legendSize * 1.2
      }
      return `translate(${translateX},${translateY})`
    })
    .style('cursor', 'pointer')

  // 图例样式
  legend
    .append('rect')
    .attr('width', legendSize * 2)
    .attr('height', legendSize)
    .attr('ry', legendSize / 4)
    .style('fill', function(d) {
      return color(d.data.name)
    })

  // 图例文字
  legend
    .append('text')
    .data(data)
    .attr('x', legendSize * 2 * 1.2)
    .attr('y', legendSize / 1.1)
    .text(function(d) {
      return d.name
    })

  function ArcMouseover(_this, d) {
    // 改变圆弧的颜色和大小
    d3.select(_this)
      .select('.solidArc')
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
    // 改变方位线的颜色
    d3.select(_this)
      .select('.label-line')
      .transition()
      .duration(200)
      .style('stroke', function(d) {
        return d3.rgb(color(d.data.name)).brighter(0.5)
      })
    // 改变文字的颜色
    d3.select(_this)
      .select('.label-text')
      .transition()
      .duration(200)
      .style('fill', function(d) {
        return d3.rgb(color(d.data.name)).brighter(0.5)
      })
    // 改变图例的颜色
    d3.select(_this)
      .select('.legend')
      .select('rect')
      .transition()
      .duration(200)
      .style('fill', function(d) {
        return d3.rgb(color(d.data.name)).brighter(0.5)
      })

    // 如果内圆半径大于（圆环），则在中心空白处增加文字
    if (innerRadiusFn(d) > 0) {
      // count the sum
      let count = 0
      for (let i = 0; i < data.length; i++) {
        count += data[i]['value'] * 1
      }
      // add name text
      svg
        .append('svg:text')
        .attr('class', 'donutCenterText')
        .attr('dy', '-.3em')
        .attr('text-anchor', 'middle')
        .transition()
        .duration(200)
        .text(`${d['data']['name']}（${d['value']}）`)

      // add value text
      svg
        .append('svg:text')
        .attr('class', 'donutCenterText')
        .attr('dy', '.8em')
        .attr('text-anchor', 'middle')
        .transition()
        .duration(200)
        .text(`${d3.format('.00%')(d['value'] / count)}`)
    }
  }
  function ArcMouseout(_this, d) {
    // 还原圆弧的颜色和大小
    d3.select(_this)
      .select('.solidArc')
      .transition()
      .duration(200)
      .attr('d', arc.innerRadius(innerRadiusFn).outerRadius(outerRadiusFn))
      .style('fill', function(d) {
        return color(d.data.name)
      })
    // 还原方位线的颜色
    d3.select(_this)
      .select('.label-line')
      .transition()
      .duration(200)
      .style('stroke', function(d) {
        return color(d.data.name)
      })
    // 还原文字的颜色
    d3.select(_this)
      .select('.label-text')
      .transition()
      .duration(200)
      .style('fill', function(d) {
        return color(d.data.name)
      })
    // 还原图例的颜色
    d3.select(_this)
      .select('.legend')
      .select('rect')
      .transition()
      .duration(200)
      .style('fill', function(d) {
        return color(d.data.name)
      })
    // 删除圆环中心的文字
    if (innerRadiusFn(d) > 0) {
      d3.select(id)
        .selectAll('.donutCenterText')
        .remove()
    }
  }

  // .arc 事件
  g.on('mouseover', function(d) {
    ArcMouseover(this, d)
  }).on('mouseout', function(d) {
    ArcMouseout(this, d)
  })
}

// 旭日图生成器 https://bl.ocks.org/kerryrodden/7090426
function sunburst(id, data) {
  let options
  let countValue = 0
  let { innerRadius, radius, svg } = getConfig(id, options)

  svg.attr('transform', 'translate(' + (radius * 1 + 50) + ',' + (radius * 1 + 50) + ')')

  let partition = d3.layout
    .partition()
    .sort(null)
    .size([2 * Math.PI, radius * radius])
    .value(function(d) {
      return d.value
    })
  let arc = d3.svg
    .arc()
    .startAngle(function(d) {
      return d.x
    })
    .endAngle(function(d) {
      return d.x + d.dx
    })
    .innerRadius(function(d) {
      return Math.sqrt(d.y)
    })
    .outerRadius(function(d) {
      return Math.sqrt(d.y + d.dy)
    })
  svg
    .datum(data)
    .selectAll('path')
    .data(partition.nodes)
    .enter()
    .append('path')
    .attr('class', 'solidArc')
    .attr('display', function(d) {
      return d.depth ? null : 'none'
    }) // hide inner ring
    .attr('d', arc)
    .style('cursor', 'pointer')
    .style('stroke', '#fff')
    .style('fill', function(d) {
      if (!d.children) {
        countValue = countValue + d.value
      }
      return color((d.children ? d : d.parent).name)
    })
    .style('fill-rule', 'evenodd')
    .each(function(d) {
      d.x0 = d.x
      d.dx0 = d.dx
    })

  // 更新面包屑导航
  function updateBreadcrumbLegend(nodeArray, percentageString) {
    d3.select(id)
      .selectAll('.breadcrumbLegend')
      .remove()

    // Breadcrumb dimensions: width, height, spacing, width of tip/tail.
    let breadcrumb = { w: 75, h: 30, s: 3, t: 10 }
    let getBW = d => {
      return breadcrumb.w + d.name.length * 5
    }

    let svg = d3.select(id).select('svg')

    let entering = svg
      .selectAll('.breadcrumbLegend')
      .data(nodeArray, function(d) {
        // console.log(d.name + d.depth)
        return d.name + d.depth
      })
      .enter()
      .append('g')
      .attr('class', 'breadcrumbLegend')

    entering
      .append('svg:polygon')
      .attr('points', function(d, i) {
        let points = []
        points.push('0,0')
        points.push(getBW(d) + ',0')
        points.push(getBW(d) + breadcrumb.t + ',' + breadcrumb.h / 2)
        points.push(getBW(d) + ',' + breadcrumb.h)
        points.push('0,' + breadcrumb.h)
        if (i > 0) {
          // Leftmost breadcrumb; don't include 6th vertex.
          points.push(breadcrumb.t + ',' + breadcrumb.h / 2)
        }
        return points.join(' ')
      })
      .style('fill', function(d) {
        return color(d.name)
      })

    entering
      .append('svg:text')
      .attr('x', function(d) {
        return (getBW(d) + breadcrumb.t) / 2
      })
      .attr('y', breadcrumb.h / 2)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'middle')
      .style('fill', '#fff')
      .text(function(d) {
        return d.name
      })

    // Set position for entering and updating nodes.
    entering.attr('transform', function(d, i) {
      let addW = nodeArray
        .map(currentValue => {
          return getBW(currentValue.parent)
        })
        .reduce((total, currentVal, currentIndex) => {
          if (currentIndex <= i) {
            total = total + currentVal
          }
          return total
        }, -1 * getBW(nodeArray[0].parent))

      if (nodeArray.length - 1 === i) {
        svg
          .append('svg:text')
          .attr('class', 'breadcrumbLegend')
          .attr('x', (i + 1) * breadcrumb.s + breadcrumb.t + addW + getBW(nodeArray[nodeArray.length - 1]))
          .attr('y', breadcrumb.h / 2)
          .attr('dy', '0.35em')
          .text(percentageString)
      }
      return 'translate(' + (i * breadcrumb.s + addW) + ', 0)'
    })

    // Remove exiting nodes.
    // entering.exit().remove()
  }

  // 激活选中的path，及其所有的祖先节点
  function activeSolidArc(d) {
    let nodeList = getAncestors(d)
    svg.selectAll('.solidArc').style('opacity', 0.3)
    // Then highlight only those that are an ancestor of the current segment.
    svg
      .selectAll('.solidArc')
      .filter(function(node) {
        return nodeList.indexOf(node) >= 0
      })
      .style('opacity', 1)
    // 更新面包屑导航
    updateBreadcrumbLegend(nodeList, d3.format('.00%')(d['value'] / countValue))
    addText(d)
  }

  // overflow:hidden;
  //   text-overflow:ellipsis;
  //   white-space:nowrap

  // 在图形中心添加文字
  function addText(d) {
    removeText()
    // add name text
    svg
      .append('foreignObject')
      .attr('class', 'donutCenterText')
      .attr('width', innerRadius)
      .attr('height', '1.5em')
      .attr('transform', 'translate(' + innerRadius * -0.5 + ',-14)')
      .append('xhtml:body')
      .style('background-color', '#fff')
      .style('text-align', 'center')
      .append('p')
      .style('font', "1em 'Helvetica Neue'")
      .style('overflow', 'hidden')
      .style('text-overflow', 'ellipsis')
      .style('white-space', 'nowrap')
      .transition()
      .duration(200)
      .text(d['name'])

    // add value text
    svg
      .append('svg:text')
      .attr('class', 'donutCenterText')
      .attr('dy', '1.5em')
      .attr('text-anchor', 'middle')
      .transition()
      .duration(200)
      .text(d3.format('.00%')(d['value'] / countValue))
  }

  // 删除图形中间的文字
  function removeText() {
    d3.select(id)
      .selectAll('.donutCenterText')
      .remove()
  }

  let clickData

  svg
    .selectAll('.solidArc')
    .on('click', function(d) {
      clickData = d
    })
    .on('mouseover', function(d) {
      activeSolidArc(d)
    })
    .on('mouseout', function(d) {
      d3.select(this)
        .transition()
        .duration(200)
        .style('fill', function(d) {
          return color(d.name)
        })
      if (!clickData) {
        svg.selectAll('.solidArc').style('opacity', 1)
        d3.select(id)
          .selectAll('.breadcrumbLegend')
          .remove()
        removeText()
      } else {
        activeSolidArc(clickData)
      }
    })
}

// 环形南丁格尔玫瑰图
function roseDoughnut(id, data) {
  let formatData = JSON.parse(JSON.stringify(data))
  let maxScale = formatData.sort((a, b) => {
    return b.value - a.value
  })[0].value
  generate(id, data, {
    maxScale
  })
}
// 南丁格尔玫瑰图
function rosePie(id, data) {
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
function doughnut(id, data) {
  generate(id, data)
}
// 饼图
function pie(id, data) {
  generate(id, data, {
    innerRadius: 0
  })
}

export default {
  sunburst,
  doughnut,
  pie,
  roseDoughnut,
  rosePie
}
