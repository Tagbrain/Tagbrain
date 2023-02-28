import {get_current_div_n} from "./get_current_div_n";

export function get_current_line_div(node_par: Element | string){
    let div_n = get_current_div_n(node_par);
    return window["tagbrain_graph"]["cursor_position"]["neuron_element"].childNodes[div_n];
}