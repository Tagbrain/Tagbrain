import { gEBI } from "../units/compress_f";
import {class_controller_activation} from "../classes/class_controller_activation";

type options = {
    neuron_L_id:string,
    branch00s_L_current: arr_chain[],
    ctrl_is_activated: boolean,
    target_L_content: string
}
type arr_chain = {
    depth: number,
    is_key_row: boolean,
    content: string,
    escape: boolean
}[];

class class_L_attach_L_summarization_tree {

    public container_L_tree_L_el: Element;
    public container_L_fantom_L_tree: Element;
    public container_L_neuron_id00s: Element;

    public branch00s_L_current: arr_chain[];
    public neuron_L_id: string; 
    public target_L_content: string;

    public ctrl_is_activated: boolean;

    constructor(options:options){

        this.neuron_L_id = options.neuron_L_id;
        this.branch00s_L_current = options.branch00s_L_current;
        this.ctrl_is_activated = options.ctrl_is_activated;
        this.target_L_content = options.target_L_content

        this.container_L_tree_L_el = gEBI("synapses_tree_x_output_field");
        this.container_L_fantom_L_tree = gEBI("container_L_fantom_L_tree");
        this.container_L_neuron_id00s = gEBI("container_L_neuron_id00s");

        this.start_collector();
    }
    start_collector(){

        //check exist the neuron_L_id in the stack;
        this.put_neuron00s_L_link00s()
        
        if(this.branch00s_L_current != undefined){
            window["tagbrain_graph"]["ram"]["branch_L_current"] = this.branch00s_L_current;
            if(this.ctrl_is_activated){
                this.add_branch_L_target_L_generalized_tree();
            } else {
                this.exchange_branch00s_L_target_ram_L_stack_branch00s();

            }
        }
    }
    exchange_branch00s_L_target_ram_L_stack_branch00s(){
        window["tagbrain_graph"]["ram"]["generalizated_L_neuron00s"] = [this.neuron_L_id];
        if(!window["tagbrain_graph"]["ram"]["synapse00s_L_key"].includes(this.target_L_content))
            window["tagbrain_graph"]["ram"]["synapse00s_L_key"] = [this.target_L_content];
        let class_activation = this.get_L_class_controller_activation();
        this.container_L_neuron_id00s.innerHTML = 
            "<span class='dashed_L_brackets'>" 
                + this.neuron_L_id 
            + "</span>";
        this.container_L_tree_L_el.innerHTML = class_activation.response["html"];
        this.container_L_fantom_L_tree.innerHTML = class_activation.response["fantom_html"];
    }
    add_branch_L_target_L_generalized_tree(){
        if(!window["tagbrain_graph"]["ram"]["synapse00s_L_key"].includes(this.target_L_content))
            window["tagbrain_graph"]["ram"]["synapse00s_L_key"].push(this.target_L_content); 
        let class_activation = this.get_L_class_controller_activation();
        this.container_L_tree_L_el.innerHTML = class_activation.response.html;
        this.container_L_fantom_L_tree.innerHTML = class_activation.response.fantom_html;
    }
    put_neuron00s_L_link00s(){
        //check exist the neuron_L_id in the stack;
        let is_exist_L_id = this.is_exist_L_neuron_id_x_target_L_ram_L_stack_branch00s();
        if(!is_exist_L_id){    
            if(this.ctrl_is_activated){ 
                window["tagbrain_graph"]["ram"]["generalizated_L_neuron00s"].push(this.neuron_L_id);  
                this.container_L_neuron_id00s.innerHTML += 
                "<span class='dashed_L_brackets'>" 
                    + this.neuron_L_id 
                + "</span>";      
            } else {
                this.container_L_neuron_id00s.innerHTML = 
                "<span class='dashed_L_brackets'>" 
                    + this.neuron_L_id 
                + "</span>";
            }   
        }
    }
    is_exist_L_neuron_id_x_target_L_ram_L_stack_branch00s(){
        let neuron00s_L_id00s = window["tagbrain_graph"]["ram"]["generalizated_L_neuron00s"]
        for (let i = 0; i < neuron00s_L_id00s.length; i++) {
            let id = neuron00s_L_id00s[i];
            if(this.neuron_L_id == id){
                return true
            }
        }
        return false;
    }
    get_L_class_controller_activation(){
        let branch00s:any = [];
        let immature = this.branch00s_L_current;
        if(this.ctrl_is_activated){
            let last_summarization = window["tagbrain_graph"]["ram"]["tree_L_generalizated"];
            if(last_summarization.length == 0){
                branch00s = immature;
            } else {
                branch00s = [...immature, last_summarization];
            }
        } else {
            branch00s = immature;
        }


        let options = {
            action: "push_branch",
            ctrl_is_activated: this.ctrl_is_activated,
            branch00s_L_current: branch00s,
        }
        let class_activation = new class_controller_activation(options);
        return class_activation
    }
} 

export {class_L_attach_L_summarization_tree}