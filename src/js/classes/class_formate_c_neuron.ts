
import {generate_struct_activ_num} from "../units/generate_struct_activ_num";
import {escape_text} from "../units/escape_text";
import {patterns} from "../units/declare_patterns";


import {get_outgrowth_features} from "../units/get_outgrowth_features";


type response_c_get_outgrowth_features = {
    content: string, 
    row: number, 
    depth: number, 
    escape: boolean,
    new_depth: number,
};
type outgrowth = {
    content: string, 
    row: number, 
    depth: number, 
    is_key_row: boolean,
    escape: boolean
};

class class_formate_c_neuron {
    public generalizated_tree:any;
    public neuron_activation: any;
    public outrgowths_architecture: string;
    public tree_c_tags:any;
    public tree_c_tags_c_action: any;
    public outgrowths_c_all:outgrowth[];
    public outgrowths_c_current:number[];

    protected neuron:HTMLElement;
    protected outgrowths:any;
    protected input_data:any;

    protected input_data_c_modifier_c_is_correct: boolean;
    protected is_zero_activation: boolean;

    //stack_c_timing
    protected outgrowth_c_depth_c_memory_x_current_iteration: number;
    protected glob_ind:number;
    protected synapse_c_features:outgrowth;

    constructor(neuron: HTMLElement, input_data: any) {
        this.neuron = neuron;
        this.outgrowths = neuron.children;

        this.is_zero_activation = false;
        this.input_data = input_data;

        this.outgrowth_c_depth_c_memory_x_current_iteration = 0;

        this.input_data_c_modifier_c_is_correct = true;
        if(this.input_data == ""){
            this.input_data_c_modifier_c_is_correct = false;
            this.input_data = "za92jr4njFrjv"
        }
        this.tree_c_tags = [];
        this.tree_c_tags_c_action = [];

        this.controller_formatting();
    }
    controller_formatting(){
        let outgrowths_c_all:any = [];
        let outgrowths_c_current:number[] = [];

        for (let i = 0; i < this.outgrowths.length ; i++) {
            this.glob_ind = i;
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

            let response_c_g_o_f: response_c_get_outgrowth_features = get_outgrowth_features(this.outgrowths[i],this.glob_ind, fix_obj);
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
                    regexp = new RegExp(this.input_data + '|' + patterns.pattern_tag + '|' + patterns.pattern_verb, 'gmu');
                    obj_features = this.main_formatter(regexp, content_c_escaped, this);
                    this.tree_c_tags.push(...obj_features.tree_c_tags);
                    this.tree_c_tags_c_action.push(...obj_features.tree_c_tags_c_action);
                } else {
                    regexp = new RegExp(patterns.pattern_tag + '|' + patterns.pattern_verb, 'gmu');
                    obj_features = this.main_formatter(regexp, content_c_escaped, this);
                    this.tree_c_tags.push(...obj_features.tree_c_tags);
                    this.tree_c_tags_c_action.push(...obj_features.tree_c_tags_c_action);
                }
            }

            this.outgrowths[i].innerHTML = obj_features.content;
            this.synapse_c_features["is_key_row"] = obj_features.is_key_row;
            outgrowths_c_all.push(this.synapse_c_features);

            if (obj_features.is_key_row == true) {
                outgrowths_c_current.push(i);
            }

        }

            if (outgrowths_c_current.length > 0) {
                this.generalizated_tree = "generalizated_tree";
            } else {
                this.generalizated_tree = "Developing";
            }
            let obj_st_acitvations = generate_struct_activ_num(outgrowths_c_all);

            this.outgrowths_c_all = outgrowths_c_all;
            this.outgrowths_c_current = outgrowths_c_current;
            this.neuron_activation = obj_st_acitvations.general_activation;
            this.outrgowths_architecture = obj_st_acitvations.number;

        return this.get_public_features();
    }
    reduct_obj(obj:any){
        const { new_depth, ...otherProps} = obj;
        return otherProps
    }
    main_formatter(regexp: RegExp, content_c_escaped:string, this_obj:any){
        let is_key_row = false;
        let tree_c_tags:any = [];
        let tree_c_tags_c_action: any = [];

        let glob_ind = this_obj.glob_ind;
        let outgrowth_c_depth_c_memory_x_current_iteration = this_obj.outgrowth_c_depth_c_memory_x_current_iteration;

        let reg_verb = new RegExp(patterns.pattern_verb, 'iu'),
            reg_tag = new RegExp(patterns.pattern_tag, 'iu'),
            input_regex = new RegExp(this_obj.input_data, 'giu');
            
        let text_c_terminal = content_c_escaped.replace(regexp, function (content_c_unit: string) {
            let is_exist_tags = reg_tag.test(content_c_unit),
                is_exist_tags_action = reg_verb.test(content_c_unit),
                is_exist_finding_word = input_regex.test(content_c_unit);

            if(is_exist_finding_word){
                is_key_row = true;
                if (is_exist_tags) {
                    tree_c_tags.push({ content: content_c_unit, c: glob_ind, d: outgrowth_c_depth_c_memory_x_current_iteration });
                    content_c_unit = "<span class='item_tags_style'><mark>" + content_c_unit + "</mark></span>";
                } else if (is_exist_tags_action) {
                    tree_c_tags_c_action.push({ content: content_c_unit, c: glob_ind, d: outgrowth_c_depth_c_memory_x_current_iteration });
                    content_c_unit = "<span class='special_symbols_style'><mark>" + content_c_unit + "</mark></span>";
                } else {
                    content_c_unit = "<mark>" + content_c_unit + "</mark>";
                }
            } else {
                if (is_exist_tags) {
                    tree_c_tags.push({ content: content_c_unit, c: glob_ind, d: outgrowth_c_depth_c_memory_x_current_iteration });
                    content_c_unit = "<span class='item_tags_style'>" + content_c_unit + "</span>";
                } else if (is_exist_tags_action) {
                    tree_c_tags_c_action.push({ content: content_c_unit, c: glob_ind, d: outgrowth_c_depth_c_memory_x_current_iteration });
                    content_c_unit = "<span class='special_symbols_style'>" + content_c_unit + "</span>";
                }
            }

            return content_c_unit
        });
        return {
            content: text_c_terminal,
            is_key_row: is_key_row,
            tree_c_tags:tree_c_tags,
            tree_c_tags_c_action:tree_c_tags_c_action
        }
    }
    get_public_features(){
        return {
            generalizated_tree:this.generalizated_tree,
            neuron_activation: this.neuron_activation,
            outrgowths_architecture: this.outrgowths_architecture,
            tree_c_tags:this.tree_c_tags,
            tree_c_tags_c_action: this.tree_c_tags_c_action,
            outgrowths_c_all: this.outgrowths_c_all,
            outgrowths_c_current:this.outgrowths_c_current,
        }
    }
}
export {class_formate_c_neuron};