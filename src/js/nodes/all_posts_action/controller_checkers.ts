import { class_c_icon_c_checker } from "../../classes/class_c_icon_c_checker";
import { gEBI, dCE } from "../../units/compress_f.js";

let checkers_objs = [
    {
        change_target:'checker_id_1',
        value: 'read_mode',
        turn_on_c_action: function(){
            //change_c_all_c_contenteditable_c_false
            let neuron00s_c_access:boolean = window["tagbrain_graph"]["neuron00s_c_access"];
            if(neuron00s_c_access == true){
                //get_c_neuron00s_c_element00s
                let neuron00s_obj00s = window["tagbrain_graph"]["neuron00s_obj00s"];
                let neuron00s_c_id00s = Object.keys(window["tagbrain_graph"]["neuron00s_obj00s"]);
                for (let i = 0; i < neuron00s_c_id00s.length; i++) {
                    let neuron_c_element = neuron00s_obj00s[neuron00s_c_id00s[i]].neuron_el;
                    //change_L_contenteditable_c_to_false
                    neuron_c_element.setAttribute('contenteditable', false);
                }
                //block_L_window_L_pow_up
                
            } 
        },
        turn_off_c_action: function(){
            let neuron00s_c_access:boolean = window["tagbrain_graph"]["neuron00s_c_access"];
                if(neuron00s_c_access == true){
                let neuron00s_obj00s = window["tagbrain_graph"]["neuron00s_obj00s"];
                let neuron00s_c_id00s = Object.keys(window["tagbrain_graph"]["neuron00s_obj00s"]);
                for (let i = 0; i < neuron00s_c_id00s.length; i++) {
                    let neuron_c_element = neuron00s_obj00s[neuron00s_c_id00s[i]].neuron_el;
                    //change_c_contenteditable_c_to_true
                    neuron_c_element.setAttribute('contenteditable', true);
                }
            }
        }
    },
    {
        change_target:'checker_id_3',
        value: 'power_mode',
        turn_on_c_action: function(){
            //power_mode
        },
        turn_off_c_action: function(){}
    },
    {
        change_target:'checker_id_4',
        value: 'activate_all_graphes',
        turn_on_c_action: function(){},
        turn_off_c_action: function(){}
    },
    {
        change_target:'checker_id_5',
        value:'synapse_c_whole',
        turn_on_c_action: function(){},
        turn_off_c_action: function(){}
    }
]

for(let i = 0; i < checkers_objs.length; i++){
    let anchor = gEBI(checkers_objs[i].change_target);
    anchor.removeAttribute("id");

    let features = {
        icon_c_checker: anchor,
        id: checkers_objs[i].value,
        turn_on_c_action: checkers_objs[i].turn_on_c_action,
        turn_off_c_action: checkers_objs[i].turn_off_c_action
    }
    new class_c_icon_c_checker(features);
    
}

