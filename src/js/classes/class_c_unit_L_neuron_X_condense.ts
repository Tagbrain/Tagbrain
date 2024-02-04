import { dCE, gEBI } from "../units/compress_f";
import { get_compress_html_set } from "../units/get_compress_html_set";
import { convert_c_unixtime_c_to_formate_c_usual } from "../units/convert_c_unixtime_c_to_formate_c_usual";
import { focus_c_neuron_c_target_c_tab } from "../units/focus_c_neuron_c_target_c_tab";
import { get_c_tree_c_string } from "../units/get_c_tree_c_string";
import { send_data_ajax } from "../units/send_data_ajax";
import { class_L_neuron } from "./class_L_neuron";
import { class_formate_c_neuron } from "./class_formate_c_neuron";
import { class_generator_c_tree_c_html } from "./class_generator_c_tree_c_html";

type options = {
    tab_L_unit_X_name: string,
    output_container_L_name: string,
    unit_L_neuron_L_id: string,
    unit_L_description_L_short: string | string[][],
    unit_L_rank: number,
    unit_L_time: string,
    unit_L_neuron_L_is_special: boolean,
}
type neuron_L_feature00s = {
    id: string,
    time: string,
    description_L_short: string,
    type_window: string,
    neuron_L_rank: number,
    tree_c_string: string,
    count_c_string_c_og00s: number,
    is_saved: boolean,
    button_L_replace: string,
    tab_L_unit_X_name: string
}

class class_L_unit_L_neuron_X_condense {

    protected tab_L_unit_X_name: string;
    protected output_container_L_element: Element;
    public unit_c_element: Element;
    protected tagbrain_L_unit00s_collection_L_path: string
    protected graph_c_name: string;
    
    protected unit_L_neuron_L_id: string;
    protected unit_L_description_L_short: string | string[][];
    protected unit_L_rank: number;
    protected og_L_activator: any;
    protected unit_L_neuron_L_is_special: boolean;
    public unit_L_time: string; // window["tagbrain_graph"]["neuron00s_obj00s"][this.unit_L_neuron_L_id].unix_time


    protected output_container: Element;
    protected button_L_replace: string;
    protected field_L_replacer: any;
    protected field_L_replacer_L_value: string;

