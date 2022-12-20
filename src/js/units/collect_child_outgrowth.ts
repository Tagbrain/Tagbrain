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
export function collect_child_outgrowth(arr_objs_current_rows: arr_outgrowth, arr_objs_rows: current_outgrowth, current_depth: number ,i: number){

    let child_chain_fathers: arr_chain = [];

    let r_num_curr = arr_objs_current_rows[i]["row"];
    if (typeof arr_objs_rows[r_num_curr + 1] !== 'undefined') {
        let max_length_child_part: number = 0;
        while (r_num_curr >= 0 && max_length_child_part < 20) {
            let next_down_d: number = arr_objs_rows[r_num_curr + 1]["depth"];
            if (current_depth < next_down_d) {//
                let value: string = arr_objs_rows[r_num_curr + 1]["key"];
                let is_current: boolean = arr_objs_rows[r_num_curr + 1]["is_key_row"];
                let obj_child_part = {
                    key: value,
                    depth: next_down_d,
                    is_key_row: is_current,
                    escape: false
                };
                child_chain_fathers.unshift(obj_child_part);
                max_length_child_part++;
            } else {
                break
            }
            r_num_curr++
            if (typeof arr_objs_rows[r_num_curr + 1] === 'undefined') {
                break
            }
        }
    }
    return child_chain_fathers;
} 