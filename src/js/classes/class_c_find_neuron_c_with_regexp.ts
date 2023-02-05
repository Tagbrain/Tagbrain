import { gEBI, dCE } from "../units/compress_f.js";
import { send_data_ajax } from "../units/send_data_ajax.js";
import { class_formate_c_neuron } from "./class_formate_c_neuron";

class class_c_find_neuron_c_with_regexp {

    public graph_name: string;
    public neuron_id: string;
    public synapse_c_main: string;
    public input_c_search_x_value: string;
    public content_c_replacer: string;
    public key_rows: string[];
    public microfeatures: string[];

    public count: number;

    public input_keys: any;

    public output_container: Element;
    public container_c_purpose_c_find_synapse: Element;
    public class_c_unit_el: Element;

    constructor(object: any) {
        this.graph_name = window["tagbrain_graph"]["graph_name"];
        this.neuron_id = object.neuron_id;
        this.microfeatures = object.microfeatures;
        this.synapse_c_main = object.synapse_c_main;
        this.key_rows = object.key_rows;
        this.count = object.count;
        this.input_keys = object.input_keys;

        this.input_c_search_x_value = gEBI("search_input_block").value;

        this.output_container = gEBI("result_block");
        this.add_unit();
    }
    add_c_controller_c_load_neuron() {
        this.container_c_purpose_c_find_synapse.addEventListener("click", (e: any) => {
            //check exist front end
            //load if not exist
        })
    }
    add_unit() {
        let html = 
            '<div class="contaner_c_header_x_find_c_synapse">'
                + '<div class="">'
                    + this.synapse_c_main
                + '</div>'
                + '<div class="points_circle">'
                    + this.count
                + '</div>'
            + '</div>'
            + '<div class="link_swipe_animation container_c_body_x_find_c_synapse">'
                    + '<div>〇 '
                        + this.microfeatures.join("</div><div>〇 ")
                    + '</div>'
            + '</div>';
        let html_c_highlight = this.select_c_target_text(html);
        this.select_c_client_neurons_c_target();
        this.class_c_unit_el = this.create_element(html_c_highlight);
        this.output_container.append(this.class_c_unit_el);
        this.container_c_purpose_c_find_synapse = this.class_c_unit_el;
        this.set_c_listener_c_load_neuron()
    }
    select_c_target_text(html: string) {
        let regexp = new RegExp(this.input_c_search_x_value, 'giu');
        let html_new = html.replace(regexp, function (search_key: string) {
            search_key = "<span class='special_symbols_style'><mark>" + search_key + "</mark></span>";
            return search_key
        })
        return html_new;
    }
    select_c_client_neurons_c_target() {
        if(window["tagbrain_graph"]["neurons_objs"].hasOwnProperty(this.neuron_id)){
            let neuron_c_el = window["tagbrain_graph"]["neurons_objs"][this.neuron_id].neuron_el;
            let class_c_formater = new class_formate_c_neuron(neuron_c_el, this.input_c_search_x_value);
        }
    }
    create_element(html: string) {
        let element = dCE("div");
        element.className = "neuron_c_finded_synapses";
        element.innerHTML = html;
        return element
    }
    set_c_listener_c_load_neuron() {
        this.class_c_unit_el.addEventListener("click", (e:any)=>{
            if(!window["tagbrain_graph"]["neurons_objs"].hasOwnProperty(this.neuron_id)){
                let data = {
                    action: 'get_c_neuron_c_with_id',
                    graph_name: this.graph_name,
                    facultative:{
                    //amount: 20,
                    //search_keys: "empty",
                    neuron_id: this.neuron_id,
                    }
                };
                let url = "php/neurons/controller_getting_graph_data.php";
                let controller_f = function (response_obj: any) {
                    if (response_obj.status == "success") {
                        console.log(response_obj)
                    } else {
                        console.log("Neuron not exist. FREnd124745")
                    }
                }
                let error_message = "Error 123y657";
                send_data_ajax(data, url, controller_f, true, error_message);
            } else {
                window["tagbrain_graph"]["neurons_objs"][this.neuron_id].neuron_el.focus();
            }
        })
    }
}

export { class_c_find_neuron_c_with_regexp };
