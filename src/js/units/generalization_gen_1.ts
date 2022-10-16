import {calibrate_chains_depth} from "./calibrate_chains_depth";

type arr_chains = {
     depth: number, 
     is_key_row: boolean, 
     key: string, 
     escape: boolean
}[][];

type General_result = {
     is_last_unit: boolean;
     parent_escaped_start: chain[];
     parents_chains: arr_chains;
     parent_escaped_end: chain[];
     child_escaped_start: chain[];
     child_chains: arr_chains;
     child_escaped_end: chain[];
     arr_chains_reducted: arr_chains;
     key: string;
} 

type chain = {
     depth: number, 
     is_key_row: boolean, 
     key: string, 
     escape: boolean
};

function cycle_generalization(data: General_result, glob_depth: number, data_saver: {}[]){
    if(data.is_last_unit == false){
          //-<
          let father_branch: General_result;
          if(data.parent_escaped_start.length != 0){
               data_saver.push(data.parent_escaped_start);
               father_branch = generalization_function(data.parents_chains, glob_depth + 1);
          } else {
               father_branch = generalization_function(data.parents_chains, glob_depth + 1);
          }
          cycle_generalization(father_branch, glob_depth + 1, data_saver);
          if(data.parent_escaped_end.length != 0)
               data_saver.push(data.parent_escaped_end);

         //-<
          let child_branch: General_result;
          if(data.child_escaped_start.length != 0){
               data_saver.push(data.child_escaped_start);
               child_branch = generalization_function(data.child_chains, glob_depth + 1);
          } else {
               child_branch = generalization_function(data.child_chains, glob_depth + 1);
          }

          cycle_generalization(child_branch, glob_depth + 1, data_saver);
          if(data.child_escaped_end.length != 0)
               data_saver.push(data.child_escaped_end);
              
         //-<
              let new_branch = generalization_function(data.arr_chains_reducted, glob_depth);
              cycle_generalization(new_branch, glob_depth, data_saver);

              //#edit #add
              //if length more than 4
              //check equal key
              //divide on chains
              //start cycle generalization
    } else {
         data_saver.push(...data.arr_chains_reducted);
    }
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


function generalization_function(array_chains: arr_chains, glob_depth: number){

    let   uniting_father_chains: {depth: number, key: string, is_key_row: boolean, escape: boolean}[][] = [],
          is_group_unit: boolean = true,
          group_unit_is_curr: boolean = false,
          is_last_unit: boolean = true,
          arr_chains_reducted = [...array_chains],
          first_key: string = "",
          arr_chains = array_chains;

     let parents_chains: arr_chains = [];
     let child_chains: arr_chains = [];

     if(arr_chains != null){
         outer: for (let i = 0; i < arr_chains.length; i++){//take first el for compare
              if(arr_chains[i] != null){
                   for (let j = arr_chains[i].length - 1; j >= 0; j--){
                         if(is_group_unit != false){
                              let current_father_obj = arr_chains[i][j];
                              if (current_father_obj["escape"] == true){
                                   continue
                              }
                              first_key = current_father_obj["key"];
                              for(let y = i + 1; y < arr_chains.length; y++){//take second el for compare
                                   for(let o = arr_chains[y].length - 1; o >= 0; o--){

                                        let second_father_obj = arr_chains[y][o];
                                        let second_key = second_father_obj["key"];

                                        if(first_key == second_key){
                                             group_unit_is_curr = second_father_obj["is_key_row"];

                                             is_group_unit = false;
                                             if(uniting_father_chains.length != 0){
                                                  //if uniting_father_chains is_completed

                                                  uniting_father_chains.push(arr_chains[y]);
                                                  arr_chains_reducted.splice(i,1);

                                             } else {// is uniting_father_chains not exist
                                                  uniting_father_chains.push(arr_chains[i], arr_chains[y]);
                                                  if(i > y){//from larger to smaller
                                                       arr_chains_reducted.splice(i,1);
                                                       arr_chains_reducted.splice(y,1);
                                                  } else {
                                                       arr_chains_reducted.splice(y,1);
                                                       arr_chains_reducted.splice(i,1);
                                                  }
                                             }
                                        } else {
                                             continue
                                        }
                                   } 
                              
                              }
                              
                         } else {
                              break outer
                         }
                    }
              }    

         }
    } 
     //check last unit
     if(is_group_unit == false){
          is_last_unit = false;
     } else {// there is not group unit
          is_last_unit = true;
     }

    let parent_escaped_start: chain[] = [];
    let parent_escaped_end: chain[] = [];
    let child_escaped_start: chain[] = [];
    let child_escaped_end: chain[] = [];

    if(is_group_unit == false){
          //cut fathers_chains before current word
          for(let i = 0; i < uniting_father_chains.length; i++){
               let chain_for_unite: {depth: number, key: string, is_key_row: boolean, escape: boolean}[] = uniting_father_chains[i];
               for(let u = chain_for_unite.length - 1; u >= 0; u--){
                    //iterating from start chain
                    if(chain_for_unite[u]["key"] == first_key){
                         let chn = chain_for_unite;
                         let len_ch = chn.length;
                         if(u == len_ch - 1){//main father uniting
                              //collect child chains from cutted parts
                              let child_chain = chn.slice(0, len_ch - 1); // cut parent part
                              if(child_chain.length != 0)
                                   child_chains.push(child_chain);
                         } else {//not main
                              //FIX SPLICE
                              let parent_chain = chn.slice(u + 1, len_ch); //take parent chain
                              if(parent_chain.length != 0)
                                   parents_chains.push(parent_chain);
                              //collect child chains from cutted parts
                              let child_chain = chn.slice(0, u); // take child chain
                              if(child_chain.length != 0)
                                   child_chains.push(child_chain);
                         }
                         break
                    } 
               }
          }
     

          //#remove escape
          //calibrate chains_fathers depth + 1 tab
          if(parents_chains.length != 0){
               //IS CORRECT? #edit
               if(parents_chains.length == 1){
                    //parents_chains = calibrate_chains_depth(parents_chains, glob_depth);
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

     } else {
     
     }
    return {
         "parent_escaped_start": parent_escaped_start,
         "parents_chains": parents_chains,
         "parent_escaped_end": parent_escaped_end,

         "child_escaped_start": child_escaped_start,
         "child_chains":child_chains,
         "child_escaped_end": child_escaped_end,

         "arr_chains_reducted": arr_chains_reducted,
         "key": first_key,
         "is_last_unit":is_last_unit,
    }
         
}


//CONTROLLER
export function get_chain_fathers2(row_els: HTMLElement[], arr_objs_rows:{depth: number, row:number, key: string, is_key_row: boolean}[], arr_objs_current_rows:{depth: number, row:number, is_key_row: boolean, key: string}[]){
     if(arr_objs_rows != null){
          //get_group_of_key_word
                    
          let arr_chains: {depth: number, is_key_row: boolean, key: string, escape: boolean}[][] = [];
 
          //collect keys properties
          outer:for (let i = arr_objs_current_rows.length-1; i >= 0; i--){
               let one_chain_fathers: {key: string, depth: number, is_key_row: boolean, escape: boolean}[] = [];
               let search_father = {
                    "key": arr_objs_current_rows[i]["key"],
                    "depth": arr_objs_current_rows[i]["depth"],
                    "is_key_row": true,
                    "escape": false
               }
               one_chain_fathers.push(search_father);
               let curr_d: number = arr_objs_current_rows[i]["depth"]; //depth current row

               //collect down chain features
               let r_num_curr = arr_objs_current_rows[i]["row"];
               if(typeof arr_objs_rows[r_num_curr+1] !== 'undefined'){
                    let max_length_child_part: number = 0;
                    while(r_num_curr >= 0 && max_length_child_part < 20){
                         let next_down_d: number = arr_objs_rows[r_num_curr+1]["depth"];
                         if(curr_d < next_down_d){//
                              let value: string = arr_objs_rows[r_num_curr+1]["key"];
                              let is_current: boolean = arr_objs_rows[r_num_curr+1]["is_key_row"];
                              let obj_child_part = {
                                   "key": value,
                                   "depth": next_down_d,
                                   "is_key_row": is_current,
                                   "escape": false
                              };
                              one_chain_fathers.unshift(obj_child_part);
                              max_length_child_part++;
                         } else {
                              break
                         }
                         r_num_curr++
                         if(typeof arr_objs_rows[r_num_curr+1] === 'undefined'){break}
                    }
               }

               //collect up chain features
               let j = arr_objs_current_rows[i]["row"] - 1; // number current row
               let max_length_parent_part = 0;
               while(j >= 0 && max_length_parent_part < 10){
                    let next_up_d: number = arr_objs_rows[j]["depth"];
                    if(curr_d > next_up_d){//is parent
                         let value: string = arr_objs_rows[j]["key"];
                         let is_current: boolean = arr_objs_rows[j]["is_key_row"];
                         if(next_up_d == 0){//finded main father
                              let obj_one_chain_father = {
                                   "key": value,
                                   "depth": next_up_d,
                                   "is_key_row": is_current,
                                   "escape": false
                              };
                              one_chain_fathers.push(obj_one_chain_father);
                              arr_chains.push(one_chain_fathers);
                              continue outer;
                         } else {//not main father
                              let obj_one_chain_father = {
                                   "key": value,
                                   "depth": next_up_d,
                                   "is_key_row": is_current,
                                   "escape": false
                              };
                              one_chain_fathers.push(obj_one_chain_father);
                              curr_d = next_up_d;
                              max_length_parent_part++;
                         }
                    }
                    j--;
               }
               
          }
          return generalization_controller(arr_chains);
     }
 }
function generalization_controller(arr_chains: arr_chains){
     let  glob_depth = 2;
     let response: string = "";
     let data = generalization_function(arr_chains, 0),
     data_saver: arr_chains = [];
     cycle_generalization(data, glob_depth, data_saver); 
     if(data_saver.length != 0){
          let parsed_chains_html = parsing_chains(data_saver);
          response = put_chains_html_to_string(parsed_chains_html);
     }
     return response;
}
