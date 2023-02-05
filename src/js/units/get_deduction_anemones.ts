type outgrowth = {child: string, v_index: number};
type anemone = { [parent: string]: outgrowth[] };
type anemones_collection = anemone[];


export function get_deduction_anemones(anemones_induction: anemones_collection) {
    let anemones_deduction: anemones_collection = [] as anemones_collection;
    let general_len = anemones_induction.length;

//choose current anemone 
    for (let i = 0; i < general_len; i++) {
        let current_anemone = anemones_induction[i];
        let current_outgrowths = Object.values(current_anemone)[0];
        let current_trunc: string = Object.keys(current_anemone)[0];

        current_outgrowths.map(function (current_outgrowth: outgrowth) {
            let anemone_deduction: anemone = {} as anemone;
            anemone_deduction[current_outgrowth["child"]] = [{child: current_trunc, v_index: current_outgrowth["v_index"]}];
            let a_truncus_deduction = anemone_deduction[current_outgrowth["child"]];

//choose addition anemone 
            for (let j = i + 1; j < general_len; j++) { 
                let addition_anemone = anemones_induction[j];
                let addition_outgrowths = Object.values(addition_anemone)[0];
                let addition_trunc: string = Object.keys(addition_anemone)[0];

                addition_outgrowths.map(function (addition_outgrowth: outgrowth) {

                    if (current_outgrowth == addition_outgrowth) {
                        a_truncus_deduction.push({child: addition_trunc, v_index: addition_outgrowth["v_index"]});
                    }

                })

            }
            if(anemones_deduction.length > 1){
                anemones_deduction.push(anemone_deduction);
            }
        })
    }
    return anemones_deduction;


}





