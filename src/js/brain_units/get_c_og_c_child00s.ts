
type branch = {
    content: string,
    depth: number,
    v_index: number,
}[]

export function get_c_og_c_child00s(
    tree: branch, 
    parent_i: number
){
    let tree_saver = [...tree];
    let parent_c_depth = tree[parent_i]["depth"];

    let first_index = parent_i;
    let last_index = parent_i;

    //isolate part of tree

    for (let i = parent_i + 1; i < tree.length; i++) {
        let outgrowth = tree[i];

        if(outgrowth["depth"] > parent_c_depth){
            //it_c_child
            first_index = parent_i + 1;
            last_index = last_index + 1;
            continue;
        } else {
            //it is not child
            break
        }

    }

    let selected:branch = [];
    //reduct key parent
    if(last_index == parent_i){//one child or more
        selected = [];
    } else if (first_index <= last_index){//
        selected = tree_saver.splice(first_index, last_index - first_index + 1);
    }

    return {
        first_index: first_index,
        last_index: last_index,
        outgrowth_s: selected,
        remained: tree_saver,
    }
}