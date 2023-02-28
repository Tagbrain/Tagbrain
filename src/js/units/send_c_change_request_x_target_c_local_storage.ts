import {get_neuron_object_outgrowths} from "./get_neuron_object_outgrowths";
import {delete_c_neuron_c_save_flag} from "./delete_c_neuron_c_save_flag";

export function send_c_change_request_x_target_c_local_storage(neuron_el:HTMLElement, neuron_id:string, neuron_shell:HTMLElement){
    let neuron_tree = get_neuron_object_outgrowths(neuron_el);
    let value = encodeURIComponent(JSON.stringify(neuron_tree));
    let key:string = "neuron_c_dr["+neuron_id+"]";
    localStorage.setItem(key, value);
    delete_c_neuron_c_save_flag(neuron_shell, neuron_id);
}