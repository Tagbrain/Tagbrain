import { class_L_neuron } from "../classes/class_L_neuron";
import { class_c_controller_c_tabs_functions } from "../classes/class_c_controller_c_tabs_functions";
import { gEBI } from "./compress_f";
import { focus_c_neuron_c_target_c_tab } from "./focus_c_neuron_c_target_c_tab";
import { send_data_ajax } from "./send_data_ajax";
let Loader = require('./tehnic/async_loader_end.js');

export function load_L_neuron_L_authorization() {
    let data = {
        action: "load_c_neuron_c_log_up_c_controller"
    };
    let url = "php/neurons/controller_c_api.php";
    let controller_f = function (response_obj: any) {
        if (response_obj.status = "success") {
            //close_c_menu
            gEBI("exit_button").click();
            
            //create_c_tab_x_if_c_not_exist
            let tab_feature00s = {
                name: "settings", 
                default: false,
                content_html: ''
            }
            new class_c_controller_c_tabs_functions(tab_feature00s)
            
            //create_c_neuron
            let neuron_features = {
                neuron_id: "neuron_c_controller_c_log_up",
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
            focus_c_neuron_c_target_c_tab("neuron_c_controller_c_log_up", "settings");
            
            //load_c_script00s
            var l = new Loader();
            l.require(
                [{
                    path: "js/controller_c_form_c_log_up.js",
                    id: "script_L_log_up_L_controller"
                }],
                function () {
                    console.log('form_c_script00s_c_is_loaded');
                }
            );
        }
    };
    let error_message = "The log up form is not loaded";
    send_data_ajax(data, url, controller_f, true, error_message);
    
}