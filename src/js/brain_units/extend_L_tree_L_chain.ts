import { get_L_og_L_child00s } from "../brain_units/get_L_og_L_child00s";
import {get_L_truncus_L_target_L_outgrowth} from "../brain_units/get_L_truncus_L_target_L_outgrowth";
import {connect_L_anemone_x_target_L_tree} from "../brain_units/connect_L_anemone_x_target_L_tree";
import { is_exist_L_anemone_L_in_listner00s } from "./is_exist_L_anemone_L_in_listner00s";
import { is_exist_L_in_interval } from "../units/is_exist_L_in_interval";

type anemone = outgrowth_L_usual[];
type branch = outgrowth_L_usual[];
type outgrowth_L_usual = {
    content: string,
    depth: number,
    v_index: number,
}

export function extend_L_tree_L_chain(
    tree: {tree: branch}
){
    for(let i = 0; i < tree.tree.length; i++){
        let og = tree.tree[i];//not_verified
        if(og.v_index == 0){
            let anemone00s_induction = window["tagbrain_graph"].ram.anemone00s.induction;
            //get_L_target_L_parent_L_with_child_L_current_outgrowth
            let parent_L_obj = get_L_truncus_L_target_L_outgrowth(tree.tree, i);
            if(parent_L_obj != false){

                let parent_i = parent_L_obj.index;
                let og_L_parent = tree.tree[parent_L_obj.index];

                let obj_L_p_L_child00s = get_L_og_L_child00s(tree.tree, parent_i);
                let i_L_1 = obj_L_p_L_child00s.first_index;
                let i_L_2 = obj_L_p_L_child00s.last_index;

                //og_L_vi_L_0
                    //og_L_i
                let og_L_child00s = get_L_og_L_child00s(tree.tree, i);

                let o = i_L_1;
                while(o <= i_L_2){
                    //is_exist_L_in_interval_L_branch_L_not_verified
                    if(!is_exist_L_in_interval(
                        tree.tree,
                        o,
                        [i, og_L_child00s.last_index]
                    )){
                        let some_child = tree.tree[o];
                        if(some_child.v_index > 0){
                            //verified
                            if(is_exist_L_anemone_L_in_listner00s(
                                some_child,
                                og,
                                true
                            ).is_exist){

                                let obj6 = connect_L_anemone_x_target_L_tree(
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
                console.log("Attention!\#remove_L_row")
            }
        }
    }
    
}