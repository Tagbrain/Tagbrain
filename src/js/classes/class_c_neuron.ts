import {add_to_ram} from "../units/add_to_ram.js"
import {post_format} from "../units/formate_neuron";
import {put_validation_events_to_neuron} from "../units/put_validation_events_to_neuron.js";
import {gEBI, dCE} from "../units/compress_f.js";
import {find_formate_neuron} from "../units/find_formate_neuron";
import {transformate_obj_to_html} from "../units/tranformate_obj_to_html";
import {get_neuron_object_outgrowths} from "../units/get_neuron_object_outgrowths";
import {send_data_ajax} from "../units/send_data_ajax.js";

import {elements} from "../nodes/neuron_action_controller/obj_post_edit_f";
import {functions} from "../nodes/neuron_action_controller/obj_post_edit_f";
import { class_formate_c_neuron } from "./class_formate_c_neuron";

import {echo_c_statistic_c_to_neuron} from "../units/echo_c_statistic_c_to_neuron.js";

class class_c_neuron {
    
    public neuron_id: string;
    public outgrowths: any;
    public contenteditable: boolean;
    public add_ram_boolen: boolean;
    public is_format: boolean;
    public neuron_el: HTMLElement;
    public neuron_shell: HTMLElement;
    public unix_time: string;
    public neuron_c_container_c_tab: string;
    public default_tab:string;

    constructor(features:any){
        this.unix_time = Math.round(new Date().getTime() / 1000).toString();
        if(features.neuron_id == ""){
            this.neuron_id = this.unix_time;
        } else {
            this.neuron_id = features.neuron_id;
        }
        this.outgrowths = this.transformate_input_content(features.outgrowths);
        this.contenteditable = features.contenteditable;
        this.add_ram_boolen = features.add_ram_boolen;
        this.is_format = features.is_format;
        if(features.default_tab){
            this.default_tab = features.default_tab;
        }
        
        this.add_neuron();
        if(features.neuron_id == ""){
            if(window["tagbrain_graph"]["current_tab"] == "neurons"){
                this.add_neuron_server();
            } else {
                this.add_neuron_storage_c_local();
            }
        } 
        this.put_c_this_class_x_target_c_tg();
    }
    add_neuron(){
        let tab_obj = this.get_c_tab_c_current_c_obj();
        let neurons_container = tab_obj.mental_image_container;
        
        let neuron_shell = this.create_element(this.neuron_id, "item");
        this.neuron_shell = neuron_shell;
        neuron_shell.innerHTML += 
            '<div class="post_name">'
                + '<span>'+this.neuron_id+'</span>'
                + '<span class="save_flag"></span>'
                + '<span class="file_time" title="last editing"></span>'
            + '</div>'
            + '<div class="post_icon_container">'
                + '<a class="button_cont_stl">'
                    + '<svg class="linear_icon_c_target icon_size_middle">'
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
                + '<div contenteditable="'+this.contenteditable+'" spellcheck="false" id="neuron_'+this.neuron_id+'" class="item_input">'
                + this.outgrowths
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

        if(this.is_format == true){
            let html_divs = post_format(this.neuron_el.innerText);
            this.neuron_el.innerHTML =  html_divs.innerHTML;
            find_formate_neuron(this.neuron_el, []);
            put_validation_events_to_neuron(this.neuron_el);
            if(this.add_ram_boolen == true){
                add_to_ram(this.neuron_el, this.neuron_id, false)
            } else if (this.add_ram_boolen == false){
                false
            }
        }
        //#check two next rows
        let response = {shell: neuron_shell, neuron_el: this.neuron_el};
        return response;
    }
    add_neuron_server(){
        let graph_name:any =  window["tagbrain_graph"]["graph_name"];
        let neuron_tree = get_neuron_object_outgrowths(this.neuron_el);

        let data = {
           action: 'add',
           graph_name: graph_name,
           neuron_id: this.neuron_id,
           neuron_tree: neuron_tree,
           unix_time: this.unix_time,
        };
        let url = "php/neurons/controller_neurons_change.php";
        let controller_f = function(response_obj: any){
            if (response_obj.status == "success"){
              console.log("Remove the not_save-flag")
            } else {
              console.log("Not saved")
            }
        }
        let error_message = "Error server";
        send_data_ajax(data, url, controller_f, true, error_message);
    }
    add_neuron_storage_c_local(){
        let neuron_tree = get_neuron_object_outgrowths(this.neuron_el);
        let value = encodeURIComponent(JSON.stringify(neuron_tree));
        let key:string = "neuron_c_dr["+this.neuron_id+"]";
        localStorage.setItem(key, value);
        console.log("Remove the not_save-flag | Add a neurone cookie");
    }
    create_element(id:string, className:string){
        let element = dCE("div");
        element.id = id;
        element.className = className;
        return element
    }
    put_c_this_class_x_target_c_tg(){
        window["tagbrain_graph"]["neurons_objs"][this.neuron_id] = this;
    }
    remove_neuron(){

    }
    change_neuron_controller(){
        let neuron_el:any = this.neuron_el;
        neuron_el.addEventListener('blur', function(e) {
            elements.current_post = this.neuron_el;
            echo_c_statistic_c_to_neuron();
            new class_formate_c_neuron(neuron_el, "")

            let array_current_key_word = neuron_el.querySelectorAll("mark");

            if(array_current_key_word.length == 0){
              new class_formate_c_neuron(neuron_el, "")
            } else {
              let arr_text_val:any = [];
              for(var i = 0; i < array_current_key_word.length; i++){
                arr_text_val.push(array_current_key_word[i].innerText.trim());
              }
              new class_formate_c_neuron(neuron_el, arr_text_val.join("|"))
            }
        
            put_not_save_class(target_neuron);
            validate_blur_row();
            functions.make_drop_down_blocks(target_neuron);
            call_refractor_send_data(refractory_timer, 900, target_neuron);
        }, true)
    }
    hide_neuron(){

    }
    transformate_input_content(content:any){
        let neuron_content = "";
        if(Array.isArray(content)){
            neuron_content = transformate_obj_to_html(content);
        } else {//html
            if(content == '<div class="post_row">$Write connections of a #new neuron</div>'){
                neuron_content = content;
            }
        }
        return neuron_content;
    }
    get_c_tab_c_current_c_obj(){
        let tab_obj:any = {};
        if(!this.default_tab){
            this.neuron_c_container_c_tab = window["tagbrain_graph"]["current_tab"];
            tab_obj = window["tagbrain_graph"]["tab_collection"][this.neuron_c_container_c_tab];
        } else {
            tab_obj = window["tagbrain_graph"]["tab_collection"][this.default_tab];
        }
        return tab_obj;
    }
}
export{class_c_neuron};