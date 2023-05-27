import { get_c_parent_truncus_c_outgrowth } from "../brain_units/get_c_parent_truncus_c_outgrowth";
import { get_c_og_c_child00s } from "../brain_units/get_c_og_c_child00s";
import { get_child00s_c_from_floor00s } from "../brain_units/get_child00s_c_from_floor00s";
import { is_exist_global_c_microfeature } from "../brain_units/is_exist_global_c_microfeature";

type a_outgrowth = { content: string, v_index: number };
type anemone = { [parent: string]: a_outgrowth[] };
type anemones_collection = anemone[];
type branch = {
    content: string,
    depth: number,
    v_index: number,
}[]

type microfeature = {
    parent: string,
    child: string,
}

//@tree - target. Changeable information structure.
//@truncus - connected part 
//@outgrowth_s - is connector

type i_obj = {
    tree:{tree: branch},
    donor_a_c_truncus: string,
    donor_c_a_outgrowth_s: a_outgrowth[],
}

function add_c_unit_c_target_c_arr_c_ind(
    tree:any[], 
    ind:number,
    outgrowth:any
){
    tree.splice(ind, 0, outgrowth);
}

function shift_c_subbranch_c_on_one_step(
    tree:any[],
    i_c_child_c_first: number,
    parent_depth: number,
){
    for (let y = i_c_child_c_first; y < tree.length; y++) {
        if((i_c_child_c_first == y) && (tree[y]["depth"] == parent_depth)){
            tree[y]["depth"] = tree[y]["depth"] + 1;
        } else if(tree[y]["depth"] > parent_depth){
            tree[y]["depth"] = tree[y]["depth"] + 1;
        } else {
            break
        }
    }
    return tree;
}
function is_exist_twin_in_previous_two_child(
    tree: branch,
    connector_ind: number,
    truncus: string
){
    if(tree[connector_ind-1]){//parent00s or neighbour00s exist

        let parent_first = get_c_parent_truncus_c_outgrowth(tree, connector_ind-1);

        if(parent_first != false){//parent_exist
            if(parent_first.outgrowth_c_parent["content"] == truncus){
                return true;
            } 

            if(tree[parent_first.index-1]){

                let parent_second = get_c_parent_truncus_c_outgrowth(tree, parent_first.index-1);
                if(parent_second != false){//parent_exist

                    if(parent_second.outgrowth_c_parent["content"] == truncus){
                        return true;
                    } 

                }//there is no parent
            }//there is no parent00s
        }//exist neighbour
        
    }
    return false
}

function is_exist_twin_in_next_two_floor(
    tree: branch,
    connector_ind: number,
    truncus: string
){
    //get current connector
        let connector_d = tree[connector_ind]["depth"];
    let child00s_c_obj = get_c_og_c_child00s(tree, connector_ind);
    //tree = child00s_c_obj.remained; #remove

    let num00s: number[] = [connector_d+ 1, connector_d+ 2];
    let floor00s_c_child00s: any[] = get_child00s_c_from_floor00s(child00s_c_obj, num00s);

    //find similar outgrowth in neighbours
    for (const [floor_d, floor_c_child00s] of Object.entries(floor00s_c_child00s)) {
        for (let y = 0; y < floor_c_child00s.length; y++) {
            if(Number(floor_d) - tree[connector_ind]["depth"] <= 2){
                if(floor_c_child00s[y]["content"] == truncus){
                    return true;
                }
            }
        }
    }

    return false;
}

export function connect_c_outgrowth_to_truncus(i_obj: i_obj) {

    let tree = i_obj.tree,
        donor_a_c_truncus = i_obj.donor_a_c_truncus,
        donor_c_a_outgrowth_s = i_obj.donor_c_a_outgrowth_s;

    let is_connected = false;
    let new_tree = [...i_obj.tree.tree];

    outer: for (let i = 0; i < tree.tree.length; i++) {
        for (let j = 0; j < donor_c_a_outgrowth_s.length; j++) {

            let donor_c_connector = donor_c_a_outgrowth_s[j];
            let acceptor_c_connector = tree.tree[i];

            if (donor_c_connector["content"] == acceptor_c_connector["content"]) {
                if (donor_c_connector["v_index"] > 0) {

                    if (tree.tree[i - 1] != undefined) {//not first

                        if (!is_exist_global_c_microfeature(
                            donor_a_c_truncus,
                            tree.tree,
                            i, 
                        )){
                            continue
                        } else {//exist

                            if(is_exist_twin_in_next_two_floor(new_tree, i+1, donor_a_c_truncus)){
                                break outer
                            } else {
                                //connect_donor_anemone();
                                //add donor branch with high accuracy
                                if(is_exist_twin_in_previous_two_child(new_tree, i, donor_a_c_truncus)){
                                    break outer
                                } else {

                                    let outgrowth2 = { 
                                        content: donor_a_c_truncus, 
                                        v_index: 1, 
                                        depth: acceptor_c_connector["depth"] 
                                    }
                                    add_c_unit_c_target_c_arr_c_ind(
                                        new_tree,
                                        i,
                                        outgrowth2,
                                    );
                                    donor_c_connector["v_index"] = 1;
                                    
                                    //shift_c_subbranch_c_child
                                    shift_c_subbranch_c_on_one_step(
                                        new_tree,
                                        i+2, //first child
                                        new_tree[i+1]["depth"],
                                    );
                                    is_connected = true;
                                    console.log("CHECK CODE") // #remove
                                    continue
                                    
                                }
                            }
                        } 
    
                    } else {//first outgrowth

                        //add microfeature if this exist in anemone00s_global
                        if (!is_exist_global_c_microfeature(
                                donor_a_c_truncus,
                                tree.tree,
                                i, 
                            )){
                                continue
                        } else {//exist

                            //add microfeature if not exist similar in the branch
                            if(is_exist_twin_in_next_two_floor(new_tree, i, donor_a_c_truncus)){
                                break outer
                            } else {

                                if(is_exist_twin_in_previous_two_child(new_tree, i, donor_a_c_truncus)){
                                    break outer
                                } else {
                                    let outgrowth1 = {
                                        content: donor_a_c_truncus, 
                                        v_index: 1, 
                                        depth: 0,
                                    }
                                    add_c_unit_c_target_c_arr_c_ind(
                                        new_tree,
                                        0,
                                        outgrowth1,
                                    );
                                    new_tree = shift_c_subbranch_c_on_one_step(
                                        new_tree,
                                        1,
                                        0,
                                    );
                                    is_connected = true;
                                    continue;
                                }

                            }

                        }

                    }
                }
            }
        }
    }
    return {
        is_connected: is_connected,
    }
}


