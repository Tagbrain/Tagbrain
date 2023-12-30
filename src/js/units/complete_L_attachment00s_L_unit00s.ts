export function complete_L_attachment00s_L_unit00s(
    attachment_L_key: string,
    neuron_L_id: string
){
    if(window["tagbrain_graph"]["neuron00s_obj00s"][neuron_L_id])
        if(!window["tagbrain_graph"]["neuron00s_obj00s"][neuron_L_id]["attachment00s"].includes(attachment_L_key)){//attachment_L_not_created_X_for_neuron
            window["tagbrain_graph"]["neuron00s_obj00s"][neuron_L_id]["attachment00s"].push(attachment_L_key.replace('@', ''));
        }
}