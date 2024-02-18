import {gEBI, dCE} from "./compress_f.js";
export function delete_L_neuron_L_save_flag(neuron_shell:HTMLElement, neuron_id:string) {
    let save_flag_container = neuron_shell.querySelector(".save_flag");
    if (save_flag_container != null) {
        save_flag_container.innerHTML = "";
        if (gEBI("ram_" + neuron_id))
            gEBI("ram_" + neuron_id).querySelector(".activation_container ").className = "activation_container saved_neuron";
        if (gEBI("search_" + neuron_id))
            gEBI("search_" + neuron_id).querySelector(".activation_container ").className = "activation_container saved_neuron";
    }
    window["tagbrain_graph"]["neuron00s_obj00s"][neuron_id].neuron_is_saved = true;
}