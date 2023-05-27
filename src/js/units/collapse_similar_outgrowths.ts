type outgrowth = {content: string, v_index: number};
type anemone = outgrowth[];
type anemones_collection = anemone[];

export function collapse_similar_outgrowths(all_microfeature00s: anemones_collection) {
    for (let i = 0; i < all_microfeature00s.length; i++) {
        let anemone = all_microfeature00s[i];
        //iterate_c_anemone_c_og00s
        outer: for (let j = 0; j < anemone.length; j++) {
            let current_outgrowth = anemone[j];

            //check all outgrowth in the anemone
            for (let z = j + 1; z < anemone.length; z++) {
                let addition_outgrowth = anemone[z];

                if (current_outgrowth["content"] == addition_outgrowth["content"]) {
                    if(j == 0){//current_is_truncus
                        anemone.splice(z, 1);
                        z = z - 1;
                    } else {//addition_is_outgrowth
                        let ao_c_vi = addition_outgrowth["v_index"];
                        let co_c_vi = current_outgrowth["v_index"];
    
                        let sum_c_vi:number = 0;
                        if (co_c_vi == 0 && ao_c_vi == 0) {
                            sum_c_vi = 0.5;
                        } else {
                            sum_c_vi = ao_c_vi + co_c_vi;
                        }
                        current_outgrowth["v_index"] = sum_c_vi;
                        anemone.splice(j, 1);
                        //refresh_c_counter00s
                        j = j - 1;
                        z = z - 1;
                    }
                    continue outer
                }

            }

        }
    }
    return all_microfeature00s;
}