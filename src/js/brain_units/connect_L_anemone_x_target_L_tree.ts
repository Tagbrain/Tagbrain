import {get_L_truncus_L_target_L_outgrowth} from "./get_L_truncus_L_target_L_outgrowth";
import { is_exist_global_L_microfeature } from "./is_exist_global_L_microfeature";
import { get_L_og_L_child00s } from "./get_L_og_L_child00s";
import { get_child00s_L_from_floor00s } from "./get_child00s_L_from_floor00s";
import { is_exist_L_location_L_global_z_target_L_microfeature } from "./is_exist_L_location_L_global_z_target_L_microfeature";
import { collect_L_hierarchy_L_truncus00a } from "./collect_L_hierarchy_L_truncus00a";
import { is_exist_L_in_interval } from "../units/is_exist_L_in_interval";
import { is_exist_L_anemone_L_in_listner00s } from "./is_exist_L_anemone_L_in_listner00s";
import { connect_L_anemone_L_truncus_z_target_L_tree } from "./connect_L_anemone_truncus_x_target_L_tree";

//og - outgrowth

type anemone = outgrowth_L_usual[];
type branch = outgrowth_L_usual[];

type outgrowth_L_usual = {
    content: string,
    depth: number,
    v_index: number,
}

type microfeature = {
    parent: string,
    child: string,
}
type twin = {
    og: outgrowth_L_usual,
    i: number,
    child00s: branch,
    child00s_si: number,
    child00s_li: number,
}

