import {get_neuron_object_outgrowths} from "./get_neuron_object_outgrowths";
import {send_data_ajax} from "./send_data_ajax.js";

import {delete_c_neuron_c_save_flag} from "./delete_c_neuron_c_save_flag";

import { class_L_unit_L_neuron_X_condense } from "../classes/class_c_unit_L_neuron_X_condense";

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
    neuron_c_el:HTMLElement, 
    neuron_c_id:string, 
    neuron_shell:HTMLElement
){
    let unix_time = Math.round(new Date().getTime() / 1000).toString();
    let data = {
        action: 'change',
        graph_name: window["tagbrain_graph"]["graph_name"],
        neuron_id: neuron_c_id,
        neuron_tree: get_neuron_object_outgrowths(neuron_c_el),
        unix_time: unix_time,
    };
    let url = "php/neurons/controller_neurons_change.php";
    let controller_f = function (response_obj:any) {
        if (response_obj.status == "success") {
            delete_c_neuron_c_save_flag(neuron_shell, neuron_c_id);
        }
    };
    let error_message = "Search data not load";
    send_data_ajax(data, url,controller_f , true, error_message);
    let unit_x_option00s: neuron_L_unit_L_options = {
        tab_L_unit_X_name: "ram",
        output_container_L_name: "neuron00s_L_RAM",
        unit_L_neuron_L_id: neuron_c_id,
        unit_L_description_L_short: "",
        unit_L_rank: 0,
        unit_L_time: unix_time,
        unit_L_neuron_L_is_special: false
    }
    new class_L_unit_L_neuron_X_condense(unit_x_option00s)
    
}

