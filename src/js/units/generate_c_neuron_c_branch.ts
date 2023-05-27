import {collect_child_outgrowth} from "./collect_child_outgrowth";
import {collect_parent_outgrowth} from "./collect_parent_outgrowth";
type arr_chain = {
    depth: number,
    is_key_row: boolean,
    content: string,
    escape: boolean,
}[];

type current_outgrowth = {
    depth: number,
    row: number,
    content: string,
    is_key_row: boolean,
    escape: boolean,
}[];

export function generate_c_neuron_c_branch(outgrowths_c_current: number[], outgrowths_c_full: current_outgrowth) {
    if (outgrowths_c_full != null) {
        //get_group_of_key_word

        let arr_chains: arr_chain[] = [];

        //collect keys properties
        for (let i = outgrowths_c_current.length - 1; i >= 0; i--) {
            let ind = outgrowths_c_current[i];

            let full_branch_outgrowths: arr_chain = [];
            let current_depth: number = outgrowths_c_full[ind]["depth"];

            let current_outgrowth = {
                content: outgrowths_c_full[ind]["content"],
                depth: outgrowths_c_full[ind]["depth"],
                //row: ind,
                is_key_row: true,
                escape: false,
            }

            let child_branch_outgrowths: arr_chain = collect_child_outgrowth(outgrowths_c_current, outgrowths_c_full, current_depth, i).reverse(),
                parent_branch_outgrowths: arr_chain = collect_parent_outgrowth(outgrowths_c_current, outgrowths_c_full, current_depth, i).reverse();
        
            full_branch_outgrowths = [...parent_branch_outgrowths, current_outgrowth,  ...child_branch_outgrowths];
            arr_chains.push(full_branch_outgrowths);
        }
        return arr_chains;
    }
}