import {fix_depth_outgrowth} from "./fix_depth_outgrowth";
import {get_depth_outgrowth} from "./get_depth_outgrowth";

type outgrowth_features = {
    content: string, 
    row: number, 
    depth: number, 
    escape: boolean,
    new_depth: number,
};
type fix_type = {
    memory:number,
    is_fix: boolean,
}

export function get_outgrowth_features(synapse_el: Element, ind: number, depth_c_fix:fix_type){
    let features: outgrowth_features = {
        content: "", 
        row: 0, 
        depth: 0, 
        escape: false,
        new_depth:0,
    }
    let text_row = synapse_el.textContent;
    
    if(text_row != null){
        if (text_row.trim() == "" || text_row.trim() == "\n") {
            features["escape"] = true;
            features["depth"] = 0;
            features["content"] = text_row;
            features["row"] = ind;
        } else {
            let space_obj = get_depth_outgrowth(text_row);
            if(depth_c_fix.is_fix == true){
                space_obj.depth = fix_depth_outgrowth(space_obj.depth, depth_c_fix.memory);
                features["new_depth"] = space_obj.depth;
            } else {
                features["new_depth"] = space_obj.depth;
            }
            features["depth"] = space_obj.depth;
            features["content"] = text_row.trim();
            features["row"] = ind;
        }
    }
    return features;
}