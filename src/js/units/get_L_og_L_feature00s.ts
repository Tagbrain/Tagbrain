import {fix_depth_outgrowth} from "./fix_depth_outgrowth";
import {get_depth_outgrowth} from "./get_depth_outgrowth";

type outgrowth_features = {
    content: string, 
    depth: number, 
    escape: boolean,
    new_depth: number,
};
type fix_type = {
    depth_L_previous:number,
    is_fix: boolean,
}

export function get_L_og_L_feature00s(
    og_L_el: Element, 
    ind: number, 
    depth_L_fix:fix_type
){
    let features: outgrowth_features = {
        content: "", 
        depth: 0, 
        escape: false,
        new_depth:0,
    }
    let text_row = og_L_el.textContent;
    
    if(text_row != null){
        if (text_row.trim() == "" || text_row.trim() == "\n") {
            features["escape"] = true;
            features["depth"] = 0;
            features["content"] = text_row;
        } else {
            let space_obj = get_depth_outgrowth(text_row);
            if(depth_L_fix.is_fix == true){
                space_obj.depth = fix_depth_outgrowth(space_obj.depth, depth_L_fix.depth_L_previous);
                features["new_depth"] = space_obj.depth;
            } else {
                features["new_depth"] = space_obj.depth;
            }
            features["depth"] = space_obj.depth;
            features["content"] = text_row.trim();
        }
    }
    return features;
}