import { class_c_icon_c_checker } from "../../classes/class_c_icon_c_checker";
import { gEBI, dCE } from "../../units/compress_f.js";

let checkers_objs = [
    {
        change_target:'checker_id_1',
        value: 'read_mode',
    },
    {
        change_target:'checker_id_2',
        value: 'export_graph',
    },
    {
        change_target:'checker_id_3',
        value: 'power_mode',
    },
    {
        change_target:'checker_id_4',
        value: 'activate_all_graphes'
    },
    {
        change_target:'checker_id_5',
        value:'synapse_c_whole',
    },
]

for(let i = 0; i < checkers_objs.length; i++){
    let anchor = gEBI(checkers_objs[i].change_target);
    anchor.removeAttribute("id");

    let features = {
        icon_c_checker: anchor,
        id: checkers_objs[i].value,
    }
    new class_c_icon_c_checker(features);
    
}

