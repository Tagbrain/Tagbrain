import { get_L_og_L_child00s } from "./get_L_og_L_child00s";
import { get_L_og_L_neighbor00s } from "./get_L_og_L_neighbor00s";
import { get_L_og_L_parent00s } from "./get_L_og_L_parent00s";

type branch = outgrowth_L_usual[];
type outgrowth_L_usual = {
    content: string,
    depth: number,
    v_index: number,
}

export function collect_L_blank_L_tangle_L_activation(
    tree_L_generalizated: any, 
    synapse00s_L_key: string[]
){
    tree_L_generalizated = collapse_L_flag00s(tree_L_generalizated);
    let tangle_L_activation: any = [];
    for (let i = 0; i < synapse00s_L_key.length; i++) {
        let synapse = synapse00s_L_key[i];
        for (let j = 0; j < tree_L_generalizated.length; j++) {
            let og = tree_L_generalizated[j];

            if(og.content == synapse){
                let child00s = get_L_og_L_child00s(
                    tree_L_generalizated,
                    j
                ).outgrowth_s;
                let child00s_L_content: string[] = [];
                for (let o = 0; o < child00s.length; o++) {
                    child00s_L_content.push(child00s[o].content);
                }
                let parent00s = get_L_og_L_parent00s(
                    tree_L_generalizated,
                    j
                ),
                neighbor00s = get_L_og_L_neighbor00s(
                    tree_L_generalizated,
                    j
                );
                tangle_L_activation.push({
                    synapse:    synapse,
                    child00s:   child00s_L_content,
                    parent00s:  parent00s,
                    neighbor00s:neighbor00s
                });
            }

        }
    }
    return tangle_L_activation;
}
function collapse_L_flag00s(tree: any){
    for (let i = 0; i < tree.length; i++) {
        let og_L_content = tree[i]["content"];
        tree[i]["content"] = og_L_content.replace(new RegExp("~[A-z_0-9]*", "gu"), "");
    }
    return tree;
}