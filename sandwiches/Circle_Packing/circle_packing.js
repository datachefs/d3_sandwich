// abstract_state.js: globals and functions for creating the abstract state map,
// so we don't have to repeat the code & clutter up each recipe step

// Globals
var Diameter = 500, TextSize = "12";


DoCirclePacking = function(createOrUpdate, toyID, items, svgLocation	)  {
// makePackCircle: create a packed circle

  	if (createOrUpdate == 'update') {
      var svg = getSVG(toyID);
    } else {
     var svg = d3.select("#" + toyID + " #" + svgLocation).append("svg")
    .attr("width", Diameter)
    .attr("height", Diameter);
    };

  // Create a packed layout function and use it to do the calculations to turn produce into a packed layout
  var packedLayout = d3.layout.pack()
      .size([Diameter, Diameter])
      .value(function(d) { return d.quantity; });
  var packedNodes = packedLayout.nodes(items);

  // For each item, add a group to hold the circle and the text
  var nodes = svg.selectAll("g")
      .data(packedNodes)
      .enter().append("g")
      	.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
      	.attr("class", function(d) { return d.children ? "node" : "leaf"; });

  // For each group, add a circle
  nodes.append("circle")
      .attr("r", function(d) { return d.r; });

  //For each group,add a text label
  nodes.filter(function(d) { return !d.children; })
    .append("text")
      .text(function(d) { return d.name; })
      .style('font-size', TextSize + "px");
};





function getCircleItems() {
  return {
	name: "produce",
	children: [
    { name: "Veggies",
    children:  [
      {name: "Zucchini", quantity: 52},
      {name: "Peas", quantity: 30},
      {name: "Carrots", quantity: 60},
      {name: "Onions", quantity: 70}
    ] },
		{ name: "Fruit",
			children: [
				{ name: "Berries",
					children: [
						{name: "Raspberries", quantity: 100},
						{name: "Strawberries", quantity: 200},
						{name: "Blueberries", quantity: 80}
					] },
          {name: "Apple", quantity: 300},
          {name: "Banana", quantity: 200},
			] },
    ] };
};
