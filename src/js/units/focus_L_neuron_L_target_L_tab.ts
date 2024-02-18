import { focus_L_neuron_x_scroll } from "./focus_L_neuron_x_scroll";
import { if_L_screen_L_is_narrow_zz_close_L_right_bar } from "./if_L_screen_L_is_narrow_zz_close_L_right_bar";

export function focus_L_neuron_L_target_L_tab(
    neuron_L_id: string, 
    tab_L_name: string
){
    window["tagbrain_graph"]["tab_collection"][tab_L_name]["tab_button"].click();
    focus_L_neuron_x_scroll(neuron_L_id);
    if_L_screen_L_is_narrow_zz_close_L_right_bar();
}