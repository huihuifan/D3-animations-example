//Angela Fan

var number = 4;

var margins = [50, 50, 50, 50],
	width = 1060,
	height = 500;

var svg = d3.select("#graphs").append("svg")
	.attr("width", width + margins[1] + margins[3])
	.attr("height", height + margins[0] + margins[2])
  .append("g")
  	.attr("transform", "translate(" + margins[3] + "," + margins[0] + ")");

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
	.interpolate("basis")
	.x(function(d) { return x(d.location) })
	.y(function(d) { return y(d.signal) });

d3.csv("ec_brd4.csv", function(error, data) {
	data.forEach(function(d) {
		d.location = +d.location;
		d.signal = +d.signal1;
	});
	
	x.domain(d3.extent(data, function(d) {return d.location}));
	y.domain(d3.extent(data, function(d) {return d.signal}));

	svg.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis)
	  .append("text")
	  	.attr("x", 1100)
	  	.attr("dx", "-3.0em")
	  	.attr("dy", "2.9em")
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

	function setDelay() {
		number = number - 1;
		if (number) {
			update(number)
			setTimeout(setDelay, 3000);
		}
	}

	setDelay();

});

function update(number){

	var col_name = "signal" + number;

  	d3.csv("ec_brd4.csv", function(error, data) {
  		data.forEach(function(d) {
		d.location = +d.location;
		d.signal = +d[col_name];
	});
  	
  	x.domain(d3.extent(data, function(d) {return d.location}));
	y.domain(d3.extent(data, function(d) {return d.signal}));

	svg.select(".x").call(xAxis);
	svg.select(".y").call(yAxis);

	var selection = svg.selectAll(".line")
		.datum(data);

	selection
		.transition()
		.duration(1000)
		.attr("d", line)
		.ease("linear")
		.attr("class", "line");

	});

}








