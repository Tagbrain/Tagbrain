//UNITS
import { send_data_ajax } from "../../units/send_data_ajax.js";
import { gEBI, dCE } from "../../units/compress_f.js";
import { set_refractor } from "../../units/set_refractor";
import { get_c_collection_c_neuron_s } from "../../units/get_c_collection_c_neuron_s";
import { validate_x_input_field_and_search_c_target } from "../../units/validate_x_input_field_and_search_c_target";
import { get_c_replace_pattern } from "../../units/get_c_replace_pattern";
import { class_c_find_neuron_c_with_regexp } from "../../classes/class_c_find_neuron_c_with_regexp";
import { clean_c_element_c_with_id } from "../../units/clean_c_element_c_with_id";
import { class_formate_c_neuron } from "../../classes/class_formate_c_neuron";

/*
#mechanism
     #listner
          event
               $keydown
                    #target
                         #input_field
               $click
                    #target
                         #button
          -> #action
               $start
                    #controller_getting_synapse_rows
     -> #controller_getting_synapse_rows
          $get_search_data
          -> $check_search_data
          -> 
        #target
            #synapse
        #answer


*/

//CONTROLLER
function start_search_controller(front_end_search:boolean, back_end_search:boolean) {
     let  input_c_target_x_find_synapses_c_purpose = gEBI('search_input_block'),
          value = input_c_target_x_find_synapses_c_purpose.value;

     let is_all_graphes_activated = window["tagbrain_graph"]["checker_collection"]["activate_all_graphes"]["is_activated"];
     //current_graph

     if (back_end_search == true) {
          let data = {
               graph_name: window["tagbrain_graph"].graph_name,
               data: value,
               regexp_is_activated: true,
               is_all_graphes_activated: is_all_graphes_activated,
          };
          let url = "php/neurons/controller_c_search_request.php";
          let controller_f = function (response_obj: any) {
               success_controller(response_obj["content"], value);
          }
          let error_message = "Search data not load";
          send_data_ajax(data, url, controller_f, true, error_message);
     } else if(front_end_search == true){
          clean_c_element_c_with_id("result_block");
          let tab_c_current = window["tagbrain_graph"]["current_tab"];
          let collection_c_neuron_s_c_target = get_c_collection_c_neuron_s(tab_c_current);
          for(var i = 0; i < collection_c_neuron_s_c_target.length; i++){
               let class_c_formater = new class_formate_c_neuron(collection_c_neuron_s_c_target[i], value);
          }
     }
}

function success_controller(server_data: any, input_keys: any){
     clean_c_element_c_with_id("result_block");
     let list_c_graphs: string[] = Object.keys(server_data);
     for(var i = 0; i < list_c_graphs.length; i++){
          let graph_name = list_c_graphs[i];
          let neurons = server_data[graph_name];
          for(var j = 0; j < neurons.length; j++){
               let object = neurons[j];
               object["graph_name"] = graph_name;
               object["input_keys"] = input_keys;
               new class_c_find_neuron_c_with_regexp(object);
          }
     }

}
//LISTENERS
document.addEventListener('DOMContentLoaded', () => {

     let input_c_target_x_find_synapses_c_purpose = gEBI('search_input_block');
     let button_c_target_x_find_synapses_c_purpose = gEBI('send_search_request');

     button_c_target_x_find_synapses_c_purpose.addEventListener('click', function (e:any) {
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

     input_c_target_x_find_synapses_c_purpose.addEventListener('keydown', function (e:any) {

          const key = e.code || e.keyCode;
          if (key === 13 || key === 'Enter') {
               button_c_target_x_find_synapses_c_purpose.click();
          }
     })
})



