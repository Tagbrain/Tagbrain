import { collect_c_hierarchy_c_truncus00a } from "./collect_c_hierarchy_c_truncus00a";
type branch = outgrowth_c_usual[];
type outgrowth_c_usual = {
    content: string,
    depth: number,
    v_index: number,
}
export function get_c_og_c_parent00s(
    tree: branch,
    og_i: number
){
    let parent00s:string[] = [];
    let hierarchy = collect_c_hierarchy_c_truncus00a(
        tree,
        og_i
    )
    for (let i = 0; i < hierarchy.length - 1; i++) {
        let num: number = hierarchy[i];
        parent00s.push(tree[num].content);
    }
    return parent00s
}