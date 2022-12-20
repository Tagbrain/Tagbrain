//UNITS
import {send_data_ajax} from "../../units/send_data_ajax.js";
import {get_string_tags_struct} from "../../units/get_string_tags_struct.js";
import {gEBI, dCE} from "../../units/compress_f.js";
import {set_refractor} from "../../units/set_refractor";
import {get_collection_ram_neuron_ids} from "../../units/get_collection_ram_neuron_ids";
import {remove_arr_neurons_client} from "../../units/remove_arr_neurons_client";
import {add_arr_neurons_client} from "../../units/add_arr_neurons_client";
import {get_collection_neurons_ids} from "../../units/get_collection_neurons_ids";
import {clean_serach_output_field} from "../../units/clean_serach_output_field";
import {validate_search_input_field} from "../../units/validate_search_input_field";
import {get_collection_neurons_without_ram} from "../../units/get_collection_neurons_without_ram";
import {get_search_formatted_input_val} from "../../units/get_search_formatted_input_val";
import {print_collection_neuron_features} from "../../units/print_collection_neuron_features";
import {collect_current_neurons_features} from "../../units/collect_current_neurons_features";
import {is_class_of_event_target} from "../../units/is_class_of_event_target";
import {parent_is_exist} from "../../units/parent_is_exist";
import {get_features_outgrowth} from "../../units/get_features_outgrowth";


function get_front_end_search_array(type_search, array_of_search_key){ 
     let neurons_features_arr = collect_current_neurons_features(type_search, array_of_search_key);
     if(neurons_features_arr != null){
          print_collection_neuron_features(neurons_features_arr);
     }
}     

 //NODE
     //LISTENER

 document.addEventListener('dblclick', function(e) {
     if(is_class_of_event_target(e, "item_tags_style")){
          if(parent_is_exist(e.target, "item_input")){
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
     
               let search_button = gEBI("#search_right_bar");
     
               let start_controller = start_search_controller(false, true);
               set_refractor(start_controller, 3000);
               if(search_button != false){
                 search_button.click(); 
               } 
          }
     };
 }, false);

let field_search_r_bar = gEBI('#search_input_block');
let send_search_request = gEBI('#send_search_request');
send_search_request.addEventListener('click', function(e){
     call_refractory_timer(refractory_timer, 500);
})


field_search_r_bar.addEventListener('keydown', function(e){

     const key = e.code || e.keyCode;
     if (key === 13 || key === 'Enter') {
          let send_search_request = gEBI('#send_search_request');
          send_search_request.click();
          //call_refractory_timer(refractory_timer, 500);
     }    
          /*
          let search_field = document.querySelector('#search_input_block'),
          search_val = search_field.value;
          let array_of_search_key = get_search_formatted_input_val(search_val);
          let refractor_front_end;
          refractor_front_end_search(refractor_front_end, array_of_search_key, 300);
          */
     
})

//CONTROLLER
function start_search_controller(front_end_search, back_end_search){
     let search_field = gEBI('#search_input_block'),
     search_input = search_field.value,
     graph_name = window["tagbrain_graph"].graph_name;

     let state = validate_search_input_field(search_input);

     if(state == true){

          let array_of_search_key = get_search_formatted_input_val(search_input),
          collection_neuron_id = get_collection_neurons_ids(),
          collection_ram_neuron_id = get_collection_ram_neuron_ids(),
          collection_neurons_without_ram = get_collection_neurons_without_ram(collection_neuron_id, collection_ram_post_name);

          if(array_of_search_key != false){

               //check regexp or not regexp
               
               if(back_end_search == true){
                    let data = {
                         graph_name: graph_name,
                         array_of_search_key: array_of_search_key,
                         collection_neurons_without_ram: collection_neurons_without_ram,
                         collection_ram_neuron_id: collection_ram_neuron_id,
                    };
                    let url = "php/channel_search/channel_search_controller.php";
                    let controller_f = function(response_obj){
                         success_reaction(response_obj, array_of_search_key);
                    }
                    let error_message = "Search data not load";
                    send_data_ajax(data, url, controller_f, false, error_message);
                    front_end_search = false;
               } 

               if(front_end_search == true){ 
                    get_front_end_search_array("association", array_of_search_key);
               }

          }

     }
}
function success_reaction(obj_search_data, array_of_search_key){
     if(obj_search_data.remove_posts){
          let arr_id_posts_for_del = obj_search_data.remove_posts;
          remove_arr_neurons_client(arr_id_posts_for_del);
     }

     if(obj_search_data.add_posts){
          let arr_objs_neurons = obj_search_data.add_posts;
          add_arr_neurons_client(arr_objs_neurons);
     }

     clean_serach_output_field();

     get_front_end_search_array("association", array_of_search_key);
}