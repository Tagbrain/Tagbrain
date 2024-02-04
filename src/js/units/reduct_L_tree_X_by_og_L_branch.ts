import { cut_L_from_tree_X_target_L_child00s } from "./cut_L_from_tree_X_target_L_child00s";
import { cut_L_from_tree_X_target_L_consequence00s } from "./cut_L_from_tree_X_target_L_consequence00s";

export function reduct_L_tree_X_by_og_L_branch(
    neuron_L_tree_L_current: any, 
    og_L_target_X_position: number
){
    //put_L_flag_L_searching_Z_target
    neuron_L_tree_L_current[og_L_target_X_position]["flag_L_search00a"] = true;

    //reduct_L_child00s
    let tree_L_without_L_child00s = cut_L_from_tree_X_target_L_child00s(
        og_L_target_X_position, 
        neuron_L_tree_L_current
    );

    //get_L_target_L_pos_L_changed
    let target_L_pos = og_L_target_X_position;
    for (let i = 0; i < tree_L_without_L_child00s.length; i++) {
        let og = tree_L_without_L_child00s[i];
        if(og.hasOwnProperty('flag_L_search00a')){//feature_L_exist
            delete og['flag_L_search00a'];
            target_L_pos = i;
        }
    }

    //reduct_L_consequence00s
    let tree_L_without_L_consequence00s = cut_L_from_tree_X_target_L_consequence00s(
        target_L_pos, 
        tree_L_without_L_child00s
    );
    
    return tree_L_without_L_consequence00s;
}