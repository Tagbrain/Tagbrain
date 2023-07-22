import {get_neuron_object_outgrowths} from "./get_neuron_object_outgrowths";
import {send_data_ajax} from "./send_data_ajax.js";

import {delete_c_neuron_c_save_flag} from "./delete_c_neuron_c_save_flag";
import { class_c_controller_c_tab_c_ram_c_unit00s } from "../classes/class_c_controller_c_tab_c_ram_c_unit00s";


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
    let option00s = {
        neuron_c_el: neuron_c_el,
        neuron_c_id: neuron_c_id,
        is_special_neuron: false,
        action: "add_to_ram",
        unix_time: unix_time,
    }
    new class_c_controller_c_tab_c_ram_c_unit00s(option00s);
}

