import {get_induction_anemones} from "./get_induction_anemones";
import {get_unreliable_anemones} from "./get_unreliable_anemones";
import {get_deduction_anemones} from "./get_deduction_anemones";
import {generate_tree_structure} from "./generate_tree_structure";

type arr_branches = {
    depth: number,
    is_key_row: boolean,
    key: string,
    escape: boolean
}[];
type outgrowth = {child: string, v_index: number};
type anemone = { [parent: string]: outgrowth[] };
type anemones_collection = anemone[];
type anemones_gen_units = {
    induction: anemones_collection,
    deduction: anemones_collection,
}
export function start_gen_1_controller(arr_branches: arr_branches[]){
    return "result_generalization"
    let induction_a: anemones_collection = get_induction_anemones(arr_branches);
    let induction_un_a: anemones_collection = get_unreliable_anemones(induction_a);
    let deduction_a = get_deduction_anemones(induction_a);
    let deduction_un_a = get_unreliable_anemones(deduction_a);

    generate_tree_structure(induction_a, deduction_a);
        //GET_MACROFETURES long chains patterns

    //send unreliable anemones in server graph
    //find this microfeatures in new data
    //get them
    //improve structure
}