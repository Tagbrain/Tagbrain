import {functions} from "../nodes/post_manipulation/obj_post_edit_f";
import {get_string_tags_struct} from "./get_string_tags_struct.js";
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

export function get_neuron_features(post_block: any, type_search: string, array_of_search_key: string[]){
    let neuron_features: any = {};  

    let time_last_editing_post = post_block.parentNode.parentNode.querySelector(".file_time").textContent,  
        firsts_words_post = post_block.childNodes[0].textContent.trim();    

    let search_post_obj = functions.search_format_function(post_block, array_of_search_key),
        finded_tags_struct = search_post_obj.finded_tags_struct,
        general_activation = search_post_obj.general_activation,
        struct_activ_num = search_post_obj.struct_activ_num, //for line neuron shape
        chain_fathers = search_post_obj.chain_fathers;
    
    
    //for count_tags for tags_list
    let obj_post_tags = get_string_tags_struct(finded_tags_struct);
    
    //optimazing array tags
    if(type_search == "association"){
        true
    } else {
    }
    
    //collect objects
    if(general_activation > 0){
        if (post_block.parentNode.parentNode.id != ''){
            neuron_features =  {
                    id: post_block.parentNode.parentNode.id, 
                    words: firsts_words_post,
                    activation: general_activation,
                    count_tags: obj_post_tags.count,
                    tags: obj_post_tags.string,
                    time: time_last_editing_post,
                    chain_fathers: chain_fathers,
                    is_saved:true,
                };
        }
    }
   return neuron_features;           
}