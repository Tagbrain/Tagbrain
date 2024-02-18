// object of additon window properties
import {gEBI, dCE} from "../units/compress_f.js";
let tagbrain_graph: any = {
    refractor_neurons_is_activated: false,
    refractor_neurons_stack: [],
    neuron_collection: {},
    last_selection: {
        neuron_id: "",
        start_pos: {},
        end_pos: {},
    },
    current_neuron_element: 0,
    graph_name: document.location.pathname.split("/")[1],
    graph00s_L_user: [],
    keeper_last_data:[],
    tab_collection: {},
    neuron00s_obj00s: {},
    current_tab: "neurons",
    checker_collection: [],
    current_outgrowth: 0,
    neuron_collections_L_current: {
        start:{},
        ram:{},
        new:{},
        search_L_last_finded: [],
    },
    selection_obj:{
        branch_L_last:[],
    },
    cursor_position:{
        neuron_element: undefined,
        outgrowth: undefined,
        depth_L_in_outgrowth: 0,
    },
    pop_up: {
        context:{
            is_activated: false,
        }
    },
    ram: {
        generalizated_L_neuron00s: [],
        branch_L_current: [],
        synapse00s_L_key: [],
        tree_L_generalizated:[],
        anemone00s: {
            deduction:[],
            induction:[],
        },
        listner00s_L_anemone00a:[],
        ram_L_unit00s: [],
        neuron00s_L_activated: [],
        unit00s_L_search: [],
        copy_L_buffer_L_tree: [],
    },
    neuron00s_L_access: "",
    attachment00s:[],
}
export {tagbrain_graph};