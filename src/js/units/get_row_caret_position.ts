import {get_sel_range} from "./get_sel_range";
import {get_current_line_div} from "./get_current_line_div";
import {get_position_in_row} from "./get_position_in_row";
import {get_parent_with_class} from "./get_parent_with_class";
//import {iterate_childs_to_target} from "./iterate_childs_to_target";

export function get_row_caret_position(){
    let obj_caret:any = get_sel_range(),
        current_row = get_parent_with_class(obj_caret.sel.anchorNode, "post_row"),
    //current_row = get_current_line_div(obj_caret.sel.anchorNode), #remove
    caret_position = get_position_in_row(obj_caret.sel.anchorNode, obj_caret.sel.anchorOffset, current_row);
    return caret_position;
}

