import {class_c_neuron} from "../classes/class_c_neuron";
export function add_arr_neurons_client(arr_objs_neuron: any[]){
    if(arr_objs_neuron.length > 0){
        for(let i = 0; i < arr_objs_neuron.length;i++){
             let neuron_id = arr_objs_neuron[i].file_name;
             let neuron_features = {
                neuron_id: neuron_id,
                outgrowths: arr_objs_neuron[i].content,
                contenteditable: "true",
                add_ram_boolen: false,
                is_format: true,
             }
             let neuron_c_new_x_class = new class_c_neuron(neuron_features)
        }
    }
}