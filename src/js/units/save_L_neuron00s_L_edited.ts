import { class_formate_c_neuron } from "../classes/class_formate_c_neuron";
import { send_c_change_request_x_target_c_local_storage } from "./send_c_change_request_x_target_c_local_storage";
import { send_c_change_request_x_target_c_server } from "./send_c_change_request_x_target_c_server";

export function save_L_neuron00s_L_edited(){
    let collection_neurons_c_obj = window["tagbrain_graph"]["neuron00s_obj00s"];
    
    for (var id in collection_neurons_c_obj) {
        let obj = collection_neurons_c_obj[id];
        if(obj.neuron_is_saved == false){
            if(obj.neuron_el != document.activeElement){

                let array_current_key_word = obj.neuron_el.querySelectorAll("mark");

                if(obj.tab_L_neuron == "neurons"){
                    send_c_change_request_x_target_c_server(
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
                    send_c_change_request_x_target_c_local_storage(options);
                }
                if (array_current_key_word.length == 0) {
                    new class_formate_c_neuron(
                        obj.neuron_id, 
                        "",
                        false,
                        false
                    );
                } else {
                    let arr_text_val: any = [];
                    for (var i = 0; i < array_current_key_word.length; i++) {
                        arr_text_val.push(array_current_key_word[i].innerText.trim());
                    }
                    new class_formate_c_neuron(
                        obj.neuron_id, 
                        arr_text_val.join("|"),
                        false,
                        false
                    );
                }
            }
        }
        document.title = document.title = window["tagbrain_graph"]["graph_name"];
    }
}