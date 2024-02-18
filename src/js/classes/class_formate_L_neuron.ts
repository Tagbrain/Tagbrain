
import {generate_struct_activ_num} from "../units/generate_struct_activ_num";
import {escape_text} from "../units/escape_text";
import {patterns} from "../units/declare_patterns";


import {get_L_og_L_feature00s} from "../units/get_L_og_L_feature00s";
import { gEBI } from "../units/compress_f";
import { complete_L_attachment00s_L_unit00s } from "../units/complete_L_attachment00s_L_unit00s";
import { formatter_L_og_L_content } from "../units/formatter_L_og_L_content";
import { get_L_value_L_input00s_L_search_X_activation } from "../units/get_L_value_L_input00s_L_search_X_activation";


type response_L_get_L_og_L_feature00s = {
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

class class_formate_L_neuron {
    public neuron_activation: any;
    public outrgowths_architecture: string;

    public outgrowths_L_all:outgrowth[];
    public outgrowths_L_current:number[];
    public tagbrain_graph_L_neuron_L_tree:any;

    protected neuron_L_el: HTMLElement;
    public neuron_L_shell: HTMLElement;

    protected neuron_L_id: string;
    protected outgrowths:any;
    protected input_data: string;

    //words_L_searched
    protected og_L_activator: string;
    protected og_L_searcher: string;

    protected is_zero_activation: boolean;

    //stack_L_timing
    protected outgrowth_L_depth_L_memory_x_current_iteration: number;
    protected synapse_L_features:outgrowth;

    constructor(
        neuron_L_id: string, 
        neuron_L_el: HTMLElement,
        neuron_L_shell: HTMLElement | false,
    ) {
        //define
        this.neuron_L_el = neuron_L_el;
        this.neuron_L_id = neuron_L_id;
        if(neuron_L_shell == false){
            this.neuron_L_shell = window["tagbrain_graph"]["neuron00s_obj00s"][this.neuron_L_id].neuron_shell;
        } else {
            this.neuron_L_shell = neuron_L_shell
        }

        this.outgrowths = this.neuron_L_el.children;

        this.is_zero_activation = false;

        this.outgrowth_L_depth_L_memory_x_current_iteration = 0;
        this.tagbrain_graph_L_neuron_L_tree = [];


        //receiver_search_L_data
        let obj_L_input00s = get_L_value_L_input00s_L_search_X_activation();
        this.og_L_activator = obj_L_input00s.og_L_activator;
        this.og_L_searcher = obj_L_input00s.og_L_searcher;

        this.refresh_L_attachment00s();
        this.controller_formatting();
    }
    refresh_L_attachment00s(){
        if(window["tagbrain_graph"]["neuron00s_obj00s"][this.neuron_L_id]){//if_L_neuron_L_exist_X_client
            //clean_L_neuron_L_attachment00s
            window["tagbrain_graph"]["neuron00s_obj00s"][this.neuron_L_id]["attachment00s"] = [];
            let container_L_attachment00s = this.neuron_L_shell.querySelector(".neuron_L_attachment00s");
            container_L_attachment00s.innerHTML = '';
        }
    }
    controller_formatting(){
        let outgrowths_L_all:any = [];
        let outgrowths_L_current:number[] = [];

        for (let i = 0; i < this.outgrowths.length ; i++) {//take_L_og

            let fix_obj:any = {};
            if(this.synapse_L_features != undefined){
                if(this.synapse_L_features.escape){
                    fix_obj = {
                        memory: this.outgrowth_L_depth_L_memory_x_current_iteration,
                        is_fix: false,
                    }
                }
            } else {
                fix_obj = {
                    memory: this.outgrowth_L_depth_L_memory_x_current_iteration,
                    is_fix: true,
                }
            }

            let object_L_og: response_L_get_L_og_L_feature00s = get_L_og_L_feature00s(
                this.outgrowths[i],
                i, 
                fix_obj
            );
            this.outgrowth_L_depth_L_memory_x_current_iteration = object_L_og.new_depth;
            this.synapse_L_features = this.reduct_obj(object_L_og);

            let obj_features:any = {};
            if(this.synapse_L_features.escape == true){
                continue
            } else {
                let content_L_escaped = escape_text(this.synapse_L_features.content);

                obj_features = formatter_L_og_L_content(
                    content_L_escaped, 
                    this.og_L_searcher,
                    this.og_L_activator,
                );
                
                //add_L_attachment00s_X_neuron_obj
                let attachment00s_L_name00s = obj_features.attachment00s_L_name00s;
                for (let j = 0; j < attachment00s_L_name00s.length; j++) {
                    let attachment_L_name = attachment00s_L_name00s[j];
                    complete_L_attachment00s_L_unit00s(
                        attachment_L_name, 
                        this.neuron_L_id
                    );
                }

                //add_L_depth_L_to_og
                obj_features.content = "    ".repeat(this.synapse_L_features.depth) + obj_features.content;
                
                this.tagbrain_graph_L_neuron_L_tree.push({ 
                    k: object_L_og.content, 
                    i: i, 
                    d: this.outgrowth_L_depth_L_memory_x_current_iteration 
                });
            }

            this.outgrowths[i].innerHTML = obj_features.content;
            this.synapse_L_features["is_key_row"] = obj_features.is_key_row;
            outgrowths_L_all.push(this.synapse_L_features);

            if (obj_features.is_key_row == true) {
                outgrowths_L_current.push(i);
            }

        }

        let obj_st_acitvations = generate_struct_activ_num(outgrowths_L_all);

        this.outgrowths_L_all = outgrowths_L_all;
        this.outgrowths_L_current = outgrowths_L_current;
        this.neuron_activation = obj_st_acitvations.general_activation;
        this.outrgowths_architecture = obj_st_acitvations.number;

    }
    reduct_obj(obj:any){
        const { new_depth, ...otherProps} = obj;
        return otherProps
    }
}
export {class_formate_L_neuron};