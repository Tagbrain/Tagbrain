import { gEBI, dCE } from "./compress_f.js";

export function get_c_input_field_value_c_search_word_s(){
    let  input_c_target_x_find_synapses_c_purpose = gEBI('search_input_block');
    let value = input_c_target_x_find_synapses_c_purpose.value;
    if(value == ""){
        return false
    } else {
        return value
    }
}