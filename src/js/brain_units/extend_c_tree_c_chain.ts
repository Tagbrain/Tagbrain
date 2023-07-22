import { get_c_og_c_child00s } from "../brain_units/get_c_og_c_child00s";
import {get_c_truncus_c_target_c_outgrowth} from "../brain_units/get_c_truncus_c_target_c_outgrowth";
import {connect_c_anemone_x_target_c_tree} from "../brain_units/connect_c_anemone_x_target_c_tree";
import { is_exist_c_anemone_c_in_listner00s } from "./is_exist_c_anemone_c_in_listner00s";
import { is_exist_c_in_interval } from "../units/is_exist_c_in_interval";

type anemone = outgrowth_c_usual[];
type branch = outgrowth_c_usual[];
type outgrowth_c_usual = {
    content: string,
    depth: number,
    v_index: number,
}

export function extend_c_tree_c_chain(
    tree: {tree: branch}
){
    for(let i = 0; i < tree.tree.length; i++){
        let og = tree.tree[i];//not_verified
        if(og.v_index == 0){
            let anemone00s_induction = window["tagbrain_graph"].ram.anemone00s.induction;
            //get_c_target_c_parent_c_with_child_c_current_outgrowth
            let parent_c_obj = get_c_truncus_c_target_c_outgrowth(tree.tree, i);
            if(parent_c_obj != false){

                let parent_i = parent_c_obj.index;
                let og_c_parent = tree.tree[parent_c_obj.index];

                let obj_c_p_c_child00s = get_c_og_c_child00s(tree.tree, parent_i);
                let i_c_1 = obj_c_p_c_child00s.first_index;
                let i_c_2 = obj_c_p_c_child00s.last_index;

                //og_c_vi_c_0
                    //og_c_i
                let og_c_child00s = get_c_og_c_child00s(tree.tree, i);

                let o = i_c_1;
                while(o <= i_c_2){
                    //is_exist_c_in_interval_c_branch_c_not_verified
                    if(!is_exist_c_in_interval(
                        tree.tree,
                        o,
                        [i, og_c_child00s.last_index]
                    )){
                        let some_child = tree.tree[o];
                        if(some_child.v_index > 0){
                            //verified
                            if(is_exist_c_anemone_c_in_listner00s(
                                some_child,
                                og,
                                true
                            ).is_exist){

                                let obj6 = connect_c_anemone_x_target_c_tree(
                                    tree, 
                                    some_child.content, //truncus
                                    [og], //outgrowth
                                    {
                                        start: o,
                                        count: "one"
                                    }, 
                                    false
                                );

                            } 
                        } 
                    }
                    o++;
                }

            } else {
                console.log("Attention!\#remove_c_row")
            }
        }
    }
    
}