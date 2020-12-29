let intro_data = []
let gender_values = []
let age_values = []

// let disability_categories = []

let intro_values = {}
// let intro_categories = {}

function draw_intro_svg(data, category){
    let intro_svg = d3.select('#intro_svg')
        .attr('width', 700)
        .attr('height', 740)
        
    let intro_background = intro_svg.append("rect")
        .attr("width", "100%")
        .attr("height", "100%")
        // .attr("fill", "#F3F3F3")
        .attr("fill", "#FFFFFF")
        
    // set tooltip
    var tooltipdiv = d3.select("body").append("div")
        .attr("class", "tooltip")
        .attr("id", "bartooltip")
        .style("width", "140")
        .style("height", "60")
        .style("background", "#F3F3F3")
        .style("padding-left", "4px")
        .style("padding-right", "4px")
        .style("padding-top", "4px")
        .style("padding-bottom", "4px")
        .style("opacity", 0);

    let images = intro_svg.append('g').selectAll("image")
    .data(data, function(d){ return d.id })
    .enter()
    .append("image")
    .filter(function(d){
        
        return !d.intro_disability
        
    })
    .attr('xlink:href', function(d){ return web_address + 'images/characters/' + d.eng_name + '.png' } )
    .attr('x', function(d){
        return d[category + 'X']
    })
    .attr('y', function(d){
        return d[category + 'Y']
    })
    .attr('width', function(d){
        return d[category + 'W']
    })
    .attr('height', function(d){
        return d[category + 'H']
    })
    .on("mouseover", function (event,d) {
        tooltipdiv.transition()
            .duration(200)
            .style("opacity", .9);
        tooltipdiv.html(d.eng_name + " (" + d.movie_name + ")" + "<br/>" + d.d_type_1)
            .style("left", (event.pageX + 30) + "px")
            .style("top", (event.pageY - 20) + "px")
            .style("font-size", "1.1em");
    })
    .on("mouseout", function(d) {
        tooltipdiv.transition()
            .duration(600)
            .style("opacity", 0);
    });
    
    let vals = intro_values[category]
    
    let value_text_group = intro_svg.append('g').attr('id', 'text_group')
    
    value_text_group
    .selectAll('tl')
    .data(vals, function(d,i){ return i})
    .enter()
    .append('text')
    .attr('class', 'tl')
    .text(function(d){
        return d[0]
    })
    .attr("x", function(d){return d[2]})
    .attr("y", function(d){return d[3]})
    .attr("fill", "black")
    .attr("font-size", function(d){
        if(category == "gender"){
            return "28px"
        }else{
            return "21px"
        }
    })
    
    value_text_group
    .selectAll('tv')
    .data(vals)
    .enter()
    .append('text')
    .attr('class', 'tv')
    .text(function(d){
        return d[1]
    })
    .attr("x", function(d){return d[2]})
    .attr("y", function(d){return d[3] + 90})
    .attr("fill", "black")
    .attr("font-size", function(d){
        if(category == "gender"){
            return "100px"
        }else{
            return "75px"
        }
    })
    
    let category_group = intro_svg.append('g').attr('id', 'category_group')
    let category_dotline = intro_svg.append('g').attr('id', 'category_dotline')
    let category_general = intro_svg.append('g').attr('id', 'category_general')
    
}

