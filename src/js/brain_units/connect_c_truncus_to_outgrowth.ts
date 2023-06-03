import {get_c_parent_truncus_c_outgrowth} from "./get_c_parent_truncus_c_outgrowth";
import { is_exist_global_c_microfeature } from "./is_exist_global_c_microfeature";
import { get_c_og_c_child00s } from "./get_c_og_c_child00s";
import { get_child00s_c_from_floor00s } from "./get_child00s_c_from_floor00s";
import { is_exist_c_location_c_global_z_target_c_microfeature } from "./is_exist_c_location_c_global_z_target_c_microfeature";
import { generate_c_neuron_c_branch } from "../units/generate_c_neuron_c_branch";
import { collect_c_hierarchy_c_truncus00a } from "./collect_c_hierarchy_c_truncus00a";
import { is_exist_c_in_interval } from "../units/is_exist_c_in_interval";
import { is_exist_c_anemone_c_in_listner00s } from "./is_exist_c_anemone_c_in_listner00s";

//og - outgrowth

type anemone = outgrowth_c_usual[];
type branch = outgrowth_c_usual[];

type outgrowth_c_usual = {
    content: string,
    depth: number,
    v_index: number,
}
type outgrowth_short = { content: string, v_index: number };

type microfeature = {
    parent: string,
    child: string,
}
type twin = {
    og: outgrowth_c_usual,
    i: number,
    child00s: branch,
    child00s_si: number,
    child00s_li: number,
}

