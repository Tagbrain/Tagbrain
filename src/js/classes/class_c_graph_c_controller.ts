import { generate_c_graph_c_environment } from "../nodes/all_posts_action/generate_c_graph_c_environment";
import { dCE, gEBI } from "../units/compress_f.js"

class class_c_graph_c_controller {

    protected container_graph00s_c_link00s: Element;
    protected graph_c_link: Element;
    protected graph_name: string;
    
    constructor(graph_name: string){
        this.graph_name = graph_name;
        this.container_graph00s_c_link00s = gEBI("graph00s_c_link00s");
        let graph00s_c_user = window["tagbrain_graph"]["graph00s_c_user"];
        if(graph00s_c_user.includes(this.graph_name)){
            //next
        } else {
            this.put_c_to_interface_c_link();
            this.set_c_link_c_listner();
            window["tagbrain_graph"]["graph00s_c_user"].push(this.graph_name);
        }
    }
    put_c_to_interface_c_link(){
        let html = 
            '<div>'
                +'<a class="a_cl">'
                + this.graph_name
                + '<a>'
            + '<div>';
        this.container_graph00s_c_link00s.insertAdjacentHTML("beforeend", html);
        this.graph_c_link = this.container_graph00s_c_link00s.lastElementChild as Element;
    }
    set_c_link_c_listner(){
        this.graph_c_link.addEventListener("click", (e:any)=>{

            history.pushState({}, '', '/'+ this.graph_name);
            generate_c_graph_c_environment(this.graph_name);
            //history.replaceState( {} , '', '/'+this.graph_name );
        })
    }

}

export {class_c_graph_c_controller}