// object of additon window properties
import {gEBI, dCE} from "../units/compress_f.js";

let tagbrain_graph: any = {
    refractor_neurons_is_activated: false,
    refractor_neurons_stack: [],
    neuron_collection: {},
    ram_collection: {},
    tabs_collection: {},
    search_collection: {},
    tips_collection: {},
    //tips for writing
    attachments_collection: {},
    last_selection: {
        neuron_id: "",
        start_pos: {},
        end_pos: {},
    },
    current_neuron_element: 0,
    graph_name: gEBI("page_tag_map_name").textContent.trim(),
    current_tabs: [],
}

window["tagbrain_graph"] = tagbrain_graph;