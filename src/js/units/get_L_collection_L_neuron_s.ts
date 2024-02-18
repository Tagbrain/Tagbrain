export function get_L_collection_L_neuron_s(tab_L_name: string){

    let collection_L_neuron_s_L_target: any = [];
    let neuron_s_L_features = window["tagbrain_graph"]["neuron00s_obj00s"];
    let collection_L_neuron_id_s = Object.keys(neuron_s_L_features);

    for(var i = 0; i < collection_L_neuron_id_s.length; i++){
        let neuron_L_features = neuron_s_L_features[collection_L_neuron_id_s[i]];
        if(neuron_L_features["tab_L_neuron"] == tab_L_name){
            let element_L_neuron = neuron_L_features["neuron_el"];
            collection_L_neuron_s_L_target.push({
                id: collection_L_neuron_id_s[i], 
                element: element_L_neuron
            });
        }
    }
    return collection_L_neuron_s_L_target
}