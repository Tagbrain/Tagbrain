
export function get_L_neuron00s_id00s(){
    let obj00s = window["tagbrain_graph"].neuron00s_obj00s;
    //WITHOUT DRAFT
    let neuron00s_L_id00s = Object.keys(obj00s);
    let response_neuron00s_L_id00s: any[] = [];
    for (let i = 0; i < neuron00s_L_id00s.length; i++) {
        if(obj00s[neuron00s_L_id00s[i]].tab_L_neuron == "neurons"){
            response_neuron00s_L_id00s.push(neuron00s_L_id00s[i])
        }
    }
    return response_neuron00s_L_id00s;
}