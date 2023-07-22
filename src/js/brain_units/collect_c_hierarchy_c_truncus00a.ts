

type branch = outgrowth_c_usual[];
type outgrowth_c_usual = {
    content: string,
    depth: number,
    v_index: number,
}


export function collect_c_hierarchy_c_truncus00a(
    tree: branch, 
    cur_c_i: number
){
    let branch_i00s: any = [cur_c_i];
    let cur_depth = tree[cur_c_i]["depth"];
    let ram_depth = cur_depth;
    for(let i = cur_c_i; i >= 0; i--){
        let og:any = tree[i];
        if(og["depth"] < ram_depth ){
            branch_i00s.unshift(i);
            ram_depth = og["depth"];
        }
    }
    return branch_i00s;
}