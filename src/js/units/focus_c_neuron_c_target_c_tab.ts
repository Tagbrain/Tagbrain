import { focus_c_neuron_x_scroll } from "./focus_c_neuron_x_scroll";
import { if_c_screen_c_is_narrow_zz_close_c_right_bar } from "./if_c_screen_c_is_narrow_zz_close_c_right_bar";

export function focus_c_neuron_c_target_c_tab(
    neuron_c_id: string, 
    tab_c_name: string
){
    window["tagbrain_graph"]["tab_collection"][tab_c_name]["tab_button"].click();
    focus_c_neuron_x_scroll(neuron_c_id);
    if_c_screen_c_is_narrow_zz_close_c_right_bar();
}