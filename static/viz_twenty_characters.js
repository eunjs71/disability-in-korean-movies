let web_address = "http://127.0.0.1:8000/"
// let web_address = "http://18.181.104.77:8000/"
// let web_address = "https://disability-in-korean-movies.herokuapp.com/"

let tc_svg = d3.select('#twenty_characters')
    .attr('width', 1325)
    .attr('height', 135)

let character_names = ["Seha","Hyejin","Dooyeong","Yeondoo","Jinman","Miso","Dongyeong","Rajin","Ryu","Sooah","Donggu_P","Gwangho","Bohyeon","Injoo","Seongrak","Soonsik","Jeongsoo","Aaeshim","Kibong","Yeongcheol","Jintae","Seokgoo","Chowon","Eunjeong","Sooho","Yonggu","Chulsoo","Ingyu","Jiwoo","Daegeun","Minsoo","Woman-Jung","Jooyeong","Yuri","Myeongjae","Kyungwoo","Gongjoo","Donggu_H"]

let positions = []

for(let i=0; i<38; i++){
    let row = parseInt(i/19)
    let col = i%19
    let x = 70 * col
    let y = 70 * row
    let cx = x + 27.5
    let cy = y + 27.5
    let chr_name = character_names[i]
    positions.push( {"x": x, "y": y , "i": i, "cx":cx, "cy":cy, "chr_name": chr_name})
}

let tc_vg = tc_svg
    .append('g')
    .attr("transform", function(d){ return "translate(5, 5)" })

let tc_g = tc_vg.selectAll("g")
    .data(positions)
    .enter()
    .append("g")
    .attr("transform", function(d){ return "translate(" + d.x + "," + d.y + ")" })
    
let tc_clipPath = tc_g.append("clipPath")
    .attr("id", function(d){return "clipObj" + d.i})

let tc_circles = tc_clipPath.append("circle")
    .attr("id", function(d){return "chr_circle_" + d.i})
    .attr("r", 27.5)
    .attr("cx", 27.5)
    .attr("cy", 27.5)
    
    
    // .attr("cx", function(d){return d.cx})
    // .attr("cy", function(d){return d.cy})
    
let tc_images = tc_g.append("image")
    .attr('xlink:href', function(d){ return web_address + 'images/characters/' + d.chr_name + '.png' } )
    .attr("height", 55)
    .attr("width", 55)
    .attr("clip-path", function(d){ return "url(#clipObj" + d.i + ")"})
    .on("mouseover", function(d, i){
        console.log("mouseover_img")
        d3.select(this).attr("height", 60)
        .attr("width", 60)
        .attr("transform", function(d){ return "translate(-2.5, -2.5)" })
        d3.select("#chr_circle_" + i.i)
        .attr("r", 30)
        .attr("cx", 30)
        .attr("cy", 30)
    })
    .on("mouseout", function(d, i){
        d3.select(this).attr("height", 55)
        .attr("width", 55)
        .attr("transform", function(d){ return "translate(0,0)" })
        d3.select("#chr_circle_" + i.i)
        .attr("r", 27.5)
        .attr("cx", 27.5)
        .attr("cy", 27.5)
    })
    


// let circle = svg.selectAll("circle")
//     .data(positions)
//     .enter()
//     .append("circle")
//     .attr("r", 55)
//     .attr("transform", function(d){ return "translate(" + d.x + "," + d.y + ")" })
    
    


// let nodes = svg.selectAll("g.node")
//     .data(positions)
    
// let nodeEnter = nodes.enter().append("svg:g")
//     .attr("class", "node")
//     .style("fill", "#000");

// let images = nodeEnter.append("svg:image")
//     .attr('xlink:href', 'http://18.181.104.77:8000/images/pikachu.png')
//     .attr("x", function(d) { return d.x;})
//     .attr("y", function(d) { return d.y;})
//     .attr("height", 55)
//     .attr("width", 55);
