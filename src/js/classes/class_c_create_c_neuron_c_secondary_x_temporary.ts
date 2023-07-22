

//UNITS

import { gEBI } from "../units/compress_f";
import { focus_c_neuron_x_scroll } from "../units/focus_c_neuron_x_scroll";
import { if_c_screen_c_is_narrow_zz_close_c_right_bar } from "../units/if_c_screen_c_is_narrow_zz_close_c_right_bar";
import { send_data_ajax } from "../units/send_data_ajax";
import { class_c_controller_c_tab_c_ram_c_unit00s } from "./class_c_controller_c_tab_c_ram_c_unit00s";
import { class_c_neuron } from "./class_c_neuron";

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
                    time_c_last_edit: ""
                }
    
                let neuron_c_new_x_class = new class_c_neuron(neuron_features);
                focus_c_neuron_x_scroll("brain_data");
                if_c_screen_c_is_narrow_zz_close_c_right_bar();

                let option00s = {
                    neuron_c_el: neuron_c_new_x_class.neuron_shell,
                    neuron_c_id: "brain_data",
                    is_special_neuron: true,
                    action: "add_to_ram",
                    unix_time: ""
                }
                new class_c_controller_c_tab_c_ram_c_unit00s(option00s);
            }
        };
        send_data_ajax(data, url, controller_f, false, error_message);
        //ajax get data in new neuron
    }

}


export {class_c_create_c_neuron_c_secondary_x_temporary}