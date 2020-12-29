// window.addEventListener("scroll", (event) => {
//     let debug_p = document.getElementById("scroll_position");
    
//     let scroll = this.scrollY;
//     let gender = document.getElementById("intro1");
//     let genderRect = gender.getBoundingClientRect()
//     let genderTop = genderRect.top
//     let genderBottom = genderRect.bottom
//     let genderCenter = (genderTop + genderBottom)/2
//     let window_center = window.innerHeight / 2
//     let genderCenterinScreen = window_center - genderCenter
    
//     let age = document.getElementById("intro2");
//     let ageRect = age.getBoundingClientRect()
//     let ageTop = ageRect.top
//     let ageBottom = ageRect.bottom
//     let ageCenter = (ageTop + ageBottom)/2
//     let ageCenterinScreen = window_center - ageCenter
    
//     let disability = document.getElementById("intro3");
//     let disabilityRect = disability.getBoundingClientRect()
//     let disabilityTop = disabilityRect.top
//     let disabilityBottom = disabilityRect.bottom
//     let disabilityCenter = (disabilityTop + disabilityBottom)/2
//     let disabilityCenterinScreen = window_center - disabilityCenter
    
    
//     let dbg_result_4 = document.getElementById("result_div4");
//     let dbg_r4_rect = dbg_result_4.getBoundingClientRect()
//     let dbg_r4_top = dbg_r4_rect.top
//     let dbg_r4_bottom = dbg_r4_rect.bottom
//     let dbg_r4_center = (dbg_r4_top + dbg_r4_bottom)/2
//     let dbg_r4_center_in_Screen = window_center - dbg_r4_center
    
//     function center_in_screen(tag_id){
//         let element = document.getElementById(tag_id);
//         let rect = element.getBoundingClientRect()
//         let top = rect.top
//         let bottom = rect.bottom
//         let center = (top + bottom)/2
//         let center_in_Screen = window_center - center
//         return center_in_Screen
//     }
//     // let dbg_r5_center_in_Screen = center_in_screen('result_div5')
//     // let dbg_r6_center_in_Screen = center_in_screen('result_div6')
    
    
//     let result_1_cis = center_in_screen('result_div1')
//     let result_2_cis = center_in_screen('result_div2')
//     let result_3_cis = center_in_screen('result_div3')
    
    
    
//     let right_cis = center_in_screen('algorithm_right')
    
//     let debug_msg = "Scroll: " + scroll + "<br>"
//     // debug_msg += "GenderTop: " + genderTop + "<br>"
//     // debug_msg += "GenderCenter: " + genderCenter + "<br>"
//     // debug_msg += "GenderBottom: " + genderBottom + "<br>"
//     // debug_msg += "Window Center: " + window_center + "<br>"
//     // debug_msg += "GenderCenter: " + genderCenterinScreen + "<br>"
//     // debug_msg += "AgeCenter: " + ageCenterinScreen + "<br>"
//     // debug_msg += "DisabilityCenter: " + disabilityCenterinScreen + "<br>"
//     // debug_msg += "result_div4: " + dbg_r4_center_in_Screen + "<br>"
//     // debug_msg += "result_div5: " + dbg_r5_center_in_Screen + "<br>"
//     // debug_msg += "result_div6: " + dbg_r6_center_in_Screen + "<br>"
//     // debug_msg += "result_div1: " + result_1_cis + "<br>"
//     // debug_msg += "result_div2: " + result_2_cis + "<br>"
//     // debug_msg += "result_div3: " + result_3_cis + "<br>"
//     debug_msg += "bg_right: " + right_cis + "<br>"
    
//     debug_msg += "Intro: " + introStatus + "<br>"
//     debug_msg += "Result_SP: " + result_scatterplot_status + "<br>"
    
    
    
//     debug_p.innerHTML = debug_msg;
// });