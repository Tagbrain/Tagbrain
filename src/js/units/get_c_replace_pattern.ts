import { gEBI, dCE } from "./compress_f.js";
export function get_c_replace_pattern(){
    let value_c_purpose_c_replace = gEBI("replace_input_block").value;
    return value_c_purpose_c_replace;
}