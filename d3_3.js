
window.base = {};
base.data = [
  1,12,14,15,16,16,14,37,47,36,
  1,12,14,15,16,16,14,37,47,36,
  1,12,14,15,16,16,14,37,47,36,
  1,12,14,15,16,16,14,37,47,36,
  1,12,14,15,16,16,14,37,47,36,
  1,12,14,15,16,16,14,37,47,36,
  1,12,14,15,16,16,14,37,47,36,
  1,12,14,15,16,16,14,37,47,36,
  1,12,14,15,16,16,14,37,47,36,
  1,12,14,15,16,16,14,37,47,36
  ]

// 보간법
function showColor(object){
	var rgbColor = d3.interpolateRgb("red","blue");
	base.data = [];

	for(var k = 0; k<1; k+=0.1){
		base.data.push(rgbColor(k));
	}
	var obj = object.append("g")
	                .selectAll("rect")
	                .data(base.data)
	                .enter();

	obj.append("rect")
	.attr("x",function(data,idx){
		return idx & 60;

	})
	.attr("y",base.trbl.top)
	.attr("width",70)
	.attr("fill",function(data){
		var rgb = d3.rgb(data);
		return "rgb("+rgb.r+","+rgb.g+","+rgb.b+")";
	});
}


// 시나리오
