
type a_outgrowth = {content: string, v_index: number};
type anemone = a_outgrowth[];
type anemones_collection = anemone[];

export function is_exist_L_location_L_global_z_target_L_microfeature(
    og_L_truncus00a: string,
    og_L_child00a: string,
    is_high_L_affinity: boolean,
){
    let anemone00s_deduction = window["tagbrain_graph"].ram.anemone00s.deduction;
    for (let i = 0; i < anemone00s_deduction.length; i++) {
        //take_L_one_anemone
        let anemone_L_deduction = anemone00s_deduction[i];
        //compare_L_with_listner_L_truncus
        if(og_L_truncus00a == anemone_L_deduction[0].content){
            for (let og_i = 1; og_i < anemone_L_deduction.length; og_i++) {
                if(anemone_L_deduction[og_i].content == og_L_child00a){
                    if(is_high_L_affinity == true){
                        if(anemone_L_deduction[og_i].v_index > 0){
                            return true
                        } else {
                            return false
                        }
                    } else {
                        return true
                    }
                } else {
                    continue
                }
            }
        }
    }
    return false;
}