import {get_L_og_L_child00s} from "./get_L_og_L_child00s";
import {collect_parent_outgrowth} from "./collect_parent_outgrowth";
import { get_L_og00s_L_consequence00s } from "./get_L_og00s_L_consequence00s";
type arr_chain = {
    depth: number,
    is_key_row: boolean,
    content: string,
    escape: boolean,
}[];

type current_outgrowth = {
    depth: number,
    content: string,
    is_key_row: boolean,
    escape: boolean,
}[];

export function O_isolate_X_get_OL_branch_L_from_L_neuron(
    og_L_position00s_L_current: number[], 
    og00s_c_full: current_outgrowth
) {
    if (og00s_c_full != null) {
        //get_group_of_key_word

        let branch00s: arr_chain[] = [];

        //collect keys properties
        for (let i = og_L_position00s_L_current.length - 1; i >= 0; i--) {
            let og_L_position_L_current = og_L_position00s_L_current[i];

            let branch_L_full: arr_chain = [];
            let current_depth: number = og00s_c_full[og_L_position_L_current]["depth"];

            let current_outgrowth = {
                content: og00s_c_full[og_L_position_L_current]["content"],
                depth: og00s_c_full[og_L_position_L_current]["depth"],
                //row: og_L_position_L_current,
                is_key_row: true,
                escape: false,
            }
            let og00s_L_parent: arr_chain = collect_parent_outgrowth(
                og_L_position_L_current, 
                og00s_c_full, 
                current_depth
            ).reverse();

            let og00s_L_child00s: arr_chain = get_L_og_L_child00s(
                og_L_position_L_current, 
                og00s_c_full, 
                current_depth,
            );
                
            let consequence00s: arr_chain = get_L_og00s_L_consequence00s(
                og_L_position_L_current,
                og00s_c_full, 
                current_depth,
            );
        
            branch_L_full = [
                ...og00s_L_parent, 
                current_outgrowth,  
                ...og00s_L_child00s,
                ...consequence00s
            ];
            branch00s.push(branch_L_full);
        }
        return {
           branch00s_L_isolated: branch00s 
        }
    }
}