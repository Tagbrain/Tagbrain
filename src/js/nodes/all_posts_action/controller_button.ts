import { class_c_create_c_neuron_c_secondary_x_temporary } from "../../classes/class_c_create_c_neuron_c_secondary_x_temporary";
import { class_c_icon_c_button } from "../../classes/class_c_icon_c_button";
import { class_L_neuron } from "../../classes/class_L_neuron";
import { gEBI, dCE } from "../../units/compress_f.js";
import { focus_c_neuron_x_scroll } from "../../units/focus_c_neuron_x_scroll";
import { get_L_theme_css_L_from_server } from "../../units/get_L_theme_css_L_from_server";
import { get_L_og_L_branch_X_current } from "../../units/get_L_og_L_branch_X_current";
import { set_L_cursor_L_style00s } from "../../units/set_L_cursor_L_style00s";
import { toggle_pop_up } from "../../units/toggle_pop_up";
import { add_c_neuron_c_secondary_z_purpose_c_create_c_new_channel } from "../neuron_action_controller/add_c_neuron_c_secondary_z_purpose_c_create_c_new_channel";
import { export_c_graph_s_c_zip } from "./export_c_graph_s_c_zip";
import { get_L_neuron_L_current_X_obj } from "../../units/get_L_neuron_L_current_X_obj";
import { get_L_neuron_L_tree_L_current } from "../../units/get_L_neuron_L_tree_L_current";
import { reduct_L_tree_X_by_og_L_branch } from "../../units/reduct_L_tree_X_by_og_L_branch";

let buttons_objs = [
    {//graph_c_zip
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
    {//create_new_channel
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
             }];
             let neuron_features = {
                neuron_id: "",
                content: outgrowths,
                is_outgrowth00s: true,
                contenteditable: true,
                add_ram_boolen: true,
                is_format: true,
                time_L_last_edit: "",
                default_tab: false
             }
             let neuron_c_new_x_class = new class_L_neuron(neuron_features);
             focus_c_neuron_x_scroll(neuron_c_new_x_class.neuron_id); 
        }
    },
    {//create_c_new_c_neuron_c_from_c_selection
        change_target: 'button_id_17_c_create_c_neuron_c_from_selection',
        value: 'create_c_new_c_neuron_c_from_c_selection',
        click_contextmenu: "Dissector",
        button_event: function(){
            
            let neuron_L_current_X_obj = get_L_neuron_L_current_X_obj();
            if (neuron_L_current_X_obj.element != undefined){

                
                if(window["tagbrain_graph"]["neuron00s_c_access"]){//check_c_session_c_access

                    //add_L_neuron
                    let neuron_features = {
                    neuron_id: "",
                    content: get_L_og_L_branch_X_current(),
                    is_outgrowth00s: true,
                    contenteditable: true,
                    add_ram_boolen: true,
                    is_format: true,
                    time_L_last_edit: "",
                    default_tab: "neurons"
                    }
                    let neuron_c_new_x_class = new class_L_neuron(neuron_features);
                

                    //get_L_tree_L_reducted
                    let neuron_L_tree_L_current = get_L_neuron_L_tree_L_current(neuron_L_current_X_obj.neuron_L_id);
                    
                    let tree_L_reducted = reduct_L_tree_X_by_og_L_branch(
                        neuron_L_tree_L_current, 
                        neuron_L_current_X_obj.og_L_position_X_last_L_activated
                    );

                    //refresh_L_data
                    window["tagbrain_graph"]["neuron00s_obj00s"][neuron_L_current_X_obj.neuron_L_id].set_L_neuron_L_tree_L_new(tree_L_reducted);
                }
            }

        }
    },
    {//change_theme_L_to_light
        change_target: 'id_L_turn_on_L_light',
        value: 'turn_on_L_light',
        click_contextmenu: "Turn on the light theme",
        button_event: function(){
            get_L_theme_css_L_from_server("light"); 
        }
    },
    {//change_theme_L_to_dark
        change_target: 'id_L_turn_on_L_dark',
        value: 'turn_on_L_dark',
        click_contextmenu: "Turn on the dark theme",
        button_event: function(){
            get_L_theme_css_L_from_server("dark"); 
        }
    },
    {//id_L_turn_on_L_red_L_dark
        change_target: 'id_L_turn_on_L_red_L_dark',
        value: 'turn_on_L_red_L_dark',
        click_contextmenu: "Turn on the red-dark theme",
        button_event: function(){
            get_L_theme_css_L_from_server("red_L_dark"); 
        }
    },
    {//turn_back_L_theme
        change_target: 'id_L_turn_back_L_theme',
        value: 'id_L_turn_back_L_theme',
        click_contextmenu: "Turn on the dark theme",
        button_event: function(){
            let css_c_theme_c_el = gEBI("css_c_theme_a");
            if (css_c_theme_c_el != false) 
              css_c_theme_c_el.remove();
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