function update_intro_svg(data, category, value_dict){
    let filtered_data = []
    for (let d of data){
        if(category == "d_type_1"){
            filtered_data.push(d)
        }else{
            if(d["intro_categories"] != true){
                filtered_data.push(d)
            }
        }
    }
    
    let intro_svg = d3.select('#intro_svg')
    const t = intro_svg.transition().duration(200);
    
    var tooltipdiv = d3.select("body").selectAll(".bartooltip")
    
    let images = intro_svg.selectAll("image")
    .data(filtered_data, function(d){ return d.id })
    
    images
    .enter()
    .append("image")
    .on("mouseover", function (event,d) {
        tooltipdiv.transition()
            .duration(200)
            .style("opacity", .9);
        tooltipdiv.html(d.eng_name + " (" + d.movie_name + ")" + "<br/>" + d.d_type_1)
            .style("left", (event.pageX + 30) + "px")
            .style("top", (event.pageY - 20) + "px")
            .style("font-size", "1.1em");
    })
    .on("mouseout", function(d) {
        tooltipdiv.transition()
            .duration(600)
            .style("opacity", 0);
    })
    .merge(images)
    // .filter(function(d){
    //     if(category == "d_type_1"){
    //         return true
    //     }else{
    //         return !d.intro_disability    
    //     }
    // })
    .attr('xlink:href', function(d){ return web_address + 'images/characters/' + d.eng_name + '.png' } )
    .transition()
    .duration(500)
    .attr('x', function(d){
        return d[category + 'X']
    })
    .attr('y', function(d){
        return d[category + 'Y']
    })
    .attr('width', function(d){
        return d[category + 'W']
    })
    .attr('height', function(d){
        return d[category + 'H']
    })
    
    
   images.exit().remove()
    
    let vals = value_dict[category]
    
    //let value_text_group = intro_svg.select('#text_group')
    
    let tl = intro_svg.select("#text_group").selectAll('.tl').data(vals, function(d,i){ return i })
    
    // tl
    // .enter()
    // .append('text')
    // .attr('class', 'tl')
    // .merge(tl)
    // .text(function(d){
    //     return d[0]
    // })
    // .transition()
    // .duration(500)
    // .attr("x", function(d){return d[2]})
    // .attr("y", function(d){
    //     if(category == "gender"){
    //         return d[3]
    //     }else{
    //         return d[3] + 40
    //     }
    // })
    // .attr("fill", "black")
    // .attr("font-size", function(d){
    //     if(category == "gender"){
    //         return "28px"
    //     }else{
    //         return "15px"
    //     }
    // })
    
    // tl.exit().remove()
    
    tl
    .join(
        (enter) =>
            enter
            .append('text')
            .attr('class', 'tl')
            .text(function(d){ return d[0]})
            .attr("x", function(d){return d[2]})
            .attr("y", function(d){
                if(category == "gender"){
                    return d[3]
                }else{
                    return d[3] + 40
                }
            })
            .attr("fill", "black")
            .attr("font-size", function(d){
                if(category == "gender"){
                    return "28px"
                }else{
                    return "15px"
                }
            })
            .attr("opacity", 0)
            .call((enter) =>
                enter
                .transition(t)
                .attr("opacity", 1)
            )
            ,
        (update) =>
            update
            .text(function(d){ return d[0]})
            .attr("fill", "black")
            .call((update) =>
                update
                .transition(t)
                .attr("font-size", function(d){
                    if(category == "gender"){
                        return "28px"
                    }else{
                        return "15px"
                    }
                })
                .attr("x", function(d){return d[2]})
                .attr("y", function(d){
                    if(category == "gender"){
                        return d[3]
                    }else{
                        return d[3] + 40
                    }
                })
            ),
        (exit) =>
            exit
            .transition()
            .duration(500)
            .attr("opacity", 0)
            .remove()
    )
    
    
    
    
    
    let tv = intro_svg.select("#text_group").selectAll('.tv').data(vals, function(d,i){ return i })
    
    // tv
    // .enter()
    // .append('text')
    // .attr('class', 'tv')
    // .merge(tv)
    // .text(function(d){
    //     return d[1]
    // })
    // .transition()
    // .duration(500)
    // .attr("x", function(d){return d[2]})
    // .attr("y", function(d){return d[3] + 90})
    // .attr("fill", "black")
    // .attr("font-size", function(d){
    //     if(category == "gender"){
    //         return "100px"
    //     }else{
    //         return "60px"
    //     }
    // })
    
    // tv.exit().remove()
    
    
    tv
    .join(
        (enter) =>
            enter
            .append('text')
            .attr('class', 'tv')
            .text(function(d){
                return d[1]
            })
            .attr("x", function(d){return d[2]})
            .attr("y", function(d){return d[3] + 90})
            .attr("fill", "black")
            .attr("font-size", function(d){
                if(category == "gender"){
                    return "100px"
                }else{
                    return "60px"
                }
            })
            .attr("opacity", 0)
            .call((enter) =>
                enter
                .transition(t)
                .attr("opacity", 1)
            )
            ,
        (update) =>
            update
            .text(function(d){
                return d[1]
            })
            .call((update) =>
                update
                .transition(t)
                .attr("x", function(d){return d[2]})
                .attr("y", function(d){return d[3] + 90})
                .attr("font-size", function(d){
                    if(category == "gender"){
                        return "100px"
                    }else{
                        return "60px"
                    }
                })
            )
            ,
        (exit) =>
            exit
            .transition()
            .duration(500)
            .attr("opacity", 0)
            .remove()
    )
    
    
    let disability_categories = []
    let dot_line = []
    let general_db = []
    
    if(category == "d_type_1"){
        let disb_cats = [["Hearing","Impairment"],
                            ["Physical","Disability"],
                            ["Visual","Impairment"],
                            ["Language","Disorder"],
                            ["Intellectual","Disability"],
                            ["Autism",""],
                            ["Brain","Lesions"]]
        
        let disb_colors = ['rgb(132, 188, 182)',
                            'rgb(158, 203, 233)',
                            'rgb(242, 207, 90)',
                            'rgb(138, 210, 121)',
                            'rgb(255, 157, 152)',
                            'rgb(213, 165, 201)',
                            'rgb(76, 120, 169)',]
        
        for(let i in disb_cats){
            let cat = disb_cats[i]
            let cat_data = {
                "cat1": cat[0],
                "cat2": cat[1],
                "x": 80 + 90 * i,
                "y": 590,
                "color": disb_colors[i]
            }
            disability_categories.push(cat_data)
        }
        let dld = {
            'x1': 393,
            'y1': 20,
            'x2': 393,
            'y2': 608,
        }
        dot_line.push(dld)
        
        general_db.push({
            "text": "Physically Impaired",
            "x": 230,
            "y": 50,
            "color": "#bf0d0a"
        })
        general_db.push({
            "text": "Mentally Impaired",
            "x": 410,
            "y": 50,
            "color": "#02006e"
        })
    }
    
    let catx1 = intro_svg.select("#category_group").selectAll('.catx1').data(disability_categories, function(d,i){ return i })
        catx1
        .join(
            (enter) =>
                enter
                .append('text')
                .attr('class', 'catx1')
                .text(function(d){
                    return d.cat1
                })
                .attr("x", function(d){return d.x})
                .attr("y", function(d){return d.y})
                .attr("fill", function(d){return d.color})
                .attr("text-anchor", "middle")
                .attr("font-size", 13)
                .attr("opacity", 0)
                .call((enter) =>
                    enter
                    .transition(t)
                    .attr("opacity", 1)
                )
                ,
            (update) =>
                update
                .text(function(d){
                    return d.cat1
                })
                ,
            (exit) =>
                exit
                .transition(t)
                .attr("opacity", 0)
                .remove()
        )
    
    let catx2 = intro_svg.select("#category_group").selectAll('.catx2').data(disability_categories, function(d,i){ return i })
        catx2
        .join(
            (enter) =>
                enter
                .append('text')
                .attr('class', 'catx2')
                .text(function(d){
                    return d.cat2
                })
                .attr("x", function(d){return d.x})
                .attr("y", function(d){return d.y + 15})
                .attr("fill", function(d){return d.color})
                .attr("text-anchor", "middle")
                .attr("font-size", 13)
                .attr("opacity", 0)
                .call((enter) =>
                    enter
                    .transition(t)
                    .attr("opacity", 1)
                )
                ,
            (update) =>
                update
                .text(function(d){
                    return d.cat1
                })
                ,
            (exit) =>
                exit
                .transition(t)
                .attr("opacity", 0)
                .remove()
        )
    
    let dl = intro_svg.select("#category_dotline").selectAll('.dotline').data(dot_line, function(d,i){ return i })
    dl
    .join(
        (enter) =>
            enter
            .append('line')
            .attr('class', 'dotline')
            .attr("x1", function(d){return d.x1})
            .attr("y1", function(d){return d.y1})
            .attr("x2", function(d){return d.x2})
            .attr("y2", function(d){return d.y2})
            .attr("stroke", "black")
            .attr("stroke-dasharray", 4)
            .attr("opacity", 0)
            .call((enter) =>
                enter
                .transition(t)
                .attr("opacity", 0.5)
            )
            ,
        (update) =>
            update
            .text(function(d){
                return d.cat1
            })
            ,
        (exit) =>
            exit
            .transition(t)
            .attr("opacity", 0)
            .remove()
    )
    
    let gd = intro_svg.select("#category_general").selectAll('.dis_gen').data(general_db, function(d,i){ return i })
    gd
    .join(
        (enter) =>
            enter
            .append('text')
            .attr('class', 'dis_gen')
            .text(function(d){return d.text})
            .attr("x", function(d){return d.x})
            .attr("y", function(d){return d.y})
            .attr("fill", function(d){return d.color})
            .attr("opacity", 0)
            .call((enter) =>
                enter
                .transition(t)
                .attr("opacity", 1)
            )
            ,
        (update) =>
            update
            .text(function(d){
                return d.text
            })
            ,
        (exit) =>
            exit
            .transition(t)
            .attr("opacity", 0)
            .remove()
    )
    
    
    
    
}



