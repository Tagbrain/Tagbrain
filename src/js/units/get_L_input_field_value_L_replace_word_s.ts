import { gEBI, dCE } from "./compress_f.js";

export function get_L_input_field_value_L_replace_word_s(){
    let  input_L_target_x_replacer = gEBI('replace_input_block');
    let value = input_L_target_x_replacer.value;
    if(value == ""){
        return false
    } else {
        return value
    }
}