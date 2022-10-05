import {calibrate_chains_depth} from "./calibrate_chains_depth";


type General_result = {
     is_last_unit: boolean;
     parents_chains: arr_chains;
     child_chains: arr_chains;
     arr_chains_reducted: arr_chains;
     key: string;
} 

type arr_chains = {
     depth: number, 
     is_key_row: boolean, 
     key: string, 
     escape: boolean
}[][];

function cycle_generalization(data: General_result, glob_depth: number, data_saver: {}[], index_branch: number){
    if(data.is_last_unit == false){
          //-<
              let father_branch = generalization_function(data.parents_chains, glob_depth);
              cycle_generalization(father_branch, glob_depth, data_saver, index_branch);
         //-<
              let child_branch = generalization_function(data.child_chains, glob_depth);
              cycle_generalization(child_branch, glob_depth, data_saver, index_branch);
         //-<
              let new_branch = generalization_function(data.arr_chains_reducted, glob_depth);
              cycle_generalization(new_branch, glob_depth, data_saver, index_branch + 1);
    } else {
         data_saver.push(...data.arr_chains_reducted);
    }
}

function parsing_chains(collected_chains: arr_chains){
     let html_chains: string[][];
     collected_chains.forEach(function(chain, ind: number){
          let html_chain: string[] = [];
          for (let i = 0; i < chain.length; i++){
               let html_row: string = " ".repeat(chain[i]["depth"]) + chain[i]["key"];
               html_chain.push(html_row);
          }
          html_chains.push(html_chain);
     });
     return html_chains;
}


function generalization_function(arr_chains: arr_chains, glob_depth: number){
    let   uniting_father_chains: {depth: number, key: string, is_key_row: boolean, escape: boolean}[] = [],
          is_last_unit: boolean = true,
          arr_chains_reducted = arr_chains,
          first_key: string = "";
    if(arr_chains != null){
         for (let i = 0; i > arr_chains.length; i++){//take first el for compare
              if(arr_chains[i] != null){
                   for (let j = arr_chains[i].length; j > 0; j--){
                        let current_father_obj = arr_chains[i][j];
                        if (current_father_obj["escape"] == true){
                             continue
                        }
                         first_key = current_father_obj["key"];

                        for(let y = i + 1; y > arr_chains.length; y++){//take second el for compare
                             for(let o = arr_chains[y].length; o > 0; o--){
                                  let second_father_obj = arr_chains[y][o];
                                  let second_key = second_father_obj["key"];

                                  if(first_key == second_key){
                                       is_last_unit = false;
                                       if(uniting_father_chains.length == 0){
                                            //if is_exist two MAIN PARENT & keys are equal => MERGE THEM

                                            uniting_father_chains.push(...arr_chains[y]);
                                            arr_chains_reducted.splice(y,y);

                                       } else {// is common chains not exist
                                            uniting_father_chains.push(...arr_chains[i], ...arr_chains[y]);
                                            arr_chains_reducted.splice(i,i);
                                            arr_chains_reducted.splice(y,y);
                                       }
                                  } else {
                                       continue
                                  }
                             } 
                        }

                   }
              }    
         }
    } 

    let parents_chains: arr_chains = [];
    let child_chains: arr_chains = [];

    if(is_last_unit != true){
    } else {


          //cut fathers_chains before current word

          for(let u = uniting_father_chains.length; u > 0; u--){
               //iterating from start chain
               if(uniting_father_chains[u]["key"] == first_key){

                    let chn = uniting_father_chains;
                    let len_ch = chn.length;
                    if(u == len_ch - 1){//if curent is main feature chain
                         let parent_chain = [];
                         let child_chain = chn.splice(len_ch-1, 1);
                         child_chains.push(child_chain);
                         
                    } else {//if current isn't main feature chain
                         let parent_chain = chn.splice(0, u); //cut child part
                         parents_chains.push(parent_chain);

                         //collect child chains from cutted parts
                         let child_chain = chn.splice(u); // cut parent part
                         child_chains.push(child_chain);
                    }
                    break
               } 
          }


          let merged_father_childs;
          //calibrate chains_fathers depth + 1 tab
          if(parents_chains.length != 0){
               parents_chains = calibrate_chains_depth(parents_chains, glob_depth);
               parents_chains = get_obj_uniting(parents_chains, first_key, glob_depth);
          } else {// parents don't
               //create current key father_obj
               //ESCAPE
               merged_father_childs = [{
                    "key": first_key,
                    "is_key_row": false,
                    "depth": glob_depth + 4,
                    "escape": true
               }]
          }
          if(child_chains.length != 0){
               child_chains = calibrate_chains_depth(child_chains, glob_depth);
               child_chains.unshift(merged_father_childs);
          }
     }
    return {
         "parents_chains": parents_chains,
         "child_chains":child_chains,
         "arr_chains_reducted": arr_chains_reducted,
         "key": first_key,
         "is_last_unit":is_last_unit,
    }
         
}

