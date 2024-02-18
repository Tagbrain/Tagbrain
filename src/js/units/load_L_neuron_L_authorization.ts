import { class_L_neuron } from "../classes/class_L_neuron";
import { class_L_controller_L_tabs_functions } from "../classes/class_L_controller_L_tabs_functions";
import { gEBI } from "./compress_f";
import { focus_L_neuron_L_target_L_tab } from "./focus_L_neuron_L_target_L_tab";
import { send_data_ajax } from "./send_data_ajax";
let Loader = require('./tehnic/async_loader_end.js');

export function load_L_neuron_L_authorization() {
    let data = {
        action: "load_L_neuron_L_log_up_L_controller"
    };
    let url = "php/neurons/controller_L_api.php";
    let controller_f = function (response_obj: any) {
        if (response_obj.status = "success") {
            //close_L_menu
            gEBI("exit_button").click();
            
            //create_L_tab_x_if_L_not_exist
            let tab_feature00s = {
                name: "settings", 
                default: false,
                content_html: ''
            }
            new class_L_controller_L_tabs_functions(tab_feature00s)
            
            //create_L_neuron
            let neuron_features = {
                neuron_id: "neuron_L_controller_L_log_up",
                content: response_obj.content,
                is_outgrowth00s: false,
                contenteditable: false,
                add_ram_boolen: false,
                is_format: false,
                time_L_last_edit: "",
                default_tab: "settings"
            }
            let neuron_L_new_x_class = new class_L_neuron(neuron_features);

            //focus_L_neuron
            focus_L_neuron_L_target_L_tab("neuron_L_controller_L_log_up", "settings");
            
            //load_L_script00s
            var l = new Loader();
            l.require(
                [{
                    path: "js/controller_L_form_L_log_up.js",
                    id: "script_L_log_up_L_controller"
                }],
                function () {
                    console.log('form_L_script00s_L_is_loaded');
                }
            );
        }
    };
    let error_message = "The log up form is not loaded";
    send_data_ajax(data, url, controller_f, true, error_message);
    
}