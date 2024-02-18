import { gEBI } from "../units/compress_f";
import { collapse_by_truncus } from "./collapse_by_truncus";
import { collapse_similar_outgrowths } from "./collapse_similar_outgrowths";


type arr_branches = {
    depth: number,
    is_key_row: boolean,
    content: string,
    escape: boolean
}[];
type outgrowth = {content: string, v_index: number, depth: number};
type anemone = outgrowth[];
type anemones_collection = anemone[];


//get from arr_branches => [[{parent:[child, ...]},[], ...],[], ...]
export function get_deduction_anemones(arr_branches: arr_branches[]){
    let anemone00s = convert_branches_to_anemones(arr_branches);
    //anemone00s = cut_L_similar_anemones(anemone00s);
    anemone00s = filterShortArrays(anemone00s);
    let obj = collapse_by_truncus(anemone00s);
    let obj2 = collapse_similar_outgrowths(obj.microfeature00s);
    let anemones_deduction = filterShortArrays(obj2.microfeature00s);
    echo_summarization(
        obj.truncus_summarization,
        obj2.og00s_L_summarization
    )
    return anemones_deduction;
}
function echo_summarization(
    truncus_summarization: number,
    og00s_L_summarization: number,
){
    let gen_L_summarization_L_element = gEBI("gen_L_summarization");
    gen_L_summarization_L_element.innerHTML = 
        "[<span title='summarization of truncus' class='item_tags_style'>" 
            + truncus_summarization + "</span>][<span title='summarization of outgrowths' class='item_tags_style'>" 
            + og00s_L_summarization + "</span>]";
}
function filterShortArrays(arrays:anemones_collection) {
    return arrays.filter(array => array.length >= 2);
}
function convert_branches_to_anemones(arr_branches: arr_branches[]){
    let anemones_collection: anemones_collection = [] as anemones_collection;
    for (let i = 0; i < arr_branches.length; i++){
        let branch = arr_branches[i];
        for (let j = 0; j < branch.length; j++){
            
            let truncus_L_content = branch[j]["content"];
            let anemone: anemone = [{content: truncus_L_content, v_index: 0, depth: 0}] as anemone;

            for (let z = j + 1; z < branch.length; z++){
                //remove_L_cycle_L_microfeature00a
                if(truncus_L_content != branch[z]["content"]){
                    let diff = branch[z]["depth"] - branch[j]["depth"];

                    if(diff == 1){
                        anemone.push({content: branch[z]["content"], v_index: 1, depth: 1});
                    } else if(diff > 1){
                        anemone.push({content: branch[z]["content"], v_index: 0, depth: 1});
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
function cut_L_similar_anemones(
    anemone00s: anemones_collection
){
    for (let i = 0; i < anemone00s.length; i++) {
        let anemone_first = anemone00s[i];
        inner: for (let j = i + 1; j < anemone00s.length; j++) {
            let anemone_second = anemone00s[j];
            if(anemone_first.length == anemone_second.length){
                if(anemone_first[0].content == anemone_second[0].content){
                    let ram_ind: boolean = false;
                    outer: for (let u = 1; u < anemone_first.length; u++) {
                        let og_f = anemone_first[u].content;
                        for (let o = 1; o < anemone_second.length; o++) {
                            let og_s = anemone_second[o].content;
                            if(og_f == og_s){
                                ram_ind = true
                                break
                            }
                        }
                        if(ram_ind == true){
                            continue;
                        } else {
                            continue inner;
                        }
                    }
                    // all og is equal => splice it
                    anemone00s.splice(j,1);
                    j = j - 1;
                } else {
                    continue;
                }
            } else {
                continue;
            }
        }
    }
    return anemone00s;
}
