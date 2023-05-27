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
import { validate_x_input_field_and_search_c_target } from "../../units/validate_x_input_field_and_search_c_target";
import { get_c_input_field_value_c_search_word_s } from "../../units/get_c_input_field_value_c_search_word_s";
import {get_parent_with_class} from "../../units/get_parent_with_class";
import {get_outgrowth_features} from "../../units/get_outgrowth_features";
import {generate_c_neuron_c_branch} from "../../units/generate_c_neuron_c_branch";
import {class_formate_c_neuron} from "../../classes/class_formate_c_neuron";
import {class_controller_activation} from "../../classes/class_controller_activation";
import {class_generator_c_tree_c_html} from "../../classes/class_generator_c_tree_c_html";


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
                    let current_element = e.target as Element,
                        neuron = get_parent_with_class(current_element, "item_input"),
                        outgrowth = get_parent_with_class(current_element, "post_row"),
                        event_c_row = [...neuron.children].indexOf(outgrowth),

                        class_neuron = new class_formate_c_neuron(neuron, ""),
                        neuron_c_obj = class_neuron.get_public_features(),
                        current_branch_s = generate_c_neuron_c_branch([event_c_row], neuron_c_obj.outgrowths_c_all);

                        //use it to work with all function with chain_fathers
                        let options ={
                            action:"push_branch_s_c_event_click",
                            event: e,
                            current_branch_s:current_branch_s,
                        }
                        let class_activation = new class_controller_activation(options);
                        let container_tree_c_synapse_s = gEBI("synapses_tree_x_output_field");
                        container_tree_c_synapse_s.innerHTML = class_activation.response;
                    //send_search_request_of_microfeatures

                    /*let start_controller = function(){
                        start_search_controller();
                    }
                    set_refractor(start_controller, 3000);*/
                }
            }
        };
    }, false);

    function start_search_controller() {

        let collection_neuron_id = get_collection_neurons_ids(),
            collection_ram_neuron_id = get_collection_ram_neuron_ids();
        let collection_neurons_without_ram: string[] = [];
        if (collection_ram_neuron_id != undefined) {
            collection_neurons_without_ram = get_collection_neurons_without_ram(collection_neuron_id, collection_ram_neuron_id);
        }

        let data = {
            graph_name: window["tagbrain_graph"].graph_name,
            collection_c_branch_s: window["tagbrain_graph"]["activation_obj"]["tree_c_generalizated"],
            collection_neurons_without_ram: collection_neurons_without_ram,
            collection_ram_neuron_id: collection_ram_neuron_id,
        };
        let url = "php/neurons/search_request_c_controller.php";
        let controller_f = function (response_obj: any) {
            success_reaction(response_obj);
        }
        let error_message = "Search data not load";
        send_data_ajax(data, url, controller_f, false, error_message);
    }

    function success_reaction(obj_search_data: any) {
        if (obj_search_data.remove_posts) {
            let arr_id_posts_for_del = obj_search_data.remove_posts;
            remove_arr_neurons_client(arr_id_posts_for_del);
        }

        if (obj_search_data.add_posts) {
            let arr_objs_neurons = obj_search_data.add_posts;
            add_arr_neurons_client(arr_objs_neurons);
        }

        get_front_end_search_array("association", obj_search_data.keys);
    }

});