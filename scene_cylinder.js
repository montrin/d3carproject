function load_scene_cylinder(data) {
    chart.selectAll('circle').remove();

    chart.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr("cx", (d,i) =>xScale(d.AverageCityMPG))
        .attr("cy", (d,i) => yScale(d.AverageHighwayMPG))
        .attr("r", (d,i) => 2 + + d.EngineCylinders)
        .style("fill", (d,i) => colorScale(d.Make) )
        .on('mouseover', function(d,i) {
            tooltip.style("opacity", 1)
            tooltip.html(d.Make + " " + d.AverageCityMPG + " CityMPG " + d.AverageHighwayMPG + " HighwayMPG")
                .style("left",(d3.event.pageX)+"px")
                .style("top",(d3.event.pageY-20)+"px");

        })
        .on("mouseout", function(d) {
            tooltip.style("opacity", 0);
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
    load_labels(data);
    load_filter(data);
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
    console.log(cylinders.toString());
    // let text_auto = document.createTextNode(auto_count + " Automobiles2");
    // let text_makes = document.createTextNode(makes_count.length + " Makes2");

    let title_node=`<div class="row"><h4>Consumption per Cylinders</h4></div>`;

    // let auto_node=`<div class="row">${auto_count} Automobiles</div>`;
    // let make_node=`<div class="row">${makes_count.length} Car makes</div>`;

    document.getElementById("chart_annotation").innerHTML="";
    document.getElementById("chart_annotation").innerHTML+=title_node;
    // document.getElementById("chart_annotation").innerHTML+=auto_node;
    // document.getElementById("chart_annotation").innerHTML+=make_node;

}
