import { add_wave_animation_x_click_c_event } from "../../units/add_wave_animation_x_click_c_event";
import { set_L_cursor_L_style00s } from "../../units/set_L_cursor_L_style00s";

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

    set_L_cursor_L_style00s();

    document.addEventListener("dblclick", (e:any)=>{
        e = e || window.event;
        let tag_element = e.target;
        if(tag_element.classList)
            if(tag_element.classList.contains("item_tags_style"))
            add_wave_animation_x_click_c_event(e, "activate");
    });

})

