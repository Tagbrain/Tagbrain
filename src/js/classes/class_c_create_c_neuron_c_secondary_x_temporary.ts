

//UNITS

import { focus_c_neuron_c_target_c_tab } from "../units/focus_c_neuron_c_target_c_tab";
import { send_data_ajax } from "../units/send_data_ajax";
import { class_L_unit_L_neuron_X_condense } from "./class_c_unit_L_neuron_X_condense";
import { class_L_neuron } from "./class_L_neuron";

type neuron_L_unit_L_options = {
    tab_L_unit_X_name: string,
    output_container_L_name: string,
    unit_L_neuron_L_id: string,
    unit_L_description_L_short: string,
    unit_L_rank: number,
    unit_L_time: string,
    unit_L_neuron_L_is_special: boolean
}

class class_c_create_c_neuron_c_secondary_x_temporary {
    constructor(){
        //define this
        this.get_channel_data_controller()
    }

    get_channel_data_controller(){
        let data = {
            channel_name: window["tagbrain_graph"]["graph_name"],
        }
        let url = "php/statistic/get_channel_data.php";
        let error_message = "Error get channel data";
        let controller_f = function(response_obj: any){
            if(response_obj.status == "success"){
                let content = response_obj.brain_data;
                let obj00s_c_neuron00s = window["tagbrain_graph"]["neuron00s_obj00s"];
                if(obj00s_c_neuron00s["brain_data"] != undefined){
                    obj00s_c_neuron00s["brain_data"].hide_c_neuron();
                }
                let neuron_features = {
                    neuron_id: "brain_data",
                    content: content,
                    is_outgrowth00s: false,
                    contenteditable: "false",
                    add_ram_boolen: false,
                    is_format: false,
                    time_L_last_edit: "",
                    default_tab: "settings"
                }
    
                new class_L_neuron(neuron_features);
                focus_c_neuron_c_target_c_tab("brain_data", "settings");

                let unit_x_option00s: neuron_L_unit_L_options = {
                    tab_L_unit_X_name: "ram",
                    output_container_L_name: "neuron00s_L_RAM",
                    unit_L_neuron_L_id: "brain_data",
                    unit_L_description_L_short: "",
                    unit_L_rank: 1,
                    unit_L_time: "",
                    unit_L_neuron_L_is_special: true
                }
                new class_L_unit_L_neuron_X_condense(unit_x_option00s)
            }
        };
        send_data_ajax(data, url, controller_f, false, error_message);
        //ajax get data in new neuron
    }

}


export {class_c_create_c_neuron_c_secondary_x_temporary}