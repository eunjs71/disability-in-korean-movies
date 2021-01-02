let result_scatterplot_status = "SP1"
let prev_result_scatterplot_status = "SP1"
let introStatus = "GENDER"
let prev_introStatus = "GENDER"

function transition_sp(prev, sp_status){
    let prev_id = "sticky_" + prev
    let cur_id = "sticky_" + sp_status
    
    let prev_sp = document.getElementById(prev_id);
    let cur_sp = document.getElementById(cur_id);
    
    prev_sp.className = "opacity_inactive"
    
    setTimeout(function(){
        prev_sp.style.display = "none"
        cur_sp.style.display = "block"
        cur_sp.className = "opacity_active"
    }, 200)
    
    
}

window.addEventListener("scroll", (event) => {
    
    function center_in_screen(tag_id){
        let element = document.getElementById(tag_id);
        let rect = element.getBoundingClientRect()
        let top = rect.top
        let bottom = rect.bottom
        let center = (top + bottom)/2
        let center_in_Screen = window_center - center
        return center_in_Screen
    }
    
    let scroll = this.scrollY;
    let window_center = window.innerHeight / 2
    
    let genderCenterinScreen = center_in_screen("intro1")
    
    let ageCenterinScreen = center_in_screen("intro2")
    
    let disabilityCenterinScreen = center_in_screen("intro3")
    
    
    let intro1 = document.getElementById("intro1");
    let intro2 = document.getElementById("intro2");
    let intro3 = document.getElementById("intro3");
    
    
    let transition_pixel = 200
    
    let intro1_opacity = 0.2
    let intro2_opacity = 0.2
    let intro3_opacity = 0.2
    
    
    
    if (genderCenterinScreen < 0 || (Math.abs(genderCenterinScreen) < Math.abs(ageCenterinScreen))){
        intro1_opacity = 1
        intro2_opacity = 0.2
        intro3_opacity = 0.2
        introStatus = "GENDER"
    }else if (ageCenterinScreen < 0 || (Math.abs(ageCenterinScreen) < Math.abs(disabilityCenterinScreen))){
        intro1_opacity = 0.2
        intro2_opacity = 1
        intro3_opacity = 0.2
        introStatus = "AGE"
    }else{
        intro1_opacity = 0.2
        intro2_opacity = 0.2
        intro3_opacity = 1
        introStatus = "DISABILITY"
    }
    
    intro1.style.opacity = intro1_opacity
    intro2.style.opacity = intro2_opacity
    intro3.style.opacity = intro3_opacity
    
    let intro_svg_div = document.getElementById("intro_svg_div");
    
    if(genderCenterinScreen < 0){
        intro_svg_div.className = ""
    }else if(disabilityCenterinScreen >0){
        intro_svg_div.className = "intro_svg_div_bottom"
    }else{
        intro_svg_div.className = "intro_svg_div_fixed"
    }
    
    if (prev_introStatus != introStatus){
        if((prev_introStatus == "GENDER") && (introStatus == "AGE")){
            update_intro_svg(intro_data, "age", intro_values)
        }else if((prev_introStatus == "AGE") && (introStatus == "GENDER")){
            update_intro_svg(intro_data, "gender", intro_values)
        }else if((prev_introStatus == "DISABILITY") && (introStatus == "AGE")){
            update_intro_svg(intro_data, "age", intro_values)
        }else if((prev_introStatus == "AGE") && (introStatus == "DISABILITY")){
            update_intro_svg(intro_data, "d_type_1", intro_values)
        }
    }
    
    
    prev_introStatus = introStatus
    
    
    // SCATTER PLOT
    
    let result_sp1_cis = center_in_screen("result_div1")
    let result_sp2_cis = center_in_screen("result_div2")
    let result_sp3_cis = center_in_screen("result_div3")
    
    
    let rect_male = document.getElementById("highlight_male");
    
    
    if (result_scatterplot_status == "SP1"){
        if(result_sp2_cis > -200){
            result_scatterplot_status = "SP2"
            sp_rect_update("male_rect_romance")
            sp_char_update("male_rect_romance", sp_romance)
            // rect_male.classList.add("male_rect_romance")
            // rect_male.classList.remove("male_rect_whole")
            // rect_male.classList.remove("male_rect_comedy")
        }
    }else if(result_scatterplot_status == "SP2"){
        if(result_sp1_cis < 500){
            result_scatterplot_status = "SP1"
            sp_rect_update("male_rect_whole")
            sp_char_update("male_rect_whole", sp_whole)
            // rect_male.classList.add("male_rect_whole")
            // rect_male.classList.remove("male_rect_romance")
            // rect_male.classList.remove("male_rect_comedy")
            
        }else if(result_sp3_cis > -200){
            result_scatterplot_status = "SP3"
            sp_rect_update("male_rect_comedy")
            sp_char_update("male_rect_comedy", sp_comedy)
            // rect_male.classList.add("male_rect_comedy")
            // rect_male.classList.remove("male_rect_romance")
            // rect_male.classList.remove("male_rect_whole")
            
        }
    }else if(result_scatterplot_status == "SP3"){
        if(result_sp2_cis < 500){
            result_scatterplot_status = "SP2"
            sp_rect_update("male_rect_romance")
            sp_char_update("male_rect_romance", sp_romance)
            // rect_male.classList.add("male_rect_romance")
            // rect_male.classList.remove("male_rect_comedy")
            // rect_male.classList.remove("male_rect_whole")
            

            
        }
    }
    
    if (prev_result_scatterplot_status != result_scatterplot_status){
        transition_sp(prev_result_scatterplot_status, result_scatterplot_status)
    }
    
    prev_result_scatterplot_status = result_scatterplot_status
    
    let right_cis = center_in_screen('algorithm_right')
    let body = document.getElementsByTagName("BODY")[0];
    if (right_cis > -400 && right_cis < 400){
        body.className = "background_darker"
    }else{
        body.className = "background_white"
    }
    
});

