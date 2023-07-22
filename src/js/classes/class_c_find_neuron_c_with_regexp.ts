import { gEBI, dCE } from "../units/compress_f.js";
import { send_data_ajax } from "../units/send_data_ajax.js";
import { class_formate_c_neuron } from "./class_formate_c_neuron";
import { class_c_neuron } from "./class_c_neuron";
import { focus_c_neuron_x_scroll } from "../units/focus_c_neuron_x_scroll";
import { if_c_screen_c_is_narrow_zz_close_c_right_bar } from "../units/if_c_screen_c_is_narrow_zz_close_c_right_bar";

class class_c_find_neuron_c_with_regexp {

    public graph_name: string;
    public neuron_id: string;
    public synapse_c_main: string;
    public input_c_search: any;
    public content_c_replacer: any;
    public input_c_search_x_value: string;
    public content_c_replacer_c_value: string;
    public key_rows: string[];
    public microfeatures: string[];

    public count: number;

    public input_keys: any;

    public output_container: Element;
    public container_c_purpose_c_find_synapse: Element;
    public class_c_unit_el: Element;

    constructor(object: any) {
        this.graph_name = window["tagbrain_graph"]["graph_name"];

        this.neuron_id = object.neuron_id;
        this.microfeatures = object.microfeatures;
        this.synapse_c_main = object.synapse_c_main;
        this.key_rows = object.key_rows;
        this.count = object.count;
        this.input_keys = object.input_keys;

        this.input_c_search = gEBI("search_input_block");
        this.content_c_replacer = gEBI("replace_input_block");
        let new_val = this.transformate_input_value();
        this.input_c_search_x_value = new_val;
        this.content_c_replacer_c_value = this.content_c_replacer.value;

        this.output_container = gEBI("result_block");
        this.add_unit();
        this.add_c_tagbrain_obj();
    }
    add_c_tagbrain_obj(){
        window["tagbrain_graph"]["neuron_collections_c_current"]["search_c_last_finded"].push({
            neuron_id: this.neuron_id,
            key_rows: this.key_rows 
        });
    }
    add_unit() {
        let html = 
            '<div class="contaner_c_header_x_find_c_synapse">'
                + '<div class="">'
                    + this.synapse_c_main
                + '</div>'
            + '</div>'
            + '<div class="points_circle">'
                + this.count
            + '</div>'
            + '<div class="link_swipe_animation container_c_body_x_find_c_synapse">'
                    + '<div>〇 '
                        + this.microfeatures.join("</div><div>〇 ")
                    + '</div>'
            + '</div>'
            + '<div class="unit_c_search_c_footer">'
                + '<svg class="linear_icon_c_target icon_size_middle">'
                    + '<use xlink:href="#sprite_c_search_icons_x_replace">'
                    + '</use>'
                + '</svg>'
            + '</div>'
        let html_c_highlight = this.select_c_target_text(html);
        this.select_c_client_neurons_c_target();
        this.class_c_unit_el = this.create_element(html_c_highlight);
        this.output_container.append(this.class_c_unit_el);
        this.container_c_purpose_c_find_synapse = this.class_c_unit_el;
        this.set_c_listner_c_change_c_input_field_s();
        this.set_c_listener_c_load_neuron();
    }
    select_c_target_text(html: string) {
        let regexp = new RegExp(this.input_c_search_x_value, 'giu');
        let html_new = "";
        let replacer_val = this.content_c_replacer_c_value;
        if(this.content_c_replacer_c_value != ""){
            html_new = html.replace(regexp, function (search_key: string) {
                search_key = '<replaced_text>'+search_key+'</replaced_text><replacer>' + replacer_val + '</replacer>';
                return search_key
            })
        } else {
            html_new = html.replace(regexp, function (search_key: string) {
                search_key = "<span class='special_symbols_style'><mark>" + search_key + "</mark></span>";
                return search_key
            })
        }
        return html_new;
    }
    select_c_client_neurons_c_target() {
        if(window["tagbrain_graph"]["neuron00s_obj00s"].hasOwnProperty(this.neuron_id)){
            new class_formate_c_neuron(
                this.neuron_id, 
                this.input_c_search_x_value,
                false
            );
        }
    }
    create_element(html: string) {
        let element = dCE("div");
        element.className = "neuron_c_finded_synapses";
        element.innerHTML = html;
        return element
    }
    set_c_listener_c_load_neuron() {
        this.class_c_unit_el.addEventListener("click", (e:any)=>{
            if(!window["tagbrain_graph"]["neuron00s_obj00s"].hasOwnProperty(this.neuron_id)){
                let data = {
                    action: 'get_c_neuron_c_with_id',
                    graph_name: this.graph_name,
                    facultative:{
                    neuron_id: this.neuron_id,
                    }
                };
                let url = "php/neurons/controller_getting_graph_data.php";
                let controller_f = function (response_obj: any) {
                    if (response_obj.status == "success") {
                        console.log(response_obj)
                        let features = {
                            neuron_id: response_obj.data.neuron_id,
                            is_outgrowth00s: true,
                            content: response_obj.data.neuron_tree_json,
                            contenteditable: response_obj.contenteditable,
                            time_c_last_edit: response_obj.time_c_last_edit,
                            add_ram_boolen: false,
                            is_format: true,
                        };
                        let obj = new class_c_neuron(features);
                        focus_c_neuron_x_scroll(obj.neuron_id);
                        if_c_screen_c_is_narrow_zz_close_c_right_bar();
                    } else {
                        console.log("Neuron not exist. FREnd124745")
                    }
                }
                let error_message = "Error 123y657";
                send_data_ajax(data, url, controller_f, true, error_message);
            } else {
                focus_c_neuron_x_scroll(this.neuron_id);
                if_c_screen_c_is_narrow_zz_close_c_right_bar();
            }
        })
    }
    set_c_listner_c_change_c_input_field_s(){
        let class_c_unit_el = this.class_c_unit_el;
        let content_c_replacer = this.content_c_replacer;
        content_c_replacer.addEventListener("keyup", (e:any)=>{
            let collections_c_subject_s = class_c_unit_el.getElementsByTagName("replacer");
            if(collections_c_subject_s.length > 0){
                for(let i = 0; i < collections_c_subject_s.length; i++){
                    collections_c_subject_s[i].innerHTML = content_c_replacer.value;
                }
            }
        });
    }
    transformate_input_value(){
        let patterns:any = this.input_c_search.value.split("\|").join("Zn5hfe234f").split("|");
        if(patterns.length > 0){
            for(let i = patterns.length-1; i >= 0; i--){
                let pattern = patterns[i].split("Zn5hfe234f").join("");
                let pattern_c_symb_s = [...pattern];
                if(pattern_c_symb_s.length < 3){
                    patterns.splice(i, 1);
                    continue
                } else {
                    continue
                }
            }
        }
        return patterns.join("");

    }
}

export { class_c_find_neuron_c_with_regexp };
