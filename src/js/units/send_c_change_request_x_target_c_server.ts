import {get_neuron_object_outgrowths} from "./get_neuron_object_outgrowths";
import {gEBI, dCE} from "./compress_f.js";

import {add_to_ram} from "./add_to_ram.js"
import {send_data_ajax} from "./send_data_ajax.js";

import {delete_c_neuron_c_save_flag} from "./delete_c_neuron_c_save_flag";


export function send_c_change_request_x_target_c_server(neuron_el:HTMLElement, neuron_id:string, neuron_shell:HTMLElement){
    let data = {
        action: 'change',
        graph_name: window["tagbrain_graph"]["graph_name"],
        neuron_id: neuron_id,
        neuron_tree: get_neuron_object_outgrowths(neuron_el),
        unix_time: Math.round(new Date().getTime() / 1000).toString(),
    };
    let url = "php/neurons/controller_neurons_change.php";
    let controller_f = function (response_obj:any) {
        if (response_obj.status == "success") {
            delete_c_neuron_c_save_flag(neuron_shell, neuron_id);
            let saved_not_saved_block = gEBI("saved_not_saved"),
                time_data_hours_minutes = "Saved";
            saved_not_saved_block.textContent = time_data_hours_minutes;
            setTimeout(clean_save_not_save_block, 60000);
        }
    };
    let error_message = "Search data not load";
    send_data_ajax(data, url, controller_f, true, error_message);
    add_to_ram(neuron_el, neuron_id, false);
}
function clean_save_not_save_block(){
    let saved_not_saved_block = gEBI("saved_not_saved");
    if(saved_not_saved_block != null){
        saved_not_saved_block.textContent = "";
    }
}
