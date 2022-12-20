import {get_neuron_object_outgrowths} from "./get_neuron_object_outgrowths";
import {gEBI, dCE} from "./compress_f.js";
import {send_data_ajax} from "./send_data_ajax.js";

export function add_neuron_server(time: String, neuron: any){
    let neuron_tree = get_neuron_object_outgrowths(neuron),
    graph_name:any = gEBI("page_tag_map_name").textContent.trim();

    let data = {
       action: 'add',
       graph_name: graph_name,
       neuron_id: time,
       neuron_tree: neuron_tree,
       unix_time: time,
    };
    let url = "php/neurons/controller_neurons_change.php";
    let controller_f = function(response_obj: any){
       if (response_obj.status == "success"){
          console.log("Remove the not_save-flag")
       } else {
        console.log("Not saved")
       }
    }
    let error_message = "Error server";
    send_data_ajax(data, url, controller_f, true, error_message);
 }