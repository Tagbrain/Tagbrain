import { gEBI, dCE } from "./compress_f.js";
export function get_L_replace_pattern(){
    let value_L_purpose_L_replace = gEBI("replace_input_block").value;
    return value_L_purpose_L_replace;
}