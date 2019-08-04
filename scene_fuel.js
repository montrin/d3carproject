function load_specific_filter_fuel(data) {

    document.getElementById("dropdown_fuel_sel").style.visibility = "visible";
}

function load_annotations_fuel(data) {
    let auto_count = data.length;
    let types_fuel = d3.nest()
        .key(function (d) {
            return d.Fuel;
        })
        .rollup(function (v) {
            return v.length;
        })
        .entries(data);

    let title_node = `<div><h5>Fuel Type Distribution </h5></div>`;

    document.getElementById("chart_annotation").innerHTML = "";
    document.getElementById("chart_annotation").innerHTML += title_node;

    types_fuel.forEach(function (d) {
        let fuel_t = d.key + ": ";
        let fuel_count = d.value + " cars";

        let text = `<div style="display: flex;flex-direction:row;"><span style="width: 100px">${fuel_t}</span><span>${fuel_count}</span></div>`;
        document.getElementById("chart_annotation").innerHTML += text;
    });
}

function load_scene_fuel(data) {
    document.getElementById("dropdown_cylinders_sel").style.visibility = "hidden";

    d3.select("#main_chart").selectAll('g').remove();
    let chart = d3.select('#main_chart')
        .append('g')
        .attr("transform","translate(50,50)");

    d3.select("#car-labels-svg").selectAll('g').remove();

    chart.selectAll("path")
        .data(data)
        .enter().append("path")
        .attr("class", "point")
        .attr("d", d3.symbol().type(function(d){

            if(d.Fuel.toLowerCase() === "gasoline") {
                return d3.symbolTriangle;
            }else if(d.Fuel.toLowerCase() === "diesel"){
                return d3.symbolSquare;
            }else{
                return d3.symbolDiamond;
            }
        }))
        .style("fill", (d,i) => colorScale(d.Make) )
        .attr("transform", function(d) { return "translate(" + xScale(d.AverageCityMPG) + "," + yScale(d.AverageHighwayMPG) + ")"; })
        .style('opacity', 0.5)
        .on('mouseover', function(d,i) {
            d3.select(this)
                .style('opacity', 1.0)
                .style("cursor", "pointer");

            tooltip.style("opacity", 1)
            tooltip.html(d.Make)
                .style("left",(d3.event.pageX)+"px")
                .style("top",(d3.event.pageY-30)+"px");

        })
        .on("mouseout", function(d) {
            d3.select(this)
                .style('opacity', 0.5)
                .style("cursor", "default");

            tooltip.style("opacity", 0);
        })
        .on("click", function(d) {
            tooltip.style("opacity", 0);
            current_scene = SCENE_ENGINE;
            load_scenes();
        });


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

    // add y axis label
    chart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 20)
        .attr("x",0 - (700 / 2))
        .style("text-anchor", "middle")
        .style("font-size", "0.8em")
        .text("Average Highway MPG");

    // add x axis label
    chart.append("text")
        .attr("transform",
            "translate(" + (300) + " ," +
            630 + ")")
        .style("text-anchor", "middle")
        .style("font-size", "0.8em")
        .text("Average City MPG");


    load_annotations_fuel(data);
    load_legends(data);
    load_filter(data);
    load_specific_filter_fuel(data);
}