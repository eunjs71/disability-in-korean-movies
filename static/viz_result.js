let sp_whole;
let sp_romance;
let sp_comedy;


let sp_circleRadius;
let sp_xScale;
let sp_xValue;
let sp_yScale;
let sp_yValue;

let sp_colorScale;
let sp_colorValue;

let sp_div;

let sp_render;

function draw_scatterplots(){
  const wholeMale = [];
  const wholeFemale = [];
  const whole = [wholeMale, wholeFemale];
  // console.log(whole[0]);
  
  const romanceMale = [];
  const romanceFemale = [];
  const romance = [romanceMale, romanceFemale];
  
  const comedyMale = [];
  const comedyFemale = [];
  const comedy = [comedyMale, comedyFemale];
  
  const dataset = whole;
    
    
    //위의 dataset의 Male, Female data array를 변수에 넣어주는 부분
      const datasetM = dataset[0];
      const datasetF = dataset[1];
    
      const legendWidth = d3.select('#legend').attr('width');
      const graphWidth = 1400;
      // const wholeHeight = d3$1.select('#mainScatter').attr('height');
      // console.log(graphWidth);
    
    
      //아래는 렌더링코드. 
      const render = (data, svg_name, title_name) => {
        
    
        const title = title_name;
        const svg = d3.select(svg_name);
        
        // const svg1 = select('#svgMale');
        const width = +svg.attr('width');
        const height = +svg.attr('height');
    
        const yValue = (d) => d.calc;
        sp_yValue = yValue
        const yAxisLabel = 'Appearance Ratio';
    
        const xValue = (d) => d.av_age;
        sp_xValue = xValue
        const circleRadius = (d) => d.calc * 40 + (1-d.calc)*10;
        sp_circleRadius = circleRadius
        const xAxisLabel = 'Age';
    
        const colorValue = (d) => d.d_BigCat;
        sp_colorValue = colorValue
       
        const margin = {
          top: 60,
          right: 10,
          bottom: 88,
          left: 130,
        };
    
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
    
        const xScale = d3.scaleLinear()
          .domain([5,70])
          .range([0, innerWidth])
          .nice();
          
        sp_xScale = xScale
    
        const yScale = d3.scaleLinear()
          .domain([0,0.6])
          .range([innerHeight, 40])
          .nice();
        
        sp_yScale = yScale
    
        const colorScale = d3.scaleOrdinal()
          .domain(data.map(colorValue).sort(d3.ascending))
          .range(['#adadad', '#bf0d0a', '#02006e']);
        
        sp_colorScale = colorScale
        
        // let tooptip_name = "tooltip_" + title_name
        // d3.select("body").selectAll(tooptip_name).remove()
        
        
        var div = d3.select("body").append("div") 
          .attr("id", "sp_tooltip")
          .attr("class", "tooltip")       
          .style("width", "140")
          .style("height", "60")
          .style("background", "#F3F3F3")
          .style("padding-left", "4px")
          .style("padding-right", "4px")
          .style("padding-top", "4px")
          .style("padding-bottom", "4px")
          .style("font-size", "1.1em")
          .style("opacity", 0);
          
        sp_div = div
    
        svg.append('rect').attr('class', 'highlight')
    
        const g = svg
          .append('g')
          .attr(
            'transform',
            `translate(${margin.left},${margin.top})`
          );
        
        const xAxis = d3.axisBottom(xScale)
          .tickSize(-innerHeight)
          .tickPadding(15);
    
        const yAxis = d3.axisLeft(yScale)
          .tickSize(-innerWidth)
          .tickPadding(10);
    
        const yAxisG = g.append('g').call(yAxis);
        yAxisG.selectAll('.domain').remove();
    
        yAxisG
          .append('text')
          .attr('class', 'axis-label')
          .attr('y', -70)
          .attr('x', -innerHeight / 2)
          .attr('fill', 'black')
          .attr('transform', `rotate(-90)`)
          .attr('text-anchor', 'middle')
          .text(yAxisLabel);
    
        const xAxisG = g
          .append('g')
          .call(xAxis)
          .attr('transform', `translate(0,${innerHeight})`);
    
        xAxisG.select('.domain').remove();
    
        xAxisG
          .append('text')
          .attr('class', 'axis-label')
          .attr('y', 55)
          .attr('x', innerWidth / 2)
          .attr('fill', 'black')
          .text(xAxisLabel);
        
      
    //draw scatterplot dots and X
        g.selectAll('circle')
          .data(data.filter(function(d){return d.d_BigCat !== "None";}))
          .enter()
          .append('circle')
          .attr('class', 'circle_opacity_045')
          .attr('cy', (d) => yScale(yValue(d)))
          .attr('cx', (d) => xScale(xValue(d)))
          .attr('r', circleRadius)
          .attr('fill', (d) => colorScale(colorValue(d)))
         
          .on("mouseenter", function(event, d) { 
            
            let html = ""
            html += "<div id='sp_tooltip'>"
            html += " <p>" + d.eng_name + " (" + d.movie_name+ ")" + "<br/>" + d.d_type + "</p>"
            html += "</div>"
            div.transition()    
                .duration(200)    
                .style("opacity", .9);    
            div
            .html(html)
            // .html(d.eng_name + "<br/>" + d.d_type + "<br/>"+ d.movie_name )  
                .style("left", (event.pageX + 20) + "px")   
                .style("top", (event.pageY - 20) + "px")
            })          
          .on("mouseleave", function(event, d) {
              div.style("opacity", 0); 
            }); 
    
    
        g.selectAll('X')
        .data(data.filter(function(d){return d.d_BigCat == "None";}))
          .enter()
          .append('image')
          .attr("xlink:href", function() {return web_address + "images/X.png"})
        .attr('height', circleRadius)
        .attr('width', circleRadius)
        .attr('x', (d) => xScale(xValue(d)))
        .attr('y', (d) => yScale(yValue(d)))
        .attr('opacity', 0.6)
    
        .on("mouseenter", function(event, d) {  
          let html = ""
          html += "<div id='sp_tooltip'>"
          html += " <p>" + d.eng_name + " (" + d.movie_name+ ")" + "<br/>" + d.d_type + "</p>"
          html += "</div>"
          div.transition()    
              .duration(200)    
              .style("opacity", .9);    
          div 
          .html(html)
          // .html(d.eng_name + "<br/>" + d.d_type + "<br/>"+ d.movie_name )  
              .style("left", (event.pageX + 20) + "px")   
              .style("top", (event.pageY - 20) + "px")
          })          
        .on("mouseleave", function(event, d) {   
            div.style("opacity", 0); 
          }); 
    
    
          g.append('text')
            .attr('class', 'title')
            .attr('y', -10)
            .attr('x', innerWidth/2 -10)
            .text(title);
      };
      sp_render = render
    
    
    //데이터 가져오기 
      d3.csv('csv/MCS_all_character.csv').then((data) => {
      // console.log(data);
      data.forEach((d) => {
        d.human_frame = +d.human_frame;
        d.c_count = +d.c_count;
        d.av_age = +d.av_age;
        d.calc = +d.c_count / d.human_frame;
        
        // data(=whole), drama, comedy
        whole.push(d)
        
        //전체
        if (d.gender === 'Male') {
          wholeMale.push(d);
        } else {
          wholeFemale.push(d);
        }
    
        //로맨스 장르
        if (d.genre === 'Romance') {
          if (d.gender === 'Male') {
            romanceMale.push(d);
          } else {
            romanceFemale.push(d);
          }
        }
        
        //코미디 장르
        if (d.genre === 'Comedy') {
          if (d.gender === 'Male') {
            comedyMale.push(d);
          } else {
            comedyFemale.push(d);
          }
        }
      });
      
      sp_whole = whole;
      sp_romance = romance;
      sp_comedy = comedy;

    
    //그래프 그리는 부분
      render(datasetM, '#svgMale', 'Male');
      render(datasetF, '#svgFemale', 'Female');
      
      let rect_male = d3.select('#svgMale').select('.highlight')
      .attr('id', 'highlight_male')
      .attr('class', 'highlight')
      .attr('x', 170)
      .attr('y', 300)
      .attr('width', 400)
      .attr('height', 200)
      
      let rect_female = d3.select('#svgFemale').select('.highlight')
      .attr('id', 'highlight_female')
      .attr('class', 'highlight')
      .attr('x', 250)
      .attr('y', 200)
      .attr('width', 200)
      .attr('height', 300)
      
    });
    
    
    
    //legend 
    const span = 280;
    const textSpan = 40;
    
    d3.select('#legend')
    .attr("border", "black")
    
    d3.select('#none')
    .attr('x', legendWidth/2 -span -textSpan)
    
    d3.select('#phy')
    .attr('cx', legendWidth/2-textSpan)
    .attr('fill','#bf0d0a' )
    
    d3.select('#psy')
    .attr('cx', legendWidth/2 + span-textSpan)
    .attr('fill', '#02006e');
    
    
    d3.select('#none-text')
    .attr('x', legendWidth/2 -span )
    
    d3.select('#phy-text')
    .attr('x', legendWidth/2)
    
    d3.select('#psy-text')
    .attr('x', legendWidth/2 +span)
    
    
    
    
    
    //  var svg = d3.select("div").append("svg")       
    // // var svg = d3.select("#result_svg")
    //     .style("opacity", 1)
    //     .attr("width",1400)  
    //     .attr('height', 400)       
    //     .attr('class', 'scatter_description')
    
    
    // const g = svg
    //       .append('g')
    
    // g.append('text')
    //     .attr("class", "scatter_description_title")
    //     .text('"Young women with physical disabilities"')
    //     .style("text-anchor", "middle")
    //       .attr('x', graphWidth / 2)
    //       .attr('y', 150)
    //       .attr('fill', 'black')
    
    // g.append('text')
    //     .attr("class", "scatter_description_text")
    //     .html('"Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/> Aliquam elit nulla, ultricies sit amet nulla eget, pulvinar lobortis est.<br/> Proin nisi sapien, ullamcorper vel quam in, dignissim condimentum lorem. Aenean fringilla quam eu est gravida, at tristique ex vestibulum.<br/> Nullam egestas consequat ante in faucibus.<br/> Sed eget elit mollis, imperdiet."')
    //     .style("text-anchor", "middle")
    //       .attr('x', graphWidth / 2)
    //       .attr('y', 300)
    //       .attr('fill',   'black')

    
}

