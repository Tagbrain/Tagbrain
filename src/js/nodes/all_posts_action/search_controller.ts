//UNITS
import { send_data_ajax } from "../../units/send_data_ajax.js";
import { gEBI, dCE } from "../../units/compress_f.js";
import { set_refractor } from "../../units/set_refractor";
import { get_L_collection_L_neuron_s } from "../../units/get_L_collection_L_neuron_s";
import { validate_x_input_field_and_search_L_target } from "../../units/validate_x_input_field_and_search_L_target";
import { get_L_replace_pattern } from "../../units/get_L_replace_pattern";
import { clean_L_element_L_with_id } from "../../units/clean_L_element_L_with_id";
import { class_formate_L_neuron } from "../../classes/class_formate_L_neuron";
import { class_L_unit_L_neuron_X_condense } from "../../classes/class_L_unit_L_neuron_X_condense";

type neuron_L_unit_L_options = {
     tab_L_unit_X_name: string,
     output_container_L_name: string,
     unit_L_neuron_L_id: string,
     unit_L_description_L_short: string,
     unit_L_rank: number,
     unit_L_time: string,
     unit_L_neuron_L_is_special: boolean
 }

//CONTROLLER
function start_search_controller(
     front_end_search:boolean, 
     back_end_search:boolean
) {
     let searcher = gEBI('search_input_block').value;

     let is_all_graphes_activated = window["tagbrain_graph"]["checker_collection"]["activate_all_graphes"]["is_activated"];
     //current_graph

     if (back_end_search == true) {
          let data = {
               graph_name: window["tagbrain_graph"].graph_name,
               data: searcher,
               regexp_is_activated: true,
               is_all_graphes_activated: is_all_graphes_activated,
          };
          let url = "php/neurons/controller_L_search_request.php";
          let controller_f = function (response_obj: any) {
               success_controller(response_obj["content"], searcher);
          }
          let error_message = "Search data not load";
          send_data_ajax(data, url, controller_f, true, error_message);

     } else if(front_end_search == true){
          clean_L_element_L_with_id("result_block");
          window["tagbrain_graph"]["ram"]["unit00s_L_search"] = [];

          let tab_L_current = window["tagbrain_graph"]["current_tab"];
          let collection_L_neuron_s_L_target = get_L_collection_L_neuron_s(tab_L_current);
          for(var i = 0; i < collection_L_neuron_s_L_target.length; i++){
               let neuron_obj = collection_L_neuron_s_L_target[i];
               let neuron_features = new class_formate_L_neuron(
                    neuron_obj.id, 
                    window["tagbrain_graph"]["neuron00s_obj00s"][neuron_obj.id].neuron_el,
                    false
               );
               if(neuron_features.neuron_activation > 0){
                    window["tagbrain_graph"]["ram"]["unit00s_L_search"].push({
                         neuron_id: neuron_obj["id"]
                    });
               }
          }
     }
}

function success_controller(server_data: any, input_keys: any){
     clean_L_element_L_with_id("result_block");
     window["tagbrain_graph"]["ram"]["unit00s_L_search"] = [];//clean_L_

     let list_L_graphs: string[] = Object.keys(server_data);
     for(var i = 0; i < list_L_graphs.length; i++){
          let graph_name = list_L_graphs[i];
          let neurons = server_data;
          neurons.sort((a:any, b:any) =>  b.key_rows.length - a.key_rows.length);

          for(var j = 0; j < neurons.length; j++){
               let object = neurons[j];
               let unit_x_obj: neuron_L_unit_L_options = {
                    tab_L_unit_X_name: "search",
                    output_container_L_name: "result_block",
                    unit_L_neuron_L_id: object["neuron_id"],
                    unit_L_description_L_short: object["tree_L_microfeature00s"],
                    unit_L_rank: object["count"],
                    unit_L_time: object["time_L_last_edit"],
                    unit_L_neuron_L_is_special: false
               }

               new class_L_unit_L_neuron_X_condense(unit_x_obj)
          }

     }

}
//LISTENERS
document.addEventListener('DOMContentLoaded', () => {

     let input_L_target_x_find_synapses_L_purpose = gEBI('search_input_block');
     let button_L_target_x_find_synapses_L_purpose = gEBI('send_search_request');

     button_L_target_x_find_synapses_L_purpose.addEventListener('click', function (e:any) {
          let start_controller = function(){}
          if(window["tagbrain_graph"]["current_tab"] == "neurons"){
               start_controller = function(){
                    return start_search_controller(false, true);
               };
          } else if(window["tagbrain_graph"]["current_tab"] == "draft") {
               start_controller = function(){
                    return start_search_controller(true, false);
               };
          }
          set_refractor(start_controller, 3000);
     })

     input_L_target_x_find_synapses_L_purpose.addEventListener('keydown', function (e:any) {

          const key = e.code || e.keyCode;
          if (key === 13 || key === 'Enter') {
               button_L_target_x_find_synapses_L_purpose.click();
          }
     })
})



