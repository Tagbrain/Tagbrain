import {get_neuron_object_outgrowths} from "./get_neuron_object_outgrowths";
import {delete_L_neuron_L_save_flag} from "./delete_L_neuron_L_save_flag";
type options = {
    neuron_el:HTMLElement, 
    neuron_id:string, 
    neuron_shell:HTMLElement
}
export function send_L_change_request_x_target_L_local_storage(
    options: options
){
    let neuron_tree = get_neuron_object_outgrowths(options.neuron_el);
    let value = encodeURIComponent(JSON.stringify(neuron_tree));
    let key:string = "neuron_L_draft["+options.neuron_id+"]";
    localStorage.setItem(key, value);
    delete_L_neuron_L_save_flag(options.neuron_shell, options.neuron_id);
    window["tagbrain_graph"]["neuron00s_obj00s"][options.neuron_id].content = neuron_tree;
}