import {class_L_neuron} from "../classes/class_L_neuron";
export function load_c_neuron00s_x_from_array_x_location_c_client(
    neuron00s: any[]
){
    if(neuron00s.length > 0){
        for(let i = 0; i < neuron00s.length;i++){
            let neuron_id = neuron00s[i].neuron_c_id;
            let neuron_features = {
                neuron_id: neuron_id,
                content: neuron00s[i].content,
                is_outgrowth00s: true,
                contenteditable: "true",
                add_ram_boolen: false,
                is_format: true,
                time_L_last_edit: neuron00s[i].time_L_last_edit,
                default_tab: "neurons"
            }
            let neuron_c_new_x_class = new class_L_neuron(neuron_features);
        }
    }
}