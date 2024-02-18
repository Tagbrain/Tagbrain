import { get_L_neuron_L_by_neuron_nucleus_L_og00s } from "./get_L_neuron_L_by_neuron_nucleus_L_og00s";

export function get_L_neuron_L_current_X_obj(){
    
    let neuron_L_element = window["tagbrain_graph"]["cursor_position"]["neuron_element"];
    let og_L_element = window["tagbrain_graph"]["cursor_position"]["outgrowth"];

    let neuron_L_id = get_L_neuron_L_by_neuron_nucleus_L_og00s(
        neuron_L_element
     ).neuron_id;

     let og_L_position_X_last_L_activated = [...neuron_L_element.children].indexOf(og_L_element);

    let $response_L_obj = {
        element: neuron_L_element,
        neuron_L_id: neuron_L_id,
        og_L_position_X_last_L_activated:og_L_position_X_last_L_activated
    }

    return $response_L_obj;
}