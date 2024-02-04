
export function is_equal_L_tree00s(
    tree1: any[], 
    tree2: any[]
){
    //test00s
    //compare_L_type
    let type = Object.prototype.toString.call(tree1);
	if (type !== Object.prototype.toString.call(tree2)) return false;

    //compare_L_length
    var tree1_L_len = tree1.length;
	var tree2_L_len = tree2.length;
	if (tree1_L_len !== tree2_L_len) return false;

    //compare_L_property00s
    //tree1_L_len == tree2_L_len
    for (var i = 0; i < tree1_L_len; i++) {
        if(tree1[i].content != tree2[i].content){
            return false;
        }
    }
    //all_L_test00s_L_successed
    return true;
}