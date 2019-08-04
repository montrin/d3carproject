function load_scene_fuel(data) {

    // chart.selectAll('circle').remove();
    // chart.selectAll('path').remove();
    d3.select("#main_chart").selectAll('g').remove();
    let chart = d3.select('#main_chart')
        .append('g')
        .attr("transform","translate(50,50)");

    d3.select("#car-labels-svg").selectAll('g').remove();

    let xScale = d3.scaleLinear()
        .domain([10,60])
        .range([0,600]);

    let yScale = d3.scaleLinear()
        .domain([10,60])
        .range([600,0]);

    let filtered = data.filter((d,i) => d.Fuel.toLowerCase() === "gasoline" || d.Fuel.toLowerCase() === "diesel");

    chart.selectAll("path")
        .data(filtered)
        .enter().append("path")
        .attr("class", "point")
        .attr("d", d3.symbol().type(function(d){
            if(d.Fuel.toLowerCase() === "gasoline") {
                return d3.symbolTriangle;
            }else {
                return d3.symbolSquare;
            }
        }))
        .style("fill", (d,i) => d.Fuel.toLowerCase() === "gasoline" ? 'blue' : 'orange' )
        .attr("transform", function(d) { return "translate(" + xScale(d.AverageCityMPG) + "," + yScale(d.AverageHighwayMPG) + ")"; });

    //add axis
    d3.select('#main_chart')
        .append('g')
        .attr("transform","translate(50,50)")
        .call(d3.axisLeft(yScale)
            // .tickValues([10,20,50])
            .tickFormat(d3.format("~s"))
        );

    d3.select('#main_chart')
        .append('g')
        .attr("transform","translate(50,650)")
        .call(d3.axisBottom(xScale)
            // .tickValues([10,20,50])
            .tickFormat(d3.format("~s"))
        );



}