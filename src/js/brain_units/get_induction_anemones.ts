type outgrowth = {content: string, v_index: number, depth: number};
type anemone = outgrowth[];
type anemones_collection = anemone[];

export function get_induction_anemones(anemone00s_L_deduction: anemones_collection) {
    let anemone00s_induction: anemones_collection = [] as anemones_collection;
    let len = anemone00s_L_deduction.length;

    //get_L_anemone_L_deduction
    for (let i = 0; i < len; i++) {
        let anemone = anemone00s_L_deduction[i];
        let truncus = anemone[0];
        for (let j = 1; j < anemone.length; j++) { 
            let og = anemone[j];
            truncus.v_index = og.v_index;
            let is_exist_L_main_stream = false
            //check_exist_L_target_L_anemone00s_induction
            for (let a = 0; a < anemone00s_induction.length; a++) {
                let main_stream = anemone00s_induction[a][0];
                if(main_stream.content == og.content){
                    is_exist_L_main_stream = true
                    //main_stream_L_exist
                        //check_exist_truncus_in_feeder_stream
                        if(is_exist_truncus_in_feeder_stream00s(truncus, anemone00s_induction[a])){//exist
                            continue
                        } else {//not_exist
                            anemone00s_induction[a].push(truncus)
                        }
                } else {
                    continue
                }
            }
            if(!is_exist_L_main_stream){
                //main_stream_L_not_exist
                let anemone_induction = [og, truncus];
                anemone00s_induction.push(anemone_induction)
            }

        }
    }
    anemone00s_induction = filterShortArrays(anemone00s_induction);
    return anemone00s_induction;
}
function is_exist_truncus_in_feeder_stream00s(
    truncus: outgrowth,
    anemone00s_induction:outgrowth[]
){
    for (let i = 1; i < anemone00s_induction.length; i++) {
        if(anemone00s_induction[i] == truncus){
            return true
        }
    }
    return false;
}
function filterShortArrays(arrays:anemone[]) {
    return arrays.filter(array => array.length > 2);
}






