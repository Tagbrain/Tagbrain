import {gEBI, dCE} from "../units/compress_f.js";

class class_c_icon_c_checker {
    public icon_c_checker:Element;
    public is_activated: boolean;
    public container_c_icon_c_checker: Element;
    public id: string;
    constructor(features:any){
        this.icon_c_checker = features.icon_c_checker;
        this.id = features.id;
        this.container_c_icon_c_checker = this.icon_c_checker.parentElement as Element;
        this.is_activated = false;
        this.add_listner_c_checker();
        window["tagbrain_graph"]["checker_collection"][this.id] = this;
    }
    add_listner_c_checker(){
        this.icon_c_checker.addEventListener("click", (e:any)=>{
            this.change_state_x_boolean_checker_c_icon();
        })
    }
    change_state_x_boolean_checker_c_icon(){
        let ic_classes = this.icon_c_checker.classList;
        let className = "linear_icon_c_target_x_checked";
        if(this.is_activated == true){
            ic_classes.remove(className);
            this.is_activated = false;
        } else {
            ic_classes.add(className);
            this.is_activated = true;
        }
    }
}
export {class_c_icon_c_checker};