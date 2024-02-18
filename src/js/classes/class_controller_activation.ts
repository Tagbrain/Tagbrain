import {gEBI, dCE} from "../units/compress_f.js";
import {class_generator_L_tree_L_html} from "../classes/class_generator_L_tree_L_html";
import { get_deduction_anemones } from "../brain_units/get_deduction_anemones";
import { get_induction_anemones } from "../brain_units/get_induction_anemones";
import { class_generator_tree_structure } from "../brain_units/generate_tree_structure_2v";


type outgrowth = {content: string, v_index: number, depth: number};
type anemone = outgrowth[];
type anemones_collection = anemone[];

class class_controller_activation {

    //conservative
    public action:string;
    public collection_branches:any;

    //facultative
    public ctrl_is_activated: any;
    public branch00s_L_current: any;
    public response: any;

    constructor(options:any){
        this.action = options.action;

        if(options.ctrl_is_activated){
            this.ctrl_is_activated = options.ctrl_is_activated;
        }
        if(options.branch00s_L_current){
            this.branch00s_L_current = options.branch00s_L_current;
        }
        if(this.action == "push_branch"){
            this.response = this.collect_generalizated_tree();
        }

    }
    get_L_anemone00s_L_induction_X_deduction(){
        let len = this.branch00s_L_current.length;
        if(len != 0){//branche00s_L_exist
            let induction_a: anemone[] = [];
            let deduction_a: anemone[] = get_deduction_anemones(this.branch00s_L_current);
            //let deduction_un_a = get_unreliable_anemones(deduction_a);
            if(deduction_a.length > 1){
                induction_a = get_induction_anemones(deduction_a);
            } else {
                induction_a = [];
            }
            //push_L_in_global
            window["tagbrain_graph"].ram.anemone00s.deduction = deduction_a;
            window["tagbrain_graph"].ram.anemone00s.induction = induction_a;
            return {
                induction_a: induction_a,
                deduction_a: deduction_a,
            }
        } 
        return {
            induction_a:[],
            deduction_a:[],
        };
        
    }
    collect_generalizated_tree(){

        let tree00s = new class_generator_tree_structure(
            this.get_L_anemone00s_L_induction_X_deduction()
        );
        //choose_L_best_structure()
        window["tagbrain_graph"]["ram"]["tree_L_generalizated"] = tree00s[0];
        let features = {
            action: "neuron_X_with_num",
            tree: tree00s[0],
            depth_factor: 2
        }
        let cl_g_t_html = new class_generator_L_tree_L_html(features);
        let html = cl_g_t_html.generator_L_html();
        let fantom_html = cl_g_t_html.generate_fantom_layer_L_category00s_margin00s();

        return {
            html: html,
            fantom_html: fantom_html
        }
    }

    
}
export {class_controller_activation};