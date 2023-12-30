import {paste_c_symbol_x_current_position} from "../../units/paste_c_symbol_x_current_position";
import { turn_L_toggle_L_fullscreen } from "../../units/turn_L_toggle_L_fullscreen";

let copy_symbol_button = document.querySelectorAll(".tools_button_copy");
for(let i = 0; i < copy_symbol_button.length; i++){
  copy_symbol_button[i].addEventListener('click', function(){ 
    let value_copy_button = this.getAttribute("copy_attr");
    paste_c_symbol_x_current_position(value_copy_button);
  })
}
const work_mode_button = document.querySelector("#work_mode_button"),
      page_element = document.documentElement;
work_mode_button.addEventListener('click', function(){ 
  turn_L_toggle_L_fullscreen(false);
}) 

