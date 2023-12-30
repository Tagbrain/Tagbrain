
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
    protected neuron_L_shell: HTMLElement;

    protected neuron_c_id: string;
    protected outgrowths:any;
    protected input_data:any;

    protected input_data_c_modifier_c_is_correct: boolean;
    protected is_zero_activation: boolean;

    //stack_c_timing
    protected outgrowth_c_depth_c_memory_x_current_iteration: number;
    protected synapse_c_features:outgrowth;


    constructor(
        neuron_c_id: string, 
        input_data: any,
        neuron_c_el: HTMLElement | false,
        neuron_L_shell: HTMLElement | false,
    ) {
        this.neuron_c_id = neuron_c_id;

        if(neuron_c_el == false){
            this.neuron_c_el = window["tagbrain_graph"]["neuron00s_obj00s"][this.neuron_c_id].neuron_el;
        } else {
            this.neuron_c_el = neuron_c_el;
        }

        if(neuron_L_shell == false){
            this.neuron_L_shell = window["tagbrain_graph"]["neuron00s_obj00s"][this.neuron_c_id].neuron_shell;
        } else {
            this.neuron_L_shell = neuron_L_shell
        }

        this.outgrowths = this.neuron_c_el.children;

        this.is_zero_activation = false;
        this.input_data = input_data;

        this.outgrowth_c_depth_c_memory_x_current_iteration = 0;
        this.tagbrain_graph_c_neuron_c_tree = [];

        this.input_data_c_modifier_c_is_correct = true;
        if(this.input_data == ""){
            this.input_data_c_modifier_c_is_correct = false;
            this.input_data = "za92jr4njFrjv"
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

        for (let i = 0; i < this.outgrowths.length ; i++) {
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

            let response_c_g_o_f: response_c_get_outgrowth_features = get_outgrowth_features(
                this.outgrowths[i],
                i, 
                fix_obj
            );
            this.outgrowth_c_depth_c_memory_x_current_iteration = response_c_g_o_f.new_depth;
            this.synapse_c_features = this.reduct_obj(response_c_g_o_f);

            let obj_features:any = {};
            if(this.synapse_c_features.escape == true){
                continue
            } else {
                let content_c_formated_c_spaces = "    ".repeat(this.synapse_c_features.depth) + this.synapse_c_features.content;
                let content_c_escaped = escape_text(content_c_formated_c_spaces);
                let regexp: any;
                if(this.input_data_c_modifier_c_is_correct){
                    regexp = new RegExp(this.input_data + '|' + patterns.pattern_tag + '|' + patterns.pattern_L_attach, 'gmu');
                    obj_features = this.main_formatter(regexp, content_c_escaped, this);
                } else {
                    regexp = new RegExp(patterns.pattern_tag + '|' + patterns.pattern_L_attach, 'gmu');
                    obj_features = this.main_formatter(regexp, content_c_escaped, this);
                }
                this.tagbrain_graph_c_neuron_c_tree.push({ 
                    k: response_c_g_o_f.content, 
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
    main_formatter(regexp: RegExp, content_c_escaped:string, this_obj:any){
        let is_key_row = false;

        let reg_attachment = new RegExp(patterns.pattern_L_attach, 'iu'),
            reg_tag = new RegExp(patterns.pattern_tag, 'iu'),
            input_regex = new RegExp(this_obj.input_data, 'giu');
        let neuron_c_id = this.neuron_c_id;
        let text_c_terminal = content_c_escaped.replace(regexp, function (content_c_unit: string) {
            let is_exist_tags = reg_tag.test(content_c_unit),
                is_exist_attachment = reg_attachment.test(content_c_unit),
                is_exist_finding_word = input_regex.test(content_c_unit);

            if(is_exist_finding_word){
                is_key_row = true;
                if (is_exist_tags) {

                    content_c_unit = 
                        "<span class='item_tags_style'><mark>" 
                            + content_c_unit 
                        + "</mark></span>";

                } else if (is_exist_attachment) {

                    complete_L_attachment00s_L_unit00s(
                        content_c_unit, 
                        neuron_c_id
                    );
                    
                    content_c_unit = 
                        "<span class='special_symbols_style'><mark>" 
                            + content_c_unit 
                        + "</mark></span>";

                } else {
                    content_c_unit = 
                        "<mark>" 
                            + content_c_unit 
                        + "</mark>";
                }
            } else {
                if (is_exist_tags) {
                    content_c_unit = 
                        "<span class='item_tags_style'>" 
                            + content_c_unit 
                        + "</span>";
                } else if (is_exist_attachment) {

                    complete_L_attachment00s_L_unit00s(
                        content_c_unit, 
                        neuron_c_id
                    );

                    content_c_unit = 
                        "<span class='special_symbols_style'>" 
                            + content_c_unit 
                        + "</span>";

                }
            }
            return content_c_unit
        });

        return {
            content: text_c_terminal,
            is_key_row: is_key_row,
        }
    }
}
export {class_formate_c_neuron};