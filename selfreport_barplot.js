/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Selfreport_barplot
*/

var margin = {left:80, right:20, top:50, bottom:100};

var width = 600 - margin.left - margin.right;
var height = 400 - margin.top - margin.bottom;

var g = d3.select("#chart-area")
	.append("svg")
		.attr("width",width + margin.left + margin.right)
		.attr("height",height + margin.top + margin.bottom)
	.append("g")
		.attr("transform","translate("+margin.left+","+margin.top+")")

g.append("text")
	.attr("y", height + 50)
	.attr("x", width / 2)
	.attr("font-size","20px")
	.attr("font-weight","Bold")
	.attr("text-anchor","middle")
	.attr("font-family","verdana")
	.text("TYPE")

g.append("text")
	.attr("y", -60)
	.attr("x", -(height/2))
	.attr("font-size","20px")
	.attr("font-weight","Bold")
	.attr("text-anchor","middle")
	.attr("font-family","verdana")
	.attr("transform","rotate(-90)")
	.text("RATE");

d3.csv("data/userdata.csv").then(function(data){

	var a_0 = 0, a_1 = 0, b_0 = 0, b_1 = 0, c_0 = 0, c_1 = 0;

	for (var i = data.length - 1; i >= 0; i--)
	{
		data[i].report1 = +data[i].report1
		data[i].report2 = +data[i].report2
		data[i].report3 = +data[i].report3

		if(data[i].report1 == 0)
			a_0++
		else
			a_1++

		if(data[i].report2 == 0)
			b_0++;
		else
			b_1++;

		if(data[i].report3 == 0)
			c_0++;
		else
			c_1++;
	}

//	console.log(a_0 , a_1, b_0, b_1, c_0, c_1);

	var x = d3.scaleBand()
		.domain(["concept","strategy","mistake"])
		.range([0,width])
		.padding(0.6);

	var size = data.length;
	console.log(size);
	var y = d3.scaleLinear()
		.domain([0,size-1])
		.range([height,0]);

	var xAxisCall = d3.axisBottom(x)
	g.append("g")
		.attr("class","x axis")
		.attr("transform","translate(0,"+height+")")
		.call(xAxisCall);

	var yAxisCall = d3.axisLeft(y)
	g.append("g")
		.attr("class","y axis")
		.call(yAxisCall);

	var rects = g.selectAll("rect")
		.data(data)

	rects.enter()
		.append("rect")
			.attr("x",function(d, i){
				return (i*2.5+1.5)*x.bandwidth();
			})
			.attr("y",function(d,i){
				if(i == 0)
					return y(a_1);
				else if(i == 1)
					return y(b_1);
				else if(i == 2)
					return y(c_1);
			})
			.attr("width",x.bandwidth)
			.attr("height",function(d, i){
				if(i == 0)
					return height - y(a_1);
				else if(i == 1)
					return height - y(b_1);
				else if(i == 2)
					return height - y(c_1);
			})
			.attr("fill","steelblue")


	rects.enter()
		.append("rect")
			.attr("x",function(d, i){
				return (i*2.5+1.5)*x.bandwidth();
			})
			.attr("y",function(d,i){
				if(i == 0)
					return y(a_0 + a_1);
				else if(i == 1)
					return y(b_0 + b_1);
				else if(i == 2)
					return y(c_0 + c_1);
			})
			.attr("width",x.bandwidth)
			.attr("height",function(d, i){
				if(i == 0)
					return height - y(a_0);
				else if(i == 1)
					return height - y(b_0);
				else if(i == 2)
					return height - y(c_0);
			})
			.attr("fill","indianred")

})