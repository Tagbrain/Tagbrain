import { class_c_icon_c_button } from "../../classes/class_c_icon_c_button";
import { gEBI, dCE } from "../../units/compress_f.js";
import { export_c_graph_s_c_zip } from "./export_c_graph_s_c_zip";

let buttons_objs = [
    {
        change_target:'button_id_2',
        value: 'export_graph',
        click_contextmenu:"export",
        button_event: function(){
            export_c_graph_s_c_zip();
        }
    },
    {
        change_target:'button_id_6',
        value:'transformator_c_text_s',
        click_contextmenu:"TB-reader",
        button_event: function(){
            console.log("transformator_c_text_s");
        }
    },
    {
        change_target:'button_id_7',
        value:'opener_c_keyboard',
        click_contextmenu:"keyboard",
        button_event: function(){
            let keyboard_el:Element | null = document.querySelector(".keyboard");
            if(keyboard_el != null){
                if(keyboard_el.classList.contains("keyboard_hide")){
                    keyboard_el.classList.remove('keyboard_hide');
                    keyboard_el.classList.add('keyboard_show');
                } else {
                     keyboard_el.classList.add('keyboard_hide'); 
                    keyboard_el.classList.remove('keyboard_show');
                }
            }
        }
    },
]

for(let i = 0; i < buttons_objs.length; i++){
    let anchor = gEBI(buttons_objs[i].change_target);
    anchor.removeAttribute("id");

    let features = {
        icon_c_button: anchor,
        id: buttons_objs[i].value,
        click_contextmenu: buttons_objs[i].click_contextmenu,
        button_event: buttons_objs[i].button_event,
    }
    new class_c_icon_c_button(features);
}

