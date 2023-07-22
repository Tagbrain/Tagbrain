
type a_outgrowth = {content: string, v_index: number};
type anemone = a_outgrowth[];
type anemones_collection = anemone[];

export function is_exist_c_location_c_global_z_target_c_microfeature(
    og_c_truncus00a: string,
    og_c_child00a: string,
    is_high_c_affinity: boolean,
){
    let anemone00s_deduction = window["tagbrain_graph"].ram.anemone00s.deduction;
    for (let i = 0; i < anemone00s_deduction.length; i++) {
        //take_c_one_anemone
        let anemone_c_deduction = anemone00s_deduction[i];
        //compare_c_with_listner_c_truncus
        if(og_c_truncus00a == anemone_c_deduction[0].content){
            for (let og_i = 1; og_i < anemone_c_deduction.length; og_i++) {
                if(anemone_c_deduction[og_i].content == og_c_child00a){
                    if(is_high_c_affinity == true){
                        if(anemone_c_deduction[og_i].v_index > 0){
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