function get_L_og_L_acceptor_L_connector(neighbou00s:branch, tree_L_donor_L_truncus: string){

    let is_first = false;
    let is_verified = false;

    for (let i = 0; i < neighbou00s.length; i++) {
        let neighbour = neighbou00s[i];
        if(neighbour["content"] == tree_L_donor_L_truncus){
            if(i == 0){
                is_first = true;
            }
            if(neighbour["v_index"] > 0){
                is_verified = true;
            }
            return {
                og: neighbou00s[i],
                index: i,
                is_first: is_first, 
                is_verified: is_verified,
            }
        }
    }
}
function translocate_L_arr_L_item(arr:any[], old_index:number, new_index:number) {

    if (new_index == arr.length) {
        let spliced = arr.splice(old_index, 1);
        arr.push(spliced[0]);
        return {
            arr: arr,
            new_i: arr.length-1,
        };
    } else {
        let old_og = arr[old_index];
        //arr[old_index] == undefined;
        if(new_index > old_index){
            arr.splice(new_index, 0, old_og);
            arr.splice(old_index, 1);
            return {
                arr: arr,
                new_i: new_index - 1,
            };
        } else if(new_index < old_index){
            arr.splice(old_index, 1);
            arr.splice(new_index, 0, old_og);
            return {
                arr: arr,
                new_i: new_index,
            };
        } else {
            //new_index = old_index => do not change
            return {
                arr: arr,
                new_i: new_index,
            };
        }
    }
};
function translocate_L_tree_L_outgrowth_x_as_donor(
    tree:any, 
    connector_ind: number, 
    acc_L_twin_L_i:number, 
    donor_v:number
){
    let acceptor_L_depth = tree[connector_ind]["depth"] + 0;
    let new_pos:number = connector_ind+1;
    let obj = translocate_L_arr_L_item(tree, acc_L_twin_L_i, new_pos);
    let arr:any[] = obj.arr;//tree = obj.arr;
    arr[obj.new_i]["depth"] = acceptor_L_depth + 1; //use depth parent edit arr=>tree
    arr[obj.new_i]["v_index"] = donor_v; //arr=>tree
    tree = arr;
    
    let new_connector:number = connector_ind; //if_i00s_equal => no_changes

    if(connector_ind < acc_L_twin_L_i){
        if(connector_ind < new_pos){
            //no_changes
        } else {
            new_connector = connector_ind + 1;
        }
    } else {
        if(connector_ind < new_pos){
            new_connector = connector_ind - 1;
        } else {
            //no_changes
        }
    }

    return {
        arr: arr,
        i: new_connector,
    }
}
function cut_L_array(
    arr: any[], 
    from: number, 
    to: number
) {
    return arr.splice(from, to - from + 1);
}
function insert_L_array_L_at_index(mainArray: any[], arrayToInsert: any[], index: number) {
    mainArray.splice(index, 0, ...arrayToInsert);
    return mainArray;
}
function calibrate_с_chain_L_depth(
    chain: branch,
    callibrate_L_depth_L_step: number
){
    let zero_step = chain[0].depth + 0;
    for(let i = 0; i < chain.length; i++){
        chain[i].depth = chain[i].depth - zero_step + callibrate_L_depth_L_step;
    }
}
function translocate_og_x_og_L_child00s(
    tree: {tree: branch},
    acceptor_chain_L_i: number,
    child00s_interval: {
        start: number, 
        end: number
    },
    donor_L_vi: number,
){
    let parent_i = child00s_interval.start - 1;
    let chain_L_cutted = cut_L_array(tree.tree, parent_i, child00s_interval.end);

    if(acceptor_chain_L_i < parent_i){
        //acceptor_chain_L_i_L_is_stable
    } else {
        //acceptor_chain_L_i_L_is decreased_L_on_length_of_child00s
        acceptor_chain_L_i = acceptor_chain_L_i - chain_L_cutted.length;
    }

    //parent_L_future_position
    let parent_i_L_new = acceptor_chain_L_i + 1;

    calibrate_с_chain_L_depth(
        chain_L_cutted,
        tree.tree[acceptor_chain_L_i].depth + 1
    );

    //transfer_parent_x_child00s
    insert_L_array_L_at_index(
        tree.tree,
        chain_L_cutted,
        parent_i_L_new
    )
    //connect_parent
    let obj1 = translocate_L_tree_L_outgrowth_x_as_donor( 
        tree.tree, 
        acceptor_chain_L_i, 
        parent_i_L_new, 
        donor_L_vi
    );

    return {
        i: acceptor_chain_L_i + chain_L_cutted.length,
    };
}
function add_L_outgrowth_to_branch(
    tree: {tree: branch}, 
    donor_с_outgrowth: outgrowth_L_usual, 
    parent_i: number,
){
    let target_L_pos: number = parent_i + 1,
        target_L_depth = tree.tree[parent_i].depth + 1,
        parent_content:any = tree.tree[target_L_pos-1]["content"],
        parent_L_obj = get_L_truncus_L_target_L_outgrowth(tree.tree, target_L_pos-1);

    let target_L_neigbour00s = get_L_og_L_child00s(tree.tree, parent_i).outgrowth_s;
    
    if(parent_L_obj != false){
        parent_content = parent_L_obj.outgrowth_L_parent["content"];
    }
    for(let i = 0; i < target_L_neigbour00s.length; i++){
        if(donor_с_outgrowth.content == target_L_neigbour00s[i].content){
            return false
        }
    }
    if(is_exist_L_location_L_global_z_target_L_microfeature(
        parent_content, 
        donor_с_outgrowth.content,
        false
    )){
        donor_с_outgrowth["depth"] = target_L_depth;
        donor_с_outgrowth["v_index"] = donor_с_outgrowth.v_index;
        tree.tree.splice(target_L_pos, 0, {
            v_index: donor_с_outgrowth.v_index,
            depth: target_L_depth,
            content: donor_с_outgrowth.content
        });
        return true;
    } else {
        return false;
    }
}
function get_L_twin00s_L_obj(
    tree: branch,
    acceptor_L_i: number,
    og_donor: outgrowth_L_usual,
){
    let twins: twin[] = [];
    let parent_L_obj = get_L_truncus_L_target_L_outgrowth(tree, acceptor_L_i);
    if(parent_L_obj != false){

        //find_L_twin_L_in_inner_circle
        for (let i = 0; i < tree.length; i++) {
            if(tree[i].content == og_donor.content){
                //equal
                if(acceptor_L_i != i){
                    twins.push(get_twin(tree, i));
                }
            }
        }

    } else {
        //parent not exist
        for (let i = 0; i < tree.length; i++) {
            if(tree[i].content == og_donor.content){
                //is_equal
                if(acceptor_L_i != i){
                    twins.push(get_twin(tree, i));
                }
            }
        }  
        //#check working
    }
    return twins;
}
function get_twin(tree: branch, i: number){
    let child00s = get_L_og_L_child00s(tree, i);
    return {
        og: tree[i],
        i: i,
        child00s:child00s.outgrowth_s,
        child00s_si: child00s.first_index,
        child00s_li: child00s.last_index,
    };
}
function is_exist_L_location_L_og_L_acc_L_child00s_zzz_target_L_twin(
    tree:branch,
    acc_i: number,
){
    let acc_L_child00s = get_L_og_L_child00s(tree, acc_i);
    if(acc_L_child00s.outgrowth_s.length == 0){
        return false;
    } else {
        //put_L_marker_L_check
        return is_exist_L_in_interval(
            tree,
            acc_i,
            [acc_L_child00s.first_index, acc_L_child00s.last_index]
        )
    }
}
function is_valid_L_twin_x_ancestor_L_current(
    tree: branch,
    cur_ind: number,
    tw_i: number,
    donor_L_content: string,
){
    let branch_cur = collect_L_hierarchy_L_truncus00a(tree, cur_ind);
    let branch_tw = collect_L_hierarchy_L_truncus00a(tree, tw_i);

    for (let i = branch_cur.length - 1; i >= 0; i--) {
        for (let j = branch_tw.length - 1; j >= 0; j--) {
            if(branch_cur[i] == branch_tw[j]){
                let connector = branch_cur[i];
                //////////////////////////
                if(connector == cur_ind){
                    return true;
                } else if (connector < cur_ind){
                    if(branch_tw[j+1] != tw_i){
                        return false;
                    } else {
                        if(tree[branch_tw[j+1]].v_index == 0)
                            if(is_exist_L_location_L_global_z_target_L_microfeature(
                                    tree[branch_cur[i+1]].content,
                                    donor_L_content,
                                    false
                                )){
                                return true;
                            } else {
                                return false;
                            }
                    }
                } else {console.log("#error")}
                //////////////////////////
                //may be connector 
                    //branch_tw[j+1] is branche_founder
                    /*
                    if(branch_tw[j+1] < tw_i){
                        return false;
                    } else {
                        if(tree[branch_tw[j+1]].v_index == 0)
                            if(is_exist_L_location_L_global_z_target_L_microfeature(tree[branch_cur[i+1]].content, donor_L_content, false)){
                                return true;
                            } else {
                                return false;
                            }
                    }*/
            }
        }
    }

    return true
}
function diff_og00s(
    target_anemone:any[],
    parent_anemone:any[],
){
    let new_array:outgrowth_L_usual[] = [];
    for (let i = 1; i < target_anemone.length; i++) {
        for (let j = 0; j < parent_anemone.length; j++) {
            if(target_anemone[i].content == parent_anemone[j].content){
                new_array.push({content:target_anemone[i].content, v_index: target_anemone[i].v_index, depth: target_anemone[i].depth});
            }
        }
    }
    return new_array;
}
function get_L_og_L_with_sel_L_true(
    tree: branch,
){
    for (let i = 0; i < tree.length; i++) {
        if ("sel" in tree[i]) {
            return i;
        }
    }
    return -1;
}
function extend_target_L_tree_z_origin_L_listner_anemone(
    tree: {tree: branch}, 
    cur_i:number,
    lst_anemone: outgrowth_L_usual[],
){
    let a1_truncus = lst_anemone[0].content + "";
    let og00s_L_intersection00a:any = [];
    //filtration a1_og00s
    let parent_L_of_current = get_L_truncus_L_target_L_outgrowth(tree.tree, cur_i);
    if(parent_L_of_current != false){
        let obj_lst = is_exist_L_anemone_L_in_listner00s(
            parent_L_of_current.outgrowth_L_parent,
            false,
            false
        );
        if(obj_lst.is_exist == true){
            og00s_L_intersection00a = diff_og00s(lst_anemone, obj_lst.anemone);
        }
        //put_L_og_L_sel_L_true
        tree.tree[cur_i]["sel"] = true;
        //add_L_og00s_L_intersection00a
            let obj6 = connect_L_anemone_x_target_L_tree(
                tree, 
                a1_truncus, 
                og00s_L_intersection00a, 
                {
                    start: cur_i,
                    count: "one"
                }, 
                false
            );
        let num = get_L_og_L_with_sel_L_true(tree.tree);
        if(num != -1){
            //cut_L_og_L_sel_L_true
            delete tree.tree[num]["sel"];
            if(obj6.is_connected == true){
                return {
                    index: num,
                    is_extended: true
                }
            } else {
                return {
                    index: num,
                    is_extended: false
                }
            }
        } else {
            if(obj6.is_connected == true){
                return {
                    index: 0,
                    is_extended: true
                }
            } else {
                return {
                    index: 0,
                    is_extended: false
                }
            }
        }
    } else{
        console.log("error:629745934856");
    }
}
function is_can_extend_L_from_truncus(
    tree: branch,
    pos: number,
    og00s: outgrowth_L_usual[]

){
    for (let i = 0; i < og00s.length; i++) {
        if(og00s[i].v_index > 0)
            if(tree[pos].content == og00s[i].content){
                //check_exist_feature_in_hierarchy
                return true
            }
    }
    return false
}
export function connect_L_anemone_x_target_L_tree(
    tree: {tree: branch}, 
    truncus: string, 
    outgrowth00s: outgrowth_L_usual[], 
    pos:{
        start: number,
        count: string, //"limitless" or "one"
    },
    glob_is_active: boolean
){
    let is_connected:boolean = false;

    if(glob_is_active == true){
        window["tagbrain_graph"].ram.listner00s_L_anemone00a.push(
            [{content: truncus, v_index: 1}, ...outgrowth00s]
        );

        //get og00s with vi_L_0
    }
    
    for (let i = pos.start; i < tree.tree.length; i++) {

        //connect_to_L_interval_x_one_outgrowth
        if(pos.count == "one")
        if(i > pos.start)
            break;
        // try to connect => basic algorithm
        if(is_can_extend_L_from_truncus(
            tree.tree,
            i,
            outgrowth00s
            )){
                let obj_connection = connect_L_anemone_L_truncus_z_target_L_tree(
                    tree,
                    i,
                    truncus,
                    outgrowth00s,
                );
                if(obj_connection.is_connected == true){
                    is_connected = true;
                    i = obj_connection.index - 1;
                    continue;
                }
        }
        
        let tree_L_og_acceptor:outgrowth_L_usual = tree.tree[i];

        //check conntector
        if(tree_L_og_acceptor["content"] != truncus) {
            //next
            continue;
        } else {//start_connection
            for(let o_i = 0; o_i < outgrowth00s.length; o_i++){
                let is_reduced_L_by_one = false;
                let tree_L_og_L_donor = outgrowth00s[o_i];

                let twin_с_acceptor00a_L_obj00s = get_L_twin00s_L_obj(tree.tree, i, tree_L_og_L_donor);
                if(twin_с_acceptor00a_L_obj00s.length > 0){//twin_L_exist
                    for(let tw_i = twin_с_acceptor00a_L_obj00s.length - 1; tw_i >= 0; tw_i--){

                        let tw_obj = twin_с_acceptor00a_L_obj00s[tw_i];
                        let tw_obj_i:number = tw_obj.i;

                        if(tw_obj.child00s.length == 0){//twin_child00s_L_not_exis
                            if(tw_obj.og.v_index == 0){//twin_L_vi == 0
                                    if(is_valid_L_twin_x_ancestor_L_current(tree.tree, i, tw_obj_i, tree_L_og_L_donor.content)){
                                        //not other zone => can be translocated
                                        let obj1 = translocate_L_tree_L_outgrowth_x_as_donor( 
                                            tree.tree, 
                                            i, 
                                            tw_obj_i, 
                                            tree_L_og_L_donor.v_index
                                        );
                                        i = obj1.i; //refresh index

                                        if(is_reduced_L_by_one == false){
                                            is_reduced_L_by_one = true;
                                            outgrowth00s.splice(o_i, 1);
                                            o_i = o_i - 1;
                                        }

                                        /*start recursive
                                        if(outgrowth00s.length != 0){
                                            let obj6 = connect_L_anemone_x_target_L_tree(
                                                tree, 
                                                truncus, 
                                                outgrowth00s, 
                                                {
                                                    start:i,
                                                    count: "limitless"
                                                }, 
                                                false
                                            );
                                            is_connected = obj6.is_connected;
                                            //tree.tree = obj6.structure; #remove
                                        }*/
                                        
                                    } else {//other zone => can't be translocated 

                                    }
                                
                            } else if(tw_obj.og.v_index > 0){//twin_L_vi > 0
                                //is_child_L_twin_x_target_L_tree_L_og_acceptor
                
                                let parent_L_twin = get_L_truncus_L_target_L_outgrowth(
                                    tree.tree,
                                    tw_obj.i
                                )
                                if(parent_L_twin != false){
                                    if(is_exist_L_location_L_global_z_target_L_microfeature(
                                        parent_L_twin.outgrowth_L_parent.content, 
                                        tree_L_og_L_donor.content,// stupid, it is clear from conditions
                                        false
                                    )){
                                    } else {
                                        add_L_outgrowth_to_branch(
                                            tree, 
                                            tree_L_og_L_donor, 
                                            i,
                                        );
                                        if(is_reduced_L_by_one == false){
                                            is_reduced_L_by_one = true;
                                            outgrowth00s.splice(o_i, 1);
                                            o_i = o_i - 1;
                                        }
                                    }
                                }
                            }
                        } else {
                            //twin child00s exist

                            if(tw_obj.og.v_index == 0){
                                //twin_L_vi == 0
                                if(tree_L_og_L_donor.v_index > 0)
                                if(is_exist_L_location_L_og_L_acc_L_child00s_zzz_target_L_twin(tree.tree, i)){
                                    console.log("#CHECK CODE! This function is need CHANGE");
                                    //exist acceptor_L_child00s_L_twin
                                    //remove_L_child00s_L_twin
                                        //translocate_twin_L_child00s if not exist each in acceptor
                                } else {
                                    //not_exist acceptor_L_child00s_L_twin
                                    translocate_og_x_og_L_child00s(
                                        tree,
                                        i,
                                        {start: tw_obj.child00s_si, end: tw_obj.child00s_li},
                                        tree_L_og_L_donor.v_index
                                    );
                                    /*
                                    if(is_reduced_L_by_one == false){
                                        is_reduced_L_by_one = true;
                                        outgrowth00s.splice(o_i, 1);
                                        o_i = o_i - 1;
                                    }
                                    is_connected = true;*/
                                }
                            } else {
                                //twin_L_vi > 0
                                if(tree_L_og_L_donor.v_index > 0){
                                //if(is_exist_L_location_L_global_z_target_L_microfeature(
                                        //truncus, 
                                        //tree_L_og_L_donor.content,
                                        //false
                                    //)){
                                    let obj_lst0 = is_exist_L_anemone_L_in_listner00s(
                                        tree_L_og_L_donor,
                                        false,
                                        false
                                    );
                                    if(obj_lst0.is_exist){
                                        //extend_L_addition_L_origin_internal_listner
                                            //feature_L_not_exist
                                            let is_added = add_L_outgrowth_to_branch(
                                                tree, 
                                                tree_L_og_L_donor, 
                                                i,
                                            );
                                            if(is_added){
                                                if(is_reduced_L_by_one == false){
                                                    is_reduced_L_by_one = true;
                                                    outgrowth00s.splice(o_i, 1);
                                                    o_i = o_i - 1;
                                                }
;
                                                let f_L_is_connected = extend_target_L_tree_z_origin_L_listner_anemone(
                                                    tree,
                                                    i+1,
                                                    obj_lst0.anemone,
                                                );
                                                if(f_L_is_connected != undefined)
                                                    if(f_L_is_connected.is_extended)
                                                        i = f_L_is_connected.index;
                                                //change i position
                                                is_connected = true;
                                            }
                                    } else {
                                        //usual addition
                                        add_L_outgrowth_to_branch(
                                            tree, 
                                            tree_L_og_L_donor, 
                                            i,
                                        );
                                        if(is_reduced_L_by_one == false){
                                            is_reduced_L_by_one = true;
                                            outgrowth00s.splice(o_i, 1);
                                            o_i = o_i - 1;
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {//twin not_exist
                    let is_added = add_L_outgrowth_to_branch(
                        tree, 
                        tree_L_og_L_donor, 
                        i,
                    );
                    if(is_added){
                        is_connected = true;
                    }
                }
                
            }//end outgrowth00s rerange
        }
        is_connected = true;
        //break;

    }
    //REMOVE ITEMS WITH V_INDEX == -1
    return {
        //structure: tree.tree, #remove
        is_connected:is_connected,
        outgrowth00s: outgrowth00s,
    }
}





    