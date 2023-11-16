import { gEBI } from "./compress_f.js";
import { duplicate_c_graph_c_object } from "./duplicate_c_graph_c_object";

export function refresh_c_app_c_environment(graph_c_name: string){
    
    window["tagbrain_graph"]["ram"]["ram_c_unit00s"] = [];
    gEBI("result_block").innerHTML = "";
    gEBI("output_c_neural_guide").innerHTML = "";
    gEBI("neuron00s_L_RAM").innerHTML = ""
    let neuron00s_obj00s = window["tagbrain_graph"]["neuron00s_obj00s"];
    
    //clean_L_tab00s_L_useless
    let tab00s = window["tagbrain_graph"]["tab_collection"]
    let tab00s_L_name00s = Object.keys(tab00s);
    for (let i = 0; i < tab00s_L_name00s.length; i++) {//remove_L_all_tabs
        window["tagbrain_graph"]["tab_collection"][tab00s_L_name00s[i]].remove_tab();
    }

    let neuron00s_c_id00s = Object.keys(neuron00s_obj00s);
    for (let i = 0; i < neuron00s_c_id00s.length; i++) {
        window["tagbrain_graph"]["neuron00s_obj00s"][neuron00s_c_id00s[i]].hide_c_neuron();
    }
    duplicate_c_graph_c_object()
    window["tagbrain_graph"]["graph_name"] = graph_c_name;
}