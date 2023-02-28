import { gEBI, dCE } from "./compress_f.js";

export function get_c_input_field_value_c_replace_word_s(){
    let  input_c_target_x_replacer = gEBI('replace_input_block');
    let value = input_c_target_x_replacer.value;
    if(value == ""){
        return false
    } else {
        return value
    }
}