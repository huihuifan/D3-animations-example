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

var area = d3.svg.area()
    .x(function(d) { return x(d.location); })
    .y0(height)
    .y1(function(d) { return y(d.signal); });


d3.csv("ec_brd4.csv", function(error, data) {
	data.forEach(function(d) {
		d.location = +d.location;
		d.signal = +d.signal1;
	});
	
	var top_values = [];
	//var location_values = [];

	for (var i = 1; i < number; i++) {

		var current_column = "signal" + i;

		top_values.push(+d3.max(data, function(d) {
			//console.log(d[current_column])
			return +d[current_column];
		}))

		//console.log(top_values)

	}

	y_domain_end = d3.max(top_values);

	//console.log(y_domain_end)

	//console.log(location_values)

	//console.log(x_domain_end)

	x.domain(d3.extent(data, function(d) {return d.location}));
	// y.domain(d3.extent(data, function(d) {return d.signal}));

	y.domain([0, y_domain_end]);

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

	// svg.append("text")
	// 	.attr("y", 0)
	// 	.attr("x", 0)
	// 	.attr("class", "name_text")
	// 	.text("Signal 1")

	//     	.x(function(d) { return x(d.location) })
	// .y(function(d) { return y(d.signal) });

	svg.append("path")
		.datum(data)
		.attr("class", "area")
		.attr("d", area);

	function setDelay() {
		number = number - 1;
		if (number) {
			update(4-number)
			setTimeout(setDelay, 6000);
		}
	}

	setDelay();

});

function update(number){

	var col_name = "signal" + number;

	var label;

	if (col_name == "signal3") {
		label = "+TNF +JQ1";
	}
	else if (col_name == "signal2") {
		label = "+TNF";
	}
	else {
		label = "Control";
	}

	d3.selectAll(".name_text").remove()

  	d3.csv("ec_brd4.csv", function(error, data) {
  		data.forEach(function(d) {
		d.location = +d.location;
		d.signal = +d[col_name];
	});

	svg.append("text")
		.attr("y", 0)
		.attr("x", 500)
		.attr("class", "name_text")
		.text(label)
		.style("font-family", "Arial")
		.style("font-size", "36px");
  	
  	x.domain(d3.extent(data, function(d) {return d.location}));
	y.domain([0, y_domain_end]);

	//console.log(y_domain_end)

	svg.select(".x").call(xAxis);
	svg.select(".y").call(yAxis);

	var selection = svg.selectAll(".area")
		.datum(data);

	selection
		.transition()
		.duration(1000)
		.attr("d", area)
		.ease("linear")
		.attr("class", "area");

	});

}








