window.onload=function()
{
  defineData();
  var object = createSVG();
  setBaseValue(object);
	showColor(object);
}


function defineData(){
	window.base={};
	base.data = {
		name: "전국",
		chileren: [
		  {
		  	name: "서울",
		  	chileren:[
		  	{name:"중구",value:150},
		  	{name:"중구",value:150},
		  	{name:"중구",value:150},
		  	{name:"중구",value:150}
		    ]
      },
      {
        name: " 부산",
         chileren:[
         {name:"사상구",value:250},
         {name:"사상구",value:250},
         {name:"사상구",value:250}
         ]
		  }
    ]
	};
};
function createSVG(){
  return d3.select(document.body)
                .append('svg')
                .attr('id', 'idsvg');
}

function setBaseValue(object){
  base.trbl = {top: 20, right: 20, bottom: 30, left: 50};
  base.svgWidth = parseInt(object.style('width'));
  base.svgHeight = parseInt(object.style('height'));
  base.graphHeight = base.svgHeight - base.trbl.top - base.trbl.bottom;
  base.graphWidth = base.svgWidth - base.trbl.left - base.trbl.right;
}

function showColor(object){
	base.color = d3.scale.category20();
  var treemap = d3.layout
                  .treemap()
                  .size([base.graphWidth,base.graphHeight]);
  var obj = object.append("g")
                  .selectAll("rect")
                  .data(treemap.nodes(base.data));

  obj.enter()
     .append("rect")
     .attr("x",function(data,idx){
       return data.x;
      })
     .attr("y",function(data,idx){
       return data.y;
      })
     .attr("width",function(data,idx){
       return data.dx;
      })
     .attr("height",function(data,idx){
       return data.dy;
      })
     .style("fill",function(data,idx){
       return base.color(idx);
      });

   obj.enter()
      .append("text")
      .attr("transform",function(data,idx){
        return "translate(" + (data.x +data.dx / 2) + "," +
                              (data.y + data.dy / 2) + ")";
      })
      .text(function(data,idx){
        if((data.depth ==0) || data.children){
          return null;
        }
        return data.name;
      })
      .style("text-anchor","middle");
}
