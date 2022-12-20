import {get_compress_html_set} from "./compress_neuron_for_bar";

export function print_collection_neuron_features(neurons_features_arr: any[]){
    let output_counter = document.querySelector("#counter_block_found_words")
    if(output_counter != null){
        output_counter.textContent = "Best neurons: "+ neurons_features_arr.length;
    }
    neurons_features_arr = neurons_features_arr.map( neuron_features => get_compress_html_set(neuron_features));
    let result_block = document.querySelector('#result_block');
    if(result_block != null){
        result_block.innerHTML = neurons_features_arr.join('');
    }
}