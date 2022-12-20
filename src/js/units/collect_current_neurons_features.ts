import {get_neuron_features} from "./get_neuron_features";
export function collect_current_neurons_features(type_search: string, array_of_search_key: any[]){
    let neurons_features_arr:any[] = [];  
    let collection_posts = document.querySelectorAll('#items_container .item_input');
    if(collection_posts != null){

         for(let i = 0; i < collection_posts.length; i++){
                let post_block = collection_posts[i];
                let object_features = get_neuron_features(post_block, type_search, array_of_search_key);
                if(object_features == false) 
                   continue;
                object_features["type_window"] = "search";
                neurons_features_arr.push(object_features);
         }

         //check sort par
        return neurons_features_arr.sort((a, b) => b.activation - a.activation );
    
    } else {
        return null;
    }
}