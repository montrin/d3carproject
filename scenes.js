let csv_data = '';
let current_scene="market_overview";

async function init(scene){
    var data = await d3.csv('https://flunky.github.io/cars2017.csv');
    csv_data = data;
    current_scene = scene;

    load_scenes();
}