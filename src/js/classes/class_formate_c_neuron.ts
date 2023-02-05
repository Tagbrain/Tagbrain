import {get_depth_outgrowth} from "../units/get_depth_outgrowth";
import {fix_depth_outgrowth} from "../units/fix_depth_outgrowth";
import {generate_struct_activ_num} from "../units/generate_struct_activ_num";
import {escape_text} from "../units/escape_text";
import {patterns} from "../units/declare_patterns";
import {get_chains_fathers_from_neuron} from "../units/get_chains_fathers_from_neuron";
import {start_gen_1_controller} from "../units/start_gen_1_controller";

type synapse_c_with_key = {
    key: string, 
    row: number, 
    depth: number, 
    is_key_row: boolean
};
type outgrowth = {
    key: string, 
    row: number, 
    depth: number, 
};

class class_formate_c_neuron {
    public generalizated_tree:any;
    public neuron_activation: any;
    public outrgowths_architecture: string;
    public tree_c_tags:any;
    public tree_c_tags_c_action: any;

    protected neuron:HTMLElement;
    protected outgrowths:any;
    protected input_data:any;

    protected input_data_c_modifier_c_is_correct: boolean;
    protected is_zero_activation: boolean;

    //stack_c_timing
    protected outgrowth_c_depth_c_memory_x_current_iteration: number;
    protected glob_ind:number;
    protected synapse_c_features:any;

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
        let outgrowths_c_all_x_features:any = [];
        let outgrowths_c_current_x_features:outgrowth[] = [];

        for (let i = 0; i < this.outgrowths.length  ; i++) {
            this.glob_ind = i;
            this.synapse_c_features = this.get_synapse_features(this.outgrowths[i]);
            let obj_features:any = {};
            if(this.synapse_c_features == false){
                continue
            } else {
                let content_c_formated_c_spaces = "    ".repeat(this.synapse_c_features.depth) + this.synapse_c_features.key;
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
            outgrowths_c_all_x_features.push(this.synapse_c_features);

            if (obj_features.is_key_row == true) {
                outgrowths_c_current_x_features.push(this.synapse_c_features);
            }

        }

            if (outgrowths_c_current_x_features.length > 0) {
                if (outgrowths_c_current_x_features.length > 10) {
                    outgrowths_c_current_x_features.sort((a, b) => b.depth - a.depth);
                    outgrowths_c_current_x_features = outgrowths_c_current_x_features.slice(0, 10);
                }
                let branches_outgrowth = get_chains_fathers_from_neuron(outgrowths_c_current_x_features, outgrowths_c_all_x_features);
                if(branches_outgrowth)
                this.generalizated_tree = "generalizated_tree"//start_gen_1_controller(branches_outgrowth);
            }

            let obj_st_acitvations = generate_struct_activ_num(outgrowths_c_all_x_features);
            this.neuron_activation = obj_st_acitvations.general_activation;
            this.outrgowths_architecture = obj_st_acitvations.number;
    }
    get_synapse_features(synapse_el: Element){
        let features: synapse_c_with_key = {
            key: "", 
            row: 0, 
            depth: 0, 
            is_key_row: false 
        }
        let text_row = synapse_el.textContent;
        
        if(text_row != null){
            if (text_row == "" || text_row.trim() == "\n") {
                this.outgrowths.splice(this.glob_ind, 1);
                return false
            } else {
                let space_obj = get_depth_outgrowth(text_row);
                space_obj.depth = fix_depth_outgrowth(space_obj.depth, this.outgrowth_c_depth_c_memory_x_current_iteration);
                features["depth"] = space_obj.depth;
                features["key"] = text_row.trim();
                features["row"] = this.glob_ind;
                this.outgrowth_c_depth_c_memory_x_current_iteration = space_obj.depth
            }
        }
        return features;
    }
    main_formatter(regexp: RegExp, content_c_escaped:string, this_obj:any){
        let is_key_row = false;
        let tree_c_tags:any = [];
        let tree_c_tags_c_action: any = [];

        let glob_ind = this_obj.glob_ind;
        let outgrowth_c_depth_c_memory_x_current_iteration = this_obj.outgrowth_c_depth_c_memory_x_current_iteration;

        let reg_verb = new RegExp(patterns.pattern_verb, 'giu'),
            reg_tag = new RegExp(patterns.pattern_tag, 'giu'),
            input_regex = new RegExp(this_obj.input_data, 'giu');
            
        let text_c_terminal = content_c_escaped.replace(regexp, function (content_c_unit: string) {
            let is_exist_tags = reg_tag.test(content_c_unit),
                is_exist_tags_action = reg_verb.test(content_c_unit),
                is_exist_finding_word = input_regex.test(content_c_unit);

            if(is_exist_finding_word){
                if (is_exist_tags) {
                    tree_c_tags.push({ key: content_c_unit, c: glob_ind, d: outgrowth_c_depth_c_memory_x_current_iteration });
                    content_c_unit = "<span class='item_tags_style'><mark>" + content_c_unit + "</mark></span>";
                } else if (is_exist_tags_action) {
                    tree_c_tags_c_action.push({ key: content_c_unit, c: glob_ind, d: outgrowth_c_depth_c_memory_x_current_iteration });
                    content_c_unit = "<span class='special_symbols_style'><mark>" + content_c_unit + "</mark></span>";
                } else {
                    content_c_unit = "<mark>" + content_c_unit + "</mark>";
                }
            } else {
                if (is_exist_tags) {
                    tree_c_tags.push({ key: content_c_unit, c: glob_ind, d: outgrowth_c_depth_c_memory_x_current_iteration });
                    content_c_unit = "<span class='item_tags_style'>" + content_c_unit + "</span>";
                } else if (is_exist_tags_action) {
                    tree_c_tags_c_action.push({ key: content_c_unit, c: glob_ind, d: outgrowth_c_depth_c_memory_x_current_iteration });
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
}
export {class_formate_c_neuron};