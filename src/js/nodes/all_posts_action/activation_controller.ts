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
import {O_isolate_X_get_OL_branch_L_from_L_neuron} from "../../units/O_isolate_X_get_OL_branch_L_from_L_neuron";
import {class_formate_c_neuron} from "../../classes/class_formate_c_neuron";
import { get_c_neuron_c_by_neuron_nucleus_c_og00s } from "../../units/get_c_neuron_c_by_neuron_nucleus_c_og00s";
import { class_c_attach_c_summarization_tree } from "../../classes/class_c_attach_c_summarization_tree";
import { collect_c_blank_c_tangle_c_activation } from "../../brain_units/collect_c_blank_c_tangle_c_activation";
import { class_L_unit_L_neuron_X_condense } from "../../classes/class_c_unit_L_neuron_X_condense";
import { load_L_attachment00s_L_from_neuron } from "../../units/load_L_attachment00s_L_from_neuron";
import { set_L_button_L_attachment00s_L_state } from "../../units/set_L_button_L_attachment00s_L_state";
import { add_wave_animation_x_click_c_event } from "../../units/add_wave_animation_x_click_c_event";


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

type neuron_L_unit_L_options = {
    tab_L_unit_X_name: string,
    output_container_L_name: string,
    unit_L_neuron_L_id: string,
    unit_L_description_L_short: string,
    unit_L_rank: number,
    unit_L_time: string,
    unit_L_neuron_L_is_special: boolean
}

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('dblclick', function (e:any) {

        let is_tag = is_class_of_event_target(e, "item_tags_style");
        let is_attachment = is_class_of_event_target(e, "special_symbols_style");

        if (is_tag || is_attachment) {
            let target = e.target as Element | null;
            if (target != null) {
                if (parent_is_exist(target, "item_input")) {

                    let neuron_L_el = get_parent_with_class(target, "item_input"),
                        neuron_L_id = get_c_neuron_c_by_neuron_nucleus_c_og00s(
                            neuron_L_el
                        ).neuron_id,
                        //get_L_row_element_L_current
                        outgrowth = get_parent_with_class(target, "post_row"),
                        event_c_row = [...neuron_L_el.children].indexOf(outgrowth),
                        class_neuron = new class_formate_c_neuron(
                            neuron_L_id, 
                            neuron_L_el,
                            false
                        ),
                        branch00s_c_current = O_isolate_X_get_OL_branch_L_from_L_neuron(
                            [event_c_row], 
                            class_neuron.outgrowths_c_all
                        ).branch00s_L_isolated,   

                    target_c_content = target.textContent;
                    if(target_c_content != null){
                        target_c_content = target_c_content.trim();
                        if(is_tag){//complete_L_summarization
                            //use it to work with all function with chain_fathers
                            if(branch00s_c_current != undefined){//branch00s exist
                                let class_options = {//options
                                    neuron_L_id: neuron_L_id,
                                    branch00s_c_current: branch00s_c_current,
                                    ctrl_is_activated: e.ctrlKey,
                                    target_c_content: target_c_content,
                                }
                                new class_c_attach_c_summarization_tree(class_options);
                            }
                            let tab_c_fractal_c_controller = gEBI("fractal_controller_right_bar");
                            tab_c_fractal_c_controller.click();
                            
                        } else if(is_attachment){
                            add_wave_animation_x_click_c_event(e, "");
                            set_L_button_L_attachment00s_L_state("turn_on", class_neuron.neuron_L_shell);
                            let neuron_L_data = {
                                graph_L_name: window["tagbrain_graph"]["graph_name"],
                                neuron_L_id: neuron_L_id,
                                neuron_L_shell: class_neuron.neuron_L_shell
                            };
                            load_L_attachment00s_L_from_neuron(
                                [target_c_content.replace('@', '')], 
                                neuron_L_data,
                                neuron_L_id
                            )
                        }
                    }

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
                neuron00s_best = neuron00s_best.sort((b:any, a:any) => a.neuron_L_activation - b.neuron_L_activation);

                resolve(neuron00s_best);
            } else {
                reject(new Error("not_loaded"));
            }
            // 
        });

        promise.then(
            function(neuron00s_best: any){
                //clear_L_container
                let output_counter = gEBI("output_c_neural_c_guide_c_count");
                output_counter.innerHTML = "";
                //create_L_units_L_new
                for (let j = 0; j < neuron00s_best.length; j++) {
                    let unit_x_obj: neuron_L_unit_L_options = {
                        tab_L_unit_X_name: "activation",
                        output_container_L_name: "output_c_neural_guide",
                        unit_L_neuron_L_id: neuron00s_best[j]["neuron_c_id"],
                        unit_L_description_L_short: "",
                        unit_L_rank: neuron00s_best[j]["neuron_L_activation"],
                        unit_L_time: neuron00s_best[j]["time_L_last_edit"],
                        unit_L_neuron_L_is_special: false
                    }

                    new class_L_unit_L_neuron_X_condense(unit_x_obj)
                }
                output_counter.textContent = gEBI("output_c_neural_guide").children.length;
            },
            function(error){
                console.log(error)
            }
        );
        
    }

});