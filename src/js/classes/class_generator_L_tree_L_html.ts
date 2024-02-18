import { gEBI } from "../units/compress_f";
import { formatter_L_og_L_content } from "../units/formatter_L_og_L_content";
import { get_L_value_L_input00s_L_search_X_activation } from "../units/get_L_value_L_input00s_L_search_X_activation";
type outgrowth = {
    depth: number,
    content: string,
};
class class_generator_L_tree_L_html {

    public donors_microfeatures_x_input_field: Element;
    public tree: outgrowth[];

    protected synapses_tree_x_output_field: Element;
    protected fantom_layer_L_category00s_margin00s: Element;
    protected synapse00s_L_key: string[];
    protected depth_factor: number;
    protected action: string;
    protected regexp: any;

    constructor(options: any) {
        //containers
            //response
            this.synapses_tree_x_output_field = gEBI("synapses_tree_x_output_field");
            //input field
            this.donors_microfeatures_x_input_field = gEBI("donors_microfeatures_x_input_field");
        this.depth_factor = options.depth_factor;
        this.tree = options.tree;
        this.action = options.action;
        if(options.fantom_layer_L_category00s_margin00s){
            this.fantom_layer_L_category00s_margin00s = options.fantom_layer_L_category00s_margin00s;
        }
    }
    generator_L_html(){
        let obj_L_input00s = get_L_value_L_input00s_L_search_X_activation();
        let html_tree:string = "";
        if(this.action == "neuron_x_tab_L_usual"){
            
            for(let i = 0; i < this.tree.length; i++){
                let depth:number = this.tree[i]["depth"];
                let content:string = this.tree[i]["content"];
                let og_L_content_L_with_syntax = formatter_L_og_L_content(
                    content,
                    obj_L_input00s.og_L_searcher,
                    obj_L_input00s.og_L_activator
                ).content;

                let content_L_with_L_tabulation = ' '.repeat(this.depth_factor*depth) + og_L_content_L_with_syntax;
                html_tree += 
                    '<div class="post_row">' 
                        + content_L_with_L_tabulation
                    + '</div>';
                
            }
        } else if(this.action == "neuron_X_with_num"){
            for(let i = 0; i < this.tree.length; i++){
                let depth:number = this.tree[i]["depth"];
                let content:string = this.tree[i]["content"];
                let og_L_content_L_with_syntax = formatter_L_og_L_content(
                    content,
                    obj_L_input00s.og_L_searcher,
                    obj_L_input00s.og_L_activator
                ).content;

                let content_L_with_L_tabulation = ' '.repeat(this.depth_factor*depth) + og_L_content_L_with_syntax;
                html_tree += 
                    '<div class="neuron_L_og">'
                        +'<div>'+ i +'</div>'
                        + '<div class="og_L_content" contenteditable="true">' 
                            + content_L_with_L_tabulation
                        + '</div>'
                    + '</div>';
            }
        }
        return html_tree;
    }
    generate_fantom_layer_L_category00s_margin00s(){
        let html_tree:string = "";
            for(let i = 0; i < this.tree.length; i++){
                let depth:number = this.tree[i]["depth"];
                if(depth > 0){
                    html_tree += 
                    '<div class="neuron_L_og">'
                        +'<div></div>'
                        + '<div>' 
                            + this.generate_row_L_line00s_L_string(depth)
                        + '</div>'
                    + '</div>';
                } else {
                    html_tree += 
                    '<div class="neuron_L_og">'
                        +'<div></div>'
                        + '<div></div>'
                    + '</div>';
                }
            }
        return html_tree
    }
    generate_row_L_line00s_L_string(
        depth: number
    ){
        let str = "¦ ";
        let current_depth = this.depth_factor*depth;
        let i = 1;
        while(i < current_depth-1){
            if(i % 2 == 0){// even
                str += " ";
            } else { //odd
                str += "¦";
            }
            i++;
        }
        return str;
    }

}

export {class_generator_L_tree_L_html};