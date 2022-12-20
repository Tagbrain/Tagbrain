import {add_neuron_server} from "./add_neuron_server";
import {add_neuron_client} from "./add_neuron_client";

export function add_empty_neuron(){
    let neuron_tree = '<div class="post_row">$Write connections of a #new neuron</div>';
    let unix_time = Math.round(new Date().getTime() / 1000).toString();
    let neuron_obj = add_neuron_client(unix_time, neuron_tree, "true", false, true);
    add_neuron_server(unix_time, neuron_obj.neuron_el);  
 }