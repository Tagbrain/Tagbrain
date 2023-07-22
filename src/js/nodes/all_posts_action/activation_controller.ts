//UNITS
import { send_data_ajax } from "../../units/send_data_ajax.js";
import { get_c_tree_c_string } from "../../units/get_c_tree_c_string.js";
import { gEBI, dCE } from "../../units/compress_f.js";
import { set_refractor } from "../../units/set_refractor";
import { get_c_neuron00s_id00s_x_ram } from "../../units/get_c_neuron00s_id00s_x_ram";
import { hide_c_target_c_neuron00s_c_by_name_zz_location_c_client } from "../../units/hide_c_target_c_neuron00s_c_by_name_zz_location_c_client";
import { load_c_neuron00s_x_from_array_x_location_c_client } from "../../units/load_c_neuron00s_x_from_array_x_location_c_client";
import { get_c_neuron00s_id00s } from "../../units/get_c_neuron00s_id00s";
import { get_neuron00s_c_id00s_c_without_ram } from "../../units/get_neuron00s_c_id00s_c_without_ram";
import { is_class_of_event_target } from "../../units/is_class_of_event_target";
import { parent_is_exist } from "../../units/parent_is_exist";
import {get_parent_with_class} from "../../units/get_parent_with_class";
import {get_outgrowth_features} from "../../units/get_outgrowth_features";
import {generate_c_neuron_c_branch} from "../../units/generate_c_neuron_c_branch";
import {class_formate_c_neuron} from "../../classes/class_formate_c_neuron";
import {class_controller_activation} from "../../classes/class_controller_activation";
import {class_generator_c_tree_c_html} from "../../classes/class_generator_c_tree_c_html";
import { get_c_neuron_c_by_neuron_nucleus_c_og00s } from "../../units/get_c_neuron_c_by_neuron_nucleus_c_og00s";
import { class_c_attach_c_summarization_tree } from "../../classes/class_c_attach_c_summarization_tree";
import { collect_c_blank_c_tangle_c_activation } from "../../brain_units/collect_c_blank_c_tangle_c_activation";
import { class_c_unit_c_activation } from "../../classes/class_c_unit_c_activation";


/*
#mechanism
    #listner
        event
            $dblclick
                #target
                    #synapse
                #answer
*/


//NODE
//#listner

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('dblclick', function (e:any) {
        if (is_class_of_event_target(e, "item_tags_style")) {
            let target = e.target as Element | null;
            if (target != null) {
                if (parent_is_exist(target, "item_input")) {
                    let neuron_c_el = get_parent_with_class(target, "item_input"),
                        neuron_c_id = get_c_neuron_c_by_neuron_nucleus_c_og00s(
                            neuron_c_el
                        ).neuron_id,
                        outgrowth = get_parent_with_class(target, "post_row"),
                        event_c_row = [...neuron_c_el.children].indexOf(outgrowth),
                        class_neuron = new class_formate_c_neuron(
                            neuron_c_id, 
                            "",
                            false
                        ),
                        branch00s_c_current = generate_c_neuron_c_branch(
                            [event_c_row], 
                            class_neuron.outgrowths_c_all
                        ),
                        target_c_content = target.textContent;

                    if(target_c_content != null){
                        target_c_content = target_c_content.trim();
                        
                        //use it to work with all function with chain_fathers
                        if(branch00s_c_current != undefined){//branch00s exist
                            let class_options = {//options
                                neuron_c_id: neuron_c_id,
                                branch00s_c_current: branch00s_c_current,
                                ctrl_is_activated: e.ctrlKey,
                                target_c_content: target_c_content,
                            }
                            new class_c_attach_c_summarization_tree(class_options);
                        }
                    }
                    let tab_c_fractal_c_controller = gEBI("fractal_controller_right_bar");
                    tab_c_fractal_c_controller.click();
                }
            }
        };
    }, false);
    let button_c_activate = gEBI("send_request_c_activate_c_graph");
    button_c_activate.addEventListener('click', function (e:any) {
        start_search_controller();
    })
    function start_search_controller() {

        let neuron00s_c_id00s = get_c_neuron00s_id00s(),
            neuron00s_c_ram_x_id00s = get_c_neuron00s_id00s_x_ram(),
            neuron00s_c_without_ram = get_neuron00s_c_id00s_c_without_ram(
                neuron00s_c_id00s, 
                neuron00s_c_ram_x_id00s
            ),
            synapse00s_c_key = window["tagbrain_graph"]["ram"]["synapse00s_c_key"],
            tree_c_generalizated = window["tagbrain_graph"]["ram"]["tree_c_generalizated"];

        let blank_c_tangle_c_activation = collect_c_blank_c_tangle_c_activation(
            tree_c_generalizated, 
            synapse00s_c_key
        );

        let data = {
            action: "activate_c_graph_c_impulse",
            graph_name: window["tagbrain_graph"].graph_name,
            tangle_c_activation: blank_c_tangle_c_activation,
            client_c_neuron00s_c_id00s: neuron00s_c_id00s,
        };
        let url = "php/neurons/controller_c_api.php";
        let controller_f = function (response_obj: any) {
            success_reaction(response_obj, neuron00s_c_without_ram);
        }
        let error_message = "Search data not load";
        send_data_ajax(data, url, controller_f, true, error_message);
    }

    function success_reaction(obj_search_data: any, neuron00s_c_without_ram: any[]) {
        let neuron00s_c_client_x_exist_c_obj00s:any = [];
        let neuron_c_usefull:any = [];
        if (obj_search_data.neuron00s_c_client_x_exist) {
            for (let i = 0; i < obj_search_data.neuron00s_c_client_x_exist.length; i++) {
                neuron00s_c_client_x_exist_c_obj00s.push(
                    obj_search_data.neuron00s_c_client_x_exist[i]
                );
                neuron_c_usefull.push(
                    obj_search_data.neuron00s_c_client_x_exist[i]["neuron_c_id"]
                );
            }
            
            let neuron_c_useless:any = neuron00s_c_without_ram.filter(
                x => !neuron_c_usefull.includes(x) 
            );                 
            hide_c_target_c_neuron00s_c_by_name_zz_location_c_client(neuron_c_useless);
        }
        let neuron00s_c_client_x_not_exist = obj_search_data.neuron00s_c_client_x_not_exist;

        let promise = new Promise(function(resolve, reject) {
            if (neuron00s_c_client_x_not_exist) {
                load_c_neuron00s_x_from_array_x_location_c_client(neuron00s_c_client_x_not_exist);
                let neuron00s_best = neuron00s_c_client_x_not_exist.concat(neuron00s_c_client_x_exist_c_obj00s);
                neuron00s_best.sort(function(a:number, b:number) {
                    return b - a;
                });
                resolve(neuron00s_best);
            } else {
                reject(new Error("not_loaded"));
            }
            // 
        });

        promise.then(
            function(neuron00s_best: any){
                for (let j = 0; j < neuron00s_best.length; j++) {
                    let unit_x_obj = neuron00s_best[j];
                    unit_x_obj["action"] = "add_c_unit";
                    new class_c_unit_c_activation(unit_x_obj);
                }
                let output_counter = gEBI("output_c_neural_c_guide_c_count");
                output_counter.textContent = gEBI("output_c_neural_guide").children.length;
            },
            function(error){
                console.log(error)
            }
        );
        
    }

});