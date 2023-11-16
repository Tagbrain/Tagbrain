import { gEBI } from "./compress_f";

export function focus_c_neuron_x_scroll(neuron_id:string){
    let neuron_obj = window["tagbrain_graph"]["neuron00s_obj00s"][neuron_id];
    let name_tab = neuron_obj.tab_L_neuron;
    let neuron_container = window["tagbrain_graph"]["tab_collection"][name_tab]["mental_image_container"];
    let neuron_element = neuron_obj.neuron_el;    
    let offset:number = neuron_element.offsetTop;
    let distance = offset - neuron_container.getBoundingClientRect().top - 40;
    
    neuron_container.scroll({
        top: distance,
        left: 0,
        behavior: "smooth",
    });
    
    
}