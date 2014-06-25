//Angela Fan

var margins = [50, 50, 50, 50],
	width = 1060,
	h = 500;


var x, y;

var duration = 1200, 
	delay = 500;


var color = d3.scale.category10();

var svg = d3.select("#graphs").append("svg")
	.attr("width", width + margins[1] + margins[3])
	.attr("height", height + margins[0] + margins[2])
  .append("g")
  	.attr("transform", "translate(" + margins[3] + "," + margins[0]);

var x = d3.scale.linear()
	.range([0, width]);

var y = d3.scale.linear()
	.range([height, 0]);

var line = d3.svg.line()
	.interpolate("basis")
	.x(function(d) {return x(d.location)})
	.y(function(d) {return y(d.signal)});

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");

d3.csv("time1.csv", function(error, data) {
	data.forEach(function(d) {
		d.location = +d.location;
		d.signal = +d.signal;
	});

	x.domain(d3.extent(data, function(d) {return d.location}));
	y.domain(d3.extent(data, function(d) {return d.signal}));

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
	  .append("text")
	  	.attr("x", 10)
	  	.style("text-anchor", "end")
	  	.text("Location");

	svg.append("g")
		.attr("class", "y axis")
		.call(yAxis)
	  .append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end")
		.text("Signal");

	svg.append("path")
		.datum(data)
		.attr("class", "line")
		.attr("d", line);
})














