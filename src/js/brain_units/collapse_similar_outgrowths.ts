type outgrowth = {content: string, v_index: number, depth: number};
type anemone = outgrowth[];
type anemones_collection = anemone[];
function sigmoid(z:number) {
    return 1 / (1 + Math.exp(10-z/0.06));
}
function round(num:number) {
    return Math.round(num * 100) / 100;
}
export function collapse_similar_outgrowths(all_microfeature00s: anemones_collection) {
    let og00s_c_summarization: number = 0;
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
                            sum_c_vi = 0; 
                        } else {
                            sum_c_vi = round(sigmoid(ao_c_vi + co_c_vi));
                        }

                        anemone[j].v_index = sum_c_vi;
                        anemone.splice(z, 1);
                        og00s_c_summarization++;
                        //refresh_c_counter00s
                        z = z - 1;
                    }
                }

            }

        }
    }
    return {
        microfeature00s: all_microfeature00s,
        og00s_c_summarization: og00s_c_summarization
    };
}