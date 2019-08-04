



function set_legend_pos_grp(labelg,grp, cx, cy) {

    labelg
        .selectAll('circle')
        .data(grp)
        .enter()
        .append('circle')
        .attr('cx', (d,i) => cx)
        .attr('cy', (d,i) => i * cy)
        .attr('r', 4)
        .style('fill', (d,i) => colorScale(d));

    labelg
        .selectAll('text')
        .data(grp)
        .enter()
        .append('text')
        .attr('x', (d,i) => cx + 5)
        .attr('y', (d,i) => i * cy )
        .text((d,i) => d)
        .style("font-size", "11px")
        .attr("alignment-baseline","middle");

}
function load_labels(data) {
    let categories = d3.map(data, function(d){return d.Make;}).keys();

    let cat_grp1 = categories.slice(0,10);
    let cat_grp2 = categories.slice(10,20);
    let cat_grp3 = categories.slice(20,30);
    let cat_grp4 = categories.slice(30,40);
    let cat_grp5 = categories.slice(40,50);

    d3.select("#car-labels-svg").selectAll('g').remove();

    let labelg1 = d3.select("#car-labels-svg").append('g')
        .attr("transform","translate(50,50)");

    let labelg2 = d3.select("#car-labels-svg").append('g')
        .attr("transform","translate(100,50)");

    let labelg3 = d3.select("#car-labels-svg").append('g')
        .attr("transform","translate(150,50)");

    let labelg4 = d3.select("#car-labels-svg").append('g')
        .attr("transform","translate(200,50)");

    let labelg5 = d3.select("#car-labels-svg").append('g')
        .attr("transform","translate(250,50)");

    set_legend_pos_grp(labelg1, cat_grp1, 60, 15);
    set_legend_pos_grp(labelg2, cat_grp2, 140, 15);
    set_legend_pos_grp(labelg3, cat_grp3, 200, 15);
    set_legend_pos_grp(labelg4, cat_grp4, 280, 15);
    set_legend_pos_grp(labelg5, cat_grp5, 320, 15);
}

function load_annotations(data) {
    let auto_count = data.length;
    let makes_count = d3.nest()
        .key(function(d){ return d.Make; })
        .rollup(function(v){return v.length})
        .entries(data);

    let text_auto = document.createTextNode(auto_count + " Automobiles");
    let text_makes = document.createTextNode(makes_count.length + " Makes");

    let title_node=`<div class="row"><h4>Market Landscape</h4></div>`;

    let auto_node=`<div class="row">${auto_count} Automobiles</div>`;
    let make_node=`<div class="row">${makes_count.length} Car makes</div>`;

    document.getElementById("chart_annotation").innerHTML="";
    document.getElementById("chart_annotation").innerHTML+=title_node;
    document.getElementById("chart_annotation").innerHTML+=auto_node;
    document.getElementById("chart_annotation").innerHTML+=make_node;

}

function load_scene_market(data){
    //set filters for other scenes hidden
    document.getElementById("dropdown_cylinders_sel").style.visibility = "hidden";

    // chart.selectAll('circle').remove();
    // chart.selectAll('path').remove();
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
        .attr("r", (d,i) => 6)
        .style("fill", (d,i) => colorScale(d.Make) )
        .style("opacity", 0.5)
        .style("pointer-events","visible")
        .style("stroke", (d,i) => colorScale(d.Make) )
        .on('mouseover', function(d,i) {
            d3.select(this)
                .attr("r", (d,i) => 8)
                .style('opacity', 1.0)
                .style("cursor", "pointer");

            tooltip.style("opacity", 1)
            tooltip.html(d.Make + " " + d.AverageCityMPG + " CityMPG " + d.AverageHighwayMPG + " HighwayMPG")
                .style("left",(d3.event.pageX)+"px")
                .style("top",(d3.event.pageY-20)+"px");

        })
        .on("mouseout", function(d) {
            d3.select(this)
                .attr("r", (d,i) => 6)
                .style('opacity', 0.5)
                .style("cursor", "default");

            tooltip.style("opacity", 0);
        })
        .on("click", function(d) {
            current_scene = SCENE_ENGINE;
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

    load_annotations(data);
    load_labels(data);
    load_filter(data);
}


