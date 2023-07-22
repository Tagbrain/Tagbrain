import { get_c_og_c_child00s } from "./get_c_og_c_child00s";
import { get_c_og_c_neighbor00s } from "./get_c_og_c_neighbor00s";
import { get_c_og_c_parent00s } from "./get_c_og_c_parent00s";

type branch = outgrowth_c_usual[];
type outgrowth_c_usual = {
    content: string,
    depth: number,
    v_index: number,
}

export function collect_c_blank_c_tangle_c_activation(
    tree_c_generalizated: any, 
    synapse00s_c_key: string[]
){
    tree_c_generalizated = collapse_c_flag00s(tree_c_generalizated);
    let tangle_c_activation: any = [];
    for (let i = 0; i < synapse00s_c_key.length; i++) {
        let synapse = synapse00s_c_key[i];
        for (let j = 0; j < tree_c_generalizated.length; j++) {
            let og = tree_c_generalizated[j];

            if(og.content == synapse){
                let child00s = get_c_og_c_child00s(
                    tree_c_generalizated,
                    j
                ).outgrowth_s;
                let child00s_c_content: string[] = [];
                for (let o = 0; o < child00s.length; o++) {
                    child00s_c_content.push(child00s[o].content);
                }
                let parent00s = get_c_og_c_parent00s(
                    tree_c_generalizated,
                    j
                ),
                neighbor00s = get_c_og_c_neighbor00s(
                    tree_c_generalizated,
                    j
                );
                tangle_c_activation.push({
                    synapse:    synapse,
                    child00s:   child00s_c_content,
                    parent00s:  parent00s,
                    neighbor00s:neighbor00s
                });
            }

        }
    }
    return tangle_c_activation;
}
function collapse_c_flag00s(tree: any){
    for (let i = 0; i < tree.length; i++) {
        let og_c_content = tree[i]["content"];
        tree[i]["content"] = og_c_content.replace(new RegExp("~[A-z_0-9]*", "gu"), "");
    }
    return tree;
}