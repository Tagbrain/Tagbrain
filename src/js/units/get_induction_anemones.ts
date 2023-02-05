import {collapse_by_truncus} from "./collapse_by_truncus";
import {collapse_similar_outgrowths} from "./collapse_similar_outgrowths";

type arr_branches = {
    depth: number,
    is_key_row: boolean,
    key: string,
    escape: boolean
}[];
type outgrowth = {child: string, v_index: number};
type anemone = { [parent: string]: outgrowth[] };
type anemones_collection = anemone[];


//get from arr_branches => [[{parent:[child, ...]},[], ...],[], ...]
export function get_induction_anemones(arr_branches: arr_branches[]){
    let collection_anemones = convert_branches_to_anemones(arr_branches);
    collection_anemones = collapse_by_truncus(collection_anemones);
    let anemones_induction = collapse_similar_outgrowths(collection_anemones);
    return anemones_induction;
}

function convert_branches_to_anemones(arr_branches: arr_branches[]){
    let anemones_collection: anemones_collection = [] as anemones_collection;
    for (let i = 0; i < arr_branches.length; i++){
        let branch = arr_branches[i];
        for (let j = 0; j < branch.length; j++){
            let outgrowth_current = branch[j]["key"];
            let anemone: anemone = {} as anemone;
            anemone[outgrowth_current] = [];
            let current_depth = branch[j]["depth"];
            for (let z = j + 1; z < branch.length; z++){
                let diff = branch[j]["depth"] - current_depth;
                if(diff == 1){
                    anemone[branch[j]["key"]].push({child: branch[z]["key"], v_index: 1});
                } else if(diff > 1){
                    anemone[branch[j]["key"]].push({child: branch[z]["key"], v_index: 0});
                } else if(diff == 0){
                    console.log("Error: 5732566e")
                }
            }
            anemones_collection.push(anemone)
        }
    }
    return anemones_collection;
}
