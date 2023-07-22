
export function get_c_neuron00s_id00s_x_ram(){
    let neuron00s_obj00s = window["tagbrain_graph"].ram.ram_c_unit00s
    let neuron00s_id00s: string[] = [];
    for (let i = 0; i < neuron00s_obj00s.length; i++) {
        neuron00s_id00s.push(neuron00s_obj00s[i].id)
    }
    return neuron00s_id00s;
}