draw_scatterplots();

function sp_char_update(class_name, dtset){
  let prev_tooltips = d3.selectAll("#sp_tooltip").remove()
  
  let cur_dataset = dtset;
  
  // if(class_name == "male_rect_whole"){
  //   cur_dataset = sp_whole;
  // }else if(class_name == "male_rect_romance"){
  //   cur_dataset = sp_romance;
  // }else if(class_name == "male_rect_comedy"){
  //   cur_dataset = sp_comedy;
  // }
  
  let cur_dataset_M = cur_dataset[0]
  let cur_dataset_F = cur_dataset[1]
  
  let svg_male_circles = d3.select("#svgMale").selectAll('g').remove()
  let svg_female_circles = d3.select("#svgFemale").selectAll('g').remove()
  
  sp_render(cur_dataset_M, '#svgMale', 'Male');
  sp_render(cur_dataset_F, '#svgFemale', 'Female');
  
  
  
  
  // let svg_male_circles = d3.select("#svgMale").select('g')
  // .selectAll(".circle_opacity_045")
  // .data(cur_dataset_M.filter(function(d){return d.d_BigCat !== "None";}))
  
  // svg_male_circles
  // .enter()
  // .append("circle")
  // .attr('class', 'circle_opacity_045')
  // .attr('cy', (d) => sp_yScale(sp_yValue(d)))
  // .attr('cx', (d) => sp_xScale(sp_xValue(d)))
  // .attr('r', sp_circleRadius)
  // .attr('fill', (d) => sp_colorScale(sp_colorValue(d)))
  // .on("mouseover", function(event, d) {    
  //   sp_div.transition()    
  //       .duration(200)    
  //       .style("opacity", .9);    
  //   sp_div .html(d.eng_name + "<br/>" + d.d_type + "<br/>"+ d.movie_name )  
  //       .style("left", (event.pageX) + "px")   
  //       .style("top", (event.pageY - 28) + "px");  
  //   })          
  // .on("mouseout", function(d) {   
  //     sp_div.transition()    
  //         .duration(500)    
  //         .style("opacity", 0); 
  //   })
  
  // svg_male_circles
  // .append("circle")
  // .attr('class', 'circle_opacity_045')
  // .attr('cy', (d) => sp_yScale(sp_yValue(d)))
  // .attr('cx', (d) => sp_xScale(sp_xValue(d)))
  // .attr('r', sp_circleRadius)
  // .attr('fill', (d) => sp_colorScale(sp_colorValue(d)))
  // .on("mouseover", function(event, d) {    
  //   sp_div.transition()    
  //       .duration(200)    
  //       .style("opacity", .9);    
  //   sp_div .html(d.eng_name + "<br/>" + d.d_type + "<br/>"+ d.movie_name )  
  //       .style("left", (event.pageX) + "px")   
  //       .style("top", (event.pageY - 28) + "px");  
  //   })          
  // .on("mouseout", function(d) {   
  //     sp_div.transition()    
  //         .duration(500)    
  //         .style("opacity", 0); 
  //   })  
  
  
  // svg_male_circles.exit().remove()
  
  
  
  
  
  
  
}



function sp_rect_update(class_name){
  let x, y, width, height;
  let xf, yf, wf, hf;
  if(class_name == "male_rect_whole"){
    x = 170;
    y = 300;
    width = 400;
    height = 200;
    xf = 250;
    yf = 200;
    wf = 200;
    hf = 300;
  }else if(class_name == "male_rect_romance"){
    x = 300;
    y = 200;
    width = 130;
    height = 130;
    xf = 280;
    yf = 230;
    wf = 130;
    hf = 230;
  }else if(class_name == "male_rect_comedy"){
    x = 170;
    y = 340;
    width = 350;
    height = 250;
    xf = 345;
    yf = 345;
    wf = 0;
    hf = 0;
  }
  
  let rect_male = d3.select('#highlight_male')
  .transition()
  .duration(200)
  .attr('x', x)
  .attr('y', y)
  .attr('width', width)
  .attr('height', height)
  
  let rect_female = d3.select('#highlight_female')
  .transition()
  .duration(200)
  .attr('x', xf)
  .attr('y', yf)
  .attr('width', wf)
  .attr('height', hf)
  
}
