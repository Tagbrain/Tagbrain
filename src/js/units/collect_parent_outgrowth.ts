type arr_chain = {
    depth: number,
    is_key_row: boolean,
    content: string,
    escape: boolean,
}[];
type current_outgrowth = {
    depth: number,
    content: string,
    is_key_row: boolean,
    escape:boolean,
}[];
export function collect_parent_outgrowth(
    outgrowths_c_current: number[],
    arr_objs_rows: current_outgrowth,
    current_depth: number, 
    i: number
){
    let j = outgrowths_c_current[i] - 1; // number current row
    let max_length_parent_part = 0;
    let parent_chain_fathers: arr_chain = [];
    while (j >= 0 && max_length_parent_part < 10) {
        let next_up_d: number = arr_objs_rows[j]["depth"];
        if (current_depth > next_up_d) {//is parent
            let value: string = arr_objs_rows[j]["content"];
            let is_current: boolean = arr_objs_rows[j]["is_key_row"];
            let current_escape: boolean = arr_objs_rows[j]["escape"];
            if (next_up_d == 0) {//finded main father
                let obj_one_chain_father = {
                    content: value,
                    depth: next_up_d,
                    is_key_row: is_current,
                    escape: current_escape
                };
                parent_chain_fathers.push(obj_one_chain_father);
                return parent_chain_fathers;
            } else {//not main father
                let obj_one_chain_father = {
                    content: value,
                    depth: next_up_d,
                    is_key_row: is_current,
                    escape: current_escape
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