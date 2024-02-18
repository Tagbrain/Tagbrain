import { add_wave_animation_x_click_L_event } from "../units/add_wave_animation_x_click_L_event";
import {gEBI, dCE} from "../units/compress_f.js";

class class_L_icon_L_checker {
    public icon_L_checker:Element;
    public is_activated: boolean;
    public container_L_icon_L_checker: Element;
    public id: string;
    public checker_L_function: any;
    public turn_on_L_action: any;
    public turn_off_L_action: any;

    constructor(features:any){
        this.icon_L_checker = features.icon_L_checker;
        this.id = features.id;

        this.checker_L_function = features.checker_L_function;
        this.turn_on_L_action = features.turn_on_L_action;
        this.turn_off_L_action = features.turn_off_L_action;

        this.container_L_icon_L_checker = this.icon_L_checker.parentElement as Element;
        this.is_activated = false;
        this.add_listner_L_checker();
        window["tagbrain_graph"]["checker_collection"][this.id] = this;
    }

    add_listner_L_checker(){
        this.icon_L_checker.addEventListener("click", (e:any)=>{
            this.change_state_checker(e);
        })
    }
    change_state_checker(e:any){
        let turn_on_L_action = this.turn_on_L_action;
        let turn_off_L_action = this.turn_off_L_action;
        let ic_classes = this.icon_L_checker.classList;
        let className = "linear_icon_L_target_x_checked";

        if(this.is_activated == true){
            ic_classes.remove(className);
            this.is_activated = false;
            turn_off_L_action();
        } else {
            turn_on_L_action();
            add_wave_animation_x_click_L_event(e, "");
            ic_classes.add(className);
            this.is_activated = true;
        }
    }
}
export {class_L_icon_L_checker};