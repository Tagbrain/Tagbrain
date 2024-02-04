import { cut_L_from_tree_X_target_L_child00s } from "./cut_L_from_tree_X_target_L_child00s";
import { get_L_og_L_child00s } from "./get_L_og_L_child00s";

type arr_chain = {
    depth: number,
    is_key_row: boolean,
    content: string,
    escape: boolean
}[];
type arr_outgrowth = {
    depth: number,
    content: string
}[]
type current_outgrowth = {
    depth: number,
    content: string,
    is_key_row: boolean
}[];

export function cut_L_from_tree_X_target_L_consequence00s(
    og_L_target_X_position: number,
    neuron_L_tree_L_current: arr_chain
){
    let tree_L_reducted: arr_chain = [...neuron_L_tree_L_current];
    let og_L_consequence00s_L_pos00s: number[] = [];
    let og_L_target_X_pos: number = og_L_target_X_position;
    let node_L_current_L_depth = neuron_L_tree_L_current[og_L_target_X_pos]["depth"];

    //get_L_target_L_child00s_L_position00s
    if (typeof tree_L_reducted[og_L_target_X_pos + 1] !== 'undefined') {//check_L_is_last
        while (og_L_target_X_pos >= 0) {

            //data_L_og_L_iterable
            let og_L_checking_X_depth: number = tree_L_reducted[og_L_target_X_pos + 1]["depth"];
            let value: string = tree_L_reducted[og_L_target_X_pos + 1]["content"];

            if(node_L_current_L_depth == og_L_checking_X_depth){//neighbour or consequence
                if(value.indexOf("→") !== -1){//consequence
                    //push_L_consequence
                    let is_current: boolean = tree_L_reducted[og_L_target_X_pos + 1]["is_key_row"];
                    og_L_consequence00s_L_pos00s.push(og_L_target_X_pos + 1);

                    //get_L_consequence_L_child00s
                    let tree_L_reducted1 = cut_L_from_tree_X_target_L_child00s(
                        og_L_target_X_pos + 1, 
                        tree_L_reducted, 
                    );

                    tree_L_reducted = tree_L_reducted1;
                } else {//just neighbour
                    break
                }
            }

            og_L_target_X_pos++;
            if (typeof tree_L_reducted[og_L_target_X_pos + 1] === 'undefined') {
                break
            }

        }
    }

    //cut_L_from_tree_X_target_L_child00s
    for (let i = og_L_consequence00s_L_pos00s.length - 1; 0 <= i; i--) {
        let position = og_L_consequence00s_L_pos00s[i];
        tree_L_reducted.splice(position, 1);
    }

    return tree_L_reducted;
}