d3.csv('csv/datalist.csv').then((data) => {
    let maleCount = 0
    let femaleCount = 0
    
    let teensCount = 0
    let twentiesCount = 0
    let thirtiesCount = 0
    let fortiesCount = 0
    
    let hearingCount = 0
    let physicalCount = 0
    let visualCount = 0
    let languageCount = 0
    let intelCount = 0
    let autismCount = 0
    let brainCount = 0
    
    
    
    for(let i in data){
        if(i < 38){
            let d = data[i]
            
            d["id"] = i
            
            if (d.gender == "Male"){
                d["genderX"] = 350
                d["genderY"] = 550 - maleCount * 22
                maleCount += 1
            }else{
                d["genderX"] = 150
                d["genderY"] = 550 - femaleCount * 22
                femaleCount += 1
            }
            d["genderW"] = 20
            d["genderH"] = 20
            
            if(d.age == "teens"){
                d["ageX"] = 110
                d["ageY"] = 540 - teensCount * 33
                teensCount += 1
            }else if(d.age == "twenties"){
                d["ageX"] = 230
                d["ageY"] = 540 - twentiesCount * 33
                twentiesCount += 1
            }else if(d.age == "thirties"){
                d["ageX"] = 350
                d["ageY"] = 540 - thirtiesCount * 33
                thirtiesCount += 1
            }else if(d.age == "forties"){
                d["ageX"] = 470
                d["ageY"] = 540 - fortiesCount * 33
                fortiesCount += 1
            }
            
            d["ageW"] = 30
            d["ageH"] = 30
            
            // disability type
            if(d.d_type_1 == "Hearing Impairment"){
                d["d_type_1X"] = 60
                d["d_type_1Y"] = 530 - hearingCount * 44
                hearingCount += 1
            }else if(d.d_type_1 == "Physical Disability"){
                d["d_type_1X"] = 150
                d["d_type_1Y"] = 530 - physicalCount * 44
                physicalCount += 1
            }else if(d.d_type_1 == "Visual Impairment"){
                d["d_type_1X"] = 240
                d["d_type_1Y"] = 530 - visualCount * 44
                visualCount += 1
            }else if(d.d_type_1 == "Language Disorder"){
                d["d_type_1X"] = 330
                d["d_type_1Y"] = 530 - languageCount * 44
                languageCount += 1
            }else if(d.d_type_1 == "Intellectual Disability"){
                d["d_type_1X"] = 420
                d["d_type_1Y"] = 530 - intelCount * 44
                intelCount += 1
            }else if(d.d_type_1 == "Autism"){
                d["d_type_1X"] = 510
                d["d_type_1Y"] = 530 - autismCount * 44
                autismCount += 1
            }else if(d.d_type_1 == "Brain Lesions"){
                d["d_type_1X"] = 600
                d["d_type_1Y"] = 530 - brainCount * 44
                brainCount += 1
            }
            
            if(d.d_type_2 == "Physical Disability"){
                let dd = Object.assign({}, d)
                dd["id"] = i + "d2"
                dd["d_type_1X"] = 150
                dd["d_type_1Y"] = 530 - physicalCount * 44
                dd["d_type_1W"] = 40
                dd["d_type_1H"] = 40 
                dd["intro_disability"] = true
                physicalCount += 1
                intro_data.push(dd)
            }else if(d.d_type_2 == "Hearing Impairment"){
                let dd = Object.assign({}, d)
                dd["id"] = i + "d2"
                dd["d_type_1X"] = 60
                dd["d_type_1Y"] = 530 - hearingCount * 44
                dd["d_type_1W"] = 40
                dd["d_type_1H"] = 40 
                dd["intro_disability"] = true
                hearingCount += 1
                intro_data.push(dd)
            }
            d["intro_disability"] = false
            d["d_type_1W"] = 40
            d["d_type_1H"] = 40
            
            // console.log(d)
            intro_data.push(d)
            
        }
        
    }
    
    
    //0:category, 1:value, 2: x, 3: y,
    gender_values.push(["Female", femaleCount, 180, 480])
    gender_values.push(["Male", maleCount, 380, 480])
    age_values.push(["Teens", teensCount, 150, 480])
    age_values.push(["Twneties", twentiesCount, 270, 480])
    age_values.push(["Thirties", thirtiesCount, 390, 480])
    age_values.push(["Forties", fortiesCount, 510, 480])
    
    // let disb_cats = [["Hearing","Impairment"],
    //                     ["Physical","Disability"],
    //                     ["Visual","Impairment"],
    //                     ["Language","Disorder"],
    //                     ["Intellectual","Disability"],
    //                     ["Autism",""],
    //                     ["Brain","Lesions"]]
    // for(let i in disb_cats){
    //     let cat = disb_cats[i]
    //     let cat_data = {
    //         "cat1": cat[0],
    //         "cat2": cat[1],
    //         "x": 60 + 90 * i,
    //         "y": 650
    //     }
    //     disability_categories.push(cat_data)
    // }
    
    intro_values["gender"] = gender_values
    intro_values["age"] = age_values
    intro_values["d_type_1"] = []
    
    // intro_categories["gender"] = []
    // intro_categories["age"] = []
    // intro_categories["d_type_1"] = disability_categories
    
    // console.log(intro_data)
    draw_intro_svg(intro_data, "gender");
    
})


