import { gEBI } from "../units/compress_f";
type outgrowth = {
    depth: number,
    content: string,
};
class class_generator_c_tree_c_html {

    public donors_microfeatures_x_input_field: Element;
    public synapses_tree_x_output_field: Element;
    public tree: outgrowth[];
    protected depth_factor: number;
    protected action: string;

    constructor(options: any) {
        //containers
            //response
            this.synapses_tree_x_output_field = gEBI("synapses_tree_x_output_field");
            //input field
            this.donors_microfeatures_x_input_field = gEBI("donors_microfeatures_x_input_field");

        this.depth_factor = options.depth_factor;
        this.tree = options.tree;
        this.action = options.action;
    }

    controller_generator(){
        if(this.action = "neuron_x_tab_c_usual"){
            let html_tree:string = "";
            for(let i = 0; i < this.tree.length; i++){
                let depth:number = this.tree[i]["depth"];
                let content:string = this.tree[i]["content"];
                html_tree += '<div class="post_row">' + ' '.repeat(this.depth_factor*depth) + content + '</div>';
            }
            return html_tree;
        }
    }

}

export {class_generator_c_tree_c_html};