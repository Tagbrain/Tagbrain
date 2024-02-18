import { gEBI, dCE } from "../../units/compress_f.js";
import { class_L_toggle_L_pop_up } from "../../classes/class_L_toggle_L_pop_up";

let pop_up00s_L_objs: any = [
    {
        element: gEBI("id_L_pop_up_L_context"),
        show_class: "neuron_pop_up_show",
        close_class: "neuron_pop_up_hide",
    }
];

for(let i = 0; i < pop_up00s_L_objs.length; i++){
    pop_up00s_L_objs[i].element.removeAttribute("id");

    let option00s:any = {
        element: pop_up00s_L_objs[i].element,
        show_class: pop_up00s_L_objs[i].show_class,
        close_class: pop_up00s_L_objs[i].close_class,
    }
    new class_L_toggle_L_pop_up(option00s);
}