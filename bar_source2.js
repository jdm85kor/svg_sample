window.onload = function(){
    defineData();
    var object = createSVG();
    setBaseValue(object);
    drawHistogram(object);
    drawYaxis(object);
    drawXaxis(object);
}

function drawYaxis(object){
    base.yAxis = d3.svg.axis()
                        .scale(base.yScale)
                        .orient("left");

    object.append("g")
            .attr("transform", "translate(" + base.trbl.left + "," + 
                                                      base.trbl.top + ")")
            .append("g")
            .attr("class", "axis")
            .call(base.yAxis);
}

function drawXaxis(object){
    base.xAxis = d3.svg.axis()
                         .scale(base.xScale)
                         .orient("bottom");

    object.append("g")
            .attr("transform", "translate(" + base.trbl.left + "," + 
                                    (base.svgHeight - base.trbl.bottom) + ")")
            .attr("class", "axis")
            .call(base.xAxis);
}

function defineData(){
    window.base = {};
    base.data = [
        {mon: 1, amt: 950}, {mon: 2, amt: 550}, {mon: 3, amt: 450},
        {mon: 4, amt: 350}, {mon: 5, amt: 250}, {mon: 6, amt: 150},
        {mon: 7, amt: 190}, {mon: 8, amt: 250}, {mon: 9, amt: 350},
        {mon: 10, amt: 450}, {mon: 11, amt: 550}, {mon: 12, amt: 850}
    ]
};

function createSVG(){
    return d3.select(document.body)
                .append('svg')
                .attr('id', 'idsvg');
}

function setBaseValue(object){
    base.maxAmount = 1000;
    base.trbl = {top: 20, right: 20, bottom: 30, left: 50};
    base.svgWidth = parseInt(object.style('width'));
    base.graphWidth = base.svgWidth - base.trbl.left - base.trbl.right;
    base.svgHeight = parseInt(object.style('height')),
    base.graphHeight = base.svgHeight - base.trbl.top - base.trbl.bottom;
};

function drawHistogram(object){
	base.color = d3.scale.category10();
	var histogram = d3.layout.histogram()
	                  .range([1,50])
	                  .bins(5);
	var max = d3.max(histogram(base.data), function(data,idx){
		return data.y;
	});
	base.yScale = d3.scale.linear()
	                .domain([0,max])
	                .range([base.graphHeight, 0 ]);
	base.xScale = d3.scale.linear()
	                .domain([0,50])
	                .range([0,base.graphWidth]);
  var obj = object.append("g")
                  .selectAll("rect")
                  .data(histogram(base.data))
                  .enter();

  obj.append("rect")
     .attr("x", function(data,idx){
     	  return base.xScale(data.dx) * idx + base.trbl.left;
      })
     .attr("y", function(data, idx){
     	  return base.yScale(data.y) + base.trbl.top;
     })
     .attr("width",function(data,idx){
     	  return base.xScale(data.dx) -2;
     })
     .attr("height",function(data,idx){
     	return base.graphHeight - base.yScale(data.y);
     })
     .style("fill",function(data,idx){
     	return base.color(idx);
     });
}