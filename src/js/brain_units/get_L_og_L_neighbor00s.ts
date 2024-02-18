import { get_L_truncus_L_target_L_outgrowth } from "./get_L_truncus_L_target_L_outgrowth";

type branch = outgrowth_L_usual[];
type outgrowth_L_usual = {
    content: string,
    depth: number,
    v_index: number,
}

export function get_L_og_L_neighbor00s(
    tree: branch,
    cur_i: number,
){
    let neighbor00s: string[] = [];
    let parent_L_current = get_L_truncus_L_target_L_outgrowth(
        tree,
        cur_i
    );
    let og_L_depth_x_current = tree[cur_i].depth;
    if(parent_L_current != false){
        let parent_L_depth = tree[parent_L_current.index].depth;
        for (let i = parent_L_current.index + 1; i < tree.length; i++){
            let og = tree[i];
            if(og.depth <= parent_L_depth){
                break
            } else if(og_L_depth_x_current == og.depth){
                if(i != cur_i)
                    neighbor00s.push(og.content);
            }
        }
    }
    return neighbor00s;
}