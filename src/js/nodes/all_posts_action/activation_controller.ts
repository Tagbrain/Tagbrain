//UNITS
import { send_data_ajax } from "../../units/send_data_ajax.js";
import { get_string_tags_struct } from "../../units/get_string_tags_struct.js";
import { gEBI, dCE } from "../../units/compress_f.js";
import { set_refractor } from "../../units/set_refractor";
import { get_collection_ram_neuron_ids } from "../../units/get_collection_ram_neuron_ids";
import { remove_arr_neurons_client } from "../../units/remove_arr_neurons_client";
import { add_arr_neurons_client } from "../../units/add_arr_neurons_client";
import { get_collection_neurons_ids } from "../../units/get_collection_neurons_ids";
import { get_collection_neurons_without_ram } from "../../units/get_collection_neurons_without_ram";
import { print_collection_neuron_features } from "../../units/print_collection_neuron_features";
import { collect_current_neurons_features } from "../../units/collect_current_neurons_features";
import { is_class_of_event_target } from "../../units/is_class_of_event_target";
import { parent_is_exist } from "../../units/parent_is_exist";
import { get_features_outgrowth } from "../../units/get_features_outgrowth";
import { validate_x_input_field_and_search_c_target } from "../../units/validate_x_input_field_and_search_c_target";


/*
#mechanism
    #listner
        event
            $dblclick
                #target
                    #synapse
                #answer


*/
function get_front_end_search_array(type_search: string, regexp: any[]) {
    let neurons_features_arr = collect_current_neurons_features(type_search, regexp);
    if (neurons_features_arr != null) {
        print_collection_neuron_features(neurons_features_arr);
    }
}

//NODE
//#listner
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('dblclick', function (e) {
        if (is_class_of_event_target(e, "item_tags_style")) {
            let target = e.target;
            if (target != null) {
                if (parent_is_exist(target, "item_input")) {
                    let features_outgrowth = get_features_outgrowth(e.target);
                    //let chain_fathers = get_chain_fathers_from_tag(obj_pos_in_neuron.row);

                    //add_chain_fathers_in_current_stack_activation
                    //use it to work with all function with chain_fathers
                    if (e.ctrlKey) {
                        //attach_chain_fathers_in_search_tab
                        //change_control_chains_panel
                    } else {
                        //change_chain_fathers_in_search_tab
                        //change_control_chains_panel
                    }
                    //send_search_request_of_microfeatures

                    let search_button = gEBI("search_right_bar");

                    let start_controller = start_search_controller(false, true);
                    set_refractor(start_controller, 3000);
                    if (search_button != false) {
                        search_button.click();
                    }
                }
            }
        };
    }, false);

    function start_search_controller(front_end_search: boolean, back_end_search: boolean) {
        let input_c_target_x_find_synapses_c_purpose = gEBI('search_input_block'),
            search_content_c_value = input_c_target_x_find_synapses_c_purpose.value;
        let is_valid = validate_x_input_field_and_search_c_target(search_content_c_value);

        if (is_valid == true) {

            let regexp = search_content_c_value,
                collection_neuron_id = get_collection_neurons_ids(),
                collection_ram_neuron_id = get_collection_ram_neuron_ids();
            let collection_neurons_without_ram: string[] = [];
            if (collection_ram_neuron_id != undefined) {
                collection_neurons_without_ram = get_collection_neurons_without_ram(collection_neuron_id, collection_ram_neuron_id);
            }
            if (regexp != false) {

                //check regexp or not regexp

                if (back_end_search == true) {
                    let data = {
                        graph_name: window["tagbrain_graph"].graph_name,
                        array_of_search_key: regexp,
                        collection_neurons_without_ram: collection_neurons_without_ram,
                        collection_ram_neuron_id: collection_ram_neuron_id,
                    };
                    let url = "php/neurons/search_request_c_controller.php";
                    let controller_f = function (response_obj: any) {
                        success_reaction(response_obj, regexp as string[]);
                    }
                    let error_message = "Search data not load";
                    send_data_ajax(data, url, controller_f, false, error_message);
                    front_end_search = false;
                }

                if (front_end_search == true) {
                    get_front_end_search_array("association", regexp);
                }

            }

        }
    }

    function success_reaction(obj_search_data: any, regexp: any[]) {
        if (obj_search_data.remove_posts) {
            let arr_id_posts_for_del = obj_search_data.remove_posts;
            remove_arr_neurons_client(arr_id_posts_for_del);
        }

        if (obj_search_data.add_posts) {
            let arr_objs_neurons = obj_search_data.add_posts;
            add_arr_neurons_client(arr_objs_neurons);
        }

        get_front_end_search_array("association", regexp);
    }


});