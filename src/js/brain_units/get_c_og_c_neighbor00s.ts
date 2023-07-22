import { get_c_truncus_c_target_c_outgrowth } from "./get_c_truncus_c_target_c_outgrowth";

type branch = outgrowth_c_usual[];
type outgrowth_c_usual = {
    content: string,
    depth: number,
    v_index: number,
}

export function get_c_og_c_neighbor00s(
    tree: branch,
    cur_i: number,
){
    let neighbor00s: string[] = [];
    let parent_c_current = get_c_truncus_c_target_c_outgrowth(
        tree,
        cur_i
    );
    let og_c_depth_x_current = tree[cur_i].depth;
    if(parent_c_current != false){
        let parent_c_depth = tree[parent_c_current.index].depth;
        for (let i = parent_c_current.index + 1; i < tree.length; i++){
            let og = tree[i];
            if(og.depth <= parent_c_depth){
                break
            } else if(og_c_depth_x_current == og.depth){
                if(i != cur_i)
                    neighbor00s.push(og.content);
            }
        }
    }
    return neighbor00s;
}