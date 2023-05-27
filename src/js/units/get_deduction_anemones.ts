import {collapse_by_truncus} from "./collapse_by_truncus";
import {collapse_similar_outgrowths} from "./collapse_similar_outgrowths";

type arr_branches = {
    depth: number,
    is_key_row: boolean,
    content: string,
    escape: boolean
}[];
type outgrowth = {content: string, v_index: number};
type anemone = outgrowth[];
type anemones_collection = anemone[];


//get from arr_branches => [[{parent:[child, ...]},[], ...],[], ...]
export function get_deduction_anemones(arr_branches: arr_branches[]){
    let anemone00s = convert_branches_to_anemones(arr_branches);
    anemone00s = collapse_by_truncus(anemone00s);
    let anemones_deduction = collapse_similar_outgrowths(anemone00s);
    anemones_deduction = filterShortArrays(anemones_deduction);
    return anemones_deduction;
}
function filterShortArrays(arrays:anemone[]) {
    return arrays.filter(array => array.length >= 2);
}
function convert_branches_to_anemones(arr_branches: arr_branches[]){
    let anemones_collection: anemones_collection = [] as anemones_collection;
    for (let i = 0; i < arr_branches.length; i++){
        let branch = arr_branches[i];
        for (let j = 0; j < branch.length; j++){
            
            let truncus_c_content = branch[j]["content"];
            let anemone: anemone = [{content: truncus_c_content, v_index: 0}] as anemone;

            for (let z = j + 1; z < branch.length; z++){
                //remove_c_cycle_c_microfeature00a
                if(truncus_c_content != branch[z]["content"]){
                    let diff = branch[z]["depth"] - branch[j]["depth"];

                    if(diff == 1){
                        anemone.push({content: branch[z]["content"], v_index: 1});
                    } else if(diff > 1){
                        anemone.push({content: branch[z]["content"], v_index: 0});
                    //#remove
                    } else if(diff == 0){
                        break;
                    }
                }
            }

            if(anemone.length > 0){
                anemones_collection.push(anemone);
            }
            
        }
    }
    return anemones_collection;
}
