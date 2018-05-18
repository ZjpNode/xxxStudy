var d3 = require("d3");

function type(d) {
  d.population = +d.population;
  return d;
}

function generate(id, data) {
  let margin = { top: 10, right: 18, bottom: 30, left: 50 },
    containerWidth = d3
      .select(id)
      .style("width")
      .replace("px", ""),
    containerHeight = d3
      .select(id)
      .style("height")
      .replace("px", ""),
    width = containerWidth - margin.right - margin.left,
    height = containerHeight - margin.top - margin.bottom,
    radius = Math.min(width, height) / 2,
    outerRadius = radius - Math.max(margin.left, margin.right),
    innerRadius = radius - 150,
    chartColor = [
      "#ff4949",
      "#f7ba2a",
      "#13ce66",
      "#a05d56",
      "#1d8ce0",
      "#9467bd",
      "#ff8c00"
    ],
    legendSize = 10;

  let color = d3.scale.ordinal().range(chartColor);

  // 弧度计算器
  var arc = d3.svg
    .arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius);

  var pie = d3.layout
    .pie()
    .sort(null)
    .value(function(d) {
      return d.value;
    });

  var svg = d3
    .select(id)
    .append("svg")
    .attr("width", containerWidth)
    .attr("height", containerHeight)
    .append("g")
    .attr("transform", "translate(" + radius + "," + radius + ")");

  var g = svg
    .selectAll(".arc")
    .data(pie(data))
    .enter()
    .append("g")
    .attr("class", "arc");

  g
    .append("path")
    .attr("class", "solidArc")
    .attr("d", arc)
    .style("cursor", "pointer")
    .style("fill", function(d) {
      return color(d.data.name);
    });

  // 事件
  g
    .selectAll(".solidArc")
    .on("mouseover", function(d) {
      d3
        .select(this)
        .transition()
        .duration(200)
        .attr(
          "d",
          arc.innerRadius(innerRadius).outerRadius(outerRadius / 0.75 * 0.9)
        );
      console.log(innerRadius, outerRadius);

      //count the sum
      var count = 0;
      for (var i = 0; i < data.length; i++) {
        count += data[i]["value"];
      }

      svg
        .append("svg:text")
        .attr("class", "donutCenterText")
        .attr("dy", "-.3em")
        .attr("text-anchor", "middle")
        .transition()
        .duration(200)
        .text(d["data"]["name"]);

      svg
        .append("svg:text")
        .attr("class", "donutCenterText")
        .attr("dy", ".8em")
        .attr("text-anchor", "middle")
        .transition()
        .duration(200)
        .text(d3.format(".0%")(d["value"] / count));
    })
    .on("mouseout", function(d) {
      d3
        .select(this)
        .transition()
        .duration(200)
        .attr("d", arc.innerRadius(innerRadius).outerRadius(outerRadius));

      d3.selectAll(".donutCenterText").remove();
    });

  // 设置文字
  g
    .append("text")
    .attr("transform", function(d) {
      return "translate(" + arc.centroid(d) + ")";
    })
    .attr("dy", ".35em")
    .attr("dx", "-2em")
    .text(function(d) {
      return d.data.name;
    })
    .style("user-select", "none");

  g
    .append("text")
    .attr("transform", function(d) {
      return "translate(" + arc.centroid(d) + ")";
    })
    .attr("dy", "1.5em")
    .text(function(d) {
      return d.data.value;
    })
    .style("user-select", "none");

  // 设置图例
  var legend = svg
    .selectAll(".legend")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) {
      let translateX, translateY;
      if (data.length > 3) {
        translateX = radius;
        translateY = i * 30 - radius + margin.top * 2;
      } else {
        translateX = i * 10 * legendSize;
        translateY = height / 2 + margin.bottom - legendSize * 1.2;
      }
      return `translate(${translateX},${translateY})`;
    });

  // 图例样式
  legend
    .append("rect")
    .attr("width", legendSize)
    .attr("height", legendSize)
    .style("fill", function(d) {
      return color(d.name);
    });

  // 图例文字
  legend
    .append("text")
    .data(data)
    .attr("x", legendSize * 1.2)
    .attr("y", legendSize / 1.1)
    .text(function(d) {
      return d.name;
    });
}

export default {
  generate
};
