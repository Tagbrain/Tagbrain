import { gEBI } from "../units/compress_f"
import { get_neuron_object_outgrowths } from "../units/get_neuron_object_outgrowths";
import { get_L_og_L_feature00s } from "../units/get_L_og_L_feature00s";

export function put_L_event00s_L_neuron_L_og00s(){
    let neuron_L_sum = gEBI("synapses_tree_x_output_field");

    //click
    let neuron_L_sum_L_og00s = neuron_L_sum.querySelectorAll(".og_L_content");
    if(neuron_L_sum_L_og00s != null){
        for (let i = 0; i < neuron_L_sum_L_og00s.length; i++) {
            let og = neuron_L_sum_L_og00s[i];
            put_L_og_L_event00s(og, i);
        }
    }
}
function put_L_og_L_event00s(og: HTMLElement, og_L_i: number){

    /* delete_L_event00s_L_from_node
    const originalElement = og;
    const clonedElement = originalElement.cloneNode(true);
    originalElement.replaceWith(clonedElement);
    */

    og.addEventListener('input', function () {

        //get_L_neuron_L_og_L_position_X_current
        let object_L_og = get_L_og_L_feature00s(
            og,
            og_L_i, 
            {depth_L_previous:0, is_fix: false}
        );
        let depth = object_L_og.depth;
        let content = object_L_og.content;
        //change_L_current_row_L_value_X_neuron_obj
        
        let new_L_tree = get_neuron_object_outgrowths(og);
        //refresh tree_L_generalizated
        Object.assign(window["tagbrain_graph"]["ram"]["tree_L_generalizated"][og_L_i], {
            content: content,
            depth: depth,
        });

    })
}

put_L_event00s_L_neuron_L_og00s();