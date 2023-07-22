let Loader = require('../../units/tehnic/async_loader_end.js');
import {send_data_ajax} from "../../units/send_data_ajax.js";
import {class_c_neuron} from "../../classes/class_c_neuron";
import { focus_c_neuron_x_scroll } from "../../units/focus_c_neuron_x_scroll";

export function add_c_neuron_c_secondary_z_purpose_c_create_c_new_channel(){
   let data = null;
   let url = "php/channels_function/form_add_new_channel.php";
   let controller_f = function(response_obj:any){
         if(response_obj.status = "success"){
         let neuron_features = {
            neuron_id: "form_c_create_c_channel",
            content: response_obj.content,
            is_outgrowth00s: false,
            contenteditable: false,
            add_ram_boolen: false,
            is_format: false,
            time_c_last_edit: ""
         }
         let neuron_c_new_x_class = new class_c_neuron(neuron_features);
         gEBI("exit_button").click();
         focus_c_neuron_x_scroll("form_c_create_c_channel"); 
         var l = new Loader();
         l.require([
            "js/validation_send_form_create_channel.js"], 
            function() {
               console.log('Scripts Loaded');
         });
      }
   };
   let error_message = "Search data not load";
   send_data_ajax(data, url, controller_f, true, error_message);
}
