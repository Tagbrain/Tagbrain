import { add_wave_animation_x_click_c_event } from "../../units/add_wave_animation_x_click_c_event";
import { if_c_screen_c_is_narrow_zz_close_c_right_bar } from "../../units/if_c_screen_c_is_narrow_zz_close_c_right_bar";

document.addEventListener('DOMContentLoaded',function(){
    let switch_right_bar = document.querySelector("#switch_right_bar"),
        tag_container = document.querySelector(".tag_container"),
        mental_image_c_container = document.getElementById("mental_image_c_container");
    switch_right_bar.addEventListener('click', () => {
        if(tag_container.classList.contains("tag_container_off")){
            tag_container.classList.remove('tag_container_off');
            tag_container.classList.add('tag_container_on');
            mental_image_c_container.classList.remove('neuron_container_fullscreen');
        } else {
            tag_container.classList.add('tag_container_off');
            tag_container.classList.remove('tag_container_on');
            mental_image_c_container.classList.add('neuron_container_fullscreen');
        }
    });


    function contains_parent_with_class(node, class_name, limit_node){
        let iterable_node = node;
        if (iterable_node.nodeType == 3){
             iterable_node = iterable_node.parentNode;
        }

        while(!iterable_node.classList.contains(class_name)){
            iterable_node = iterable_node.parentNode;
           if(iterable_node.classList.contains(class_name))
                return true;
           if(iterable_node == document.body || iterable_node == limit_node)
                break;
        }
        return false;
    }

    let limit_node = document.getElementById("result_block");
    limit_node.addEventListener("click", (e) => {
        e = e || window.event;
        let link_search_row = e.target;
        if (contains_parent_with_class(link_search_row, "link_part", limit_node) === true){

            let current_hash = document.location.hash;
            let href_link = link_search_row.getAttribute("href");

            if_c_screen_c_is_narrow_zz_close_c_right_bar();

            if(href_link == current_hash && href_link != null){
                true;
            } else {
                if(document.querySelector(".current_post_search_row")){
                    let last_current_post_search_row = document.querySelector(".current_post_search_row");
                    last_current_post_search_row.classList.remove("current_post_search_row");
                }
                let search_row_CL = link_search_row.parentNode.parentNode.classList;
                search_row_CL.add("current_post_search_row");
            }
        }
    })

    function cursor_style_color(){
        let body = document.body;
        let body_style = getComputedStyle(body);
        let main_color = body_style.getPropertyValue('--text-content');
        let shiny_light = body_style.getPropertyValue('--shiny-light');
        let encode_main = main_color.replace('#', '%23');
        let encode_shiny_light = shiny_light.replace('#', '%23');
        let cursor_auto_value = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100' width='100'%3E%3Ccircle cx='8' cy='8' r='5' stroke='`+encode_main+`' stroke-width='1.5' fill='none' /%3E%3C/svg%3E")8 8, auto`;
        let cursor_pointer_value = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='100' width='100' %3E%3Ccircle cx='10' cy='10' r='8' stroke='`+encode_shiny_light+`'  stroke-width='1.5' stroke-dasharray='6 3' fill='none' /%3E%3C/svg%3E")12 12, pointer`;
        body.style.setProperty('--cursor-pointer', cursor_pointer_value);
        body.style.setProperty('--cursor-auto', cursor_auto_value);
    }
    cursor_style_color();

    document.addEventListener("dblclick", (e)=>{
        e = e || window.event;
        let tag_element = e.target;
        if(tag_element.classList)
            if(tag_element.classList.contains("item_tags_style"))
            add_wave_animation_x_click_c_event(e, "activate");
    });

})

