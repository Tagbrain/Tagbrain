import {get_sel_range} from "./get_sel_range";
import {create_new_row} from "./create_new_row";
import {drop_down_c_neuron_c_branche_s} from "./drop_down_c_neuron_c_branche_s";

export function surrounded_div(text: string) {
    //if contain several rows divide
    let obj_caret:any = get_sel_range(),
         range = obj_caret.range;
    range.deleteContents();
    let new_line_div = create_new_row(text, false);
    drop_down_c_neuron_c_branche_s(window["tagbrain_graph"]["cursor_position"]["neuron_element"]);
    range.insertNode(new_line_div);
    obj_caret.sel.anchorNode.parentNode.removeChild(obj_caret.sel.anchorNode);
    range.collapse();
    return new_line_div;
}