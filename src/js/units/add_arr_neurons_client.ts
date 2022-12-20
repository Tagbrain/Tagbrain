import {add_neuron_client} from "./add_neuron_client.js";

export function add_arr_neurons_client(arr_objs_neuron: any[]){
    if(arr_objs_neuron.length > 0){
        for(let i = 0; i < arr_objs_neuron.length;i++){
             let post_id = arr_objs_neuron[i].file_name;
             add_neuron_client(post_id, arr_objs_neuron[i].content, "true", false, true);
        }
    }
}