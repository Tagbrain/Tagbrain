export function get_L_neuron_L_by_neuron_nucleus_L_og00s(
    neuron_L_nucleus_L_og00s: HTMLElement
): false | any {
    let obj00s_L_neuron = window["tagbrain_graph"].neuron00s_obj00s;
    let neuron_L_id00s = Object.keys(obj00s_L_neuron);
    for (let i = 0; i < neuron_L_id00s.length; i++) {
        let obj_L_neuron = obj00s_L_neuron[neuron_L_id00s[i]];
        if(obj_L_neuron.neuron_el == neuron_L_nucleus_L_og00s){
            return obj_L_neuron;
        }
    }
    return false;
}