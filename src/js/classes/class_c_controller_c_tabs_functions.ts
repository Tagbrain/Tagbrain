import {gEBI, dCE} from "../units/compress_f.js";

class class_c_controller_c_tabs_functions {
    public id_name: string;

    public tab00s_container: Element;
    public tab_button: Element;
    public mental_images_container: Element;
    public mental_image_container: Element;
    public tab_button_c_container: Element;

    public default_boolean: boolean;
    public html_x_tab_content_c_container: string;
    

    constructor(option00s:any){
        this.id_name = option00s.name;
        this.default_boolean = option00s.default;
        this.html_x_tab_content_c_container = option00s.content_html;

            this.tab00s_container = gEBI("tab00s_container");
            this.mental_images_container = document.querySelector("#mental_image_c_container") as Element;

        let is_added = this.add_tab(); 
    }
    remove_tab(){
        this.tab_button_c_container.remove();
        this.mental_image_container.remove();

        //hide_c_tab_c_neuron00s_x_current
        let neuron00s_obj00s_c_id00s = Object.keys(window["tagbrain_graph"]["neuron00s_obj00s"])
        for (let i = 0; i < neuron00s_obj00s_c_id00s.length; i++) {
            let id = neuron00s_obj00s_c_id00s[i];
            if(window["tagbrain_graph"]["neuron00s_obj00s"][id]["default_tab"] == this.id_name){
                window["tagbrain_graph"]["neuron00s_obj00s"][id].hide_c_neuron();
            }
        }
        
        //delete_c_tab
        delete window["tagbrain_graph"]["tab_collection"][this.id_name];

        if(window["tagbrain_graph"]["current_tab"] == this.id_name && this.id_name != "neurons"){
            if(window["tagbrain_graph"]["tab_collection"]["neurons"] != undefined){
                window["tagbrain_graph"]["tab_collection"]["neurons"].open_tab();
            }
        }
    }
    open_tab(){
        let mental_images = this.mental_images_container.children;
        for(let i = 0; i < mental_images.length; i++){
            if(mental_images[i] == this.mental_image_container){
                mental_images[i].classList.remove("hide_cl");
            } else {
                mental_images[i].classList.add("hide_cl");
            }
        } 
        this.activate_current_tab();
    }
    activate_current_tab(){
        let tabs = this.tab00s_container.children;
        for(let i = 0; i < tabs.length; i++){
            if(tabs[i] == this.tab_button_c_container){
                tabs[i].classList.add("tab_activated");
                window["tagbrain_graph"]["current_tab"] = this.id_name;
            } else {
                tabs[i].classList.remove("tab_activated");
            }
        }
    }
    add_controller_x__a_remove_x_open_z__c_action(){
        this.tab_button_c_container.addEventListener("click", (e:any) => {
            e = e || window.event;
            let target = e.target;
            if(target.classList){
                if(target.parentElement == this.tab_button_c_container && target.classList.contains("remove_tab")){
                    this.remove_tab();
                } else if(target == this.tab_button){
                    this.open_tab();
                    //this.activate_current_tab()
                }
            }
        });
    }
    add_tab(){
        if(window["tagbrain_graph"]["tab_collection"][this.id_name] == undefined){
            let tab_c_html: string;
            if(this.default_boolean == true){//not removable
                tab_c_html = 
                    '<span>'
                        + this.id_name
                    +'</span>';
            } else {
                tab_c_html = 
                    '<span>'
                        + this.id_name
                    + '</span>'
                    + '<span class="remove_tab">'
                        + ' ×'
                    +'</span>';
            }
            this.tab_button_c_container = this.create_element("tab_button", tab_c_html);
            let mental_image_container = this.create_element("mental_image", this.html_x_tab_content_c_container);
            this.mental_images_container.append(mental_image_container);
            this.tab00s_container.append(this.tab_button_c_container);
            this.tab_button = this.tab_button_c_container.children[0];
            this.mental_image_container = mental_image_container;
            this.add_controller_x__a_remove_x_open_z__c_action();
            window["tagbrain_graph"]["tab_collection"][this.id_name] = this;
            return true;
        } else {
            return false;
        }
    }
    tab_c_with_the_name_x_is_exist(tab_c_name:string){
        if(window["tagbrain_graph"]["tab_collection"][this.id_name] != undefined){
            return 
        }
    }
    create_element(className:string, html:string){
        let element = dCE("div");
        element.className = className;
        element.innerHTML = html;
        return element
    }
}

export {class_c_controller_c_tabs_functions};