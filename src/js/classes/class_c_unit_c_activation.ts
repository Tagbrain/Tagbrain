import { gEBI } from "../units/compress_f";
import { get_compress_html_set } from "../units/compress_neuron_for_bar";
import { convert_c_unixtime_c_to_formate_c_usual } from "../units/convert_c_unixtime_c_to_formate_c_usual";
import { focus_c_neuron_x_scroll } from "../units/focus_c_neuron_x_scroll";
import { get_c_collection_c_neuron_s } from "../units/get_c_collection_c_neuron_s";
import { get_neuron_features } from "../units/get_neuron_features";
import { if_c_screen_c_is_narrow_zz_close_c_right_bar } from "../units/if_c_screen_c_is_narrow_zz_close_c_right_bar";


class class_c_unit_c_activation {

    protected neuron_c_id: string;
    protected tree: any;
    protected neuron_c_activation: number;
    
    protected og_c_synapse00s: string[];
    protected output_container: Element;
    protected unit_c_element: Element;

    protected action: string;
    

    constructor(options:any){
        this.action = options.action;
        this.neuron_c_id = options.neuron_c_id;
        //this.tree = options.content;
        this.neuron_c_activation  = options.neuron_c_activation;
        this.og_c_synapse00s = window["tagbrain_graph"]["ram"]["synapse00s_c_key"];
        this.start_c_controller();
    }
    start_c_controller(){
        if(this.action == "add_c_unit"){
            this.add_c_unit();
        }
    }
    add_c_unit(){
        let obj = this.get_c_unit_c_activation_c_obj(this.neuron_c_id);
            if(obj != false){
                this.remove_c_unit_c_activation(this.neuron_c_id);
            }

        let neuron_c_feature00s = this.collect_current_neurons_features();
        let html = get_compress_html_set(neuron_c_feature00s);
        this.output_container = gEBI("output_c_neural_guide");

        this.output_container.insertAdjacentHTML("beforeend", html);
        this.unit_c_element = this.output_container.children[this.output_container.children.length - 1];

        this.push_c_data_c_target_c_tagbrain_obj();
        this.set_c_listner_c_target_c_unit_link();
        this.set_c_listner_c_target_c_unit_c_remove_button();
    }
    push_c_data_c_target_c_tagbrain_obj(){
        let obj = this.get_c_unit_c_activation_c_obj(this.neuron_c_id);
        if(obj == false)
            window["tagbrain_graph"]["ram"]["neuron00s_c_activated"].push(
                {
                    id: this.neuron_c_id,
                    el: this.unit_c_element,
                }
            );
    }
    get_c_unit_c_activation_c_obj(neuron_c_id: string){
        let collection = window["tagbrain_graph"]["ram"]["neuron00s_c_activated"];
        for (let i = 0; i < collection.length; i++) {
            const unit_c_activator_c_obj: any = collection[i];
            if(unit_c_activator_c_obj.id == neuron_c_id){
                return {
                    obj: unit_c_activator_c_obj,
                    i: i
                }
            }
        }
        return false;
    }
    remove_c_unit_c_activation(neuron_c_id: string){
        let unit = this.get_c_unit_c_activation_c_obj(neuron_c_id);
        if(unit != false){
            unit.obj.el.remove();
            window["tagbrain_graph"]["ram"]["neuron00s_c_activated"].splice(unit.i, 1)
        }
    }
    set_c_listner_c_target_c_unit_link(){
        let link_element = this.unit_c_element.querySelector(".link_part") as Element;
        link_element.addEventListener("click", (e:any)=>{
            focus_c_neuron_x_scroll(this.neuron_c_id);
            if_c_screen_c_is_narrow_zz_close_c_right_bar();
        })
    }
    set_c_listner_c_target_c_unit_c_remove_button(){
        let remove_button_c_element = this.unit_c_element.querySelector(".search_row_delete") as Element;
        remove_button_c_element.addEventListener("click", (e:any)=>{
            this.remove_c_unit_c_activation(this.neuron_c_id);
        })
    }
    
    collect_current_neurons_features(){
        let neuron_c_obj = window["tagbrain_graph"]["neuron00s_obj00s"][this.neuron_c_id];
        let neuron_c_time_edit = convert_c_unixtime_c_to_formate_c_usual(
            window["tagbrain_graph"]["neuron00s_obj00s"][neuron_c_obj.neuron_id].unix_time
        )
        let object_features = get_neuron_features(
            {
                id: neuron_c_obj.neuron_id,
                element: neuron_c_obj.neuron_el
            },
            "association", 
            this.og_c_synapse00s
        );
        Object.assign(object_features, {
            type_window: "search", 
            activation: this.neuron_c_activation,
            id: this.neuron_c_id,
            time: neuron_c_time_edit, 
        });
        return object_features;
    }

}

export {class_c_unit_c_activation}