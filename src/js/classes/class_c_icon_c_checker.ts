import { add_wave_animation_x_click_c_event } from "../units/add_wave_animation_x_click_c_event";
import {gEBI, dCE} from "../units/compress_f.js";

class class_c_icon_c_checker {
    public icon_c_checker:Element;
    public is_activated: boolean;
    public container_c_icon_c_checker: Element;
    public id: string;
    public checker_c_function: any;
    protected turn_on_c_action: any;
    protected turn_off_c_action: any;

    constructor(features:any){
        this.icon_c_checker = features.icon_c_checker;
        this.id = features.id;

        this.checker_c_function = features.checker_c_function;
        this.turn_on_c_action = features.turn_on_c_action;
        this.turn_off_c_action = features.turn_off_c_action;

        this.container_c_icon_c_checker = this.icon_c_checker.parentElement as Element;
        this.is_activated = false;
        this.add_listner_c_checker();
        window["tagbrain_graph"]["checker_collection"][this.id] = this;
    }

    add_listner_c_checker(){
        this.icon_c_checker.addEventListener("click", (e:any)=>{
            this.change_state_checker(e);
        })
    }
    change_state_checker(e:any){
        let turn_on_c_action = this.turn_on_c_action;
        let turn_off_c_action = this.turn_off_c_action;
        let ic_classes = this.icon_c_checker.classList;
        let className = "linear_icon_c_target_x_checked";

        if(this.is_activated == true){
            ic_classes.remove(className);
            this.is_activated = false;
            turn_off_c_action();
        } else {
            turn_on_c_action();
            add_wave_animation_x_click_c_event(e, "");
            ic_classes.add(className);
            this.is_activated = true;
        }
    }
}
export {class_c_icon_c_checker};