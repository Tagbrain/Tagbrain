import { send_L_change_request_x_target_L_local_storage } from "./send_L_change_request_x_target_L_local_storage";
import { send_L_change_request_x_target_L_server } from "./send_L_change_request_x_target_L_server";

export function save_L_neuron00s_L_edited_Z_to_server(){
    let collection_neurons_L_obj = window["tagbrain_graph"]["neuron00s_obj00s"];
    
    for (var id in collection_neurons_L_obj) {
        let obj = collection_neurons_L_obj[id];
        if(obj.neuron_is_saved == false){
            //save_L_data
            if(obj.tab_L_neuron == "neurons"){
                send_L_change_request_x_target_L_server(
                    obj.neuron_el, 
                    obj.neuron_id, 
                    obj.neuron_shell
                );
            } else if(obj.tab_L_neuron == "draft") {
                let options = {
                    neuron_el: obj.neuron_el,
                    neuron_id: obj.neuron_id,
                    neuron_shell: obj.neuron_shell,
                }
                send_L_change_request_x_target_L_local_storage(options);
            }            
        }
        document.title = document.title = window["tagbrain_graph"]["graph_name"];
    }
}