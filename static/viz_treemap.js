function draw_treemap_svg(){
    var margin = {top: 200, right: 1, bottom: 1, left: 1},
        width = 535,// - margin.left - margin.right,
        height = 515;// - margin.top - margin.bottom;    
    
    // assign colors
    var color = d3.scaleOrdinal()
                    .domain(["Physical Disability", "Visual Impairment", "Hearing Impairment", "Brain Lesions", "Intellectual Disability", "Autism", 
                        "Language Disorder"])
                    .range([ "#9ECBE9", "#F2CF5A", "#84BCB6", "#4C78A9" , "#FF9D98", "#8AD279", "#D5A5C9"])
    
    // set tooltip
    var div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .attr("id", "treetooltip")
                .style("opacity", 0)
                .style("width", "140")
                .style("height", "110")
                .style("padding-left", "4px")
                .style("padding-right", "4px")
                .style("padding-top", "4px")
                .style("padding-bottom", "4px")
                .style("background", "#F3F3F3");
        
    
    // append the svg object to the body of the page
    var svg1 = d3.select("#happiness")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                "translate(" + margin.left + "," + margin.bottom + ")"); 
    
    // import and organize data
    var dataset = d3.csv("/csv/disabled_characters.csv")
                    .then(function(data) {
                        // console.log(data);
    
    var root = d3.stratify()
                .id(function(d) { return d.eng_name; })
                .parentId(function(d) { return d.d_type; })
                (data)
                .sum(function(d) { return +d.happiness })
                .sort(function(a, b) { return d3.descending(a.value, b.value )});
    
    
    // create treemap
    const treemap = d3.treemap()
                        .size([width, height])
                        .padding(2);
    
    const nodes = treemap(root
        .sum(function(d) { return +d.happiness }));
    
    svg1.selectAll("rect")
        .data(root.leaves())
        .enter()
        .append("rect")
            .attr("id", "rectangle")
            .attr('x', function (d) { return d.x0; })
            .attr('y', function (d) { return d.y0; })
            .attr('width', function (d) { return d.x1 - d.x0; })
            .attr('height', function (d) { return d.y1 - d.y0; })
            .style("fill", function(d){ return color(d.data.d_type)} )
            .on("mouseover", function (event,d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(d.data.eng_name + " (" + d.data.movie_name + ")" + "<br/>" + d.data.d_type + "<br/>" + "Happiness Value: " + d.data.happiness)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 5) + "px")
                    .style("font-size", "1.1em");
                })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(600)
                    .style("opacity", 0);
                });
    
    // legend
    var keys1 = ["Physical Disability", "Visual Impairment", "Hearing Impairment", "Brain Lesions"]
    var keys2 = ["Intellectual Disability", "Language Disorder", "Autism"]
    var n = data.length/2;
    var lw1 = 145;
    var lw2 = 175;
    var lh = 1;
    
    var legend = svg1.selectAll("legend")
                    .data(keys1)
                    .enter()
                    .append("g")
                    .attr("transform", function(d,i) 
                    { return "translate(" + i%n * lw1 + "," + Math.floor(i/n) * lh + ")"; })
                    .attr("class","legend");
    
    var rects = legend.append('circle')
        .attr("r", 5)
        .attr("cx", 16)
        .attr("cy", 530)
        .attr("fill", function(d,i) { return color(i); });
    
    var text = legend.append('text')
        .attr("x", 26)
        .attr("y", 534)
        .text(function(d) { return d; })
        .style("fill", "gray")
        .attr("font-size", "10px")
        .style("font-family", "Noto Sans KR");
    
    var legend = svg1.selectAll("legend")
                .data(keys2)
                .enter()
                .append("g")
                .attr("transform", function(d,i) 
                { return "translate(" + i%n * lw2 + "," + Math.floor(i/n) * lh + ")"; })
                .attr("class","legend");
    
    var rects = legend.append('circle')
        .attr("r", 5)
        .attr("cx", 60)
        .attr("cy", 551)
        .attr("fill", function(d,i) { return color(i+4); });
    
    var text = legend.append('text')
        .attr("x", 70)
        .attr("y", 555)
        .text(function(d) { return d; })
        .style("fill", "gray")
        .attr("font-size", "10px")
        .style("font-family", "Noto Sans KR");
    
    });
    
    var svg2 = d3.select("#sadness")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                "translate(" + margin.left + "," + margin.bottom + ")"); 
    
    //import data
    var dataset = d3.csv("/csv/disabled_characters.csv")
                    .then(function(data) {
                        // console.log(data);
    
    var root = d3.stratify()
                .id(function(d) { return d.eng_name; })
                .parentId(function(d) { return d.d_type; })
                (data)
                .sum(function(d) { return +d.sadness })
                .sort(function(a, b) { return d3.descending(a.value, b.value )});
    
    // create treemap
    const treemap = d3.treemap()
                        .size([width, height])
                        .padding(2);
    
    const nodes = treemap(root
        .sum(function(d) { return +d.sadness }));
    
    svg2.selectAll("rect")
            .data(root.leaves())
            .enter()
            .append("rect")
                .attr('x', function (d) { return d.x0; })
                .attr('y', function (d) { return d.y0; })
                .attr('width', function (d) { return d.x1 - d.x0; })
                .attr('height', function (d) { return d.y1 - d.y0; })
                .style("fill", function(d){ return color(d.data.d_type)} )
                .on("mouseover", function (event,d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(d.data.eng_name + " (" + d.data.movie_name + ")" + "<br/>" + d.data.d_type + "<br/>" + "Sadness Value: " + d.data.sadness)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 5) + "px")
                    .style("font-size", "1.1em");
                })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(600)
                    .style("opacity", 0);
                });
    
    // legend
    var keys1 = ["Physical Disability", "Visual Impairment", "Hearing Impairment", "Brain Lesions"]
    var keys2 = ["Intellectual Disability", "Language Disorder", "Autism"]
    var n = data.length/2;
    var lw1 = 145;
    var lw2 = 175;
    var lh = 1;
    
    var legend = svg2.selectAll("legend")
                    .data(keys1)
                    .enter()
                    .append("g")
                    .attr("transform", function(d,i) 
                    { return "translate(" + i%n * lw1 + "," + Math.floor(i/n) * lh + ")"; })
                    .attr("class","legend");
    
    var rects = legend.append('circle')
        .attr("r", 5)
        .attr("cx", 16)
        .attr("cy", 530)
        .attr("fill", function(d,i) { return color(i); });
    
    var text = legend.append('text')
        .attr("x", 26)
        .attr("y", 534)
        .text(function(d) { return d; })
        .style("fill", "gray")
        .attr("font-size", "10px")
        .style("font-family", "Noto Sans KR");
    
    var legend = svg2.selectAll("legend")
                .data(keys2)
                .enter()
                .append("g")
                .attr("transform", function(d,i) 
                { return "translate(" + i%n * lw2 + "," + Math.floor(i/n) * lh + ")"; })
                .attr("class","legend");
    
    var rects = legend.append('circle')
        .attr("r", 5)
        .attr("cx", 60)
        .attr("cy", 551)
        .attr("fill", function(d,i) { return color(i+4); });
    
    var text = legend.append('text')
        .attr("x", 70)
        .attr("y", 555)
        .text(function(d) { return d; })
        .style("fill", "gray")
        .attr("font-size", "10px")
        .style("font-family", "Noto Sans KR");
    
    
    }); 
    
    var svg3 = d3.select("#fear")
                        .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform",
                        "translate(" + margin.left + "," + margin.bottom + ")"); 
    
    //import data
    var dataset = d3.csv("/csv/disabled_characters.csv")
        .then(function(data) {
            // console.log(data);
    
    var root = d3.stratify()
                .id(function(d) { return d.eng_name; })
                .parentId(function(d) { return d.d_type; })
                (data)
                .sum(function(d) { return +d.fear })
                .sort(function(a, b) { return d3.descending(a.value, b.value )});
    
    // create treemap
    const treemap = d3.treemap()
                        .size([width, height])
                        .padding(2);
    
    const nodes = treemap(root
        .sum(function(d) { return +d.fear }));
    
    svg3.selectAll("rect")
            .data(root.leaves())
            .enter()
            .append("rect")
                .attr('x', function (d) { return d.x0; })
                .attr('y', function (d) { return d.y0; })
                .attr('width', function (d) { return d.x1 - d.x0; })
                .attr('height', function (d) { return d.y1 - d.y0; })
                .style("fill", function(d){ return color(d.data.d_type)} )
                .on("mouseover", function (event,d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html(d.data.eng_name + " (" + d.data.movie_name + ")" + "<br/>" + d.data.d_type + "<br/>" + "Fear Value: " + d.data.fear)
                .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 5) + "px")
                .style("font-size", "1.1em");
            })
        .on("mouseout", function(d) {
            div.transition()
                .duration(600)
                .style("opacity", 0);
            });
    
    // legend
    var keys1 = ["Physical Disability", "Visual Impairment", "Hearing Impairment", "Brain Lesions"]
    var keys2 = ["Intellectual Disability", "Language Disorder", "Autism"]
    var n = data.length/2;
    var lw1 = 145;
    var lw2 = 175;
    var lh = 1;
    
    var legend = svg3.selectAll("legend")
                    .data(keys1)
                    .enter()
                    .append("g")
                    .attr("transform", function(d,i) 
                    { return "translate(" + i%n * lw1 + "," + Math.floor(i/n) * lh + ")"; })
                    .attr("class","legend");
    
    var rects = legend.append('circle')
        .attr("r", 5)
        .attr("cx", 16)
        .attr("cy", 530)
        .attr("fill", function(d,i) { return color(i); });
    
    var text = legend.append('text')
        .attr("x", 26)
        .attr("y", 534)
        .text(function(d) { return d; })
        .style("fill", "gray")
        .attr("font-size", "10px")
        .style("font-family", "Noto Sans KR");
    
    var legend = svg3.selectAll("legend")
                .data(keys2)
                .enter()
                .append("g")
                .attr("transform", function(d,i) 
                { return "translate(" + i%n * lw2 + "," + Math.floor(i/n) * lh + ")"; })
                .attr("class","legend");
    
    var rects = legend.append('circle')
        .attr("r", 5)
        .attr("cx", 60)
        .attr("cy", 551)
        .attr("fill", function(d,i) { return color(i+4); });
    
    var text = legend.append('text')
        .attr("x", 70)
        .attr("y", 555)
        .text(function(d) { return d; })
        .style("fill", "gray")
        .attr("font-size", "10px")
        .style("font-family", "Noto Sans KR");
    
    });
    
    var svg4 = d3.select("#disgust")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform",
                "translate(" + margin.left + "," + margin.bottom + ")"); 
    
    //import data
    var dataset = d3.csv("/csv/disabled_characters.csv")
                    .then(function(data) {
                            // console.log(data);
    
    var root = d3.stratify()
                .id(function(d) { return d.eng_name; })
                .parentId(function(d) { return d.d_type; })
                (data)
                .sum(function(d) { return +d.disgust })
                .sort(function(a, b) { return d3.descending(a.value, b.value )});
    
    // create treemap
    const treemap = d3.treemap()
                        .size([width, height])
                        .padding(2);
    
    const nodes = treemap(root
        .sum(function(d) { return +d.disgust }));
    
    svg4.selectAll("rect")
            .data(root.leaves())
            .enter()
            .append("rect")
                .attr('x', function (d) { return d.x0; })
                .attr('y', function (d) { return d.y0; })
                .attr('width', function (d) { return d.x1 - d.x0; })
                .attr('height', function (d) { return d.y1 - d.y0; })
                .style("fill", function(d){ return color(d.data.d_type)} )
                .on("mouseover", function (event,d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(d.data.eng_name + " (" + d.data.movie_name + ")" + "<br/>" + d.data.d_type + "<br/>" + "Disgust Value: " + d.data.disgust)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 5) + "px")
                    .style("font-size", "1.1em");
                })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(600)
                    .style("opacity", 0);
                });
    
    //legend
    var keys1 = ["Physical Disability", "Visual Impairment", "Hearing Impairment", "Brain Lesions"]
    var keys2 = ["Intellectual Disability", "Language Disorder", "Autism"]
    var n = data.length/2;
    var lw1 = 145;
    var lw2 = 175;
    var lh = 1;
    
    var legend = svg4.selectAll("legend")
                .data(keys1)
                .enter()
                .append("g")
                .attr("transform", function(d,i) 
                { return "translate(" + i%n * lw1 + "," + Math.floor(i/n) * lh + ")"; })
                .attr("class","legend");
    
    var rects = legend.append('circle')
        .attr("r", 5)
        .attr("cx", 16)
        .attr("cy", 530)
        .attr("fill", function(d,i) { return color(i); });
    
    var text = legend.append('text')
        .attr("x", 26)
        .attr("y", 534)
        .text(function(d) { return d; })
        .style("fill", "gray")
        .attr("font-size", "10px")
        .style("font-family", "Noto Sans KR");
    
    var legend = svg4.selectAll("legend")
                .data(keys2)
                .enter()
                .append("g")
                .attr("transform", function(d,i) 
                { return "translate(" + i%n * lw2 + "," + Math.floor(i/n) * lh + ")"; })
                .attr("class","legend");
    
    var rects = legend.append('circle')
        .attr("r", 5)
        .attr("cx", 60)
        .attr("cy", 551)
        .attr("fill", function(d,i) { return color(i+4); });
    
    var text = legend.append('text')
        .attr("x", 70)
        .attr("y", 555)
        .text(function(d) { return d; })
        .style("fill", "gray")
        .attr("font-size", "10px")
        .style("font-family", "Noto Sans KR");
    
    });
    
    var svg5 = d3.select("#surprise")
                        .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform",
                        "translate(" + margin.left + "," + margin.bottom + ")"); 
    
    //import data
    var dataset = d3.csv("/csv/disabled_characters.csv")
        .then(function(data) {
            // console.log(data);
    
    var root = d3.stratify()
                .id(function(d) { return d.eng_name; })
                .parentId(function(d) { return d.d_type; })
                (data)
                .sum(function(d) { return +d.surprise })
                .sort(function(a, b) { return d3.descending(a.value, b.value )});
    
    // create treemap
    const treemap = d3.treemap()
                        .size([width, height])
                        .padding(2);
    
    const nodes = treemap(root
        .sum(function(d) { return +d.surprise }));
    
    
    svg5.selectAll("rect")
            .data(root.leaves())
            .enter()
            .append("rect")
                .attr('x', function (d) { return d.x0; })
                .attr('y', function (d) { return d.y0; })
                .attr('width', function (d) { return d.x1 - d.x0; })
                .attr('height', function (d) { return d.y1 - d.y0; })
                .style("fill", function(d){ return color(d.data.d_type)} )
                .on("mouseover", function (event,d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(d.data.eng_name + " (" + d.data.movie_name + ")" + "<br/>" + d.data.d_type + "<br/>" + "Surprise Value: " + d.data.surprise)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 5) + "px")
                    .style("font-size", "1.1em");
                })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(600)
                    .style("opacity", 0);
                });
    
    // legend
    var keys1 = ["Physical Disability", "Visual Impairment", "Hearing Impairment", "Brain Lesions"]
    var keys2 = ["Intellectual Disability", "Language Disorder", "Autism"]
    var n = data.length/2;
    var lw1 = 145;
    var lw2 = 175;
    var lh = 1;
    
    var legend = svg5.selectAll("legend")
                    .data(keys1)
                    .enter()
                    .append("g")
                    .attr("transform", function(d,i) 
                    { return "translate(" + i%n * lw1 + "," + Math.floor(i/n) * lh + ")"; })
                    .attr("class","legend");
    
    var rects = legend.append('circle')
        .attr("r", 5)
        .attr("cx", 16)
        .attr("cy", 530)
        .attr("fill", function(d,i) { return color(i); });
    
    var text = legend.append('text')
        .attr("x", 26)
        .attr("y", 534)
        .text(function(d) { return d; })
        .style("fill", "gray")
        .attr("font-size", "10px")
        .style("font-family", "Noto Sans KR");
    
    var legend = svg5.selectAll("legend")
                .data(keys2)
                .enter()
                .append("g")
                .attr("transform", function(d,i) 
                { return "translate(" + i%n * lw2 + "," + Math.floor(i/n) * lh + ")"; })
                .attr("class","legend");
    
    var rects = legend.append('circle')
        .attr("r", 5)
        .attr("cx", 60)
        .attr("cy", 551)
        .attr("fill", function(d,i) { return color(i+4); });
    
    var text = legend.append('text')
        .attr("x", 70)
        .attr("y", 555)
        .text(function(d) { return d; })
        .style("fill", "gray")
        .attr("font-size", "10px")
        .style("font-family", "Noto Sans KR");
    
    
    });
    
    var svg6 = d3.select("#anger")
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom)
                    .append("g")
                    .attr("transform",
                    "translate(" + margin.left + "," + margin.bottom + ")"); 
    
    //import data
    var dataset = d3.csv("/csv/disabled_characters.csv")
        .then(function(data) {
            // console.log(data);
    
    
    var root = d3.stratify()
                .id(function(d) { return d.eng_name; })
                .parentId(function(d) { return d.d_type; })
                (data)
                .sum(function(d) { return +d.anger })
                .sort(function(a, b) { return d3.descending(a.value, b.value )});
    
    // create treemap
    const treemap = d3.treemap()
                        .size([width, height])
                        .padding(2);
    
    const nodes = treemap(root
        .sum(function(d) { return +d.anger }));
    
    svg6.selectAll("rect")
            .data(root.leaves())
            .enter()
            .append("rect")
                .attr('x', function (d) { return d.x0; })
                .attr('y', function (d) { return d.y0; })
                .attr('width', function (d) { return d.x1 - d.x0; })
                .attr('height', function (d) { return d.y1 - d.y0; })
                .style("fill", function(d){ return color(d.data.d_type)} )
                .on("mouseover", function (event,d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html(d.data.eng_name + " (" + d.data.movie_name + ")" + "<br/>" + d.data.d_type + "<br/>" + "Anger Value: " + d.data.anger)
                    .style("left", (event.pageX + 10) + "px")
                    .style("top", (event.pageY - 5) + "px")
                    .style("font-size", "1.1em");
                })
            .on("mouseout", function(d) {
                div.transition()
                    .duration(600)
                    .style("opacity", 0);
                });
    
        // legend
        var keys1 = ["Physical Disability", "Visual Impairment", "Hearing Impairment", "Brain Lesions"]
        var keys2 = ["Intellectual Disability", "Language Disorder", "Autism"]
        var n = data.length/2;
        var lw1 = 145;
        var lw2 = 175;
        var lh = 1;
    
        var legend = svg6.selectAll("legend")
                        .data(keys1)
                        .enter()
                        .append("g")
                        .attr("transform", function(d,i) 
                        { return "translate(" + i%n * lw1 + "," + Math.floor(i/n) * lh + ")"; })
                        .attr("class","legend");
    
        var rects = legend.append('circle')
            .attr("r", 5)
            .attr("cx", 16)
            .attr("cy", 530)
            .attr("fill", function(d,i) { return color(i); });
        
        var text = legend.append('text')
            .attr("x", 26)
            .attr("y", 534)
            .text(function(d) { return d; })
            .style("fill", "gray")
            .attr("font-size", "10px")
            .style("font-family", "Noto Sans KR");
    
        var legend = svg6.selectAll("legend")
                    .data(keys2)
                    .enter()
                    .append("g")
                    .attr("transform", function(d,i) 
                    { return "translate(" + i%n * lw2 + "," + Math.floor(i/n) * lh + ")"; })
                    .attr("class","legend");
    
        var rects = legend.append('circle')
            .attr("r", 5)
            .attr("cx", 60)
            .attr("cy", 551)
            .attr("fill", function(d,i) { return color(i+4); });
        
        var text = legend.append('text')
            .attr("x", 70)
            .attr("y", 555)
            .text(function(d) { return d; })
            .style("fill", "gray")
            .attr("font-size", "10px")
            .style("font-family", "Noto Sans KR");
    
        });     
    
        var svg7 = d3.select("#neutral")
                        .append("svg")
                        .attr("width", width + margin.left + margin.right)
                        .attr("height", height + margin.top + margin.bottom)
                        .append("g")
                        .attr("transform",
                        "translate(" + margin.left + "," + margin.bottom + ")"); 
    
        //import data
        var dataset = d3.csv("/csv/disabled_characters.csv")
            .then(function(data) {
                // console.log(data);
    
    
        var root = d3.stratify()
                    .id(function(d) { return d.eng_name; })
                    .parentId(function(d) { return d.d_type; })
                    (data)
                    .sum(function(d) { return +d.neutral })
                    .sort(function(a, b) { return d3.descending(a.value, b.value )});
    
        // create treemap
        const treemap = d3.treemap()
                            .size([width, height])
                            .padding(2);
        
        const nodes = treemap(root
            .sum(function(d) { return +d.neutral }));
    
        svg7.selectAll("rect")
                .data(root.leaves())
                .enter()
                .append("rect")
                    .attr('x', function (d) { return d.x0; })
                    .attr('y', function (d) { return d.y0; })
                    .attr('width', function (d) { return d.x1 - d.x0; })
                    .attr('height', function (d) { return d.y1 - d.y0; })
                    .style("fill", function(d){ return color(d.data.d_type)} )
                    .on("mouseover", function (event,d) {
                            div.transition()
                                .duration(200)
                                .style("opacity", .9);
                            div.html(d.data.eng_name + " (" + d.data.movie_name + ")" + "<br/>" + d.data.d_type + "<br/>" + "Neutral Value: " + d.data.neutral)
                                .style("left", (event.pageX + 10) + "px")
                                .style("top", (event.pageY - 5) + "px")
                                .style("font-size", "1.1em");
                            })
                        .on("mouseout", function(d) {
                            div.transition()
                                .duration(600)
                                .style("opacity", 0);
                            });
    
        // legend
        var keys1 = ["Physical Disability", "Visual Impairment", "Hearing Impairment", "Brain Lesions"]
        var keys2 = ["Intellectual Disability", "Language Disorder", "Autism"]
        var n = data.length/2;
        var lw1 = 145;
        var lw2 = 175;
        var lh = 1;
    
        var legend = svg7.selectAll("legend")
                        .data(keys1)
                        .enter()
                        .append("g")
                        .attr("transform", function(d,i) 
                        { return "translate(" + i%n * lw1 + "," + Math.floor(i/n) * lh + ")"; })
                        .attr("class","legend");
    
        var rects = legend.append('circle')
            .attr("r", 5)
            .attr("cx", 16)
            .attr("cy", 530)
            .attr("fill", function(d,i) { return color(i); });
        
        var text = legend.append('text')
            .attr("x", 26)
            .attr("y", 534)
            .text(function(d) { return d; })
            .style("fill", "gray")
            .attr("font-size", "10px")
            .style("font-family", "Noto Sans KR");
    
        var legend = svg7.selectAll("legend")
                    .data(keys2)
                    .enter()
                    .append("g")
                    .attr("transform", function(d,i) 
                    { return "translate(" + i%n * lw2 + "," + Math.floor(i/n) * lh + ")"; })
                    .attr("class","legend");
    
        var rects = legend.append('circle')
            .attr("r", 5)
            .attr("cx", 60)
            .attr("cy", 551)
            .attr("fill", function(d,i) { return color(i+4); });
        
        var text = legend.append('text')
            .attr("x", 70)
            .attr("y", 555)
            .text(function(d) { return d; })
            .style("fill", "gray")
            .attr("font-size", "10px")
            .style("font-family", "Noto Sans KR");
    
    });
    
    
    let btn_ids = ["happiness", "sadness", "fear", "disgust", "surprise", "anger", "neutral"]
    let btn_objs = []
    let svg_divs = []
    
    for(let id of btn_ids){
        // console.log(id)
        let btn_id = id + "_btn"
        let btn = document.getElementById(btn_id)
        btn_objs.push(btn)
        let svg_div = document.getElementById(id)
        svg_divs.push(svg_div)
    }
    
    for(let i in btn_objs){
        let btn = btn_objs[i]
        let svg_div = svg_divs[i]
        btn.addEventListener('click', function(){
            // console.log("clicked")
            for (let btn2 of btn_objs){
                btn2.className = ""
            }
            for(let svg_div2 of svg_divs){
                svg_div2.style.display = "none"
            }
            svg_div.style.display = "block"
            btn.className = "active"
        })
    }
    
    
    
    
    
    
    //toggle
    // $('#toggle > span').click(function() {
    // var ix = $(this).index();
    
    // $('#happiness').toggle( ix === 0 );
    // $('#sadness').toggle( ix === 1 );
    // $('#fear').toggle( ix === 2 );
    // $('#disgust').toggle( ix === 3 );
    // $('#surprise').toggle( ix === 4 );
    // $('#anger').toggle( ix === 5 );
    // $('#neutral').toggle( ix === 6 );
    // });
    
    // $('#toggle > span').click(function() {
    // $('span').removeClass('active');
    // $(this).addClass('active');
    // });
}

draw_treemap_svg();