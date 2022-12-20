import {gEBI, dCE} from "../units/compress_f.js";

 class tab_main_container {
    
    public name: string;
    public id: string;
    public parent_container: Element;
    public default_boolean: boolean;

    constructor(name: string, default_boolean: boolean){
        this.name = name;
        this.id = "tab_main_" + name;
        this.parent_container = gEBI("tab_container");
        this.default_boolean = default_boolean;
    }
    remove_tab(){
        gEBI(this.id).remove();
    }
    add_remove_listner(){
        let tab_button = gEBI(this.id);
        let remove_tab_button = tab_button.querySelector(".remove_tab");
        if(remove_tab_button != null){
           remove_tab_button.addEventListener("click", () => {
            this.remove_tab();
           });
        }
    }
    open_tab(){
        //close all window with class
        //open need window
    };
    add_tab(){
        let html: string;
        if(this.default_boolean == true){//not removable
            html = '<div id="' + this.id + '" class="tab_button">'
                + '<span>'
                    + this.name 
                +'</span>'
            + '</div>';
        } else {
            html = '<div id="' + this.id + '" class="tab_button">'
                + '<span>'
                    + this.name 
                + '</span>'
                + '<span class="remove_tab">'
                    + ' ×'
                +'</span>'
            + '</div>';
        }
        this.parent_container.innerHTML += html;
        if(this.default_boolean == false)
            this.add_remove_listner();
    }
    tab_is_exist(){
        if(gEBI(this.id) == false){
            return false
        } else {
            return true
        }
    }
    controller_default(){
        if(this.default_boolean == true){
            if(this.tab_is_exist() == false){
                this.add_tab();
            }
        }
    }
}

export {tab_main_container};