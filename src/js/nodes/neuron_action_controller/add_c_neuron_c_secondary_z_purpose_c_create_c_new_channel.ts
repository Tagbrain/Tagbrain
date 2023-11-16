let Loader = require('../../units/tehnic/async_loader_end.js');
import {send_data_ajax} from "../../units/send_data_ajax.js";
import {class_L_neuron} from "../../classes/class_L_neuron";
import { focus_c_neuron_x_scroll } from "../../units/focus_c_neuron_x_scroll";
import { gEBI } from "../../units/compress_f.js";
import { focus_c_neuron_c_target_c_tab } from "../../units/focus_c_neuron_c_target_c_tab";
import { class_c_controller_c_tabs_functions } from "../../classes/class_c_controller_c_tabs_functions";

export function add_c_neuron_c_secondary_z_purpose_c_create_c_new_channel(){
   let data = {
      action: "create_c_channel"
   }
   let url = "php/neurons/controller_c_api.php";
   let controller_f = function(response_obj:any){
         if(response_obj.status = "success"){

         //close_c_menu
         gEBI("exit_button").click();

         //create_c_tab_c_if_c_not_exist
         let tab_feature00s = {
            name: "settings", 
            default: false,
            content_html: ''
         }
         new class_c_controller_c_tabs_functions(tab_feature00s)

         let neuron_features = {
            neuron_id: "form_c_create_c_channel",
            content: response_obj.content,
            is_outgrowth00s: false,
            contenteditable: false,
            add_ram_boolen: false,
            is_format: false,
            time_L_last_edit: "",
            default_tab: "settings"
         }
         let neuron_c_new_x_class = new class_L_neuron(neuron_features);

         //focus_c_neuron
         focus_c_neuron_c_target_c_tab("form_c_create_c_channel", "settings");

         //load_c_script00s
         var l = new Loader();
         l.require([
            {
               path: "js/validation_send_form_create_channel.js",
               id: "script_L_log_up_L_controller"
            }
         ], 
            function() {
               console.log('Scripts Loaded');
         });
      }
   };
   let error_message = "Search data not load";
   send_data_ajax(data, url, controller_f, true, error_message);
}
