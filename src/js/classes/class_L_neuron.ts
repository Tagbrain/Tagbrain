import { post_format } from "../units/formate_neuron";
import { gEBI, dCE } from "../units/compress_f.js";
import { get_neuron_object_outgrowths } from "../units/get_neuron_object_outgrowths";
import { send_data_ajax } from "../units/send_data_ajax.js";
import { put_c_marker_c_not_save } from "../units/put_c_marker_c_not_save";
import { validate_c_style_c_outgrowth } from "../units/validate_c_style_c_outgrowth";
import { class_generator_c_tree_c_html } from "../classes/class_generator_c_tree_c_html";


import { class_formate_c_neuron } from "./class_formate_c_neuron";

import { echo_c_statistic_c_to_neuron } from "../units/echo_c_statistic_c_to_neuron";
import { drop_down_c_neuron_c_branche_s } from "../units/drop_down_c_neuron_c_branche_s";
import { class_L_unit_L_neuron_X_condense } from "./class_c_unit_L_neuron_X_condense";
import { patterns } from "../units/declare_patterns";
import { class_c_icon_c_checker } from "./class_c_icon_c_checker";
import { add_wave_animation_x_click_c_event } from "../units/add_wave_animation_x_click_c_event";
import { class_L_attachment_L_creator } from "./class_L_attachment_L_creator";
import { get_c_neuron00s_id00s_x_ram } from "../units/get_c_neuron00s_id00s_x_ram";
import { track_L_element_L_change } from "../units/track_L_element_L_change";
import { load_L_attachment00s_L_from_neuron } from "../units/load_L_attachment00s_L_from_neuron";
import { set_L_button_L_attachment00s_L_state } from "../units/set_L_button_L_attachment00s_L_state";
import { combine_L_ram_L_neuron00s_Z_server_L_neuron00s } from "../units/combine_L_ram_L_neuron00s_Z_server_L_neuron00s";
import { get_row_caret_position } from "../units/get_row_caret_position";
import { get_current_line_div } from "../units/get_current_line_div";
import { put_L_focus_class } from "../units/put_L_focus_class";
import { put_c_caret_x_target_c_string_position } from "../units/put_c_caret_x_target_c_string_position";
import { validate_row_formate } from "../units/validate_row_formate";
import { transfer_line } from "../units/transfer_line";
import { insert_one_tab } from "../units/insert_one_tab";
import { delete_one_tab } from "../units/delete_one_tab";
import { functions } from "../nodes/neuron_action_controller/obj_post_edit_f";
import { get_L_obj_ram_L_with_id } from "../units/get_L_obj_ram_L_with_id";


type neuron_L_unit_L_options = {
    tab_L_unit_X_name: string,
    output_container_L_name: string,
    unit_L_neuron_L_id: string,
    unit_L_description_L_short: string,
    unit_L_rank: number,
    unit_L_time: string,
    unit_L_neuron_L_is_special: boolean
}

class class_L_neuron {

    public neuron_id: string;
    protected html: any;
    public content: any;
    public attachment00s:any[];

    public contenteditable: boolean;
    public add_ram_boolen: boolean;
    public is_format: boolean; //par_L_purpose_L_special_L_neuron00s_L_format00i
    public neuron_is_saved: boolean;
    public is_outgrowth00s: boolean;
    protected is_prewrap: boolean;


    public neuron_el: HTMLElement;
    public neuron_shell: HTMLElement;

    protected button_L_delete: HTMLElement;
    protected button_L_attachment00s: HTMLElement;
    protected container_L_attachment00s: HTMLElement;

    public unix_time: string;
    public tab_L_neuron: string;
    protected graph_L_name: string;

