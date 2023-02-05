import { get_features_outgrowth } from "./get_features_outgrowth";

type outgrowth = {child: string, v_index: number};
type anemone = { [parent: string]: outgrowth[] };
type anemones_collection = anemone[];
type collector_tree = {
    map_key_anemone: {[id: string]: anemone},
    multilevel_anemone: {},
    features_outgrowth:alphabet_features,
    features_truncus:alphabet_features,
    amount_units: number,
    connections_a: []
};
type alphabet_features = {[alphabet_char: string]: features[]};
type features = {
    w: string,
    id_a: string,
    is_open: boolean
}
export function generate_tree_structure(induction_a: anemones_collection, deduction_a: anemones_collection){
    start_x_anemonization_cycle(induction_a, deduction_a, 0)

}

function start_x_anemonization_cycle(induction_a: anemones_collection, deduction_a: anemones_collection, depth_a:number){
    let collector_tree: collector_tree = {
        map_key_anemone: {},
        multilevel_anemone: {},
        features_outgrowth:{},
        features_truncus:{},
        amount_units: 0,
        connections_a: []
    };

    for (let i = 0; i < induction_a.length; i++){

        let current_anemone = induction_a[i];
        let id = "a"+depth_a.toString()+i.toString();
        //add features
        add_x_truncus_features_c_body_x_collector_tree_c_target(collector_tree, current_anemone, id);
        add_x_outgrowths_features_c_body_x_collector_tree_c_target(collector_tree, current_anemone, id);
        collector_tree.map_key_anemone[id] = current_anemone; //#remove

        //change_id
        let macroanemones_induction = collect_x_macroanemones_induction_c_body(collector_tree, current_anemone);
        let macroanemones_deduction = collect_x_macroanemones_deduction_c_body(collector_tree, current_anemone);
        if(macroanemones_induction.length == 0 && macroanemones_deduction.length == 0){
            //reverse opening x use map generation 
        }
    }

    //put html
}


function collect_x_macroanemones_induction_c_body(one: any, two: any){
     let arr: any = []
     return arr
}
function collect_x_macroanemones_deduction_c_body(one: any, two: any){
     let arr: any = []
     return arr
}
function add_x_truncus_features_c_body_x_collector_tree_c_target(collector_tree: collector_tree, anemone: anemone, id: string){
    let trunc: string = Object.keys(anemone)[0];
    let first_char = trunc.substring(0, 1);
    let features = {
        w: trunc,
        id_a: id,
        is_open: true
    }
    collector_tree["features_outgrowth"][first_char].push(features);
}
function add_x_outgrowths_features_c_body_x_collector_tree_c_target(collector_tree: collector_tree, anemone: anemone, id: string){
    let features: alphabet_features = {};
    let outgrowths = Object.values(anemone)[0];

    for (let i = 0; i < outgrowths.length; i++){
        let outgrowth = outgrowths[i]["child"];
        let first_char = outgrowth.substring(0, 1);
        let obj: any = {
            w: outgrowth,
            id_a: id,
            is_open: true
        }
        collector_tree["features_outgrowth"][first_char].push(obj);
    }
}

/*
          if(parents_chains.length != 0){
               //IS CORRECT? #edit
               if(parents_chains.length == 1){
                    //GET DEPTH FIRST
                    parent_escaped_end = [{
                         "key": "<span class='arrows_sh'>→ "+ first_key +"</span>",
                         "depth": parents_chains[0][0]["depth"],
                         "is_key_row": group_unit_is_curr,
                         "escape": true
                    }];
                    child_chains = calibrate_chains_depth(child_chains, parents_chains[0][0]["depth"]);
               } else {
                    parents_chains = calibrate_chains_depth(parents_chains, glob_depth);
                    parent_escaped_start = [{
                         "key": "<span class='arrows_sh'>|-〇</span>",
                         "depth": glob_depth,
                         "is_key_row": false,
                         "escape": true
                    }];
                    parent_escaped_end = [{
                         "key": "<span class='arrows_sh'>→ </span>"+ first_key,
                         "depth": glob_depth,
                         "is_key_row": group_unit_is_curr,
                         "escape": true
                    }];
                    child_chains = calibrate_chains_depth(child_chains, glob_depth);
               }
               
          } else {// zero parents
               //create current key father_obj
               //ESCAPE
               child_escaped_start = [{
                    "key": first_key,
                    "is_key_row": group_unit_is_curr,
                    "depth": glob_depth,
                    "escape": true
               }]
               child_chains = calibrate_chains_depth(child_chains, glob_depth);
          }

          function parsing_chains(collected_chains: arr_chains){

     let html_chains: string[][] = [];
     for (let j = 0; j < collected_chains.length; j++){
          let chain = collected_chains[j];
          let html_chain: string[] = [];
          for (let i = 0; i < chain.length; i++){
               let depth = chain[i]["depth"];
               //if(depth > 0){
                //    depth = Math.floor(depth/2);
               //}
               let html_row: string;
               if(chain[i]["is_key_row"] == false){
                    html_row= "&nbsp;".repeat(depth) + chain[i]["key"];
               } else {
                    html_row= "&nbsp;".repeat(depth) + "<span class='special_symbols_style'>" + chain[i]["key"] + "</span>";
               }
               html_chain.push(html_row);
          }
          html_chains.push(html_chain);
     }    
     return html_chains;
}
function put_chains_html_to_string(array_chains_html: string[][]){
     let response: string = "";
     for (let i = 0; i < array_chains_html.length; i++){
          let chain_html: string[] = array_chains_html[i];
          for (let j = chain_html.length-1; j >= 0; j--){
               response += chain_html[j] +"<br>";
          }
     };
     
     return response;
}
*/