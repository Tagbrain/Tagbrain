type arr_chain = {
    depth: number,
    is_key_row: boolean,
    content: string,
    escape: boolean
}[];
type arr_outgrowth = {
    depth: number,
    content: string
}[]
type current_outgrowth = {
    depth: number,
    content: string,
    is_key_row: boolean
}[];
export function collect_child_outgrowth(outgrowths_c_current: number[], arr_objs_rows: current_outgrowth, current_depth: number ,i: number){

    let child_chain_fathers: arr_chain = [];

    let r_num_curr = outgrowths_c_current[i];
    if (typeof arr_objs_rows[r_num_curr + 1] !== 'undefined') {
        while (r_num_curr >= 0) {
            let next_down_d: number = arr_objs_rows[r_num_curr + 1]["depth"];
            if (current_depth < next_down_d) {//
                let value: string = arr_objs_rows[r_num_curr + 1]["content"];
                let is_current: boolean = arr_objs_rows[r_num_curr + 1]["is_key_row"];
                let obj_child_part = {
                    content: value,
                    depth: next_down_d,
                    is_key_row: is_current,
                    escape: false
                };
                child_chain_fathers.unshift(obj_child_part);
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