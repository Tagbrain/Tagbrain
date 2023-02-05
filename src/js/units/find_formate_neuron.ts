import {get_depth_outgrowth} from "./get_depth_outgrowth";
import {fix_depth_outgrowth} from "./fix_depth_outgrowth";
import {generate_struct_activ_num} from "./generate_struct_activ_num";
import {escape_text} from "./escape_text";
import {patterns} from "./declare_patterns";
import {get_chains_fathers_from_neuron} from "./get_chains_fathers_from_neuron";
import {start_gen_1_controller} from "./start_gen_1_controller";

type space_object = {
    depth: number, 
    content: string, 
    text_exist: boolean
}
type synapse_c_with_key = {
    key: string, 
    row: number, 
    depth: number, 
    is_key_row: boolean
};
type synapse = {
    key: string, 
    row: number, 
    depth: number, 
    is_key_row: boolean
};
export function find_formate_neuron(neuron: HTMLElement, array_of_search_key: string[]) {
    let is_zero_activation = false;
    if (array_of_search_key.length == 0) {
        let first_row_val = neuron.children[0].textContent;
        if (first_row_val != null) {
            array_of_search_key.push(first_row_val.trim());
        }
        is_zero_activation = true;
    }
    let obj_result_search = {};
    let rows = neuron.children;

    let finded_tags_struct: any[] = [],
        cut_rows_arr: number[] = [],
        arr_objs_struct_activ: synapse_c_with_key[] = [],
        arr_objs_current_rows: synapse[] = [];

    let previus_row_spaces = 0;

    for (let i = 0; i < rows.length; i++) {
        let obj_struct_activ: synapse_c_with_key = {
            key: "", 
            row: 0, 
            depth: 0, 
            is_key_row: false 
        },
            is_key_row: any = false,
            text_row = rows[i].textContent,
            space_obj: any = {};

        if(text_row != null){
            if (text_row == "" || text_row == "\n") {
                cut_rows_arr.push(i);
                continue;
            } else {
                space_obj = get_depth_outgrowth(text_row);
                space_obj.depth = fix_depth_outgrowth(space_obj.depth, previus_row_spaces);
            }
        }

        if (text_row != null)
            obj_struct_activ["key"] = text_row.trim();
        else {
            obj_struct_activ["key"] = "";
        }

        obj_struct_activ["depth"] = space_obj.depth;
        obj_struct_activ["row"] = i;

        let content_right_spaces = "    ".repeat(space_obj.depth) + space_obj.content;
        let escaped_itext_row = escape_text(content_right_spaces);

        let regexp;
        let search_array_is_empty = true;


        if (array_of_search_key != null) {
            if (array_of_search_key.length > 0) {
                regexp = new RegExp(array_of_search_key.join('|') + '|' + patterns.pattern_tag + '|' + patterns.pattern_verb, 'gmu');
                search_array_is_empty = false;
            } else {
                search_array_is_empty = true;
                regexp = new RegExp(patterns.pattern_tag + '|' + patterns.pattern_verb, 'gmu');
            }
        }

        let text_with_symbols_tags = escaped_itext_row.replace(regexp, function (search_key: string) {
            let reg_verb = new RegExp(patterns.pattern_verb, 'giu'),
                reg_tag = new RegExp(patterns.pattern_tag, 'giu'),
                word_tag = new RegExp(array_of_search_key.join('|'), 'giu'),

                is_exist_tags: boolean = reg_tag.test(search_key),
                is_exist_tags_action: boolean = reg_verb.test(search_key),
                is_exist_finding_word: boolean = word_tag.test(search_key);

            if (search_array_is_empty == false) {
                if (is_exist_finding_word) {
                    is_key_row = true;
                    obj_struct_activ["key"] = search_key;
                    if (is_exist_tags) {
                        finded_tags_struct.push({ key: search_key, c: i, d: space_obj.depth });
                        search_key = "<span class='item_tags_style'><mark>" + search_key + "</mark></span>";
                        return search_key;
                    } else if (is_exist_tags_action) {
                        //#edit finded_action push
                        search_key = "<span class='special_symbols_style'><mark>" + search_key + "</mark></span>";
                        return search_key;
                    } else {
                        search_key = "<mark>" + search_key + "</mark>";
                        return search_key;
                    }
                } else {
                    if (is_exist_tags) {
                        finded_tags_struct.push({ key: search_key, c: i, d: space_obj.depth });
                        search_key = "<span class='item_tags_style'>" + search_key + "</span>";
                        return search_key;
                    } else if (is_exist_tags_action) {
                        //#edit finded_action push
                        search_key = "<span class='special_symbols_style'>" + search_key + "</span>";
                        return search_key;
                    }
                }
            } else {
                if (is_exist_tags) {
                    finded_tags_struct.push({ key: search_key, c: i, d: space_obj.depth });
                    search_key = "<span class='item_tags_style'>" + search_key + "</span>";
                    return search_key;
                } else if (is_exist_tags_action) {
                    //#edit finded_action push
                    search_key = "<span class='special_symbols_style'>" + search_key + "</span>";
                    return search_key;
                }
            }

        });

        rows[i].innerHTML = text_with_symbols_tags;
        obj_struct_activ["is_key_row"] = is_key_row;
        arr_objs_struct_activ.push(obj_struct_activ);

        if (is_key_row == true) {
            arr_objs_current_rows.push(obj_struct_activ);
        }
        previus_row_spaces = space_obj.depth;
    }
    let generalizated_tree: any;
    if (arr_objs_current_rows.length > 0) {
        if (arr_objs_current_rows.length > 10) {
            arr_objs_current_rows.sort((a, b) => b.depth - a.depth);
            arr_objs_current_rows = arr_objs_current_rows.slice(0, 10);
        }
        let branches_outgrowth = get_chains_fathers_from_neuron(arr_objs_current_rows, arr_objs_struct_activ);
        if(branches_outgrowth)
        generalizated_tree = start_gen_1_controller(branches_outgrowth);
    }

    let obj_st_acitvations = generate_struct_activ_num(arr_objs_struct_activ);
    let gen_activation = obj_st_acitvations.general_activation;
    if (is_zero_activation == true) {
        gen_activation = 0;
        generalizated_tree = array_of_search_key[0];
    }

    //AFTER OTHER
    if (cut_rows_arr != null) {
        for (let i = rows.length - 1; i >= 0; i--) {
            for (let j = 0; j < cut_rows_arr.length; j++) {
                if (i == cut_rows_arr[j]) {
                    rows[i].remove();
                }
            }
        }
    }

    return {
        finded_tags_struct: finded_tags_struct,
        struct_activ_num: obj_st_acitvations.number,
        general_activation: gen_activation,
        chain_fathers: generalizated_tree,
    }
}