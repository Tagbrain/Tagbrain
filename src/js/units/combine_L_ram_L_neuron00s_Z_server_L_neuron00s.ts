import { get_c_neuron00s_id00s_x_ram } from "./get_c_neuron00s_id00s_x_ram";
import { is_equal_L_tree00s } from "./is_equal_L_tree00s";
import { put_c_caret_x_target_c_string_position } from "./put_c_caret_x_target_c_string_position";
import { send_data_ajax } from "./send_data_ajax";

export function combine_L_ram_L_neuron00s_Z_server_L_neuron00s(){
    let neuron00s_id00s = get_c_neuron00s_id00s_x_ram();
    let data = {
        action: 'get_L_neuron00s_L_with_id00s',
        graph_name: window["tagbrain_graph"]["graph_name"],
        facultative:{
            neuron00s_L_id00s: neuron00s_id00s,
        }
    };
    let url = "php/neurons/controller_getting_graph_data.php";
    let controller_f = function (response_obj: any) {
        if (response_obj.status == "success") {
            for (let i = 0; i < response_obj.data.length; i++) {
                let neuron_L_data = response_obj.data[i];
                let neuron_L_id = neuron_L_data.neuron_id;
                let server_L_neuron_L_tree = neuron_L_data.neuron_tree_json;
                let client_L_neuron_L_tree = window["tagbrain_graph"]["neuron00s_obj00s"][neuron_L_id].content;

                //check_change_L_neuron_L_tree
                if(!is_equal_L_tree00s(server_L_neuron_L_tree, client_L_neuron_L_tree)){//compatible

                    //save focus
                    let outgrowth_L_element = window["tagbrain_graph"]["cursor_position"]["outgrowth"];
                    let neuron_element = window["tagbrain_graph"]["cursor_position"]["neuron_element"];
                    let og_L_position = window["tagbrain_graph"]["cursor_position"]["depth_c_in_outgrowth"];
                    let og_L_number = [...neuron_element.children].indexOf(outgrowth_L_element);

                    //change_L_neuron_L_tree
                    window["tagbrain_graph"]["neuron00s_obj00s"][neuron_L_id].set_L_neuron_L_tree_L_new(server_L_neuron_L_tree);
                    
                    //put_L_caret_L_previous_position
                    if(og_L_number != -1){
                        put_c_caret_x_target_c_string_position(
                            neuron_element.children[og_L_number],
                            og_L_position
                        )
                    }

                    //focus?
                }
            }
        } else {
            console.log("FREnd48655784")
        }
    }
    let error_message = "Error 123y657";
    send_data_ajax(data, url, controller_f, true, error_message);
}