    constructor(options:options){
        this.tab_L_unit_X_name = options.tab_L_unit_X_name;

        this.output_container_L_element = gEBI(options.output_container_L_name)

        this.unit_L_neuron_L_id = options.unit_L_neuron_L_id;

        this.unit_L_description_L_short = options.unit_L_description_L_short;
        this.unit_L_rank = options.unit_L_rank;

        this.unit_L_neuron_L_is_special = options.unit_L_neuron_L_is_special;
        this.tagbrain_L_unit00s_collection_L_path = "";

        this.graph_c_name = window["tagbrain_graph"]["graph_name"];
        this.button_L_replace = "<span></span>";
        this.field_L_replacer = gEBI("replace_input_block");
        this.field_L_replacer_L_value = this.field_L_replacer.value;

        this.unit_c_element = dCE("div");

        if(this.tab_L_unit_X_name == "ram"){
            this.tagbrain_L_unit00s_collection_L_path = "ram_c_unit00s";
            this.og_L_activator = "";
        } else if(this.tab_L_unit_X_name == "search"){
            this.tagbrain_L_unit00s_collection_L_path = "unit00s_L_search";
            this.og_L_activator = gEBI("search_input_block").value;
            this.button_L_replace =  '<svg class="linear_icon_c_target icon_size_middle">'
                + '<use xlink:href="#sprite_c_search_icons_x_replace">'
                + '</use>'
            + '</svg>'
        } else if(this.tab_L_unit_X_name == "activation"){ 
            this.tagbrain_L_unit00s_collection_L_path = "neuron00s_c_activated";
            this.og_L_activator = window["tagbrain_graph"]["ram"]["synapse00s_c_key"];
        }

        if(this.unit_L_description_L_short == ""){//empty
            if(window["tagbrain_graph"]["neuron00s_obj00s"].hasOwnProperty(this.unit_L_neuron_L_id)){//neuron_L_client_L_exist
                let neuron_L_content: any[] = window["tagbrain_graph"]["neuron00s_obj00s"][this.unit_L_neuron_L_id]["content"];
                if(neuron_L_content[0] != undefined){
                    if(neuron_L_content[1] != undefined){
                        this.unit_L_description_L_short = neuron_L_content[0].content + " | " + neuron_L_content[1].content;
                    } else {
                        this.unit_L_description_L_short = neuron_L_content[0].content;
                    }
                }
            } else {
                this.unit_L_description_L_short = "-";
            }
            this.unit_L_description_L_short == ""
        } else {//not_empty
            if(Array.isArray(this.unit_L_description_L_short)){//it is array
                let options: any = {
                    action: "neuron_x_tab_c_usual",
                    tree: this.unit_L_description_L_short,
                    depth_factor: 2,
                    synapse00s_c_key: this.og_L_activator
                }
                let generator_L_html: any = new class_generator_c_tree_c_html(
                    options
                );
                let html = generator_L_html.controller_generator();
                this.unit_L_description_L_short = html;
            } else {//it is string
            }
        }

        this.unit_L_time = convert_c_unixtime_c_to_formate_c_usual(
            options.unit_L_time
        )

        this.add_L_unit();
    }
    add_L_unit(){
        let obj = this.get_L_unit_obj(this.unit_L_neuron_L_id);
        if(obj != false){//remove_L_old_L_version
            this.remove_L_unit_obj_X_el(this.unit_L_neuron_L_id);
        }
        //create_L_unit
        let neuron_c_feature00s = this.collect_L_neuron_L_current_X_features();
        neuron_c_feature00s["button_L_replace"] = this.button_L_replace;
        neuron_c_feature00s["tab_L_unit_X_name"] = this.tab_L_unit_X_name;
        let html = get_compress_html_set(neuron_c_feature00s);
        this.neuron00s_L_select_L_target_L_text();

        //add_unit
        if(this.tab_L_unit_X_name == "ram"){//to_start
            this.output_container_L_element.insertBefore(this.unit_c_element, this.output_container_L_element.firstChild);
        } else {//to_end
            this.output_container_L_element.appendChild(this.unit_c_element );
        }
        this.unit_c_element.className = "unit_L_element"
        this.unit_c_element.innerHTML = html;

        this.push_c_data_c_target_c_tagbrain_obj();
        this.set_L_listner_L_field_L_replace_X_change();
        this.set_L_listner_L_target_L_unit_link();
        this.set_L_listner_L_target_L_unit_L_remove_button();
    }
    unit_L_select_L_target_L_text(html: string) {
        let regexp = new RegExp(this.og_L_activator, 'giu');
        let html_new = "";
        let replacer_val = this.field_L_replacer_L_value;
        if(this.field_L_replacer_L_value != ""){
            html_new = html.replace(regexp, function (search_key: string) {
                search_key = '<replaced_text>'
                                    + search_key 
                                + '</replaced_text>' 
                                + '<replacer>' 
                                    + replacer_val 
                                + '</replacer>';
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
    neuron00s_L_select_L_target_L_text() {
        if(window["tagbrain_graph"]["neuron00s_obj00s"].hasOwnProperty(this.unit_L_neuron_L_id)){
            new class_formate_c_neuron(
                this.unit_L_neuron_L_id, 
                window["tagbrain_graph"]["neuron00s_obj00s"][this.unit_L_neuron_L_id].neuron_el,
                false
            );
        }
    }
    push_c_data_c_target_c_tagbrain_obj(){
        let obj = this.get_L_unit_obj(this.unit_L_neuron_L_id);
        if(obj == false)
            window["tagbrain_graph"]["ram"][this.tagbrain_L_unit00s_collection_L_path].push(
                {
                    id: this.unit_L_neuron_L_id,
                    el: this.unit_c_element,
                    class: this,
                }
            );
    }
    get_L_tab_L_unit00s_L_all(){
        return window["tagbrain_graph"]["ram"][this.tagbrain_L_unit00s_collection_L_path];
    }
    get_L_unit_obj(unit_L_neuron_L_id: string){
        let tab_L_unit00s_L_all: any[] = this.get_L_tab_L_unit00s_L_all();
        for (let i = 0; i < tab_L_unit00s_L_all.length; i++) {
            const tab_L_unit: any = tab_L_unit00s_L_all[i];
            if(tab_L_unit.id == unit_L_neuron_L_id){
                return {
                    obj: tab_L_unit,
                    i: i
                }
            }
        }
        return false;
    }
    remove_L_unit_obj_X_el(unit_L_neuron_L_id: string){
        let unit = this.get_L_unit_obj(unit_L_neuron_L_id);
        if(unit != false){
            //remove_L_element_L_from_frontend
            unit.obj.el.remove();
            //remove_L_obj_L_location_L_tagbrain_storage
            window["tagbrain_graph"]["ram"][this.tagbrain_L_unit00s_collection_L_path].splice(unit.i, 1)
        } else {// unit not exist

        }
    }
    set_L_listner_L_field_L_replace_X_change(){
        let unit_L_el = this.unit_c_element;
        let content_c_replacer = this.field_L_replacer_L_value;
        this.field_L_replacer.addEventListener("keyup", (e:any)=>{
            let collections_c_subject_s = unit_L_el.getElementsByTagName("replacer");
            if(collections_c_subject_s.length > 0){
                for(let i = 0; i < collections_c_subject_s.length; i++){
                    collections_c_subject_s[i].innerHTML = content_c_replacer;
                }
            }
        });
    }
    set_L_listner_L_target_L_unit_link(){
        let link_element = this.unit_c_element.querySelector(".link_part") as Element;
        link_element.addEventListener("click", (e:any)=>{
            if(!window["tagbrain_graph"]["neuron00s_obj00s"].hasOwnProperty(this.unit_L_neuron_L_id)){//load_L_neuron
                let data = {
                    action: 'get_L_neuron00s_L_with_id00s',
                    graph_name: this.graph_c_name,
                    facultative:{
                        neuron00s_L_id00s: [this.unit_L_neuron_L_id],
                    }
                };
                let url = "php/neurons/controller_getting_graph_data.php";
                let controller_f = function (response_obj: any) {
                    if (response_obj.status == "success") {
                        for (let i = 0; i < response_obj.data.length; i++) {
                            let neuron_L_data = response_obj.data[i];
                            let features = {
                                neuron_id: neuron_L_data.neuron_id,
                                is_outgrowth00s: true,
                                content: neuron_L_data.neuron_tree_json,
                                contenteditable: response_obj.contenteditable,
                                time_L_last_edit: response_obj.time_L_last_edit,
                                add_ram_boolen: false,
                                is_format: true,
                                default_tab: "neurons"
                            };
                            let obj = new class_L_neuron(features);
                            if(i == response_obj.data.length - 1){
                                focus_c_neuron_c_target_c_tab(obj.neuron_id, "neurons");
                            }
                        }
                    } else {
                        console.log("Neuron not exist. FREnd124745")
                    }
                }
                let error_message = "Error 123y657";
                send_data_ajax(data, url, controller_f, true, error_message);
            } else {
                let tab_L_neuron = window["tagbrain_graph"]["neuron00s_obj00s"][this.unit_L_neuron_L_id]["tab_L_neuron"]
                focus_c_neuron_c_target_c_tab(this.unit_L_neuron_L_id, tab_L_neuron);
            }
        })
    }
    set_L_listner_L_target_L_unit_L_remove_button(){
        let remove_button_c_element = this.unit_c_element.querySelector(".search_row_delete") as Element;
        remove_button_c_element.addEventListener("click", (e:any)=>{
            this.remove_L_unit_obj_X_el(this.unit_L_neuron_L_id);
        })
    }
    collect_L_neuron_L_current_X_features(){
        let data = {
            id: this.unit_L_neuron_L_id,
            time: this.unit_L_time, 
            type_window: this.tab_L_unit_X_name, 
            neuron_L_rank: this.unit_L_rank
        } as neuron_L_feature00s;

        if (this.unit_L_neuron_L_is_special == false) {//neurons usual html
            if(window["tagbrain_graph"]["neuron00s_obj00s"].hasOwnProperty(this.unit_L_neuron_L_id)){//neuron_L_exist_L_in_client
                let neuron_c_obj = window["tagbrain_graph"]["neuron00s_obj00s"][this.unit_L_neuron_L_id];
                let class_neuron = new class_formate_c_neuron(
                    this.unit_L_neuron_L_id, 
                    neuron_c_obj.neuron_el,
                    neuron_c_obj.neuron_shell,
                );
                let tree_c_prepared = class_neuron.tagbrain_graph_c_neuron_c_tree; //for line neuron shape #edit #add
                let obj_c_tree_c_string = get_c_tree_c_string(tree_c_prepared);

                Object.assign(data, {
                    description_L_short: this.unit_L_description_L_short,
                    tree_c_string: obj_c_tree_c_string.string,
                    count_c_string_c_og00s: obj_c_tree_c_string.count,
                    is_saved: true,
                });

            } else {//neuron_L_not_exist_L_in_client

                Object.assign(data, {
                    description_L_short: this.unit_L_description_L_short,
                    tree_c_string: "map",
                    count_c_string_c_og00s: 0,
                    is_saved: true
                });

            }

        } else {// neuron_L_unusual_html

            Object.assign(data, {
                description_L_short: "special",
                tree_c_string: "map",
                count_c_string_c_og00s: 0,
                is_saved: true,
            });
        }
        return data
       
    }
}
export{class_L_unit_L_neuron_X_condense}