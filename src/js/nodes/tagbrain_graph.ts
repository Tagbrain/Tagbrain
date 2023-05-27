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
    cellular_automata:[],
    keeper_last_data:[],
    tab_collection: {},
    neurons_objs: {},
    current_tab: "neurons",
    checker_collection: [],
    current_outgrowth: 0,
    neuron_collections_c_current: {
        start:{},
        ram:{},
        new:{},
        search_c_last_finded: [],
    },
    selection_obj:{
        last_outgrowths:[],
    },
    cursor_position:{
        neuron_element: undefined,
        outgrowth: undefined,
        depth_c_in_outgrowth: 0,
    },
    activation_obj: {
        collection_c_branch_s:[],
        tree_c_generalizated:[],
    },
    pop_up: {
        context:{
            is_activated: false,
        }
    },
    ram: {
        anemone00s:{
            deduction:[],
            induction:[],
        },
        listner00s_c_anemone00a:[],
    },
}

window["tagbrain_graph"] = tagbrain_graph;