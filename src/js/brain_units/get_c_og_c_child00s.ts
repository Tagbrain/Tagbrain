
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

    let first_index = parent_i + 1;
    let last_index = first_index;

    //isolate part of tree

    for (let i = first_index; i < tree.length; i++) {
        let outgrowth = tree[i];

        if(outgrowth["depth"] > parent_c_depth){
            //it_c_child
            last_index = i + 1;
            continue;
        } else {
            //it is not child
            if(first_index == i){
                //child00s_c_not_exist
            } else {
                //child00s_c_exist
                last_index = i + 1;
            }
            break
        }

    }


    //reduct key parent
    let selected:branch = tree_saver.splice(first_index, last_index - first_index);

    return {
        first_index: first_index,
        last_index: last_index - 1,
        outgrowth_s: selected,
        remained: tree_saver,
    }
}