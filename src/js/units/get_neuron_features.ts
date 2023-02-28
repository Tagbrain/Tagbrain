import {get_string_tags_struct} from "./get_string_tags_struct.js";
import {check_existence_node_tag} from "./check_existence_node_tag";
import {class_formate_c_neuron} from "../classes/class_formate_c_neuron";
import { gEBI, dCE } from "./compress_f.js";
import { get_c_input_field_value_c_search_word_s } from "./get_c_input_field_value_c_search_word_s";

type neuron_features = {
    id: string;
    words: string,
    type_window: string,
    activation: number,
    count_tags: number,
    tags: string,
    time: string,
    chain_fathers: string,
    is_saved: boolean,
}

export function get_neuron_features(neuron: any, type_search: string, array_of_search_key: string[]){
    let neuron_features: any = {},
        searcher = get_c_input_field_value_c_search_word_s(),
        time_last_editing_post = neuron.parentNode.parentNode.querySelector(".file_time").textContent,  
        firsts_words_post = neuron.childNodes[0].textContent.trim();  

    let class_neuron = new class_formate_c_neuron(neuron, searcher);
    let obj = class_neuron.get_public_features(),
        tree_c_tags = obj.tree_c_tags,
        neuron_activation = obj.neuron_activation,
        outrgowths_architecture = obj.outrgowths_architecture, //for line neuron shape #edit #add
        generalizated_tree = obj.generalizated_tree;
    
    //for count_tags for tags_list
    let obj_post_tags = get_string_tags_struct(tree_c_tags);
    
    //optimazing array tags
    if(type_search == "association"){
        true
    } else {
    }
    
    //collect objects
    if(neuron_activation > 0){
        if (neuron.parentNode.parentNode.id != ''){
            neuron_features =  {
                    id: neuron.parentNode.parentNode.id, 
                    words: firsts_words_post,
                    activation: neuron_activation,
                    count_tags: obj_post_tags.count,
                    tags: obj_post_tags.string,
                    time: time_last_editing_post,
                    chain_fathers: generalizated_tree,
                    is_saved:true,
                };
        }
        return neuron_features;  
    } else {
        if(check_existence_node_tag("#tags_structure", neuron) == true){
            neuron_features =  {
                id: neuron.parentNode.parentNode.id, 
                words: firsts_words_post,
                activation: 1,
                count_tags: obj_post_tags.count,
                tags: obj_post_tags.string,
                time: time_last_editing_post,
                chain_fathers: "#tags_structure",
                is_saved:true,
            };
            return neuron_features
        } else {
            neuron_features =  {
                id: neuron.parentNode.parentNode.id, 
                words: firsts_words_post,
                activation: 0,
                count_tags: obj_post_tags.count,
                tags: obj_post_tags.string,
                time: time_last_editing_post,
                chain_fathers: generalizated_tree,
                is_saved:true,
            };
            return neuron_features
        }
    }         
}