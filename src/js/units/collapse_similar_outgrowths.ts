type outgrowth = {child: string, v_index: number};
type anemone = { [parent: string]: outgrowth[] };
type anemones_collection = anemone[];
export function collapse_similar_outgrowths(microfeatures: anemones_collection) {
    for (let i = 0; i < microfeatures.length; i++) {
        let anemone = microfeatures[i];
        let outgrowths = Object.values(anemone)[0];
        let len = outgrowths.length;
        outer: for (let j = len - 1; j >= 0; j--) {
            let current_outgrowth = outgrowths[j];
            //check all outgrowth in the anemone
            for (let z = j - 1; z >= 0; z--) {
                let addition_outgrowth = outgrowths[z];
                if (current_outgrowth["child"] == addition_outgrowth["child"]) {
                    let addition = addition_outgrowth["v_index"];
                    let current = current_outgrowth["v_index"];
                    current = addition + current;
                    if (current == 0 && addition == 0) {
                        current = 0.1
                    }
                    outgrowths.splice(j, 1);
                    continue outer
                }
            }
        }
    }
    return microfeatures;
}