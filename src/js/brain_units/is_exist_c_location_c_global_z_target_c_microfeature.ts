
type a_outgrowth = {content: string, v_index: number};
type anemone = a_outgrowth[];
type anemones_collection = anemone[];

export function is_exist_c_location_c_global_z_target_c_microfeature(
    og_c_truncus00a: string,
    og_c_child00a: string,
){
    let a_s_deduction = window["tagbrain_graph"].ram.anemone00s.deduction;
    for (let i = 0; i < a_s_deduction.length; i++) {
        let anemone:anemone = a_s_deduction[i],
        truncus: string = anemone[0].content;
        if(truncus == og_c_truncus00a){
            for (let j = 1; j < anemone.length; j++) {
                if(og_c_child00a == anemone[j]["content"]){
                    return true;
                }
            }
        } else {
            continue;
        }
    }
    return false;
}