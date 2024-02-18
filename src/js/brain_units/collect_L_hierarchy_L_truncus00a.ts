

type branch = outgrowth_L_usual[];
type outgrowth_L_usual = {
    content: string,
    depth: number,
    v_index: number,
}


export function collect_L_hierarchy_L_truncus00a(
    tree: branch, 
    cur_L_i: number
){
    let branch_i00s: any = [cur_L_i];
    let cur_depth = tree[cur_L_i]["depth"];
    let ram_depth = cur_depth;
    for(let i = cur_L_i; i >= 0; i--){
        let og:any = tree[i];
        if(og["depth"] < ram_depth ){
            branch_i00s.unshift(i);
            ram_depth = og["depth"];
        }
    }
    return branch_i00s;
}