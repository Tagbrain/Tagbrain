import {gEBI, dCE} from "../units/compress_f.js";
import {add_wave_animation_x_click_L_event} from "../units/add_wave_animation_x_click_L_event";
class class_L_icon_L_button {

    public icon_L_button:Element;
    public is_activated: boolean;
    public container_L_icon_L_button: Element;
    public id: string;
    public button_event: any;
    public click_contextmenu: string;

    constructor(features:any){
        this.icon_L_button = features.icon_L_button;
        this.id = features.id;
        this.button_event = features.button_event;
        this.click_contextmenu = features.click_contextmenu;

        this.container_L_icon_L_button = this.icon_L_button.parentElement as Element;
        this.add_listner_L_click();
    }
    add_listner_L_click(){
        let func = this.button_event;
        this.icon_L_button.addEventListener("click", (e:any)=>{
            func();
            add_wave_animation_x_click_L_event(e, this.click_contextmenu);
        })
    }
}
export {class_L_icon_L_button};