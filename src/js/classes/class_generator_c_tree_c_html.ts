import { gEBI } from "../units/compress_f";
type outgrowth = {
    depth: number,
    content: string,
};
class class_generator_c_tree_c_html {

    public donors_microfeatures_x_input_field: Element;
    public tree: outgrowth[];

    protected synapses_tree_x_output_field: Element;
    protected fantom_layer_c_category00s_margin00s: Element;
    protected synapse00s_c_key: string[];
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
        this.synapse00s_c_key = options.synapse00s_c_key;
        if(options.fantom_layer_c_category00s_margin00s){
            this.fantom_layer_c_category00s_margin00s = options.fantom_layer_c_category00s_margin00s;
        }

    }

    controller_generator(){
        if(this.action = "neuron_x_tab_c_usual"){
            let html_tree:string = "";
            for(let i = 0; i < this.tree.length; i++){
                let depth:number = this.tree[i]["depth"];
                let content:string = this.tree[i]["content"];
                if(this.synapse00s_c_key != undefined){
                    let regexp = new RegExp(this.synapse00s_c_key.join("|"), "gi");
                    let is_exist_synapse = regexp.test(content);
                    if(is_exist_synapse){
                        content = content.replace(regexp, function (finded: string) {
                            let changed = "<span class='special_symbols_style'>" + finded + "</span>";
                            return changed;
                        });
                        html_tree += 
                            '<div class="post_row">' 
                                + ' '.repeat(this.depth_factor*depth) 
                                + content 
                            + '</div>'
                    } else {
                        html_tree += 
                            '<div class="post_row">' 
                                + ' '.repeat(this.depth_factor*depth) 
                                + content 
                            + '</div>';
                    }
                } else {
                    html_tree += 
                        '<div class="post_row">' 
                            + ' '.repeat(this.depth_factor*depth) 
                            + content 
                        + '</div>';
                }
            }
            return html_tree;
        }
    }

    generate_fantom_layer_c_category00s_margin00s(){
        let html_tree:string = "";
            for(let i = 0; i < this.tree.length; i++){
                let depth:number = this.tree[i]["depth"];
                if(depth > 0){
                    html_tree += 
                    '<div class="post_row">' 
                        + this.generate_row_c_line00s_c_string(depth)
                    + '</div>';
                } else {
                    html_tree += '<div class="post_row"></div>';
                }
            }
        return html_tree
    }
    generate_row_c_line00s_c_string(
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

export {class_generator_c_tree_c_html};