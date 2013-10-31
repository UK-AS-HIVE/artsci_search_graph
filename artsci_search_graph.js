(function($) {
$(document).ready(function() {
  console.log(artsciMltGraph);

  var width = 640,
      height = 480;

  var color = d3.scale.category20();

  var force = d3.layout.force()
      .charge(-120)
      .linkDistance(50)
      .size([width, height]);

  var svg = d3.select("#artsci-mlt-graph").append("svg")
      .attr("width", width)
      .attr("height", height);

  //d3.json("miserables.json", function(error, artsciMltGraph) {
    force
        .nodes(artsciMltGraph.nodes)
        .links(artsciMltGraph.links)
        .start();

    var link = svg.selectAll(".link")
        .data(artsciMltGraph.links)
      .enter().append("line")
        .attr("class", "link")
        .attr("stroke", 'black')
        .style("stroke-width", function(d) { return Math.sqrt(d.value); });


    var node = svg.selectAll(".node")
        .data(artsciMltGraph.nodes)
      .enter().append("circle")
        .attr("class", "node")
        .attr("r", 5)
        .style("fill", function(d) { return color(d.fid); })
        .call(force.drag);

    node.append("title")
        .text(function(d) { return d.fid; });

    force.on("tick", function() {
      link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      node.attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });
    });
  });
}(jQuery));
