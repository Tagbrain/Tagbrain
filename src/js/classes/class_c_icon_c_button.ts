import {gEBI, dCE} from "../units/compress_f.js";
import {add_wave_animation_x_click_c_event} from "../units/add_wave_animation_x_click_c_event";
class class_c_icon_c_button {

    public icon_c_button:Element;
    public is_activated: boolean;
    public container_c_icon_c_button: Element;
    public id: string;
    public button_event: any;
    public click_contextmenu: string;

    constructor(features:any){
        this.icon_c_button = features.icon_c_button;
        this.id = features.id;
        this.button_event = features.button_event;
        this.click_contextmenu = features.click_contextmenu;

        this.container_c_icon_c_button = this.icon_c_button.parentElement as Element;
        this.add_listner_c_click();
    }
    add_listner_c_click(){
        let func = this.button_event;
        this.icon_c_button.addEventListener("click", (e:any)=>{
            func();
            add_wave_animation_x_click_c_event(e, this.click_contextmenu);
        })
    }
}
export {class_c_icon_c_button};