import { get_c_og_c_child00s } from "../brain_units/get_c_og_c_child00s";
import {get_c_parent_truncus_c_outgrowth} from "../brain_units/get_c_parent_truncus_c_outgrowth";
import {connect_c_truncus_to_outgrowth} from "../brain_units/connect_c_truncus_to_outgrowth";

type anemone = outgrowth_c_usual[];
type branch = outgrowth_c_usual[];
type outgrowth_c_usual = {
    content: string,
    depth: number,
    v_index: number,
}
type outgrowth_short = { content: string, v_index: number };

function get_parent_c_from_anemone_c_induction(
    anemone00s_induction: anemone[],
    main_stream: string
){
    for(let i = 0; i < anemone00s_induction.length; i++){
        let anemone = anemone00s_induction[i];
        if(main_stream == anemone[0].content){
            for(let j = 1; j < anemone.length; j++){
                if(anemone[j].v_index == 1){
                    return anemone[j].content;
                };
            }
        }
    }
}
function extend_c_child_to_child_branch(
    anemone00s_induction: anemone[],
    parent: string,
    og_c_current: string
){
    function start_c_collector_c_child_branch(
        subchain: branch,
        og_c_current: string
    ):any{
        let chain_item = get_parent_c_from_anemone_c_induction(anemone00s_induction, og_c_current);
        if(chain_item != undefined){
            subchain.unshift({content: chain_item, depth: 0, v_index: 1});
        
            if(chain_item == parent){
                return subchain;
            } else {
                return start_c_collector_c_child_branch(
                    subchain,
                    chain_item
                );
            }
        }
    }
    let subchain: branch = [{content: og_c_current, depth: 0, v_index: 1}];
    let chain_item = get_parent_c_from_anemone_c_induction(anemone00s_induction, og_c_current);
    if(chain_item != undefined){
        subchain.unshift({content: chain_item, depth: 0, v_index: 1});
        if(chain_item == parent){
            return subchain;
            //never_read #remove
        } else {//if not equal
            return start_c_collector_c_child_branch(
                subchain,
                chain_item
            )
        }
    }
}
export function extend_c_tree_c_chain(
    tree: {tree: branch}
){
    let pos_c_stop = 0;
    let depth_c_stop = 0;
    for(let i = 0; i < tree.tree.length; i++){
        let og = tree.tree[i];
        if(og.v_index == 0){
            pos_c_stop = i;
            let anemone00s_induction = window["tagbrain_graph"].ram.anemone00s.induction;
            //get_c_target_c_parent_c_with_child_c_current_outgrowth
            let parent_c_obj = get_c_parent_truncus_c_outgrowth(tree.tree, i);
            if(parent_c_obj != false){
                let parent_i = parent_c_obj.index;
                let og_c_parent = tree.tree[parent_c_obj.index];
                let depth_c_stop = og_c_parent.depth;
                //get_child00s_with_vi_c_0
                let p_c_child00s = get_c_og_c_child00s(tree.tree, parent_i);

                let child_subbranch = extend_c_child_to_child_branch(
                    anemone00s_induction,
                    tree[parent_i],
                    og.content
                );
                child_subbranch.unshift({
                    content: tree[parent_i],
                    depth: 0, 
                    v_index: 1}
                )

                for(let j = 1; j < child_subbranch.length; j++){
                    let obj6 = connect_c_truncus_to_outgrowth(
                        tree, 
                        child_subbranch[j-1], //truncus
                        child_subbranch[j], //outgrowth
                        {
                            start: parent_i+j-1,
                            count: "one"
                        }, 
                        false
                    );
                }
            } else {
                console.log("Attention!\#remove_c_row")
            }
        }
    }
    
}