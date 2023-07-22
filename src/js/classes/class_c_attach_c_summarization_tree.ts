import { gEBI } from "../units/compress_f";
import {class_controller_activation} from "../classes/class_controller_activation";

type options = {
    neuron_c_id:string,
    branch00s_c_current: arr_chain[],
    ctrl_is_activated: boolean,
    target_c_content: string
}
type arr_chain = {
    depth: number,
    is_key_row: boolean,
    content: string,
    escape: boolean
}[];

class class_c_attach_c_summarization_tree {

    public container_c_tree_c_el: Element;
    public container_c_fantom_c_tree: Element;
    public container_c_neuron_id00s: Element;

    public branch00s_c_current: arr_chain[];
    public neuron_c_id: string; 
    public target_c_content: string;

    public ctrl_is_activated: boolean;

    constructor(options:options){

        this.neuron_c_id = options.neuron_c_id;
        this.branch00s_c_current = options.branch00s_c_current;
        this.ctrl_is_activated = options.ctrl_is_activated;
        this.target_c_content = options.target_c_content

        this.container_c_tree_c_el = gEBI("synapses_tree_x_output_field");
        this.container_c_fantom_c_tree = gEBI("container_c_fantom_c_tree");
        this.container_c_neuron_id00s = gEBI("container_c_neuron_id00s");

        this.start_collector()

    }
    start_collector(){

        //check exist the neuron_c_id in the stack;
        this.put_neuron00s_c_link00s()
        
        if(this.branch00s_c_current != undefined){
            window["tagbrain_graph"]["ram"]["branch_c_current"] = this.branch00s_c_current;
            if(this.ctrl_is_activated){
                this.add_branch_c_target_c_generalized_tree();
            } else {
                this.exchange_branch00s_c_target_ram_c_stack_branch00s();

            }
        }
    }
    exchange_branch00s_c_target_ram_c_stack_branch00s(){
        window["tagbrain_graph"]["ram"]["generalizated_c_neuron00s"] = [this.neuron_c_id];
        if(!window["tagbrain_graph"]["ram"]["synapse00s_c_key"].includes(this.target_c_content))
            window["tagbrain_graph"]["ram"]["synapse00s_c_key"] = [this.target_c_content];
        let class_activation = this.get_c_class_controller_activation();
        this.container_c_neuron_id00s.innerHTML = 
            "<span class='dashed_c_brackets'>" 
                + this.neuron_c_id 
            + "</span>";
        this.container_c_tree_c_el.innerHTML = class_activation.response["html"];
        this.container_c_fantom_c_tree.innerHTML = class_activation.response["fantom_html"];
    }
    add_branch_c_target_c_generalized_tree(){
        if(!window["tagbrain_graph"]["ram"]["synapse00s_c_key"].includes(this.target_c_content))
            window["tagbrain_graph"]["ram"]["synapse00s_c_key"].push(this.target_c_content); 
        let class_activation = this.get_c_class_controller_activation();
        this.container_c_tree_c_el.innerHTML = class_activation.response.html;
        this.container_c_fantom_c_tree.innerHTML = class_activation.response.fantom_html;
    }
    put_neuron00s_c_link00s(){
        //check exist the neuron_c_id in the stack;
        let is_exist_c_id = this.is_exist_c_neuron_id_x_target_c_ram_c_stack_branch00s();
        if(!is_exist_c_id){    
            if(this.ctrl_is_activated){ 
                window["tagbrain_graph"]["ram"]["generalizated_c_neuron00s"].push(this.neuron_c_id);  
                this.container_c_neuron_id00s.innerHTML += 
                "<span class='dashed_c_brackets'>" 
                    + this.neuron_c_id 
                + "</span>";      
            } else {
                this.container_c_neuron_id00s.innerHTML = 
                "<span class='dashed_c_brackets'>" 
                    + this.neuron_c_id 
                + "</span>";
            }   
        }
    }
    is_exist_c_neuron_id_x_target_c_ram_c_stack_branch00s(){
        let neuron00s_c_id00s = window["tagbrain_graph"]["ram"]["generalizated_c_neuron00s"]
        for (let i = 0; i < neuron00s_c_id00s.length; i++) {
            let id = neuron00s_c_id00s[i];
            if(this.neuron_c_id == id){
                return true
            }
        }
        return false;
    }
    get_c_class_controller_activation(){
        let branch00s:any = [];
        let immature = this.branch00s_c_current;
        if(this.ctrl_is_activated){
            let last_summarization = window["tagbrain_graph"]["ram"]["tree_c_generalizated"];
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
            branch00s_c_current: branch00s,
        }
        let class_activation = new class_controller_activation(options);
        return class_activation
    }
} 

export {class_c_attach_c_summarization_tree}