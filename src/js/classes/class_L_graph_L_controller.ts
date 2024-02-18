import { generate_L_graph_L_environment } from "../nodes/all_posts_action/generate_L_graph_L_environment";
import { dCE, gEBI } from "../units/compress_f.js"

class class_L_graph_L_controller {

    protected container_graph00s_L_link00s: Element;
    protected graph_L_link: Element;
    protected graph_name: string;
    
    constructor(graph_name: string){
        this.graph_name = graph_name;
        this.container_graph00s_L_link00s = gEBI("graph00s_L_link00s");
        let graph00s_L_user = window["tagbrain_graph"]["graph00s_L_user"];
        this.put_L_to_interface_L_link();
        this.set_L_link_L_listner();
        window["tagbrain_graph"]["graph00s_L_user"].push(this.graph_name);
        
    }
    put_L_to_interface_L_link(){
        let html = 
            '<div>'
                +'<a class="a_cl">'
                + this.graph_name
                + '<a>'
            + '<div>';
        this.container_graph00s_L_link00s.insertAdjacentHTML("beforeend", html);
        this.graph_L_link = this.container_graph00s_L_link00s.lastElementChild as Element;
    }
    set_L_link_L_listner(){
        this.graph_L_link.addEventListener("click", (e:any)=>{

            history.pushState({}, '', '/'+ this.graph_name);
            generate_L_graph_L_environment(this.graph_name);
            gEBI("RAM_right_bar").click();
        })
    }

}

export {class_L_graph_L_controller}