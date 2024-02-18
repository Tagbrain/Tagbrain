export function extend_L_tree_X_by_tree_L_from_L_copy_L_buffer(
    tree_L_acceptor_L_og: any[],
    current_L_position: number
){
    let tree_L_donor_L_og: any[] = window["tagbrain_graph"]["ram"]["copy_L_buffer_L_tree"];
    let content_L_current = "";
    let og_L_current_L_depth = 0;
    if(tree_L_acceptor_L_og[current_L_position] != undefined){
        content_L_current = tree_L_acceptor_L_og[current_L_position]["content"];
        og_L_current_L_depth = tree_L_acceptor_L_og[current_L_position]["depth"];
    }
    if(content_L_current.trim() != ""){//og_L_empty

        tree_L_donor_L_og = calibrate_L_tree_L_depth(tree_L_donor_L_og, og_L_current_L_depth);

        //paste
        tree_L_acceptor_L_og.splice(
            current_L_position + 1, 
            0, 
            ...tree_L_donor_L_og
        )
        let obj_L_extention = {
            tree_L_extended: tree_L_acceptor_L_og,
            is_extended: true
        }
        return obj_L_extention;
    } else {
        let obj_L_extention = {
            tree_L_extended: tree_L_acceptor_L_og,
            is_extended: false
        }
        return obj_L_extention;
    }
}

function calibrate_L_tree_L_depth(tree: any[], parent_L_depth: number){
    let shift_L_calibrate = parent_L_depth + 1;
    for (let i = 0; i < tree.length; i++) {
        tree[i]["depth"] = tree[i]["depth"] + shift_L_calibrate;
    }
    return tree;
}