function load_scene_cylinder(data) {

    d3.select("#main_chart").selectAll('g').remove();
    let chart = d3.select('#main_chart')
        .append('g')
        .attr("transform","translate(50,50)");


    chart.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr("cx", (d,i) =>xScale(d.AverageCityMPG))
        .attr("cy", (d,i) => yScale(d.AverageHighwayMPG))
        .attr("r", (d,i) => 2 + + d.EngineCylinders)
        .style("fill", (d,i) => colorScale(d.Make) )
        .on('mouseover', function(d,i) {
            d3.select(this)
                .attr("r", (d,i) => 18)
                .style('opacity', 1.0)
                .style("cursor", "pointer");

            tooltip.style("opacity", 1)
            tooltip.html(d.Make + " " + d.EngineCylinders + " cylinders")
                .style("left",(d3.event.pageX)+"px")
                .style("top",(d3.event.pageY-30)+"px");

        })
        .on("mouseout", function(d) {
            d3.select(this)
                .attr("r", (d,i) => 6)
                .style('opacity', 0.5)
                .style("cursor", "default");


            tooltip.style("opacity", 0);
        })
        .on("click", function(d) {
            current_scene = SCENE_FUEL;
            load_scenes();
        });


            //add axis
    d3.select('#main_chart')
        .append('g')
        .attr("transform","translate(50,50)")
        .call(d3.axisLeft(yScale)
            .tickValues([10,20,50,100])
            .tickFormat(d3.format("~s"))
        );

    d3.select('#main_chart')
        .append('g')
        .attr("transform","translate(50,650)")
        .call(d3.axisBottom(xScale)
            .tickValues([10,20,50,100])
            .tickFormat(d3.format("~s"))
        );

    load_annotations_cylinders(data);
    load_legends(data);
    load_filter(data);
    load_specific_filter(data);
}

function load_specific_filter(data) {

    //default
//    d3.select("#dropdown_cylinders").select('select').remove();
//     d3.select("#dropdown_cylinders").append('select')
//         .attr("id", "dropdown_cylinders_sel")
//         .append('option')
//         .attr('value','all')
//         .attr('selected', 'selected')
//         .text("All cylinder types");

    document.getElementById("dropdown_cylinders_sel").style.visibility = "visible";

    let cylinders = d3.map(data, function(d){return d.EngineCylinders;}).keys();

    let l = d3.select("#dropdown_cylinders").select('select').selectAll('option')
        .data(cylinders)
        .enter()
        .append('option')
        .attr('value', (d,i) => d)
        .text((d,i) => d === "0" ? d +  " cylinders (electric)" : d +  " cylinders");

}

function load_annotations_cylinders(data) {
    let auto_count = data.length;
    let cylinders = d3.nest()
        .key(function(d){ return d.EngineCylinders; })
        .sortKeys((a, b) => parseInt(a) > parseInt(b))
        .rollup(function(v){
            return {avgHighway: d3.mean(v, function(dd){return dd.AverageHighwayMPG; }),
                    avgCity: d3.mean(v, function(dd){return dd.AverageCityMPG; })
            }
        })
        .entries(data);

    let title_node=`<div><h5>Consumption per Cylinders</h5></div>`;


    document.getElementById("chart_annotation").innerHTML="";
    document.getElementById("chart_annotation").innerHTML+=title_node;

    cylinders.forEach(function(d){
        let content = d.key + " cylinders" + " Average Highway MPG: " + Math.floor(d.value.avgHighway);
        let cylinders = d.key + " cylinders";
        let highway = "Average Highway MPG: " + Math.floor(d.value.avgHighway);
        let city = "Average City MPG: " + Math.floor(d.value.avgCity);

        let text = `<div style="display: flex;flex-direction:row; justify-content:space-evenly;"><span style="margin-right: 100px">${cylinders}</span><span>${highway}</span><span>${city}</span></div>`;
        document.getElementById("chart_annotation").innerHTML+=text;
    });

    // d3.select("#chart_annotation").select('div')
    //     .data(cylinders)
    //     .enter()
    //     .append('div')
    //     .text((d,i) => d.key + " cylinders" + " Average Highway MPG: " + Math.floor(d.value.avgHighway));

}
