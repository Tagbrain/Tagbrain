import {get_depth_outgrowth} from "./get_depth_outgrowth";

export function get_neuron_object_outgrowths(neuron: HTMLElement){
    let outgrowths: any = neuron.children;
    let outgrowths_objs: {row: number, depth: number, content: string}[] = [];
    for(let i = 0; i < outgrowths.length; i++){
        let depth_obj = get_depth_outgrowth(outgrowths[i].textContent);
        if(depth_obj.text_exist){
            let outgrowth = {
                row: i,
                depth: depth_obj.depth,
                content: depth_obj.content,
            };
            outgrowths_objs.push(outgrowth);
        }
    }
    return outgrowths_objs;
}