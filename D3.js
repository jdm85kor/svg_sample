.on("mouseover",function(event){
	d3.select(this)
	  .classed("mouseColor",true);
})

.on("mouseout",function(event){
	d3.select(this)
	  .classed("mouseColor",false);
})


// .append('rect') 끝에 넣어주면 된다.



// 그라데이션을 표현
// 앞의 <style>과 같음

var stopColor = {begin: "#ccffff", end:"#1D77EF"};

var grident = object.append("defs")
                    .append("linearGradient")
                    .attr("id","gradient")
                    .attr("x1","0%")
                    .attr("y1","0%")
                    .attr("x2","100%")
                    .attr("y2","100%");

grident.append("stop")
       .attr("offset","0%")
       .attr("stop-color",stopColor.begin);
grident.append("stop")
       .attr("offset","100%")
       .attr("stop-color",stopColor.end);

.on("mouseover",function(event){
	   d3.select(this)
	     .classed("mouseColor",true)
	     .style("fill","");
})
.on("mouseout",function(event){
	d3.select(this)
	  .classed("mouseColor",false)
	  .style("fill","url(#gradient)");

})
// add style() 
.style("fill","url(#gradient)")




// line

// <style> 안에 추가
.line {
  fill: none; stroke: blue;
  stroke-width: 2;
}



function drawLine(object){
	var obj = d3.svg.line()
	                .x(function(data,idx){
	                	return base.xScale(data.mon);
	                })
	                .y(function(data,idx){
	                	return base.yScale(data.amt);
	                });
  object.append('g')
        .attr("class","line")
        .attr("transform","translate("+base.trbl.left + ","+ base.trbl.top + ")")
        .append("path")
        .attr("d",obj(base.data));
}



////////////////////////////////////////////////////////////

function drawYaxis(object){
    base.yScale = d3.scale.linear()
                        .domain([0, base.maxAmount])
                        .range([base.graphHeight, 0]);

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
    base.xScale = d3.scale.ordinal()
                         .domain([0,500])
                         .rangeRoundBands([0, base.graphWidth]);

    base.xAxis = d3.svg.axis()
                            .scale(base.xScale)
                            .orient("bottom");

    object.append("g")
            .attr("transform", "translate(" + base.trbl.left + "," + 
                                    (base.svgHeight - base.trbl.bottom) + ")")
            .attr("class", "axis")
            .call(base.xAxis)
}

function drawScatter(object){
  base.color = d3.scale.category20();
  var obj = object.append("g")
                  .selectAll("circle")
                  .data(base.data)
                  .enter();
  obj.append("circle")
     .attr("cx",function(data){
        return data[0] + base.trbl.left;
      })
     .attr("cy",function(data){
      return base.graghhegith - data[1] + base.trlb.top;
    })
     .attr("r",10)
     .style("fill",function(data,idx){
      return base.color(idx);
    })
}

function drawGrid(object){
  var rangeX = d3.range(0,500,50);
  var rangeY = d3.range(0,300,50);

  object.append("g")
        .selectAll(".gridx");
        .data(rangeX)
        .enter()
        .append("line");
        .attr("class","gridx")
        .attr("x1",function(data,idx){
          return data + base.trbl.left + 50;
        })
        .attr('y1',base.trbl.top)
        .attr('y2',base.graghHeight + base.trbl.top);

  object.append("g")
        .selectAll('gridy')
        .data(rangeY)
        .enter()
        .append("line")
        .attr('class','gridy')
        .attr('x1',base.trbl.left)
        .attr('y1',funtion(data,idx){
          return data + base.trbl.top + 50;
        })
        .attr('x2',base.graghWidth + base.trbl.left)
        .attr('y2',function(data,idx){
          return data + base.trbl.top;
        })
}
















