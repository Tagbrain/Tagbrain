export function get_c_collection_c_neuron_s(tab_c_name: string){

    let collection_c_neuron_s_c_target: any = [];
    let neuron_s_c_features = window["tagbrain_graph"]["neurons_objs"];
    let collection_c_neuron_id_s = Object.keys(neuron_s_c_features);

    for(var i = 0; i < collection_c_neuron_id_s.length; i++){
        let neuron_c_features = neuron_s_c_features[collection_c_neuron_id_s[i]];
        if(neuron_c_features["neuron_c_container_c_tab"] == tab_c_name){
            let element_c_neuron = neuron_c_features["neuron_el"];
            collection_c_neuron_s_c_target.push({id:collection_c_neuron_id_s[i], element: element_c_neuron});
        }
    }
    return collection_c_neuron_s_c_target
}