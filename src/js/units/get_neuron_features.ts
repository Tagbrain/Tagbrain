import {get_c_tree_c_string} from "./get_c_tree_c_string.js";
import {check_existence_node_tag} from "./check_existence_node_tag";
import {class_formate_c_neuron} from "../classes/class_formate_c_neuron";

export function get_neuron_features(
    neuron_c_obj: any, 
    type_search: string, 
    og_c_activator: any
){
    if (typeof og_c_activator === 'string' || og_c_activator instanceof String){//regexp
    } else {//array synapse
        og_c_activator = og_c_activator.join('|');
    }

    let neuron_features: any = {}, 
        og_c_first_c_content = neuron_c_obj.element.childNodes[0].textContent.trim();  

    let class_neuron = new class_formate_c_neuron(
        neuron_c_obj.id, 
        og_c_activator,
        neuron_c_obj.element
    );
    let neuron_activation = class_neuron.neuron_activation,
        outrgowths_architecture = class_neuron.outrgowths_architecture,
        tree_c_prepared = class_neuron.tagbrain_graph_c_neuron_c_tree; //for line neuron shape #edit #add

    //get_c_neuron_c_activation_c_by_tangle();
    
    
    //for count_tags for tags_list
    let obj_c_tree_c_string = get_c_tree_c_string(tree_c_prepared);
    
    //optimazing array tags
    if(type_search == "association"){
        true
    } else {
    }
    
    //collect objects
    if(neuron_activation > 0){
        neuron_features = {
            words: og_c_first_c_content,
            activation: neuron_activation,
            count_c_string_c_og00s: obj_c_tree_c_string.count,
            tree_c_string: obj_c_tree_c_string.string,
            is_saved: true,
        };
    } else {
        neuron_features =  {
            words: og_c_first_c_content,
            activation: 0,
            count_c_string_c_og00s: obj_c_tree_c_string.count,
            tree_c_string: obj_c_tree_c_string.string,
            is_saved:true,
        };
    } 
    return neuron_features;          
}