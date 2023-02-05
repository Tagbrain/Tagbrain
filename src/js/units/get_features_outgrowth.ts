import {get_parent_with_class} from "./get_parent_with_class";
import {get_depth_outgrowth} from "./get_depth_outgrowth";

export function get_features_outgrowth(element:any){
    let neuron = get_parent_with_class(element, "item_input");
    let outgrowth = get_parent_with_class(element, "post_row");
    let row_ind = [...neuron.children].indexOf(outgrowth);
    let obj_outgrowth = get_depth_outgrowth(outgrowth.textContent);
    let obj = {
        depth: obj_outgrowth.depth,
        row: row_ind,
        content: obj_outgrowth.content,
    }
    return obj
}