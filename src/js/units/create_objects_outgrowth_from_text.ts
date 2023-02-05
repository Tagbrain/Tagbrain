import {get_depth_outgrowth} from "./get_depth_outgrowth";

export function create_objects_outgrowth_from_text(inner_text: any){
    let outgrowths = inner_text.split("\n");
    let outgrowths_objs: {row: Number, depth: Number, content: String}[] = [];
    for(let i = 0; i < outgrowths.length; i++){
        let depth_obj = get_depth_outgrowth(outgrowths[i].textContent);
        let outgrowth = {
            row: i,
            depth: depth_obj.depth,
            content: depth_obj.content,
        };
        outgrowths_objs.push(outgrowth)
    }
    return outgrowths_objs;
}