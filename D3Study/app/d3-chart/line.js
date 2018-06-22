const d3 = require("d3");
const xyGrid = require("./xyGrid.js");
const config = require("./config");

let chartColor = config.chartColor;
// let color = d3.scale.ordinal().range(chartColor)

function generate(id, data, options) {
  let defaultOptions = {
    lineType: "monotone"
  };
  Object.assign(defaultOptions, options);

  let { svg, xScale, yScale, height, width, redrawXAxis } = xyGrid.generateGrid(
    id,
    data,
    options
  );

  var line = d3.svg
    .line()
    // .interpolate(defaultOptions.lineType)
    .x(function(d) {
      return xScale(d["name"]); // + tranLength;
    })
    .y(function(d) {
      return yScale(d["value"]);
    });
  var path = svg.append("g").attr("class", "countLines");

  path
    .append("path")
    .attr("d", line(data))
    .attr("class", "countLine")
    .attr("transform", function(d) {
      return "translate(" + xScale.rangeBand() / 2 + ",-1)";
    })
    .attr("stroke", chartColor[0])
    .attr("fill", "none")
    .attr("stroke-linejoin", "round") // 描边转角的表现方式
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5);

  function redraw(data) {
    let { xScale } = redrawXAxis(data);

    d3.selectAll(id + " .countLine").remove();

    var line = d3.svg
      .line()
      // .interpolate(defaultOptions.lineType)
      .x(function(d) {
        return xScale(d["name"]); // + tranLength;
      })
      .y(function(d) {
        return yScale(d["value"]);
      });
    var path = svg.append("g").attr("class", "countLine");

    path
      .append("path")
      .attr("d", line(data))
      .attr("class", "countLine")
      .attr("transform", function(d) {
        return "translate(" + xScale.rangeBand() / 2 + ",-1)";
      })
      .attr("stroke", chartColor[0])
      .attr("fill", "none")
      .attr("stroke-linejoin", "round") // 描边转角的表现方式
      .attr("stroke-linecap", "round")
      .attr("stroke-width", 1.5);
  }

  return { redraw };
}

function generateLine(id, data, options) {
  return generate(id, data, options);
}
export default {
  generateLine
};
