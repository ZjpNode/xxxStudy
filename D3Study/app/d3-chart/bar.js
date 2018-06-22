const d3 = require("d3");
const xyGrid = require("./xyGrid.js");
const config = require("./config");

let chartColor = config.chartColor;
// let color = d3.scale.ordinal().range(chartColor)

function generate(id, data, options) {
  let { svg, xScale, yScale, height, width, redrawXAxis } = xyGrid.generateGrid(
    id,
    data,
    options
  );

  // 设置条形图

  let stat = svg
    .selectAll(".countGpath")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "countGpath")
    .attr("transform", function(d) {
      return "translate(" + xScale.rangeBand() / 4 + ",-1)";
    });

  stat
    .append("rect")
    .attr("class", "countRect")
    .attr("width", function(d) {
      return xScale.rangeBand() / 2;
    })
    .attr("x", function(d) {
      return xScale(d["name"]);
    })
    .attr("y", function(d) {
      return yScale(0);
    })
    .attr("height", function(d) {
      return 0;
    })
    .style("fill", function(d) {
      return chartColor[0];
    })
    .style("cursor", "pointer")
    .transition() // 设置动画
    .ease("bounce") // 动画效果
    .duration(1500) // 持续时间
    .attr("y", function(d) {
      return yScale(d["value"]);
    })
    .attr("height", function(d) {
      return height - yScale(d["value"]);
    });

  stat
    .selectAll(".countRect")
    .on("mouseover", function(d) {
      d3
        .select(this)
        .transition()
        .duration(200)
        .style("fill", function(d) {
          return d3.rgb(chartColor[0]).brighter(0.5);
        });
    })
    .on("mouseout", function(d) {
      d3
        .select(this)
        .transition()
        .duration(200)
        .style("fill", function(d) {
          return chartColor[0];
        });
    });

  // 在条形图上添加文字
  stat
    .append("text")
    .attr("class", "countText")
    .attr("text-anchor", "middle")
    .attr("x", function(d) {
      return xScale(d["name"]) + xScale.rangeBand() / 4;
    })
    .attr("y", function(d) {
      return yScale(d["value"]);
    })
    .transition()
    .delay(2000)
    .delay(function(d, i) {
      return (i + 1) * 200;
    })
    .duration(2000)
    .ease("bounce") // 设定过渡样式
    .text(function(d) {
      return d.value;
    });

  function redraw(data) {
    // 重绘x轴
    let { xScale } = redrawXAxis(data);

    svg.selectAll(".countGpath").remove();

    let stat = svg
      .selectAll(".countGpath")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "countGpath")
      .attr("transform", function(d) {
        return "translate(" + xScale.rangeBand() / 4 + ",-1)";
      });

    stat
      .append("rect")
      .attr("class", "countRect")
      .attr("width", function(d) {
        return xScale.rangeBand() / 2;
      })
      .attr("x", function(d) {
        return xScale(d["name"]);
      })
      .attr("y", function(d) {
        return yScale(0);
      })
      .attr("height", function(d) {
        return 0;
      })
      .style("fill", function(d) {
        return chartColor[0];
      })
      .style("cursor", "pointer")
      .attr("y", function(d) {
        return yScale(d["value"]);
      })
      .attr("height", function(d) {
        return height - yScale(d["value"]);
      });

    // 在条形图上添加文字
    stat
      .append("text")
      .attr("class", "countText")
      .attr("text-anchor", "middle")
      .attr("x", function(d) {
        return xScale(d["name"]) + xScale.rangeBand() / 4;
      })
      .attr("y", function(d) {
        return yScale(d["value"]);
      })
      .text(function(d) {
        return d.value;
      });
  }

  return { redraw };
}

function generateBar(id, data, options) {
  return generate(id, data, options);
}
export default {
  generateBar
};
