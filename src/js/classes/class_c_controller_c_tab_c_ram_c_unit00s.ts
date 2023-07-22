
import { gEBI } from "../units/compress_f";
import { get_compress_html_set } from "../units/compress_neuron_for_bar";
import { convert_c_unixtime_c_to_formate_c_usual } from "../units/convert_c_unixtime_c_to_formate_c_usual";
import { focus_c_neuron_x_scroll } from "../units/focus_c_neuron_x_scroll";
import { get_neuron_features } from "../units/get_neuron_features";
import { if_c_screen_c_is_narrow_zz_close_c_right_bar } from "../units/if_c_screen_c_is_narrow_zz_close_c_right_bar";

class class_c_controller_c_tab_c_ram_c_unit00s {

    protected neuron_c_el: Element;
    protected neuron_c_id: string;
    protected is_special_neuron: boolean;
    protected action: string;
    protected ram_c_unit_c_element: Element;
    protected unix_time: string;

    constructor(option00s: any) {
        this.neuron_c_el = option00s.neuron_c_el;
        this.neuron_c_id = option00s.neuron_c_id;
        this.is_special_neuron = option00s.is_special_neuron;
        this.action = option00s.action;
        this.unix_time = option00s.unix_time;

        this.start_c_controller();
    }
    start_c_controller(){
        if(this.action == "add_to_ram"){
            this.add_to_ram();
        }
    }

    add_to_ram() {
        let obj = this.get_c_ram_unit_obj(this.neuron_c_id);
            if(obj != false){
                this.remove_c_ram_c_unit(this.neuron_c_id);
            }

        let html_ram_row = "";
        let neuron_features: any = {};
        if (this.is_special_neuron == false) {//neurons usual html

            let array_current_key_word = this.neuron_c_el.querySelectorAll("mark");
            if (array_current_key_word.length == 0) {
                neuron_features = get_neuron_features(
                    {
                        element:this.neuron_c_el, 
                        id: this.neuron_c_id
                    },  
                    "association", 
                    ''
                );
            } else {
                let og_c_activator: any[] = [];
                for (var i = 0; i < array_current_key_word.length; i++) {
                    og_c_activator.push(
                        array_current_key_word[i].innerText.trim()
                    );
                }
                neuron_features = get_neuron_features(
                    {
                        element:this.neuron_c_el, 
                        id: this.neuron_c_id
                    }, 
                    "association", 
                    og_c_activator
                );
            }
            Object.assign(neuron_features, {
                type_window: "ram", 
                activation: "-",
                id: this.neuron_c_id,
                time: this.unix_time, 
            });
            
        } else {// neuron unusual html

            neuron_features = {
                id: this.neuron_c_id,
                words: "special",
                type_window: "ram",
                chain_fathers: "special words"
            }
        }

        html_ram_row = get_compress_html_set(neuron_features);
        let ram_list: Element = gEBI("last_posts_lists");
        ram_list.insertAdjacentHTML("afterbegin", html_ram_row);
        this.ram_c_unit_c_element = ram_list.children[0];
        this.push_c_data_c_to_tagbrain_obj();
        this.set_c_listner_c_to_ram_link();
        this.set_c_listner_c_to_ram_c_button_c_remove();
    }

    remove_c_ram_c_unit(neuron_c_id: string){
        let obj = this.get_c_ram_unit_obj(neuron_c_id);
        if(obj != false){
            obj.obj.ram_c_unit_c_element.remove();
            window["tagbrain_graph"]["ram"]["ram_c_unit00s"].splice(obj.i, 1);
            //decrease general count
        }
    }

    push_c_data_c_to_tagbrain_obj(){
        let obj_c_ram_c_unit = {
            id: this.neuron_c_id,
            ram_c_unit_c_element: this.ram_c_unit_c_element,
        }
        let obj = this.get_c_ram_unit_obj(this.neuron_c_id);
        if(obj == false)
            window["tagbrain_graph"]["ram"]["ram_c_unit00s"].push(obj_c_ram_c_unit);
    }

    get_c_ram_unit_obj(neuron_c_id: string): false | {obj: any, i: number}{
        let collection = window["tagbrain_graph"]["ram"]["ram_c_unit00s"];
        for (let i = 0; i < collection.length; i++) {
            const ram_c_unit_c_obj: any = collection[i];
            if(ram_c_unit_c_obj.id == neuron_c_id){
                return {
                    obj: ram_c_unit_c_obj,
                    i: i
                }
            }
        }
        return false;
    }

    set_c_listner_c_to_ram_link(){
        let link_element = this.ram_c_unit_c_element.querySelector(".link_part") as Element;
        link_element.addEventListener("click", (e:any)=>{
            focus_c_neuron_x_scroll(this.neuron_c_id);
            if_c_screen_c_is_narrow_zz_close_c_right_bar();
        })
    }

    set_c_listner_c_to_ram_c_button_c_remove(){
        let remove_button_c_element = this.ram_c_unit_c_element.querySelector(".search_row_delete") as Element;
        remove_button_c_element.addEventListener("click", (e:any)=>{
            this.remove_c_ram_c_unit(this.neuron_c_id);
        })
    }

}

export { class_c_controller_c_tab_c_ram_c_unit00s }