import {gEBI, dCE} from "../units/compress_f.js";

class class_c_controller_c_tabs_functions {
    public id_name: string;

    public tab_container: Element;
    public tab_button: Element;
    public mental_images_container: Element;
    public mental_image_container: Element;

    public default_boolean: boolean;
    public html_x_tab_content_c_container: string;
    

    constructor(id_name: string, default_boolean: boolean, content_html:string){
        this.id_name = id_name;
        this.default_boolean = default_boolean;
        this.html_x_tab_content_c_container = content_html;

            this.tab_container = gEBI("tab_container");
            this.mental_images_container = document.querySelector("#mental_image_c_container") as Element;

        this.add_tab();
    }
    remove_tab(){
        this.tab_button.remove();
        this.mental_image_container.remove();

        let index = window["tagbrain_graph"]["tab_collection"].indexOf(this.id_name);
        window["tagbrain_graph"]["tab_collection"].splice(index, 1);

        if(window["tagbrain_graph"]["current_tab"] == this.id_name){
            window["tagbrain_graph"]["tab_collection"]["neurons"].open_tab()
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
        let tabs = this.tab_container.children;
        for(let i = 0; i < tabs.length; i++){
            if(tabs[i] == this.tab_button){
                tabs[i].classList.add("tab_activated");
                window["tagbrain_graph"]["current_tab"] = this.id_name;
            } else {
                tabs[i].classList.remove("tab_activated");
            }
        }
    }
    add_controller_x__a_remove_x_open_z__c_action(){
        this.tab_button.addEventListener("click", (e:any) => {
            e = e || window.event;
            let target = e.target;
            if(target.classList){
                if(target.parentElement == this.tab_button && target.classList.contains("remove_tab")){
                    this.remove_tab();
                } else if(target.parentElement == this.tab_button && target.classList.contains("remove_tab") == false){
                    this.open_tab();
                    //this.activate_current_tab()
                }
            }
        });
    }
    add_tab(){
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
        this.tab_button = this.create_element("tab_button", tab_c_html);
        let mental_image_container = this.create_element("mental_image", this.html_x_tab_content_c_container);
        this.mental_images_container.append(mental_image_container);
        this.tab_container.append(this.tab_button);
        this.mental_image_container = mental_image_container;
        this.add_controller_x__a_remove_x_open_z__c_action();
        window["tagbrain_graph"]["tab_collection"][this.id_name] = this;
    }
    create_element(className:string, html:string){
        let element = dCE("div");
        element.className = className;
        element.innerHTML = html;
        return element
    }
}

export {class_c_controller_c_tabs_functions};