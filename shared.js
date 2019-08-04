const SCENE_MARKET = "market_overview";
const SCENE_ENGINE = "engine_consumption";
const SCENE_FUEL = "fuel_consumption";

let xScale = d3.scaleLog()
    .domain([10,150])
    .range([0,600]);

let yScale = d3.scaleLog()
    .domain([10,150])
    .range([600,0]);

// let chart = d3.select('#main_chart')
//     .append('g')
//     .attr("transform","translate(50,50)");

let tooltip = d3.select("body").append("div")
    .attr("id", "tooltip")
    .style("opacity", 0);

let colorScale = d3.scaleOrdinal()
    .domain(["Acura","Alfa Romeo","Aston Martin","Audi","Bentley","BMW","Buick","Cadillac","Chevrolet","Chrysler","Dodge"
        ,"Ferrari","Fiat","Ford","Genesis","GMC","Honda","Hyundai","Infiniti","Jaguar","Jeep","Kia","Lamborghini"
        ,"Land Rover","Lexus","Lincoln","Lotus","Maserati","Mazda","McLaren Automotive","Mercedes-Benz","MINI"
        ,"Mitsubishi","Nissan","Porsche","Ram","Rolls-Royce","Roush Performance","smart","Subaru","Tesla","Toyota"
        ,"Volkswagen","Volvo"])

    .range(["#a6cee3","#1f78b4","#b2df8a","#33a02c","#fb9a99","#e31a1c","#fdbf6f","#ff7f00","#cab2d6","#6a3d9a","#ffff99"
        ,"#b15928","#8dd3c7","#ffffb3","#bebada","#fb8072","#80b1d3","#fdb462","#b3de69","#fccde5","#d9d9d9","#bc80bd","#ccebc5"
        ,"#ffed6f","#543005","#8c510a","#bf812d","#dfc27d","#f6e8c3","#f5f5f5","#c7eae5","#80cdc1"
        ,"#35978f","#01665e","#003c30","#8e0152","#c51b7d","#de77ae","#f1b6da","#fde0ef","#b8e186","#7fbc41"
        ,"#4d9221","#276419"]);

function load_filter(data) {

    let categories = d3.map(data, function(d){return d.Make;}).keys();

    let l = d3.select("#dropdown_makes").select('select').selectAll('option')
        .data(categories)
        .enter()
        .append('option')
        .attr('value', (d,i) => d.toLowerCase())
        .text((d,i) => d);
}



function load_scenes() {

    if(current_scene === SCENE_MARKET) {
        document.getElementById("btn-overview").className += " active";
        let newCN = document.getElementById("btn-engine").className.replace("btn-sm active", "btn-sm");
        document.getElementById("btn-engine").className = newCN;
        document.getElementById("btn-fuel").className = newCN;

        if($("#dropdown_makes_sel").val() === "all") {
            load_scene_market(csv_data);
        }else{
            let filtered = csv_data.filter((d,i) => d.Make.toLowerCase() === $("#dropdown_makes_sel").val())
            load_scene_market(filtered);
        }
    }

    if(current_scene === SCENE_ENGINE) {
        document.getElementById("btn-engine").className += " active";
        let newCN = document.getElementById("btn-engine").className.replace("btn-sm active", "btn-sm");
        document.getElementById("btn-overview").className = newCN;
        document.getElementById("btn-fuel").className = newCN;

        if($("#dropdown_makes_sel").val() === "all" && $("#dropdown_cylinders_sel").val() === "all") {
            load_scene_cylinder(csv_data);
        }else if($("#dropdown_makes_sel").val() !== "all" && $("#dropdown_cylinders_sel").val() === "all") {
            let filtered = csv_data.filter((d,i) => d.Make.toLowerCase() === $("#dropdown_makes_sel").val())
            load_scene_cylinder(filtered);
        }else if($("#dropdown_makes_sel").val() === "all" && $("#dropdown_cylinders_sel").val() !== "all") {
            let filtered = csv_data.filter((d,i) => d.EngineCylinders === $("#dropdown_cylinders_sel").val())
            load_scene_cylinder(filtered);
        }else {
            let filtered = csv_data.filter((d,i) => d.EngineCylinders === $("#dropdown_cylinders_sel").val() && d.Make.toLowerCase() === $("#dropdown_makes_sel").val());
            load_scene_cylinder(filtered);
        }
    }

    if(current_scene === SCENE_FUEL){
        document.getElementById("btn-fuel").className += " active";
        let newCN = document.getElementById("btn-engine").className.replace("btn-sm active", "btn-sm");

        document.getElementById("btn-overview").className = newCN;
        document.getElementById("btn-engine").className = newCN;

        if($("#dropdown_makes_sel").val() === "all") {
            load_scene_fuel(csv_data);
        }else{
            let filtered = csv_data.filter((d,i) => d.Make.toLowerCase() === $("#dropdown_makes_sel").val())
            load_scene_fuel(filtered);
        }
    }
}

$("#dropdown_makes_sel").change(function(){
    load_scenes()
});

$("#dropdown_cylinders_sel").change(function(){
    load_scenes()
});