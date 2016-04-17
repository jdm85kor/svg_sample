window.onload = function(){
    defineData();
    var object = createSVG();
    setBaseValue(object);
    drawYaxis(object);
    drawXaxis(object);
    drawPie(object);
    setBaseValue(obecjt);
    showLegent(object);
};

function defineData(){
    window.base = {};
    base.data = [100,300,500,700,600,400];
    
};

function createSVG(){
    return d3.select(document.body)
                .append('svg')
                .attr('id', 'idsvg');
};

function setBaseValue(object){
    base.trbl = {top: 20, bottom: 20};
    base.svgWidth = parseInt(object.style('width'));
    base.svgHeight = parseInt(object.style('height'));
    base.graphHeight = base.svgHeight - base.trbl.top - base.trbl.bottom;
    

    base.centerX = (base.svgWidth - 150 ) / 2;
    base.centerY = base.graphHeight / 2 + base.trbl.top;
};


function drawYaxis(object){
    base.yAxis = d3.svg.axis()
                        .scale(base.yScale)
                        .orient("left");

    object.append("g")
            .attr("transform", "translate(" + 0 + "," + 
                                                      base.trbl.top + ")")
            .append("g")
            .attr("class", "axis")
            .call(base.yAxis);
};

function drawXaxis(object){
    base.xAxis = d3.svg.axis()
                         .scale(base.xScale)
                         .orient("bottom");

    object.append("g")
            .attr("transform", "translate(" + base.trbl.top + "," + 
                                    (base.svgHeight - base.trbl.bottom) + ")")
            .attr("class", "axis")
            .call(base.xAxis);
};


function drawPie(object){
	var pie = d3.layout.pie()
	                   .sort(null);
	var arc = d3.svg.arc()
	           .innerRadius(60)
	           .outerRadius( base.graphHeight / 2 );

  var obj = object.selectAll('g')
                  .data(pie(base.data))
                  .enter()
                  .append('g')
                  .attr("transform","translate(" + base.centerX +"," + base.centerY + ")");

  obj.append('path')
     .attr("class","pie")
     .attr("d",arc)
     .style("fill",function(data,idx){
		                  return base.color(idx);
		                }
     );
     obj.append("text")
        .attr("transform",function(data){
        	return "translate(" + arc.centroid(data) + ")";
        })
        .attr("text-anchor","middle")
        .text(function(data) {
        	return data.value;
         });
};

function showTotal(object){
	object.append('g')
	      .attr("transform","translate(" + base.centerX +"," + base.centerY +")")
	      .append("text")
	      .attr({"font-size":20, y:10, "text-anchor": "middle"})
	      .text("합계: " + d3.sum(base.data));
};

function setBaseValue(object){
	base.color = d3.scale.category10();
};

function showLegent(object){
	base.legent = ["노트북", "PC","스마트폰","마우스","키보드","HDD"];

	var xcoord = base.svgWidth - 130,
	    ycoord = 100;

	var obj = object.append('g')
	                .selectAll('g')
	                .data(base.legent)
	                .enter()
	                .append('g');
	obj.append('rect')
	   .attr( {x: xcoord, width: 20, height: 20} )
	   .attr("y",function(data,idx){
	   	 return ycoord + (30*idx);
	   })
	   .style("fill",function(data,idx){
	   	  return base.color(idx);
	   });
	obj.append('text')
	   .attr("x",function(data,idx){
	   	return xcoord + 30;
	   })
	   .attr("y",function(data,idx){
	   	 return ycoord + ( 30 * idx) +15;
	   })
	   .text(function(data,idx){
	   	return base.legend[idx];
	   });
};

