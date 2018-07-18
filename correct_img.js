/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Correct_rate_img
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


d3.csv("data/userdata.csv").then(function(data){

	//console.log(data)
	var sum = 0;
	var total = data.length;

	data.forEach(function(d){
		console.log(d.domain1)

		if(d.correct == 1)
			sum++;
	})

	g.append("text")
		.attr("y","20")
		.attr("x","20")
		.attr("font-size","90px")
		.attr("font-weight","Bold")
		.attr("text-anchor","middle")
		.attr("font-family","verdana")
		.attr("fill","steelblue")
		.text(sum);

	g.append("text")
		.attr("y","50")
		.attr("x","80")
		.attr("font-size","130px")
		.attr("font-weight","Bold")
		.attr("text-anchor","middle")
		.attr("font-family","verdana")
		.attr("fill","lightsteelblue")
		.attr("transform","rotate(20)")
		.text("/");

	g.append("text")
		.attr("y","100")
		.attr("x","140")
		.attr("font-size","90px")
		.attr("font-weight","Bold")
		.attr("text-anchor","middle")
		.attr("font-family","verdana")
		.attr("fill","steelblue")
		.text(total);
})