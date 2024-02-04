import { get_L_og_L_child00s } from "./get_L_og_L_child00s";

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

export function get_L_og00s_L_consequence00s(
    og_L_current_L_num: number, 
    og00s_L_all: current_outgrowth, 
    node_L_current_L_depth: number,
){
    //response_L_consequence00s
    let consequence00s: arr_chain = [];
    let og_L_curr_L_num = og_L_current_L_num;

    if (typeof og00s_L_all[og_L_curr_L_num + 1] !== 'undefined') {//check_L_is_last
        while (og_L_curr_L_num >= 0) {//cycle_L_count_L_increasing

            //data_L_og_L_iterable
            let og_L_checking_X_depth: number = og00s_L_all[og_L_curr_L_num + 1]["depth"];
            let value: string = og00s_L_all[og_L_curr_L_num + 1]["content"];

            if(node_L_current_L_depth == og_L_checking_X_depth){//neighbour or consequence
                if(value.indexOf("→") !== -1){//consequence
                    //push_L_consequence
                    let is_current: boolean = og00s_L_all[og_L_curr_L_num + 1]["is_key_row"];
                    let og_L_implicated = {
                        content: value,
                        depth: og_L_checking_X_depth,
                        is_key_row: is_current,
                        escape: false
                    };
                    consequence00s.push(og_L_implicated);

                    //get_L_consequence_L_child00s
                    let child00s = get_L_og_L_child00s(
                        og_L_curr_L_num + 1, 
                        og00s_L_all, 
                        node_L_current_L_depth,
                    );
                    consequence00s.push(...child00s);
                } else {//just neighbour
                    break
                }
            }
            og_L_curr_L_num++;
            if (typeof og00s_L_all[og_L_curr_L_num + 1] === 'undefined') {
                break
            }
        }
    }
    return consequence00s;
    
}