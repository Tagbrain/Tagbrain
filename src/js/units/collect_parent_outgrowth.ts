type arr_chain = {
    depth: number,
    is_key_row: boolean,
    key: string,
    escape: boolean
}[];
type arr_outgrowth = {
    depth: number,
    row: number,
    key: string
}[]
type current_outgrowth = {
    depth: number,
    row: number,
    key: string,
    is_key_row: boolean
}[];
export function collect_parent_outgrowth(arr_objs_current_rows: arr_outgrowth, arr_objs_rows: current_outgrowth, current_depth: number ,i: number){
    let j = arr_objs_current_rows[i]["row"] - 1; // number current row
    let max_length_parent_part = 0;
    let parent_chain_fathers: arr_chain = [];
    while (j >= 0 && max_length_parent_part < 10) {
        let next_up_d: number = arr_objs_rows[j]["depth"];
        if (current_depth > next_up_d) {//is parent
            let value: string = arr_objs_rows[j]["key"];
            let is_current: boolean = arr_objs_rows[j]["is_key_row"];
            if (next_up_d == 0) {//finded main father
                let obj_one_chain_father = {
                    key: value,
                    depth: next_up_d,
                    is_key_row: is_current,
                    escape: false
                };
                parent_chain_fathers.push(obj_one_chain_father);
                return parent_chain_fathers;
            } else {//not main father
                let obj_one_chain_father = {
                    key: value,
                    depth: next_up_d,
                    is_key_row: is_current,
                    escape: false
                };
                parent_chain_fathers.push(obj_one_chain_father);
                current_depth = next_up_d;
                max_length_parent_part++;
            }
        }
        j--;
    }
    return parent_chain_fathers;
}