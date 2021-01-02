function svg_barcode(){
    
    let btn_ids = ["kibong", "yonggu", "donggu_p", "myeongjae", "chowon"]
    let btn_objs = []
    let svg_divs = []
    
    for(let i in btn_ids){
        let id = btn_ids[i]
        // console.log(id)
        let btn_id = id + "_btn"
        let btn = document.getElementById(btn_id)
        btn_objs.push(btn)
        // console.log(btn)
        let svg_div = document.getElementById("barcode_div"+(parseInt(i)+1))
        // console.log(svg_div)
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
    
    // toggle for each div
    // $('#toggle > span').click(function() {
    //   var ix = $(this).index();
    
    //   $('#barcode_div1').toggle( ix === 0 );
    //   $('#barcode_div2').toggle( ix === 1 );
    //   $('#barcode_div3').toggle( ix === 2 );
    //   $('#barcode_div4').toggle( ix === 3 );
    //   $('#barcode_div5').toggle( ix === 4 );
    // });
    
    // $('#toggle > span').click(function() {
    //   $('#toggle > span').removeClass('active');
    //   $(this).addClass('active');
    // });
    
    // each div has one svg and corresponding character
    var svg1 = d3.select("#barcode_div1")
      .append("svg")
        .attr("class", "barcode_svg")
        .attr("width", 700)
        .attr("height", 370);
    
    var svg2 = d3.select("#barcode_div2")
      .append("svg")
        .attr("class", "barcode_svg")
        .attr("width", 700)
        .attr("height", 370);
    
    var svg3 = d3.select("#barcode_div3")
      .append("svg")
        .attr("class", "barcode_svg")
        .attr("width", 700)
        .attr("height", 370);
    
    var svg4 = d3.select("#barcode_div4")
      .append("svg")
        .attr("class", "barcode_svg")
        .attr("width", 700)
        .attr("height", 370);
    
    var svg5 = d3.select("#barcode_div5")
      .append("svg")
        .attr("class", "barcode_svg")
        .attr("width", 700)
        .attr("height", 370);
    
    var svg6 = d3.select("#barcode_div6")
      .append("svg")
        .attr('width', 700)
        .attr('height', 340);
    
    
    let g;
    let width = 233; // width for one character's container
    
    // movie list of five characters
    var movie =["Barefoot_Gi_Bong", "Miracle_in_Cell_No_7", "Inseparable_Bros", "glove", "Marathon"];
    var setMovie;
    
    let data;
    var char_set = []; // array containing one character's dataset
    
    // variables and function for mouse hovering
    let main_emo;
    let filename;
    let eng_name;
    var onMouseOver = (emo, image, eng_name) => { // get main_emotion and screenshot filename when hover
      main_emo = emo;
      filename = image;
      eng_name = eng_name;
      // console.log(eng_name + ", " + main_emo + ", " + filename);
      barcode_update();
    };
    
    
    // used data: barcode_short.csv
    // functions for drawing graphs: barcode_basic(), barcode_update()
    d3.csv(web_address + "csv/barcode_extract.csv").then(loadedData => {
      data = loadedData;
    
      setMovie = movie[0];
      g = svg1.append("g")
        .attr("class", "char_g")
        .attr("width", 233)
        .attr("height", 370)
        .attr('transform', 'translate(233, 30)');
      barcode_basic(); // needs to be drawn only once; character name, thumbnail, disability, movie name
      barcode_update(); // draw barcode chart, change screenshot and main emotion when hovering
    
      setMovie = movie[1];
      g = svg2.append("g")
        .attr("class", "char_g")
        .attr("width", 233)
        .attr("height", 370)
        .attr('transform', 'translate(233, 30)');
      barcode_basic();
      barcode_update();
    
      setMovie = movie[2];
      g = svg3.append("g")
        .attr("class", "char_g")
        .attr("width", 233)
        .attr("height", 370)
        .attr('transform', 'translate(233, 30)');
      barcode_basic();
      barcode_update();
    
      setMovie = movie[3];
      g = svg4.append("g")
        .attr("class", "char_g")
        .attr("width", 233)
        .attr("height", 370)
        .attr('transform', 'translate(233, 30)');
      barcode_basic();
      barcode_update();
    
      setMovie = movie[4];
      g = svg5.append("g")
        .attr("class", "char_g")
        .attr("width", 233)
        .attr("height", 370)
        .attr('transform', 'translate(233, 30)');
      barcode_basic();
      barcode_update();
    });
    
    
    var barcode_basic = () => {
      char_set = []; // renew for each character
      for(var i in data) {
        if(data[i].movie_name === setMovie){
          char_set.push(data[i]);
      }}
      // console.log(char_set[0].eng_name + " barcode images: " + char_set.length);
    
    
      g.append("text") // character name at the top
        .attr('x', width/2)
        .attr('y', 15)
        .attr('font-size', 30)
        .attr('text-anchor', 'middle')
        .text(char_set[0].eng_name);
    
      var charface_g = g.append('g') // thumbnail
        .attr('class', 'charface_g')
        .attr("transform", () => {
          return "translate("+(-50+width/2)+", 50)";
        });
    
      charface_g.append('clipPath')
        .attr('id', 'charface')
        .append('circle')
          .attr('cx', 50)
          .attr('cy', 50)
          .attr('r', 50);
    
      charface_g.append('image')
        .attr('xlink:href', () => {
          return web_address + 'images/characters/'+char_set[0].eng_name+'.png';
        })
        .attr('height', 100)
        .attr('width', 100)
        .attr('clip-path', 'url(#charface)');
    
      g.append("text") // disability text
        .attr('x', width/2)
        .attr('text-anchor', 'middle')
        .attr('y', 190)
        .attr('font-size', 20)
        .text(char_set[0].d_type+",");
    
      g.append("text") // movie name text
        .attr('x', width/2)
        .attr('text-anchor', 'middle')
        .attr('y', 220)
        .attr('font-size', 20)
        .text("<"+char_set[0].moviename_text+">");
    
      g.append("text")
        .attr('x', width/2)
        .attr('text-anchor', 'middle')
        .attr('y', 325)
        .attr('font-size', 20)
        .text("Algorithm says he/she is showing:");
    };
    
    var barcode_update = () => { // in draw_barcode.js
      var barwidth = 10;
      var barg = g.selectAll('.container').data(['null']); // draw once
      var gEnter = barg.enter().append('g')
        .attr('class', 'container');
      gEnter.merge(barg);
    
      var groups = barg.merge(gEnter) // groups for each rect
        .selectAll('g').data(char_set);
    
      var groupsEnter = groups.enter().append('g');
      groupsEnter
        .merge(groups)
          .attr("transform", (d, i) =>  {
            return `translate(${i*barwidth-80}, 240)`;
          });
      groups.exit().remove();
    
      // append rect in barcode group
      groupsEnter.append('rect')
        .merge(groups.select('rect'))
          .attr('fill', 'gray')
          .attr('width', barwidth)
          .attr('height', 30)
          .on('mouseover', d => { // defined in barcode_main.js
            onMouseOver(d.fromElement.__data__.main_emotion, d.fromElement.__data__.filename, d.fromElement.__data__.eng_name);
          });
    
    
      // screenshot
      var screenClip = svg6.selectAll('clipPath').data(['null'])
        .enter().append("clipPath")
        .attr('id', 'screenclip')
        .append('rect')
          .attr('x', 230)
          .attr('y', 5)
          .attr('width', 230)
          .attr('height', 160);
    
      var image = svg6.selectAll("image").data(['null']);
      var imageEnter = image.enter().append("image")
        .attr('x', 230)
        .attr('y', 0)
        .attr('height', 160);
      imageEnter.merge(image)
        .attr('xlink:href', () => {
          return web_address + 'images/barcode/'+filename;
        })
        .attr('clip-path', 'url(#screenclip)');
    
      // main emotion text
      var text = svg6.selectAll("text").data(['null']);
      var textEnter = text.enter().append("text");
      textEnter.merge(text)
        .attr('x', 233+width/2)
        .attr('text-anchor', 'middle')
        .attr('y', 200)
        .attr('font-size', 33)
        .text(main_emo);
    };

}

svg_barcode();