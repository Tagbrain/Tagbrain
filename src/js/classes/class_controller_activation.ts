import {gEBI, dCE} from "../units/compress_f.js";
import {class_generator_tree_structure} from "../units/generate_tree_structure_2v";
import {class_generator_c_tree_c_html} from "../classes/class_generator_c_tree_c_html";
import { get_deduction_anemones } from "../units/get_deduction_anemones";
import { get_induction_anemones } from "../units/get_induction_anemones";

type outgrowth = {content: string, v_index: number};
type anemone = outgrowth[];
type anemones_collection = anemone[];

class class_controller_activation {

    //conservative
    public action:string;
    public collection_branches:any;

    //facultative
    public event: any;
    public current_branch_s: any;
    public response: any;


    constructor(options:any){
        this.action = options.action;

        if(options.event){
            this.event = options.event;
        }
        if(options.current_branch_s){
            this.current_branch_s = options.current_branch_s;
        }
        this.collection_branches = window["tagbrain_graph"]["activation_obj"]["collection_c_branch_s"];
        if(this.action == "push_branch_s_c_event_click"){
            if (this.event.ctrlKey) {
                this.collection_branches = [...this.collection_branches, ...this.current_branch_s];
                this.response = this.collect_generalizated_tree();
                this.frontend_refresh();
            } else {
                this.collection_branches = this.current_branch_s;
                this.response = this.collect_generalizated_tree();
                this.frontend_refresh();
            }
        }

    }
    collect_generalizated_tree(){
        let deduction_a: anemone[] = get_deduction_anemones(this.collection_branches);
        //let deduction_un_a = get_unreliable_anemones(deduction_a);
        let induction_a: anemone[] = get_induction_anemones(deduction_a);
        //push_c_in_global

        window["tagbrain_graph"].ram.anemone00s.deduction = deduction_a;
        window["tagbrain_graph"].ram.anemone00s.induction = induction_a;

        let options = {
            induction_a:induction_a,
            deduction_a:deduction_a,
        }
        let generator_trees = new class_generator_tree_structure(options);
        
        let features = {
            action: "neuron_x_tab_c_usual",
            tree: generator_trees[0],
            depth_factor: 2
        }
        let cl_g_t_html = new class_generator_c_tree_c_html(features);
        let html = cl_g_t_html.controller_generator();
        return html;
    }
    //GET_MACROFETURES long chains patterns
    //send unreliable anemones in server graph
    //find this microfeatures in new data
    //get them
    //improve structure
    frontend_refresh(){

    }
}
export {class_controller_activation};