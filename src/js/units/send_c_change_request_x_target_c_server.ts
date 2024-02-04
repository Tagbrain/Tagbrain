import {get_neuron_object_outgrowths} from "./get_neuron_object_outgrowths";
import {send_data_ajax} from "./send_data_ajax.js";

import {delete_c_neuron_c_save_flag} from "./delete_c_neuron_c_save_flag";

import { get_c_neuron00s_id00s_x_ram } from "./get_c_neuron00s_id00s_x_ram";

type neuron_L_unit_L_options = {
    tab_L_unit_X_name: string,
    output_container_L_name: string,
    unit_L_neuron_L_id: string,
    unit_L_description_L_short: string,
    unit_L_rank: number,
    unit_L_time: string,
    unit_L_neuron_L_is_special: boolean
}

export function send_c_change_request_x_target_c_server(
    neuron_L_el: HTMLElement, 
    neuron_L_id: string, 
    neuron_shell: HTMLElement
){
    let neuron00s_L_ram_X_id = get_c_neuron00s_id00s_x_ram();
    let unix_time = Math.round(new Date().getTime() / 1000).toString();
    let new_L_tree = get_neuron_object_outgrowths(neuron_L_el);
    let data = {
        action: 'change_L_neuron',
        parameter: 'change',
        graph_name: window["tagbrain_graph"]["graph_name"],
        neuron_id: neuron_L_id,
        neuron_tree: new_L_tree,
        unix_time: unix_time,
        neuron00s_L_ram_X_id: neuron00s_L_ram_X_id
    };
    let url = "php/neurons/controller_c_api.php";
    let controller_f = function (response_obj:any) {
        if (response_obj.status == "success") {
            delete_c_neuron_c_save_flag(neuron_shell, neuron_L_id);
            window["tagbrain_graph"]["neuron00s_obj00s"][neuron_L_id].content = new_L_tree
        }
    };
    let error_message = "Search data not load";
    send_data_ajax(data, url,controller_f , true, error_message);
    
}

