import { collect_L_hierarchy_L_truncus00a } from "./collect_L_hierarchy_L_truncus00a";
type branch = outgrowth_L_usual[];
type outgrowth_L_usual = {
    content: string,
    depth: number,
    v_index: number,
}
export function get_L_og_L_parent00s(
    tree: branch,
    og_i: number
){
    let parent00s:string[] = [];
    let hierarchy = collect_L_hierarchy_L_truncus00a(
        tree,
        og_i
    )
    for (let i = 0; i < hierarchy.length - 1; i++) {
        let num: number = hierarchy[i];
        parent00s.push(tree[num].content);
    }
    return parent00s
}