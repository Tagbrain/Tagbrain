import { class_L_icon_L_checker } from "../../classes/class_L_icon_L_checker";
import { gEBI, dCE } from "../../units/compress_f.js";

let checkers_objs = [
    {
        change_target:'checker_id_1',
        value: 'read_mode',
        turn_on_L_action: function(){
            //change_L_all_L_contenteditable_L_false
            let neuron00s_L_access:boolean = window["tagbrain_graph"]["neuron00s_L_access"];
            if(neuron00s_L_access == true){
                //get_L_neuron00s_L_element00s
                let neuron00s_obj00s = window["tagbrain_graph"]["neuron00s_obj00s"];
                let neuron00s_L_id00s = Object.keys(window["tagbrain_graph"]["neuron00s_obj00s"]);
                for (let i = 0; i < neuron00s_L_id00s.length; i++) {
                    let neuron_L_element = neuron00s_obj00s[neuron00s_L_id00s[i]].neuron_el;
                    //change_L_contenteditable_L_to_false
                    neuron_L_element.setAttribute('contenteditable', false);
                }
                //block_L_window_L_pow_up
                
            } 
        },
        turn_off_L_action: function(){
            let neuron00s_L_access:boolean = window["tagbrain_graph"]["neuron00s_L_access"];
                if(neuron00s_L_access == true){
                let neuron00s_obj00s = window["tagbrain_graph"]["neuron00s_obj00s"];
                let neuron00s_L_id00s = Object.keys(window["tagbrain_graph"]["neuron00s_obj00s"]);
                for (let i = 0; i < neuron00s_L_id00s.length; i++) {
                    let neuron_L_element = neuron00s_obj00s[neuron00s_L_id00s[i]].neuron_el;
                    //change_L_contenteditable_L_to_true
                    neuron_L_element.setAttribute('contenteditable', true);
                }
            }
        }
    },
    {
        change_target: 'button_id_13',
        value: 'button_L_holder',
        turn_on_L_action: function(){
            //"ctrl_L_holder"
            console.log("button_L_holder");
            //change_L_cursor_L_theme
        },
        turn_off_L_action: function(){

        }
    },
    {
        change_target:'checker_id_3',
        value: 'power_mode',
        turn_on_L_action: function(){
            //power_mode
        },
        turn_off_L_action: function(){}
    },
    {
        change_target:'checker_id_4',
        value: 'activate_all_graphes',
        turn_on_L_action: function(){},
        turn_off_L_action: function(){}
    },
    {
        change_target:'checker_id_5',
        value:'synapse_L_whole',
        turn_on_L_action: function(){},
        turn_off_L_action: function(){}
    }
]

for(let i = 0; i < checkers_objs.length; i++){
    let anchor = gEBI(checkers_objs[i].change_target);
    anchor.removeAttribute("id");

    let features = {
        icon_L_checker: anchor,
        id: checkers_objs[i].value,
        turn_on_L_action: checkers_objs[i].turn_on_L_action,
        turn_off_L_action: checkers_objs[i].turn_off_L_action
    }
    new class_L_icon_L_checker(features);
    
}

