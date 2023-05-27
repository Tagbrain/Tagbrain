import { get_c_parent_truncus_c_outgrowth } from "./get_c_parent_truncus_c_outgrowth";

type a_outgrowth = { content: string, v_index: number };
type anemone = a_outgrowth[];
type anemones_collection = anemone[];

export function is_exist_global_c_microfeature(
    donor_a_c_truncus: string,
    tree: any[],
    i: number,
){
    let a_s_deduction = window["tagbrain_graph"].ram.anemone00s.deduction;
    let parent_c_connector_c_obj = get_c_parent_truncus_c_outgrowth(tree, i);

    if(parent_c_connector_c_obj != false){

        let parent_c_connector = parent_c_connector_c_obj.outgrowth_c_parent["content"];

        for (let i = 0; i < a_s_deduction.length; i++) {
            let anemone:anemone = a_s_deduction[i],
            truncus: string = anemone[0].content;
            if(truncus == parent_c_connector){
                for (let j = 1; j < anemone.length; j++) {
                    if(donor_a_c_truncus == anemone[j]["content"]){
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