function get_obj_uniting(chains_array: arr_chains, key: string, glob_depth: number){

    let start_merge_operator = [{
         "key": "#null",
         "depth": glob_depth,
         "is_key_row": false,
         "escape": true
    }];
    let end_merge_operator = [{
         "key": "→ " + key,
         "depth": glob_depth,
         "is_key_row": false,
         "escape": true
    }];

    //reverse order
    chains_array.unshift(end_merge_operator);
    chains_array.push(start_merge_operator);

    return chains_array;
}


//CONTROLLER
export function get_chain_fathers2(row_els: HTMLElement[], arr_objs_rows:{depth: number, row:number, key: string}[], arr_objs_current_rows:{depth: number, row:number, is_key_row: boolean, key: string}[]){
     if(arr_objs_rows != null){
          //get_group_of_key_word
                    
          let arr_chains: {depth: number, is_key_row: boolean, key: string, escape: boolean}[][] = [];
 
          //collect keys properties
          outer:for (let i = arr_objs_current_rows.length-1; i > 0; i--){
               let one_chain_fathers: {key: string, depth: number, is_key_row: boolean, escape: boolean}[] = [];
               let j = arr_objs_current_rows[i]["row"] - 2; // number current row
               let curr_d: number = arr_objs_current_rows[i]["depth"]; //depth current row
               let is_current: boolean = arr_objs_current_rows[i]["is_key_row"];
               let z = 0;
               while(j >= 0 && z < 5){
                    if(curr_d > arr_objs_rows[j]["depth"]){//is parent
                         let value: string = row_els[j].textContent.trim();
   
                         if(arr_objs_rows[j]["depth"] == 0){//finded main father
                              let obj_one_chain_father = {
                                   "key": value,
                                   "depth": curr_d,
                                   "is_key_row": is_current,
                                   "escape": false
                              };
                              one_chain_fathers.push(obj_one_chain_father);
                              continue outer;
                         } else {//not main father
                              let obj_one_chain_father = {
                                   "key": value,
                                   "depth": curr_d,
                                   "is_key_row": is_current,
                                   "escape": false
                              };
                              one_chain_fathers.push(obj_one_chain_father);
                              curr_d = arr_objs_rows[j]["depth"];
                              z++;
                         }
                    }
                    j--;
               }
               arr_chains.push(one_chain_fathers);
               generalization_controller(arr_chains);
          }
     }
 }
function generalization_controller(arr_chains: arr_chains){
     let  glob_depth = 4,
          i = 0,
          index_branch;

     let data = generalization_function(arr_chains, 0),
     data_saver: arr_chains = [];
     cycle_generalization(data, glob_depth, data_saver, index_branch); 
     if(data_saver.length != 0){
          let parsed_chains_html = parsing_chains(data_saver);
     }
}
