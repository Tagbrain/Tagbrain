//UNITS
import { send_data_ajax } from "../../units/send_data_ajax.js";
import { set_refractor } from "../../units/set_refractor";
import { gEBI, dCE } from "../../units/compress_f.js";
import { get_L_input_field_value_L_replace_word_s } from "../../units/get_L_input_field_value_L_replace_word_s";
import {send_L_change_request_x_target_L_local_storage} from "../../units/send_L_change_request_x_target_L_local_storage";


//CONTROLLER
function replace_current_value() {

    let searcher = gEBI('search_input_block').value;
    if(searcher == false){
        console.log("searcher is not correct");
    } else {
        let replacement = get_L_input_field_value_L_replace_word_s();
        if(replacement == false){
            console.log("replacement is not correct");
        } else {

            let tab = window["tagbrain_graph"].current_tab;
            if(tab == "neurons"){
                let neuron_s_L_for_search = collect_L_neuron_s_L_finded();

                let data = {
                    graph_name: window["tagbrain_graph"].graph_name,
                    searcher: searcher,
                    replacement: replacement,
                    neuron_s_L_for_search:neuron_s_L_for_search,
                    regexp_is_activated: true,
                    is_all_graphes_activated: window["tagbrain_graph"].checker_collection.activate_all_graphes.is_activated,
                };
                let url = "php/neurons/controller_L_replace_request.php";
                let controller_f = function (response_obj: any) {
                    front_end_controller(replacement, tab);
                }
                let error_message = "[0] replaced";
                send_data_ajax(data, url, controller_f, true, error_message);
            }  else if (tab == "draft"){
                front_end_controller(replacement, tab);
                let neuron_s_L_for_search = window["tagbrain_graph"]["ram"]["unit00s_L_search"];
                for(let i = 0; i < neuron_s_L_for_search.length; i++){
                    let neuron_class = window["tagbrain_graph"]["neuron00s_obj00s"][neuron_s_L_for_search[i]["neuron_id"]];
                    let function_variable = function(){
                        let options2 = {
                            neuron_el: neuron_class.neuron_el,
                            neuron_id: neuron_class.neuron_id,
                            neuron_shell: neuron_class.neuron_shell,
                        }
                        return send_L_change_request_x_target_L_local_storage(options2);
                    };
                    let options = {
                        function_variable: function_variable,
                        is_instanty: true,
                        neuron_shell: neuron_class.neuron_shell,
                        neuron_el: neuron_class.neuron_el
                    }
                    neuron_class.change_action(options);
                }

            } else {
                console.log("Error: tab isn't correct. Expected 'neurons' or 'draft'")
            }

        }
    }
}
function front_end_controller(replacement: string, tab: string){
    let neurons_container = window["tagbrain_graph"].tab_collection[tab].mental_image_container;
    let array_of_finded: any = [];
    array_of_finded = neurons_container.querySelectorAll("mark");
    if(array_of_finded != null){
        for(let i = 0; i < array_of_finded.length; i++){
            let element_L_mark_a:Element = array_of_finded[i];
            element_L_mark_a.outerHTML = replacement;
        }
    }
}

function collect_L_neuron_s_L_finded(){
    let collection_finded_units = window["tagbrain_graph"]["ram"]["unit00s_L_search"];
    let neuron_s_L_finded:any = [];
    if(collection_finded_units.length > 0){
        for(let i = 0; i < collection_finded_units.length; i++){
            neuron_s_L_finded.push(collection_finded_units[i]["neuron_id"]);
        }
    }
    return neuron_s_L_finded
}

//NODE
//LISTENER
let replace_input = gEBI("replace_input_block");
let send_replace_request = gEBI("send_replace_request");

replace_input.addEventListener('keyup', (e:any) => {
    let replace_request = function(){
        replace_current_value();
    }
    if (e.key === 'Enter') {
        set_refractor(replace_request, 300);
    }
});
send_replace_request.addEventListener('click', (event:any) => {
    let replace_request = function(){
        replace_current_value();
    }
    set_refractor(replace_request, 300);
})
