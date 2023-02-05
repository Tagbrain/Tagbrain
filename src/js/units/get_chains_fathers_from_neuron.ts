import {collect_child_outgrowth} from "./collect_child_outgrowth";
import {collect_parent_outgrowth} from "./collect_parent_outgrowth";
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

export function get_chains_fathers_from_neuron(arr_objs_current_rows: arr_outgrowth, arr_objs_rows: current_outgrowth) {
    if (arr_objs_rows != null) {
        //get_group_of_key_word

        let arr_chains: arr_chain[] = [];

        //collect keys properties
        for (let i = arr_objs_current_rows.length - 1; i >= 0; i--) {
            let full_branch_outgrowths: arr_chain = [];
            let current_depth: number = arr_objs_current_rows[i]["depth"];

            let current_outgrowth = {
                key: arr_objs_current_rows[i]["key"],
                depth: arr_objs_current_rows[i]["depth"],
                is_key_row: true,
                escape: false
            },
            child_branch_outgrowths: arr_chain = collect_child_outgrowth(arr_objs_current_rows, arr_objs_rows, current_depth, i),
            parent_branch_outgrowths: arr_chain = collect_parent_outgrowth(arr_objs_current_rows, arr_objs_rows, current_depth, i);
        
            full_branch_outgrowths = [...parent_branch_outgrowths, current_outgrowth,  ...child_branch_outgrowths];
            arr_chains.push(full_branch_outgrowths);
        }
        return arr_chains;
    }
}