import { is_inside_c_node_c_in_block } from "../../units/is_inside_c_node_c_in_block";

let upper_layer_for_animation = document.querySelector(".upper_layer_for_animation");
let shadow_container = document.querySelector(".shadow_background_container_pos");

function gEBI(id, parent) {
    return (parent || document).getElementById(id);
}

if(gEBI("setting_button")){
    let setting_button = gEBI("setting_button");
    setting_button.addEventListener("click", function(e){
        upper_layer_for_animation.style.pointerEvents = "visible";

        shadow_container.style.display = "grid";
        shadow_container.style.pointerEvents = "visible";
    });
}

if(gEBI("exit_button")){
    let exit_button = gEBI("exit_button");
    exit_button.addEventListener("click", function(e){
        let central_pop_up_block = gEBI("central_pop_up_block");
        let upper_layer_for_animation = document.querySelector(".upper_layer_for_animation");
        
        upper_layer_for_animation.style.pointerEvents = "none";
        shadow_container.style.pointerEvents = "none";
        shadow_container.style.display = "none";
    }); 
}





