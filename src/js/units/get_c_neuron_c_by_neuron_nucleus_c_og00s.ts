export function get_c_neuron_c_by_neuron_nucleus_c_og00s(
    neuron_c_nucleus_c_og00s: HTMLElement
): false | any {
    let obj00s_c_neuron = window["tagbrain_graph"].neuron00s_obj00s;
    let neuron_c_id00s = Object.keys(obj00s_c_neuron);
    for (let i = 0; i < neuron_c_id00s.length; i++) {
        let obj_c_neuron = obj00s_c_neuron[neuron_c_id00s[i]];
        if(obj_c_neuron.neuron_el == neuron_c_nucleus_c_og00s){
            return obj_c_neuron;
        }
    }
    return false;
}