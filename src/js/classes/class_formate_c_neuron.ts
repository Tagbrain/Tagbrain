
import {generate_struct_activ_num} from "../units/generate_struct_activ_num";
import {escape_text} from "../units/escape_text";
import {patterns} from "../units/declare_patterns";


import {get_outgrowth_features} from "../units/get_outgrowth_features";
import { gEBI } from "../units/compress_f";
import { complete_L_attachment00s_L_unit00s } from "../units/complete_L_attachment00s_L_unit00s";


type response_c_get_outgrowth_features = {
    content: string, 
    depth: number, 
    escape: boolean,
    new_depth: number,
};
type outgrowth = {
    content: string, 
    depth: number, 
    is_key_row: boolean,
    escape: boolean
};

class class_formate_c_neuron {
    public neuron_activation: any;
    public outrgowths_architecture: string;

    public outgrowths_c_all:outgrowth[];
    public outgrowths_c_current:number[];
    public tagbrain_graph_c_neuron_c_tree:any;

    protected neuron_c_el: HTMLElement;
    public neuron_L_shell: HTMLElement;

    protected neuron_c_id: string;
    protected outgrowths:any;
    protected input_data: string;

    //words_L_searched
    protected og_L_activator00s: string;
    protected searching_L_string: string;

    protected is_zero_activation: boolean;

    //stack_c_timing
    protected outgrowth_c_depth_c_memory_x_current_iteration: number;
    protected synapse_c_features:outgrowth;


    constructor(
        neuron_c_id: string, 
        neuron_c_el: HTMLElement,
        neuron_L_shell: HTMLElement | false,
    ) {
        //define
        this.neuron_c_el = neuron_c_el;
        this.neuron_c_id = neuron_c_id;
        if(neuron_L_shell == false){
            this.neuron_L_shell = window["tagbrain_graph"]["neuron00s_obj00s"][this.neuron_c_id].neuron_shell;
        } else {
            this.neuron_L_shell = neuron_L_shell
        }

        this.outgrowths = this.neuron_c_el.children;

        this.is_zero_activation = false;

        this.outgrowth_c_depth_c_memory_x_current_iteration = 0;
        this.tagbrain_graph_c_neuron_c_tree = [];


        //receiver_search_L_data
        this.og_L_activator00s = window["tagbrain_graph"]["ram"]["synapse00s_c_key"].join("|");
        if(this.og_L_activator00s == ""){
            if(this.og_L_activator00s.length < 4){
                this.og_L_activator00s = "89empty_cap98F";
            }
        }
        this.searching_L_string = gEBI('search_input_block').value;
        if(this.searching_L_string.length < 3){
            this.searching_L_string = "89empty_cap98F";
        }

        this.refresh_L_attachment00s();
        this.controller_formatting();
    }
    refresh_L_attachment00s(){
        if(window["tagbrain_graph"]["neuron00s_obj00s"][this.neuron_c_id]){//if_L_neuron_L_exist_X_client
            //clean_L_neuron_L_attachment00s
            window["tagbrain_graph"]["neuron00s_obj00s"][this.neuron_c_id]["attachment00s"] = [];
            let container_L_attachment00s = this.neuron_L_shell.querySelector(".neuron_L_attachment00s");
            container_L_attachment00s.innerHTML = '';
        }
    }
    controller_formatting(){
        let outgrowths_c_all:any = [];
        let outgrowths_c_current:number[] = [];

        for (let i = 0; i < this.outgrowths.length ; i++) {//take_L_og
            let fix_obj:any = {};
            if(this.synapse_c_features != undefined){
                if(this.synapse_c_features.escape){
                    fix_obj = {
                        memory: this.outgrowth_c_depth_c_memory_x_current_iteration,
                        is_fix: false,
                    }
                }
            } else {
                fix_obj = {
                    memory: this.outgrowth_c_depth_c_memory_x_current_iteration,
                    is_fix: true,
                }
            }

            let object_L_og: response_c_get_outgrowth_features = get_outgrowth_features(
                this.outgrowths[i],
                i, 
                fix_obj
            );
            this.outgrowth_c_depth_c_memory_x_current_iteration = object_L_og.new_depth;
            this.synapse_c_features = this.reduct_obj(object_L_og);

            let obj_features:any = {};
            if(this.synapse_c_features.escape == true){
                continue
            } else {
                let content_c_escaped = escape_text(this.synapse_c_features.content);

                obj_features = this.main_formatter2(
                    content_c_escaped, 
                    this.searching_L_string,
                    this.og_L_activator00s
                );
                obj_features.content = "    ".repeat(this.synapse_c_features.depth) + obj_features.content;
                
                this.tagbrain_graph_c_neuron_c_tree.push({ 
                    k: object_L_og.content, 
                    i: i, 
                    d: this.outgrowth_c_depth_c_memory_x_current_iteration 
                });
            }

            this.outgrowths[i].innerHTML = obj_features.content;
            this.synapse_c_features["is_key_row"] = obj_features.is_key_row;
            outgrowths_c_all.push(this.synapse_c_features);

            if (obj_features.is_key_row == true) {
                outgrowths_c_current.push(i);
            }

        }

        let obj_st_acitvations = generate_struct_activ_num(outgrowths_c_all);

        this.outgrowths_c_all = outgrowths_c_all;
        this.outgrowths_c_current = outgrowths_c_current;
        this.neuron_activation = obj_st_acitvations.general_activation;
        this.outrgowths_architecture = obj_st_acitvations.number;

    }
    reduct_obj(obj:any){
        const { new_depth, ...otherProps} = obj;
        return otherProps
    }
    main_formatter2(
        content_c_escaped:string, 
        searching_L_string: any,
        og_L_activator00s: any
    ){
        let is_key_row = false;

        let is_exist_finding_word = false;

        let reg_attachment = new RegExp(patterns.pattern_L_attach, 'iu'),
            reg_tag = new RegExp(patterns.pattern_tag, 'iu'),
            input_regex = new RegExp(searching_L_string +'|'+ og_L_activator00s, 'giu');
        let neuron_c_id = this.neuron_c_id;
        let regexp = new RegExp("[\\w#@]*", 'giu');

        let all_word00s = content_c_escaped.replace(regexp, function (og_L_one_word: string) {

            let is_exist_tags = reg_tag.test(og_L_one_word),
                is_exist_attachment = reg_attachment.test(og_L_one_word);

            //put_L_style_L_internal
            let word_L_input_regex = og_L_one_word.replace(input_regex, function (word_L_changed: string) {
                is_exist_finding_word = true;
                is_key_row = true;
                return word_L_changed = 
                    "<mark>" 
                        + word_L_changed 
                    + "</mark>";
            });

            //put_L_style_L_internal
            if(is_exist_tags){
                og_L_one_word = 
                    "<span class='item_tags_style'>" 
                        + word_L_input_regex 
                    + "</span>";
            } else if(is_exist_attachment){
                og_L_one_word = 
                "<span class='special_symbols_style'>" 
                    + word_L_input_regex 
                + "</span>";

                //add_L_attachment
                complete_L_attachment00s_L_unit00s(
                    og_L_one_word, 
                    neuron_c_id
                );
            }
            return og_L_one_word;

        });

        return {
            content: all_word00s,
            is_key_row: is_key_row,
        }
    }
}
export {class_formate_c_neuron};