import { gEBI } from "./compress_f";

export function get_L_value_L_input00s_L_search_X_activation(){
    let og_L_activator = window["tagbrain_graph"]["ram"]["synapse00s_L_key"].join("|");
    if(og_L_activator == ""){
        if(og_L_activator.length < 4){
            og_L_activator = "89empty_cap98F";
        }
    }
    let og_L_searcher = gEBI('search_input_block').value;
    if(og_L_searcher.length < 3){
        og_L_searcher = "89empty_cap98F";
    }
    return {
        og_L_searcher: og_L_searcher,
        og_L_activator: og_L_activator
    }
}