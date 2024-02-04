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

export function get_L_og_L_child00s(
    og_L_pos_L_current: number, 
    og00s_L_all: current_outgrowth, 
    node_L_current_L_depth: number,
){

    let child00s: arr_chain = [];

    let og_L_curr_L_num = og_L_pos_L_current;
    
    if (typeof og00s_L_all[og_L_curr_L_num + 1] !== 'undefined') {
        while (og_L_curr_L_num >= 0) {
            let og_L_checking_X_depth: number = og00s_L_all[og_L_curr_L_num + 1]["depth"];
            let value: string = og00s_L_all[og_L_curr_L_num + 1]["content"];

            if (node_L_current_L_depth < og_L_checking_X_depth) {//child

                let is_current: boolean = og00s_L_all[og_L_curr_L_num + 1]["is_key_row"];
                let og_L_child = {
                    content: value,
                    depth: og_L_checking_X_depth,
                    is_key_row: is_current,
                    escape: false
                };
                child00s.push(og_L_child);

            } else {//neighbour or consequence00s
                break
            }
            og_L_curr_L_num++;
            if (typeof og00s_L_all[og_L_curr_L_num + 1] === 'undefined') {
                break
            }
        }
    }
    return child00s;
} 