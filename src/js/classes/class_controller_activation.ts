import {gEBI, dCE} from "../units/compress_f.js";
import {class_generator_c_tree_c_html} from "../classes/class_generator_c_tree_c_html";
import { get_deduction_anemones } from "../brain_units/get_deduction_anemones.js";
import { get_induction_anemones } from "../brain_units/get_induction_anemones.js";
import { class_generator_tree_structure } from "../brain_units/generate_tree_structure_2v.js";


type outgrowth = {content: string, v_index: number, depth: number};
type anemone = outgrowth[];
type anemones_collection = anemone[];

class class_controller_activation {

    //conservative
    public action:string;
    public collection_branches:any;

    //facultative
    public ctrl_is_activated: any;
    public branch00s_c_current: any;
    public response: any;

    constructor(options:any){
        this.action = options.action;

        if(options.ctrl_is_activated){
            this.ctrl_is_activated = options.ctrl_is_activated;
        }
        if(options.branch00s_c_current){
            this.branch00s_c_current = options.branch00s_c_current;
        }
        if(this.action == "push_branch"){
            this.response = this.collect_generalizated_tree();
        }

    }
    get_anemone00s_c_from_branche00s(): {
        induction_a:any[],
        deduction_a:any[]
    }{
        let len = this.branch00s_c_current.length;
        if(len != 0){//branche00s_L_exist
            return this.get_L_a_L_induction_X_deduction()
        } else {//branche00s_L_not_exist
            return {
                induction_a:[],
                deduction_a:[],
            };
        }
    }
    get_L_a_L_induction_X_deduction(){
        let induction_a: anemone[] = [];
        let deduction_a: anemone[] = get_deduction_anemones(this.branch00s_c_current);
        //let deduction_un_a = get_unreliable_anemones(deduction_a);
        if(deduction_a.length > 1){
            induction_a = get_induction_anemones(deduction_a);
        } else {
            induction_a = [];
        }
        //push_c_in_global
        window["tagbrain_graph"].ram.anemone00s.deduction = deduction_a;
        window["tagbrain_graph"].ram.anemone00s.induction = induction_a;
        let options = {
            induction_a:induction_a,
            deduction_a:deduction_a,
        }
        return options;
    }
    collect_generalizated_tree(){

        let tree00s = new class_generator_tree_structure(
            this.get_anemone00s_c_from_branche00s()
        );
        //choose_c_best_structure()
        window["tagbrain_graph"]["ram"]["tree_c_generalizated"] = tree00s[0];
        let features = {
            action: "neuron_x_tab_c_usual",
            tree: tree00s[0],
            depth_factor: 2,
            synapse00s_c_key: window["tagbrain_graph"]["ram"]["synapse00s_c_key"]
        }
        let cl_g_t_html = new class_generator_c_tree_c_html(features);
        let html = cl_g_t_html.controller_generator();
        let fantom_html = cl_g_t_html.generate_fantom_layer_c_category00s_margin00s();

        return {
            html: html,
            fantom_html: fantom_html
        }
    }

    
}
export {class_controller_activation};