/*
*    main.js
*    Mastering Data Visualization with D3.js
*    Project 1 - Star Break Coffee
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
	.attr("y", height + 90)
	.attr("x", width / 2)
	.attr("font-size","20px")
	.attr("font-weight","Bold")
	.attr("text-anchor","middle")
	.attr("font-family","verdana")
	.text("DOMAIN 1")

g.append("text")
	.attr("y", -60)
	.attr("x", -(height/2))
	.attr("font-size","20px")
	.attr("font-weight","Bold")
	.attr("text-anchor","middle")
	.attr("font-family","verdana")
	.attr("transform","rotate(-90)")
	.text("ERROR");

d3.csv("data/random_problemset.csv").then(function(data){

	//console.log(data)

/*	var a_0 = 0, a_1 = 0, b_0 = 0, b_1 = 0, c_0 = 0, c_1 = 0;

	for (var i = data.length - 1; i >= 0; i--)
	{
		data[i].concept = +data[i].concept
		data[i].strategy = +data[i].strategy
		data[i].mistake = +data[i].mistake

		if(data[i].concept == 0)
			a_0++;
		else
			a_1++

		if(data[i].strategy == 0)
			b_0++;
		else
			b_1++;

		if(data[i].mistake == 0)
			c_0++;
		else
			c_1++;
	}*/

//	console.log(a_0 , a_1, b_0, b_1, c_0, c_1);

/*	data.forEach(function(d){
		d = +d
	})*/

/*	console.log(data.map(function(d){
		return d.domain1;
	}))*/

	var a = 0, b = 0, c = 0, w = 0, xx = 0, yy = 0, z = 0;

	data.forEach(function(d){

		var key = d.domain[3]
		//console.log(key)

		if(key == "다" && d.correct == 0)
			a++;
		else if(key == "실" && d.correct == 0)
			b++;
		else if(key == "방" && d.correct == 0)
			c++;
		else if(key == "도" && d.correct == 0)
			w++;
		else if(key == "집" && d.correct == 0)
			xx++;
		else if(key == "함" && d.correct == 0)
			yy++;
		else if(key == "경" && d.correct == 0)
			z++;
	})

//	console.log(a, b, c, d, e, f, g);

	var x = d3.scaleBand()
		/*.domain(data.map(function(d){
			return d.domain[3];
		}))*/
		.domain(["다항식","실수와 허수","방정식과 부등식","도형의 방정식","집합과 명제","함수","경우의 수"])
		.range([0,width])
		.padding(0.6);

	//var size = data.length/4;
	var size = d3.max([a,b,c,w,xx,yy,z])
	var y = d3.scaleLinear()
		/*.domain([0, d3.max(data,function(d){
			return d.revenue;
		})])*/
		//.domain([0,100])
		.domain([0,size])
		.range([height,0]);

	var xAxisCall = d3.axisBottom(x)
	g.append("g")
		.attr("class","x axis")
		.attr("transform","translate(0,"+height+")")
		.call(xAxisCall)
		.selectAll("text")
			.attr("text-anchor","end")
			.attr("transform",function(d){
				return "rotate(-45)"
			});

	var yAxisCall = d3.axisLeft(y)
		/*.tickFormat(function(d){
			return "$"+d;
		})*/
	g.append("g")
		.attr("class","y axis")
		.call(yAxisCall);

	var rects = g.selectAll("rect")
		.data(data)

	rects.enter()
		.append("rect")
			/*.attr("y", function(d){
				//console.log(d.revenue)
				//console.log(y(d.revenue))
				return y(d.revenue);
			})
			.attr("x",function(d){
				return x(d.month);
			})
			.attr("height",function(d){
				return height - y(d.revenue);
			})
			.attr("width", x.bandwidth)
			.attr("fill","grey")
			//.attr("stroke","red")
			//.attr("stroke-width","spx")*/
			.attr("x",function(d, i){
				return (i*2.5+1.5)*x.bandwidth();
			})
			.attr("y",function(d,i){
				if(i == 0)
					return y(a);
				else if(i == 1)
					return y(b);
				else if(i == 2)
					return y(c);
				else if(i == 3)
					return y(w);
				else if(i == 4)
					return y(xx);
				else if(i == 5)
					return y(yy);
				else if(i == 6)
					return y(z);
			})
			.attr("width",x.bandwidth)
			.attr("height",function(d, i){
				if(i == 0)
					return height - y(a);
				else if(i == 1)
					return height - y(b);
				else if(i == 2)
					return height - y(c);
				else if(i == 3)
					return height - y(w);
				else if(i == 4)
					return height - y(xx);
				else if(i == 5)
					return height - y(yy);
				else if(i == 6)
					return height - y(z);
			})
			.attr("fill","indianred")


/*	rects.enter()
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
					return height - y(a_1);
				else if(i == 1)
					return height - y(b_1);
				else if(i == 2)
					return height - y(c_1);
			})
			.attr("fill","indianred")*/

})