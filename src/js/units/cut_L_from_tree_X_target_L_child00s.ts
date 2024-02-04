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

export function cut_L_from_tree_X_target_L_child00s(
    og_L_target_X_position: number,
    neuron_L_tree_L_current: arr_chain
){
    let tree_L_reducted: arr_chain = [...neuron_L_tree_L_current];
    let og_L_child00s_L_position00s: number[] = [];
    let og_L_target_X_pos = og_L_target_X_position;
    if(neuron_L_tree_L_current[og_L_target_X_pos] == undefined){
        return tree_L_reducted;
    }

    //get_L_target_L_child00s_L_position00s
    if (typeof tree_L_reducted[og_L_target_X_pos + 1] !== 'undefined') {//check_L_is_last

        let node_L_current_L_depth = tree_L_reducted[og_L_target_X_pos]["depth"];

        while (og_L_target_X_pos >= 0) {

            let og_L_checking_X_depth: number = tree_L_reducted[og_L_target_X_pos + 1]["depth"];
            if (node_L_current_L_depth < og_L_checking_X_depth) {//child
                og_L_child00s_L_position00s.push(og_L_target_X_pos + 1);
            } else {//neighbour or consequence00s
                break
            }

            og_L_target_X_pos++;
            if (typeof tree_L_reducted[og_L_target_X_pos + 1] === 'undefined') {
                break
            }

        }
    } else {
        return tree_L_reducted;
    }

    //cut_L_from_tree_X_target_L_child00s
    for (let i = og_L_child00s_L_position00s.length - 1; 0 <= i; i--) {
        let position = og_L_child00s_L_position00s[i];
        tree_L_reducted.splice(position, 1);
    }

    return tree_L_reducted;
}