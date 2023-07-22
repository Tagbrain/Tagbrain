import { class_c_create_c_neuron_c_secondary_x_temporary } from "../../classes/class_c_create_c_neuron_c_secondary_x_temporary";
import { class_c_icon_c_button } from "../../classes/class_c_icon_c_button";
import { class_c_neuron } from "../../classes/class_c_neuron";
import { gEBI, dCE } from "../../units/compress_f.js";
import { focus_c_neuron_x_scroll } from "../../units/focus_c_neuron_x_scroll";
import { get_selection_neuron_outgrowths } from "../../units/get_selection_neuron_outgrowths";
import { add_c_neuron_c_secondary_z_purpose_c_create_c_new_channel } from "../neuron_action_controller/add_c_neuron_c_secondary_z_purpose_c_create_c_new_channel";
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
    {
        change_target: 'button_id_8',
        value: 'add_c_parent',
        click_contextmenu: "add_c_parent",
        button_event: function(){
            console.log("add_c_parent");
        }
    },
    {
        change_target: 'button_id_9',
        value: 'add_c_child',
        click_contextmenu: "add_c_parent",
        button_event: function(){
            console.log("add_c_child");
        }
    },
    {
        change_target: 'button_id_10',
        value: 'button_c_copy',
        click_contextmenu: "button_c_copy",
        button_event: function(){
            console.log("button_c_copy");
        }
    },
    {
        change_target:'button_id_11',
        value: 'button_c_edit',
        click_contextmenu: "button_c_edit",
        button_event: function(){
            console.log("button_c_edit");
        }
    },
    {
        change_target: 'button_id_12',
        value: 'button_c_cut',
        click_contextmenu: "button_c_cut",
        button_event: function(){
            console.log("button_c_cut");
        }
    },
    {
        change_target: 'button_id_13',
        value: 'button_c_holder',
        click_contextmenu: "activate cursor holder",
        button_event: function(){
            console.log("button_c_holder");
        }
    },
    {
        change_target: 'button_id_14_c_get_c_data_c_channel',
        value: 'get_c_data_c_channel',
        click_contextmenu: "Request is sended",
        button_event: function(){
            new class_c_create_c_neuron_c_secondary_x_temporary();
        }
    },
    {
        change_target: 'button_id_15_c_create_c_channel',
        value: 'create_c_new_c_channel',
        click_contextmenu: "Trying to create a channel",
        button_event: function(){
            add_c_neuron_c_secondary_z_purpose_c_create_c_new_channel();
        }
    },
    {//create_c_neuron
        change_target: 'button_id_16_c_create_c_neuron',
        value: 'create_c_new_c_neuron',
        click_contextmenu: "Create a neuron",
        button_event: function(){
            let outgrowths = [{
                content: '<div class="post_row">$Write connections of a #new neuron</div>', 
                depth: 0, 
                row: 0
             }];
             let neuron_features = {
                neuron_id: "",
                content: outgrowths,
                is_outgrowth00s: true,
                contenteditable: true,
                add_ram_boolen: true,
                is_format: true,
                time_c_last_edit: ""
             }
             let neuron_c_new_x_class = new class_c_neuron(neuron_features);
             focus_c_neuron_x_scroll(neuron_c_new_x_class.neuron_id); 
        }
    },
    {
        change_target: 'button_id_17_c_create_c_neuron_c_from_selection',
        value: 'create_c_new_c_neuron_c_from_c_selection',
        click_contextmenu: "Create a neuron from selection",
        button_event: function(){
            window["tagbrain_graph"]["selection_obj"]["last_outgrowths"] = get_selection_neuron_outgrowths();
            function toggle_pop_up(
                remove_class: string, 
                add_class: string, 
                el_cls: any, 
                back_layer_element: any, 
                pointer_e_stl: any
            ){
                el_cls.remove(remove_class);
                back_layer_element.style.pointerEvents = pointer_e_stl;
                el_cls.add(add_class);
            }
            function add_new_neuron_from_selection(
                outgrowths: any
            ){
                if(gEBI("logout_a")){
                   let neuron_features = {
                      neuron_id:"",
                      content: outgrowths,
                      is_outgrowth00s: true,
                      contenteditable: true,
                      add_ram_boolen: true,
                      is_format: true,
                      time_c_last_edit: "",
                   }
                   let neuron_c_new_x_class = new class_c_neuron(neuron_features);
                }
                let upper_layer_for_animation = document.querySelector(".upper_layer_for_animation"),
                neuron_pop_up_menu = gEBI("id_c_pop_up_c_context"),
                classes = neuron_pop_up_menu.classList;
                toggle_pop_up(
                    'neuron_pop_up_show', 
                    'neuron_pop_up_hide', 
                    classes, 
                    upper_layer_for_animation, 
                    'none');
            }
            add_new_neuron_from_selection(
                window["tagbrain_graph"]["selection_obj"]["last_outgrowths"]
            );
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

