window.onload = function(){
    defineData();
    var object = createSVG();
    setBaseValue(object);
    drawYaxis(object);
    drawXaxis(object);
    // drawBar(object);
     // line gragh
     drawLine(object); 
    
     // line 색 채우기
    // drawArea(object);
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
};

function setBaseValue(object){
    base.maxAmount = 1000;
    base.trbl = {top: 20, right: 20, bottom: 30, left: 50};
    base.svgWidth = parseInt(object.style('width'));
    base.graphWidth = base.svgWidth - base.trbl.left - base.trbl.right;
    base.svgHeight = parseInt(object.style('height')),
    base.graphHeight = base.svgHeight - base.trbl.top - base.trbl.bottom;
};

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
};

function drawXaxis(object){
    base.xScale = d3.scale.ordinal()
                         .domain(base.data.map(function(obj){return obj.mon}))
                         .rangeRoundBands([0, base.graphWidth], .4);

    base.xAxis = d3.svg.axis()
                            .scale(base.xScale)
                            .orient("bottom");

    object.append("g")
            .attr("transform", "translate(" + base.trbl.left + "," + 
                                    (base.svgHeight - base.trbl.bottom) + ")")
            .attr("class", "axis")
            .call(base.xAxis)
};

function drawBar(object){
    var obj = object.append('g')
        .attr("transform", "translate(" + base.trbl.left + ", " + base.trbl.top  + ")")
        .selectAll('g')
        .data(base.data)
        .enter()
        .append('g');

    var xAxisList = [];
     obj.append('rect')
        .attr("class", "bar")
        .attr("x", function(obj){
            var coord = base.xScale(obj.mon);
            xAxisList.push(coord);
            return coord;
        })
        .attr("width", base.xScale.rangeBand())
        .attr("y", function(obj){
            return base.yScale(obj.amt);
        })
        .attr("height", function(obj){
            return base.graphHeight - base.yScale(obj.amt);
        });

    //--------------------------
    obj.append("text")
        .attr("class", "datatext")
        .attr("x", function(obj, index){
            return xAxisList[index] + (base.xScale.rangeBand() / 2);
        })   
        .attr("y", base.graphHeight)
        .text(function(obj) {
            return obj.amt;
        });
};

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
        .attr("transform","translate("+ base.trbl.left + "," + base.trbl.top + ")")
        .append("path")
        .attr("d",line(base.data));
};

function drawArea(object){
  var obj = d3.svg.line()
    .x(function(data,idx){
        return base.xScale(data.mon);
    })
    .y0(base.graghHeight)
    .y1(function(data,idx){
        return base.yScale(data.amt);
    });
  object.append('g')
    .attr("class","area")
    .attr("transform","translate("+base.trbl.left + ","+ base.trbl.top + ")")
    .append("path")
    .attr("d",area(base.data));
};

// histogram

