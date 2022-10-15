import {parent_is_exist} from "../../units/parent_is_exist.js";
import {gEBI} from "../../units/compress_f.js";

document.addEventListener('DOMContentLoaded',function(){
    document.addEventListener("change", (e) => {
        e = e || window.event;
        var target_el = e.target;
        if(parent_is_exist(target_el, "menu_container_right_bar")){
            let right_bar_page = gEBI(target_el.id+"_page");
            let el_classes,
            pages;
            if(right_bar_page != false){
                pages = document.getElementsByClassName("tools_container");
                if(pages != null){
                    for(const page of pages){
                        if(page.classList.contains("show_page")){
                            page.classList.remove("show_page")
                        }
                    }
                }
                el_classes = right_bar_page.classList;
                if(el_classes.contains("show_page")){
                    el_classes.remove("show_page");
                    el_classes.add("hide_page");
                } else {
                    el_classes.add("show_page");
                    el_classes.remove("hide_page");
                }
            }
        } else if (parent_is_exist(target_el, "menu_container_settings_pop_up")) {
            let right_bar_page = gEBI(target_el.id+"_page");
            let el_classes,
            pages;
            if(right_bar_page != false){
                pages = document.getElementsByClassName("settings_container");
                if(pages != null){
                    for(const page of pages){
                        if(page.classList.contains("show_page")){
                            page.classList.remove("show_page")
                        }
                    }
                }
                console.log("text34");
                right_bar_page.classList.add("show_page");
            }
        }
    })
})