function get_c_og_c_acceptor_c_connector(neighbou00s:branch, tree_c_donor_c_truncus: string){

    let is_first = false;
    let is_verified = false;

    for (let i = 0; i < neighbou00s.length; i++) {
        let neighbour = neighbou00s[i];
        if(neighbour["content"] == tree_c_donor_c_truncus){
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
function translocate_c_arr_c_item(arr:any[], old_index:number, new_index:number) {

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
function translocate_c_outgrowth_as_donor(tree:any, connector_ind: number, acc_c_ind_c_twin:number, donor_v:number){
    let acceptor_c_depth = tree[connector_ind]["depth"] + 0;
    let new_pos:number = connector_ind+1;
    let obj = translocate_c_arr_c_item(tree, acc_c_ind_c_twin, new_pos);
    let arr:any[] = obj.arr;//tree = obj.arr;
    arr[obj.new_i]["depth"] = acceptor_c_depth + 1; //use depth parent edit arr=>tree
    arr[obj.new_i]["v_index"] = donor_v; //arr=>tree
    tree = arr;
    console.log("check\fix");
    
    let new_connector:number = connector_ind; //if_i00s_equal => no_changes

    if(connector_ind < acc_c_ind_c_twin){
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
function translocate_og_x_og_c_child00s(
    tree: {tree: branch},
    acc_i: number,
    child00s_interval: {
        start: number, 
        end: number
    },
    donor_c_vi: number,
){
    let parent_i = child00s_interval.start - 1;
    let ind = acc_i;
    for(let i = child00s_interval.end; i > parent_i; i--){
        let obj1 = translocate_c_outgrowth_as_donor( 
            tree.tree, 
            acc_i, 
            i, 
            donor_c_vi
        );
        console.log(tree);
        tree.tree = obj1.arr;
        ind = obj1.i;
    }
    return {
        arr: tree.tree,
        i: ind,
    };
}
function add_c_outgrowth_to_branch(
    tree: {tree: branch}, 
    donor_с_outgrowth: outgrowth_short, 
    parent_i: number,
){
    let target_c_pos: number = parent_i + 1,
        target_c_depth = tree.tree[parent_i].depth + 1,
        parent_content:any = tree.tree[target_c_pos-1]["content"],
        parent_c_obj = get_c_parent_truncus_c_outgrowth(tree.tree, target_c_pos-1);

    let target_c_neigbour00s = get_c_og_c_child00s(tree.tree, parent_i).outgrowth_s;
    
    if(parent_c_obj != false){
        parent_content = parent_c_obj.outgrowth_c_parent["content"];
    }
    for(let i = 0; i < target_c_neigbour00s.length; i++){
        if(donor_с_outgrowth.content == target_c_neigbour00s[i].content){
            return false
        }
    }
    if(is_exist_c_location_c_global_z_target_c_microfeature(
    parent_content, 
    donor_с_outgrowth.content
    )){
        donor_с_outgrowth["depth"] = target_c_depth;
        donor_с_outgrowth["v_index"] = donor_с_outgrowth.v_index;
        tree.tree.splice(target_c_pos, 0, {
            v_index: donor_с_outgrowth.v_index,
            depth: target_c_depth,
            content: donor_с_outgrowth.content
        });
        return true;
    } else {
        return false;
    }
}
function get_c_twin00s_c_obj(
    tree: branch,
    acceptor_c_i: number,
    og_donor: outgrowth_short,
){
    let twins: twin[] = [];
    let parent_c_obj = get_c_parent_truncus_c_outgrowth(tree, acceptor_c_i);
    if(parent_c_obj != false){

        //find_c_twin_c_in_inner_circle
        for (let i = parent_c_obj.index + 1; i < tree.length; i++) {
            if(tree[i].content == og_donor.content){
                //equal
                if(acceptor_c_i != i){
                    twins.push(get_twin(tree, i));
                }
            }
        }
        for (let i = 0; i < tree.length; i++) {
            if(tree[i].v_index){
                if(tree[i].content == og_donor.content){
                    //is_equal
                    if(acceptor_c_i != i){
                        twins.push(get_twin(tree, i));
                    }
                }
            }
        }

    } else {
        //parent not exist
        for (let i = 0; i < tree.length; i++) {
            if(tree[i].content == og_donor.content){
                //is_equal
                if(acceptor_c_i != i){
                    twins.push(get_twin(tree, i));
                }
            }
        }  
        //#check working
    }
    return twins;
}
function get_twin(tree: branch, i: number){
    let child00s = get_c_og_c_child00s(tree, i);
    return {
        og: tree[i],
        i: i,
        child00s:child00s.outgrowth_s,
        child00s_si: child00s.first_index,
        child00s_li: child00s.last_index,
    };
}
function is_exist_c_location_c_og_c_acc_c_child00s_zzz_target_c_twin(
    tree:branch,
    acc_i: number,
    twin: twin,
){
    let acc_c_child00s = get_c_og_c_child00s(tree, acc_i);
    if(acc_c_child00s.outgrowth_s.length == 0){
        return false;
    } else {
        //put_c_marker_c_check
        return is_exist_c_in_interval(
            tree,
            acc_i,
            [acc_c_child00s.first_index, acc_c_child00s.last_index]
        )
    }
}
function is_valid_c_twin_x_ancestor_c_current(
    tree: branch,
    cur_ind: number,
    tw_i: number,
    donor_c_content: string,
){
    let branch_cur = collect_c_hierarchy_c_truncus00a(tree, cur_ind);
    let branch_tw = collect_c_hierarchy_c_truncus00a(tree, tw_i);

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
                            if(is_exist_c_location_c_global_z_target_c_microfeature(tree[branch_cur[i+1]].content, donor_c_content)){
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
                            if(is_exist_c_location_c_global_z_target_c_microfeature(tree[branch_cur[i+1]].content, donor_c_content)){
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
    let new_array:outgrowth_short[] = [];

    for (let i = 1; i < target_anemone.length; i++) {
        for (let j = 0; j < parent_anemone.length; j++) {
            if(target_anemone[i].content == parent_anemone[j].content){
                new_array.push({content:target_anemone[i].content, v_index: target_anemone[i].v_index});
            }
        }
    }
    return new_array;
}
function extend_target_c_tree_z_origin_c_listner_anemone(
    tree: {tree: branch}, 
    cur_i:number,
    lst_anemone: outgrowth_short[],
){
    let a1_truncus = lst_anemone[0].content + "";
    let og00s_c_intersection00a:any = [];
    //filtration a1_og00s
    let parent_c_obj = get_c_parent_truncus_c_outgrowth(tree.tree, cur_i);
    if(parent_c_obj != false){
        let obj_lst = is_exist_c_anemone_c_in_listner00s(
            parent_c_obj.outgrowth_c_parent,
            false,
            false
        );
        if(obj_lst.is_exist == true){
            og00s_c_intersection00a = diff_og00s(lst_anemone, obj_lst.anemone);
        }
        //add_c_og00s_c_intersection00a
            let obj6 = connect_c_truncus_to_outgrowth(
                tree, 
                a1_truncus, 
                og00s_c_intersection00a, 
                {
                    start: cur_i,
                    count: "one"
                }, 
                false
            );
    } else {

    }

}
export function connect_c_truncus_to_outgrowth(
    tree: {tree: branch}, 
    truncus:string, 
    outgrowth00s:outgrowth_short[]|outgrowth_c_usual[], 
    pos:{
        start:number,
        count: string, //"limitless" or "one"
    },
    glob_is_active: boolean
){
    let is_connected:boolean = false;

    if(glob_is_active == true){
        window["tagbrain_graph"].ram.listner00s_c_anemone00a.push(
            [{content: truncus, v_index: 1}, ...outgrowth00s]
        );

        //get og00s with vi_c_0
    }
    

    for (let i = pos.start; i < tree.tree.length; i++) {

        //connect_to_c_interval_x_one_outgrowth
        if(pos.count == "one")
            if(i > pos.start)
                break;

        let tree_c_og_acceptor:outgrowth_c_usual = tree.tree[i];

        //check conntector
        if(tree_c_og_acceptor["content"] != truncus) {
            //next
            continue;
        } else {
            //start_connection
            for(let o_s = 0; o_s < outgrowth00s.length; o_s++){
                let tree_c_og_c_donor = outgrowth00s[o_s];

                let twin_с_acceptor00a_c_obj00s = get_c_twin00s_c_obj(tree.tree, i, tree_c_og_c_donor);
                if(twin_с_acceptor00a_c_obj00s.length > 0){
                    //twin_c_exist
                    for(let tw_i = twin_с_acceptor00a_c_obj00s.length - 1; tw_i >= 0; tw_i--){

                        let tw_obj = twin_с_acceptor00a_c_obj00s[tw_i];
                        let tw_obj_i:number = tw_obj.i;

                        if(tw_obj.child00s.length == 0){
                            //twin_child00s_c_not_exist
                            if(tw_obj.og.v_index == 0){
                                //twin_c_vi == 0
                                    if(is_valid_c_twin_x_ancestor_c_current(tree.tree, i, tw_obj_i, tree_c_og_c_donor.content)){
                                        //not other zone => can be translocated
                                        let obj1 = translocate_c_outgrowth_as_donor( 
                                            tree.tree, 
                                            i, 
                                            tw_obj_i, 
                                            tree_c_og_c_donor.v_index
                                        );
                                        i = obj1.i; //refresh index
                                        outgrowth00s.splice(o_s, 1);
                                        o_s = o_s - 1;

                                        //start recursive
                                        if(outgrowth00s.length != 0){
                                            let obj6 = connect_c_truncus_to_outgrowth(
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
                                        }
                                        
                                    } else {
                                        //other zone => can't be translocated 
                                        console.log(tree_c_og_c_donor)
                                    }
                                
                            } else if(tw_obj.og.v_index > 0){
                                //twin_c_vi > 0
                                if(is_exist_c_location_c_og_c_acc_c_child00s_zzz_target_c_twin(tree.tree, i, tw_obj)){
                                    //exist
                                    console.log("twin exist\n twin childs not exist \n og_c_acc_c_child00s exist");
                                    
                                } else {
                                    //not_exist
                                    if(is_exist_c_location_c_global_z_target_c_microfeature(truncus, tree_c_og_c_donor.content)){
                                        //add if donor better
                                    }
                                }
                            }
                        } else {

                            //twin child00s exist
                            if(tw_obj.og.v_index == 0){
                                //twin_c_vi == 0
                                if(is_exist_c_location_c_og_c_acc_c_child00s_zzz_target_c_twin(tree.tree, i, tw_obj)){
                                    console.log("add_code2");
                                    //exist acceptor_c_child00s_c_twin
                                    //remove_c_child00s_c_twin
                                        //translocate_twin_c_child00s if not exist each in acceptor
                                } else {
                                    //not_exist acceptor_c_child00s_c_twin
                                    translocate_og_x_og_c_child00s(
                                        tree,
                                        i,
                                        {start: tw_obj.child00s_si, end: tw_obj.child00s_li},
                                        tree_c_og_c_donor.v_index
                                    );
                                }
                            } else {
                                //twin_c_vi > 0
                                if(is_exist_c_location_c_global_z_target_c_microfeature(truncus, tree_c_og_c_donor.content)){
                                    
                                    let obj_lst0 = is_exist_c_anemone_c_in_listner00s(
                                        outgrowth00s[o_s],
                                        false,
                                        false
                                    );
                                    if(obj_lst0.is_exist){
                                        //extend_c_addition_c_origin_internal_listner
                                            //feature_c_not_exist
                                            let is_added = add_c_outgrowth_to_branch(
                                                tree, 
                                                tree_c_og_c_donor, 
                                                i,
                                            );
                                            if(is_added){
                                                outgrowth00s.splice(o_s, 1);
                                                o_s = o_s - 1;
                                                let lst_anemone = obj_lst0.anemone;
                                                extend_target_c_tree_z_origin_c_listner_anemone(
                                                    tree,
                                                    i+1,
                                                    obj_lst0.anemone,
                                                );
                                                is_connected = true;
                                            }
                                    } else {
                                        //usual addition
                                        add_c_outgrowth_to_branch(
                                            tree, 
                                            tree_c_og_c_donor, 
                                            i,
                                        );
                                        outgrowth00s.splice(o_s, 1); 
                                        o_s = o_s - 1;
                                    }
                                }
                            }
                        }
                    }
                } else {
                    //twin not_exist
                    add_c_outgrowth_to_branch(
                        tree, 
                        tree_c_og_c_donor, 
                        i,
                    );
                    is_connected = true;
                }
            }
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





    