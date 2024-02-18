import { get_L_truncus_L_target_L_outgrowth } from "./get_L_truncus_L_target_L_outgrowth";

type a_outgrowth = { content: string, v_index: number };
type anemone = a_outgrowth[];
type anemones_collection = anemone[];

export function is_exist_global_L_microfeature(
    donor_a_L_truncus: string,
    tree: any[],
    i: number,
){
    let a_s_deduction = window["tagbrain_graph"].ram.anemone00s.deduction;
    let parent_L_connector_L_obj = get_L_truncus_L_target_L_outgrowth(tree, i);

    if(parent_L_connector_L_obj != false){

        let parent_L_connector = parent_L_connector_L_obj.outgrowth_L_parent["content"];

        for (let i = 0; i < a_s_deduction.length; i++) {
            let anemone:anemone = a_s_deduction[i],
            truncus: string = anemone[0].content;
            if(truncus == parent_L_connector){
                for (let j = 1; j < anemone.length; j++) {
                    if(donor_a_L_truncus == anemone[j]["content"]){
                        return true;
                    }
                }
            } else {
                continue;
            }
        }

    } else {//parent not exist
        return true;
    }
    return false;
}