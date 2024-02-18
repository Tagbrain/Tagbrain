import { get_L_truncus_L_target_L_outgrowth } from "./get_L_truncus_L_target_L_outgrowth";
import { get_L_og_L_child00s } from "./get_L_og_L_child00s";
import { get_child00s_L_from_floor00s } from "./get_child00s_L_from_floor00s";
import { is_exist_global_L_microfeature } from "./is_exist_global_L_microfeature";
import { collect_L_hierarchy_L_truncus00a } from "./collect_L_hierarchy_L_truncus00a";
import { is_exist_L_location_L_global_z_target_L_microfeature } from "./is_exist_L_location_L_global_z_target_L_microfeature";

type a_outgrowth = { content: string, v_index: number, depth: number };
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

function shift_L_subbranch_L_depth_L_on_one_step(
    tree:{tree:branch},
    i_L_connector: number,
){
    let child00s = get_L_og_L_child00s(
        tree.tree,
        i_L_connector
    )
    //shift_L_parent
    tree.tree[i_L_connector].depth = tree.tree[i_L_connector]["depth"] + 1;
    if(child00s.outgrowth_s.length != 0)
        for (let y = child00s.first_index; y <= child00s.last_index; y++) {
            tree.tree[y]["depth"] = tree.tree[y]["depth"] + 1;
        }
}
function is_exist_L_twin_L_target_L_hierarchy(
    tree: branch,
    connector_ind: number,
    twin: string
){
    let hierarchy = collect_L_hierarchy_L_truncus00a(
        tree,
        connector_ind
    );
    for (let i = hierarchy.length - 1; i >= 0; i--) {
        let ancestor = hierarchy[i];
        if(ancestor.content == twin){
            if(ancestor.v_index > 0)
                return true
        }
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
    let child00s_L_obj = get_L_og_L_child00s(tree, connector_ind);
    //tree = child00s_L_obj.remained; #remove

    let num00s: number[] = [connector_d+ 1, connector_d+ 2];
    let floor00s_L_child00s: any[] = get_child00s_L_from_floor00s(child00s_L_obj, num00s);

    //find similar outgrowth in neighbours
    for (const [floor_d, floor_L_child00s] of Object.entries(floor00s_L_child00s)) {
        for (let y = 0; y < floor_L_child00s.length; y++) {
            if(Number(floor_d) - tree[connector_ind]["depth"] <= 2){
                if(floor_L_child00s[y]["content"] == truncus){
                    return true;
                }
            }
        }
    }

    return false;
}
function is_exist_L_donor_x_target_L_neighbour(
    tree: branch,
    parent_L_i: number,
    donor_L_truncus: string
){
    let child00s = get_L_og_L_child00s(
        tree,
        parent_L_i
    );
    for (let i = child00s.first_index; i <= child00s.last_index; i++) {
        if(tree[i].depth == tree[parent_L_i].depth + 1)
            if(tree[i].content == donor_L_truncus)
                return true
    }
    return false
}

export function connect_L_anemone_L_truncus_z_target_L_tree(
    tree: {tree: branch},
    ind: number,
    donor_L_truncus: string,
    donor_L_outgrowth00s: a_outgrowth[],
){
    let is_connected = false;
    let connector = tree.tree[ind];
    let index_array_memory:number[] = [];
    let inserted_i = 0;
    for (let i = 0; i < donor_L_outgrowth00s.length; i++) {
        if(donor_L_outgrowth00s[i].v_index > 0){//feature_L_global_x_exist
            if(connector["content"] == donor_L_outgrowth00s[i]["content"]){
                index_array_memory.push(i);
                let donor_L_og = donor_L_outgrowth00s[i];

                if (ind == 0) {//first
                    let og_L_donor = {
                        content: donor_L_truncus, 
                        v_index: 1, 
                        depth: 0,
                    }
                    shift_L_subbranch_L_depth_L_on_one_step(
                        tree,
                        0
                    )
                    tree.tree.splice(//add_L_unit_L_target_L_arr_L_ind
                        ind, 
                        0, 
                        og_L_donor
                    );
                    is_connected = true;
                    break
                }
                /*
                else {//not first
                    if(is_exist_L_twin_L_target_L_hierarchy(
                            tree.tree,
                            ind,
                            donor_L_og.content
                    )){
                        //continue
                    } else {//
                        let obj_parent = get_L_truncus_L_target_L_outgrowth(
                            tree.tree,
                            ind
                        )
                        if(obj_parent != false){
                            //is_exist_node_L_between two 
                            if(is_exist_L_location_L_global_z_target_L_microfeature(
                                obj_parent.outgrowth_L_parent.content, 
                                donor_L_truncus,
                                true
                            )){//transfer
                                if(is_exist_L_donor_x_target_L_neighbour(
                                    tree.tree,
                                    obj_parent.index,
                                    donor_L_truncus
                                )){
                                    //return in external
                                } else {

                                    //push_L_before_L_child
                                    let og_L_donor = {
                                        content: donor_L_truncus, 
                                        v_index: 1, 
                                        depth: tree.tree[ind].depth,
                                    }
                                    shift_L_subbranch_L_depth_L_on_one_step(
                                        tree,
                                        ind
                                    )
                                    tree.tree[ind].v_index = 1; // because high_affinity = true in is_exist_L_location_L_global_z_target_L_microfeature
                                    inserted_i = ind;
                                    tree.tree.splice(//add_L_unit_L_target_L_arr_L_ind
                                        ind, 
                                        0, 
                                        og_L_donor
                                    );
                                    is_connected = true;
                                    break
                                }

                            }
                        }
                    }
                }*/
                
            }
        }
    }
    
    return {
        is_connected: is_connected,
        index: inserted_i
    }
}


