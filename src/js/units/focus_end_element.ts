import { get_row_caret_position } from "./get_row_caret_position";
export function focus_end_element(element: Node) {
    let new_range = new Range();
    new_range.selectNodeContents(element);
    document.getSelection()?.removeAllRanges();
    document.getSelection()?.addRange(new_range);
    new_range.collapse();
    window["tagbrain_graph"]["cursor_position"]["neuron_element"] = element;
    window["tagbrain_graph"]["cursor_position"]["depth_c_in_outgrowth"] = get_row_caret_position();
}