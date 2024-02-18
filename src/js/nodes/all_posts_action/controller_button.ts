import { class_L_create_L_neuron_L_secondary_x_temporary } from "../../classes/class_L_create_L_neuron_L_secondary_x_temporary";
import { class_L_icon_L_button } from "../../classes/class_L_icon_L_button";
import { class_L_neuron } from "../../classes/class_L_neuron";
import { gEBI, dCE } from "../../units/compress_f.js";
import { focus_L_neuron_x_scroll } from "../../units/focus_L_neuron_x_scroll";
import { get_L_theme_css_L_from_server } from "../../units/get_L_theme_css_L_from_server";
import { get_L_og_L_branch_X_current } from "../../units/get_L_og_L_branch_X_current";
import { set_L_cursor_L_style00s } from "../../units/set_L_cursor_L_style00s";
import { toggle_pop_up } from "../../units/toggle_pop_up";
import { add_L_neuron_L_secondary_z_purpose_L_create_L_new_channel } from "../neuron_action_controller/add_L_neuron_L_secondary_z_purpose_L_create_L_new_channel";
import { export_L_graph_s_L_zip } from "./export_L_graph_s_L_zip";
import { get_L_neuron_L_current_X_obj } from "../../units/get_L_neuron_L_current_X_obj";
import { get_L_neuron_L_tree_L_current } from "../../units/get_L_neuron_L_tree_L_current";
import { reduct_L_tree_X_by_og_L_branch } from "../../units/reduct_L_tree_X_by_og_L_branch";
import { extend_L_tree_X_by_tree_L_from_L_copy_L_buffer } from "../../units/extend_L_tree_X_by_tree_L_from_L_copy_L_buffer";

let buttons_objs = [
    {//graph_L_zip
        change_target:'button_id_2',
        value: 'export_graph',
        click_contextmenu:"export",
        button_event: function(){
            export_L_graph_s_L_zip();
        }
    },
    {
        change_target:'button_id_6',
        value:'transformator_L_text_s',
        click_contextmenu:"TB-reader",
        button_event: function(){
            console.log("transformator_L_text_s");
        }
    },
    {
        change_target:'button_id_7',
        value:'opener_L_keyboard',
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
    {//add_L_parent
        change_target: 'button_id_8',
        value: 'add_L_parent',
        click_contextmenu: "add_L_parent",
        button_event: function(){
            console.log("add_L_parent");
        }
    },
    {//add_L_child
        change_target: 'button_id_9',
        value: 'add_L_child',
        click_contextmenu: "add_L_parent",
        button_event: function(){
            console.log("add_L_child");
        }
    },
    {//button_L_copy
        change_target: 'button_id_10',
        value: 'button_L_copy',
        click_contextmenu: "button_L_copy",
        button_event: function(){
            let tree_L_generalizated = window["tagbrain_graph"]["ram"]["tree_L_generalizated"];
            window["tagbrain_graph"]["ram"]["copy_L_buffer_L_tree"] = tree_L_generalizated;
        }
    },
    {
        change_target: 'button_id_12',
        value: 'button_L_cut',
        click_contextmenu: "button_L_cut",
        button_event: function(){
            console.log("button_L_cut");
        }
    },
    {
        change_target: 'button_id_14_L_get_L_data_L_channel',
        value: 'get_L_data_L_channel',
        click_contextmenu: "Request is sended",
        button_event: function(){
            new class_L_create_L_neuron_L_secondary_x_temporary();
        }
    },
    {//create_new_channel
        change_target: 'button_id_15_L_create_L_channel',
        value: 'create_L_new_L_channel',
        click_contextmenu: "Trying to create a channel",
        button_event: function(){
            add_L_neuron_L_secondary_z_purpose_L_create_L_new_channel();
        }
    },
    {//create_L_neuron
        change_target: 'button_id_16_L_create_L_neuron',
        value: 'create_L_new_L_neuron',
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
             let neuron_L_new_x_class = new class_L_neuron(neuron_features);
             focus_L_neuron_x_scroll(neuron_L_new_x_class.neuron_id); 
        }
    },
    {
        change_target: 'paste_L_node_L_to_og_L_current',
        value: 'cut_L_neuron_L_node',
        click_contextmenu: "Pasted",
        button_event: function(){

            console.log("node is pasted");

            let neuron_L_current_X_obj = get_L_neuron_L_current_X_obj();
            if (neuron_L_current_X_obj.element != undefined){
                if(window["tagbrain_graph"]["neuron00s_L_access"]){//check_L_session_L_access

                    //get_L_tree_L_current
                    let neuron_L_tree_L_current = get_L_neuron_L_tree_L_current(neuron_L_current_X_obj.neuron_L_id);

                    //get_L_tree_L_extended
                    
                    let obj_L_extention = extend_L_tree_X_by_tree_L_from_L_copy_L_buffer(
                        neuron_L_tree_L_current, 
                        neuron_L_current_X_obj.og_L_position_X_last_L_activated
                    );
                    
                    if(obj_L_extention.is_extended == true){
                        //refresh_L_data
                        window["tagbrain_graph"]["neuron00s_obj00s"][neuron_L_current_X_obj.neuron_L_id].set_L_neuron_L_tree_L_new(obj_L_extention.tree_L_extended);
                    }
                }
            }


        }
    },
    {//cut_L_neuron_L_node
        change_target: 'button_id_17_L_create_L_neuron_L_from_selection',
        value: 'cut_L_neuron_L_node',
        click_contextmenu: "Dissector",
        button_event: function(){
            
            let neuron_L_current_X_obj = get_L_neuron_L_current_X_obj();
            if (neuron_L_current_X_obj.element != undefined){

                
                if(window["tagbrain_graph"]["neuron00s_L_access"]){//check_L_session_L_access

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
                    let neuron_L_new_x_class = new class_L_neuron(neuron_features);
                

                    //get_L_tree_L_current
                    let neuron_L_tree_L_current = get_L_neuron_L_tree_L_current(neuron_L_current_X_obj.neuron_L_id);

                    //get_L_tree_L_reducted
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
            let css_L_theme_L_el = gEBI("css_L_theme_a");
            if (css_L_theme_L_el != false) 
              css_L_theme_L_el.remove();
        }
    },


]

for(let i = 0; i < buttons_objs.length; i++){
    let anchor = gEBI(buttons_objs[i].change_target);
    anchor.removeAttribute("id");

    let features = {
        icon_L_button: anchor,
        id: buttons_objs[i].value,
        click_contextmenu: buttons_objs[i].click_contextmenu,
        button_event: buttons_objs[i].button_event,
    }
    new class_L_icon_L_button(features);
}