    constructor(features: any) {
        this.graph_L_name = window["tagbrain_graph"]["graph_name"];
        this.attachment00s = [];
        if (features.neuron_id == "") {//new_L_neuron
            this.unix_time = Math.round(new Date().getTime() / 1000).toString();
            this.neuron_id = this.unix_time;
        } else {
            this.neuron_id = features.neuron_id;
            this.unix_time = features.time_L_last_edit;
        }
        this.is_outgrowth00s = features.is_outgrowth00s;
        if(this.is_outgrowth00s){//json
            this.content = features.content;
            this.html = this.transformate_input_content(this.content);
            this.is_prewrap = true;
        } else {//else html
            this.html = features.content;
            this.is_prewrap = false;
        }

        this.contenteditable = features.contenteditable;
        this.add_ram_boolen = features.add_ram_boolen;
        this.is_format = features.is_format;
        this.neuron_is_saved = true;
        if (features.default_tab != false) {
            this.tab_L_neuron = features.default_tab;
        } else {
            this.tab_L_neuron = window["tagbrain_graph"]["current_tab"];
        }

        this.add_neuron();
        if (features.neuron_id == "") {
            if (this.tab_L_neuron == "neurons") {
                this.add_neuron_server();
            } else if(this.tab_L_neuron == "draft"){
                this.add_neuron_storage_c_local();
            }
        }
        this.put_c_this_class_x_target_c_tg();

        if (this.is_format == true) {
            new class_formate_c_neuron(
                this.neuron_id, 
                this.neuron_el,
                this.neuron_shell
            );
            this.put_L_events_L_validation();
        }

        //create_L_condense_L_unit
        if (this.add_ram_boolen == true) {//add_L_to_ram

            let unit_x_option00s: neuron_L_unit_L_options = {
                tab_L_unit_X_name: "ram",
                output_container_L_name: "neuron00s_L_RAM",
                unit_L_neuron_L_id: this.neuron_id,
                unit_L_description_L_short: "",
                unit_L_rank: 0,
                unit_L_time: this.unix_time,
                unit_L_neuron_L_is_special: false
            }
            new class_L_unit_L_neuron_X_condense(unit_x_option00s);
            
        } else if (this.add_ram_boolen == false) {
            false
        }

        this.put_L_neuron_L_remove_listner();
        this.put_L_neuron_L_attach_listner();
    }
    set_L_neuron_L_tree_L_new(tree_L_new:any){
        this.content = tree_L_new;
        let og00s_L_html = this.transformate_input_content(tree_L_new);
        this.neuron_el.innerHTML = og00s_L_html;
        drop_down_c_neuron_c_branche_s(this.neuron_el);
        //formatting
            new class_formate_c_neuron(
            this.neuron_id, 
            window["tagbrain_graph"]["neuron00s_obj00s"][this.neuron_id].neuron_el,
            false
        );
    }
    add_neuron() {
        let tab_obj = this.get_c_tab_c_current_c_obj();
        let neurons_container = tab_obj.mental_image_container;

        let neuron_shell = this.create_element(this.neuron_id, "item");
        this.neuron_shell = neuron_shell;

        neuron_shell.innerHTML +=
            '<div class="post_name">'
                + '<span>' + this.neuron_id + '</span>'
                + '<span class="save_flag"></span>'
                + '<span class="file_time" title="last editing"></span>'
            + '</div>'
            + '<div class="post_icon_container">'
                + '<a class="button_cont_stl">'
                    + '<svg class="linear_icon_c_target icon_size_middle button_L_attachment00s">'
                        + '<use xlink:href="#sprite_attachment"></use>'
                    + '</svg>'
                + '</a>'
                + '<a class="button_cont_stl">'
                    + '<svg class="linear_icon_c_target icon_size_middle">'
                        + '<use xlink:href="#sprite_fork_icon"></use>'
                    + '</svg>'
                + '</a>'
                + '<a class="button_cont_stl">'
                    + '<svg class="linear_icon_c_target icon_size_middle delete_neuron_button">'
                        + '<use xlink:href="#sprite_delete_button"></use>'
                    + '</svg>'
                + '</a>'
            + '</div>'
            + '<div class="sense_item">'
                + '<div class="numbers_bar"></div>'
                + '<div contenteditable="' + this.contenteditable + '" spellcheck="false" id="neuron_' + this.neuron_id + '" class="item_input">'
                    + this.html
                + '</div>'
                + '<div class="neuron_L_attachment00s">'
                + '</div>'
                + '<div class="post_low_panel">'
                    + '<span class="count_words post_counters" title="Words count | MAX: 500">W:</span>'
                    + '<span class="count_rows post_counters" title="Rows count">R:</span>'
                    + '<span class="count_tags post_counters" title="Tags count">#:</span>'
                    + '<span class="count_points post_counters" title="Points counts quality of the post"></span>'
                + '</div>'
            + '</div>';

        neurons_container.appendChild(neuron_shell);
        this.neuron_el = neuron_shell.querySelector(".item_input");
        this.button_L_delete = neuron_shell.querySelector(".delete_neuron_button");
        this.button_L_attachment00s = neuron_shell.querySelector(".button_L_attachment00s");
        this.container_L_attachment00s = neuron_shell.querySelector(".neuron_L_attachment00s");

        if(!this.is_prewrap){
            this.neuron_el.style.whiteSpace = "nowrap"
        }

        this.change_neuron_controller();

        //#check two next rows
        let response = { 
            shell: neuron_shell, 
            neuron_el: this.neuron_el 
        };
        return response;
    }
    add_neuron_server() {
        let neuron_tree = get_neuron_object_outgrowths(this.neuron_el);

        let data = {
            action: 'change_L_neuron',
            parameter: 'add',
            graph_name: this.graph_L_name,
            neuron_id: this.neuron_id,
            neuron_tree: neuron_tree,
            unix_time: this.unix_time,
            neuron00s_L_ram_X_id: false
        };
        let url = "php/neurons/controller_c_api.php";
        let controller_f = function (response_obj: any) {
            if (response_obj.status == "success") {
                console.log("Remove the not_save-flag")
            } else {
                console.log("Not saved")
            }
        }
        let error_message = "Error server";
        send_data_ajax(data, url, controller_f, true, error_message);
    }
    add_neuron_storage_c_local() {
        let neuron_tree = get_neuron_object_outgrowths(this.neuron_el);
        let value = encodeURIComponent(JSON.stringify(neuron_tree));
        let key: string = "neuron_L_draft[" + this.neuron_id + "]";
        localStorage.setItem(key, value);
        console.log("Remove the not_save-flag | Add a neurone cookie");
    }
    create_element(id: string, className: string) {
        let element = dCE("div");
        element.id = id;
        element.className = className;
        return element
    }
    put_c_this_class_x_target_c_tg() {
        window["tagbrain_graph"]["neuron00s_obj00s"][this.neuron_id] = this;
    }
    put_L_neuron_L_attach_listner(){
        let neuron_id = this.neuron_id;
        let neuron_shell = this.neuron_shell;
        let neuron_L_attachment_L_element: HTMLElement = neuron_shell.querySelector(".neuron_L_attachment00s");

        let button_L_attachment00s = this.button_L_attachment00s;
        let graph_L_name = this.graph_L_name;

        button_L_attachment00s.addEventListener("click", function(e:any) {
            if (getComputedStyle(neuron_L_attachment_L_element).display == 'none') {//attachment_L_is_turned_on
                add_wave_animation_x_click_c_event(e, "");
                set_L_button_L_attachment00s_L_state("turn_on", neuron_shell);

                let attachment00s_L_name00s = window["tagbrain_graph"]["neuron00s_obj00s"][neuron_id]["attachment00s"];
                let neuron_L_data = {
                    graph_L_name: graph_L_name,
                    neuron_L_id: neuron_id,
                    neuron_L_shell: neuron_shell
                };
                load_L_attachment00s_L_from_neuron(attachment00s_L_name00s, neuron_L_data, neuron_id);
                   
                //if_not_exist
                    //create_button_L_creatione

            } else {//attachment_L_is_turned_off
                set_L_button_L_attachment00s_L_state("turn_off", neuron_shell);
            }
            //close_L_rows
            //close_L_rows_L_number
            //open_L_attachment00s
        })
    }
    put_L_neuron_L_remove_listner() {
        let neuron_id = this.neuron_id;
        let neuron_shell = this.neuron_shell;
        let graph_L_name = this.graph_L_name;
        let tab_L_neuron:string = this.tab_L_neuron;

            this.button_L_delete.addEventListener("click", function(e:any) {
                let remove_or_not = confirm("Do you want to delete the item?");
                if (remove_or_not == true){
                    if(tab_L_neuron == "neurons"){
                        let time = Math.round(new Date().getTime() / 1000).toString();
                        let data = {
                            action: 'change_L_neuron',
                            parameter: 'remove',
                            neuron_id: neuron_id,
                            neuron_tree: "",
                            graph_name: graph_L_name,
                            unix_time: time,
                            neuron00s_L_ram_X_id: false
                        };
                        let url = "php/neurons/controller_c_api.php";
                        let controller_f = function(response_obj: any){
                            if(response_obj.status == "success"){
                                console.log(response_obj);
                                neuron_shell.remove();  
                                let obj = get_L_obj_ram_L_with_id(neuron_id);
                                obj.class.remove_L_unit_obj_X_el(neuron_id);
                            }
                        };
                        let error_message = "Search data not load";
                        send_data_ajax(data, url, controller_f, true, error_message);     
                        
                    }  else if(tab_L_neuron == "draft") {

                        let key_s_c_local = Object.keys(localStorage);
                        for (var i = 0; i < key_s_c_local.length; i++) {
                            if (/neuron_L_draft/.test(key_s_c_local[i])) {
                                let reg_id = new RegExp("neuron_L_draft\\[(?<id>[0-9]{10})\\]", "g");
                                let arr_c_number: any = key_s_c_local[i].matchAll(reg_id);
                                for (let number of arr_c_number) {
                                    let { id } = number.groups;
                                    if(id == neuron_id){
                                        //remove
                                        localStorage.removeItem(key_s_c_local[i]);
                                        neuron_shell.remove();  
                                        let obj = get_L_obj_ram_L_with_id(neuron_id);
                                        obj.class.remove_L_unit_obj_X_el(neuron_id);
                                    }
                                }
                            }
                        }
                    } 
                }  
            });
            
        //#edit
        //remove_c_from_c_server
        //remove_c_obj
        //remove_c_from_client_c_collection
    }
    put_L_events_L_validation() {
        let neuron_element: any = this.neuron_el,
        neuron_shell: any = this.neuron_shell,
        neuron_id = this.neuron_id,
        graph_L_name = this.graph_L_name,
        unix_time = this.unix_time;

        if (this.contenteditable == true) {
            if (this.tab_L_neuron == "neurons") {
                neuron_element.addEventListener("focus", function () {
                    combine_L_ram_L_neuron00s_Z_server_L_neuron00s();
                })
            }
            neuron_element.addEventListener("click", function () {

                //complete_L_obj_L_position
                window["tagbrain_graph"]["cursor_position"]["neuron_element"] = neuron_element;
                let outgrowth_L_element = get_current_line_div("start");
                //put_L_focus_class(outgrowth_L_element);
                if(outgrowth_L_element != undefined){
                    window["tagbrain_graph"]["cursor_position"] = {
                        neuron_element: neuron_element,
                        outgrowth: outgrowth_L_element,
                        depth_c_in_outgrowth: get_row_caret_position(), //get_caret_c_pos_x_put_tb_c_caret #edit
                    }
                } else {
                    console.log("check undefined")
                }
                

            })
            neuron_element.addEventListener("input", function () {
                put_c_marker_c_not_save(neuron_shell, graph_L_name);
                if (window["tagbrain_graph"]["neuron00s_obj00s"][neuron_id]) {
                    window["tagbrain_graph"]["neuron00s_obj00s"][neuron_id]["neuron_is_saved"] = false;
                    window["tagbrain_graph"]["neuron00s_obj00s"][neuron_id]["unix_time"] = Math.round(new Date().getTime() / 1000).toString();
                }
            })
            neuron_element.addEventListener("blur", function () {
                //create_L_unit_L_condense
                if (window["tagbrain_graph"]["neuron00s_obj00s"][neuron_id]) {
                    //check_L_ram_L_exist
                    let ram00s = get_c_neuron00s_id00s_x_ram();
                    //create_X_refresh_L_condense_L_unit
                    let unit_x_option00s: neuron_L_unit_L_options = {
                        tab_L_unit_X_name: "ram",
                        output_container_L_name: "neuron00s_L_RAM",
                        unit_L_neuron_L_id: neuron_id,
                        unit_L_description_L_short: "",
                        unit_L_rank: 0,
                        unit_L_time: unix_time,
                        unit_L_neuron_L_is_special: false
                    }
                    new class_L_unit_L_neuron_X_condense(unit_x_option00s); 
                }
                validate_c_style_c_outgrowth();
                drop_down_c_neuron_c_branche_s(neuron_element);

                //formatting
                new class_formate_c_neuron(
                    neuron_id,
                    window["tagbrain_graph"]["neuron00s_obj00s"][neuron_id].neuron_el,
                    false
                );
            });
            neuron_element.addEventListener('keydown', function (e: any) {
                window["tagbrain_graph"]["cursor_position"]["neuron_element"] = neuron_element;
                let selection: any = window.getSelection();
                let current_line = get_current_line_div("start");

                if (e.keyCode == 9) {
                    e.preventDefault();
                    if (selection == '') {
                        if (e.shiftKey) {
                            delete_one_tab(current_line, true);
                        } else { //shift is pressed
                            insert_one_tab(current_line, true);
                        }
                    } else if (selection != '') {
                        let post_child_nodes = [],
                            selection_obj = functions.get_selection_obj();

                        post_child_nodes = neuron_element.childNodes;
                        if (e.shiftKey) {
                            for (let i = selection_obj.start_block_n; i < (selection_obj.end_block_n + 1); i++) {
                                delete_one_tab(post_child_nodes[i], false);
                            }
                            if (post_child_nodes[selection_obj.end_block_n]) {
                                document.getSelection().setBaseAndExtent(post_child_nodes[selection_obj.start_block_n], 0, post_child_nodes[selection_obj.end_block_n], post_child_nodes[selection_obj.end_block_n].childNodes.length);
                            } else {
                                //one line
                            }
                        } else { // one tab
                            let post_child_nodes = [],
                                selection_obj = functions.get_selection_obj();

                            post_child_nodes = neuron_element.childNodes;
                            for (let i = selection_obj.start_block_n; i < (selection_obj.end_block_n + 1); i++) {
                                insert_one_tab(post_child_nodes[i], false);
                            }
                            if (post_child_nodes[selection_obj.end_block_n]) {
                                document.getSelection().setBaseAndExtent(post_child_nodes[selection_obj.start_block_n], 0, post_child_nodes[selection_obj.end_block_n], post_child_nodes[selection_obj.end_block_n].childNodes.length);
                            } else {
                                //one line
                            }
                        }
                    }
                }
            })
            
            neuron_element.addEventListener('keypress', function (e: any) {
                window["tagbrain_graph"]["cursor_position"]["neuron_element"] = neuron_element;
                let current_line = get_current_line_div("start");

                if ((!e.shiftKey) && (!e.ctrlKey) && (e.keyCode != 9) && (e.keyCode != 8) && (e.keyCode != 46)) {
                    let old_caret_pos = get_row_caret_position();
                    validate_row_formate(current_line);
                    put_c_caret_x_target_c_string_position(current_line, old_caret_pos);
                }
                if (e.key === 'Enter') {
                    e.preventDefault();
                    transfer_line("shift_enter");
                }
                put_L_focus_class(current_line);
                echo_c_statistic_c_to_neuron();

                window["tagbrain_graph"]["cursor_position"]["neuron_element"] = neuron_element;
                current_line = get_current_line_div("start");
                window["tagbrain_graph"]["cursor_position"] = {
                    neuron_element: neuron_element,
                    outgrowth: current_line,
                    depth_c_in_outgrowth: get_row_caret_position(),
                }

            });
            
            
            neuron_element.addEventListener('paste', (event: any) => {
                window["tagbrain_graph"]["cursor_position"]["neuron_element"] = neuron_element;
                let paste = (event.clipboardData).getData('text');
                functions.paste_formatting(paste);
                event.preventDefault();
            });

            neuron_element.addEventListener('change', function (e: any) {
                let current_line = get_current_line_div("start");
                window["tagbrain_graph"]["cursor_position"] = {
                    neuron_element: neuron_element,
                    outgrowth: current_line,
                    depth_c_in_outgrowth: get_row_caret_position(),
                }
            })

        }
    }
    change_neuron_controller() {
        let neuron_element: any = this.neuron_el,
        neuron_shell: any = this.neuron_shell,
        neuron_id = this.neuron_id,
        graph_L_name = this.graph_L_name,
        unix_time = this.unix_time;

        window["tagbrain_graph"]["cursor_position"]["neuron_element"] = neuron_element;
        echo_c_statistic_c_to_neuron();
        
        
    }
    hide_c_neuron() {
        //clean_ram
        let neuron00s_c_ram_c_obj00s = window["tagbrain_graph"]["ram"]["ram_c_unit00s"];
        for (let i = 0; i < neuron00s_c_ram_c_obj00s.length; i++) {
            let current_obj = neuron00s_c_ram_c_obj00s[i];
            current_obj.el.remove();
            if(current_obj.id == this.neuron_id){
                window["tagbrain_graph"]["ram"]["ram_c_unit00s"].splice(i, 1);
            }
            
        }
        let neuron00s_L_search_L_obj00s = window["tagbrain_graph"]["ram"]["unit00s_L_search"];
        for (let i = 0; i < neuron00s_L_search_L_obj00s.length; i++) {
            let current_obj = neuron00s_L_search_L_obj00s[i];
            current_obj.el.remove();
            if(current_obj.id == this.neuron_id){
                window["tagbrain_graph"]["ram"]["unit00s_L_search"].splice(i, 1);
            }
            
        }
        let neuron00s_L_activated_L_obj00s = window["tagbrain_graph"]["ram"]["neuron00s_c_activated"];
        for (let i = 0; i < neuron00s_L_activated_L_obj00s.length; i++) {
            let current_obj = neuron00s_L_activated_L_obj00s[i];
            current_obj.el.remove();
            if(current_obj.id == this.neuron_id){
                window["tagbrain_graph"]["ram"]["neuron00s_c_activated"].splice(i, 1);
            }
        }
        this.neuron_shell.remove();
        delete window["tagbrain_graph"]["neuron00s_obj00s"][this.neuron_id];

    }
    transformate_input_content(content: any) {
        let html:any = "";
        if (Array.isArray(content)) {
            let options = {
                action: "neuron_x_tab_c_usual",
                tree: content,
                depth_factor: 4
            }
            let cl_g_html = new class_generator_c_tree_c_html(options);
            html = cl_g_html.controller_generator();
        } else {//html
            if (content == '<div class="post_row">$Write connections of a #new neuron</div>') {
                html = content;
            }
        }
        return html;
    }
    toggle_L_container_L_attachment00s(){
        let container_L_attachment00s = this.container_L_attachment00s;
        let reg_attachment = new RegExp(patterns.pattern_L_attach, 'iu');

        //attachment00s_L_exist
            //close_L_neuron
            //open_L_container_L_attachment00s
            //load_L_attachment00s_L_from_server_L_if_exist
    }
    get_c_tab_c_current_c_obj() {
        let tab_obj: any = {};
        tab_obj = window["tagbrain_graph"]["tab_collection"][this.tab_L_neuron];
        return tab_obj;
    }
}
export { class_L_neuron };