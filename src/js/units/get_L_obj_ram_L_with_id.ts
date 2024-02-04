import { get_c_neuron00s_id00s_x_ram } from "./get_c_neuron00s_id00s_x_ram"

export function get_L_obj_ram_L_with_id(neuron_L_id: string){
    let id00s = get_c_neuron00s_id00s_x_ram();
    for (let i = 0; i < id00s.length; i++) {
        if(neuron_L_id == id00s[i]){
            return window["tagbrain_graph"].ram.ram_c_unit00s[i];
        }  
    }
    return false;
}