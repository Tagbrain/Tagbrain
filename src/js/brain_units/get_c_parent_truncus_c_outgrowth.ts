
type branch = {
    content: string,
    depth: number,
    v_index: number,
}[]

type microfeature = {
    parent: string,
    child: string,
}
export function get_c_parent_truncus_c_outgrowth(tree: branch, ind:number){

    let index = 0;
    let parent_is_exist = false;
    let key_depth = tree[ind]["depth"];
    let outgrowth_c_parent: any = {};

    for (let i = ind - 1; 0 <= i; i--) {
        if(tree[i]["depth"] < key_depth){
            outgrowth_c_parent = tree[i];
            index = i;
            parent_is_exist = true;
            break;
        } else {
            continue;
        }
    }

    if(parent_is_exist == false){
        return false;
    } else {
        return {
            index: index,
            outgrowth_c_parent:outgrowth_c_parent,
        }
    }

}