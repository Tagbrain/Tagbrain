export function calibrate_chains_depth(chains_array: {depth: number, key: string, is_key_row: boolean, escape: boolean}[][], glob_depth: number){
     let left_tabulation: number = glob_depth + 4;
     chains_array.forEach(function(chain, index){
          let calibrate_index: number = chain[chain.length - 1]["depth"];// index for shifting main father to 
          //get up row
          let up_row_depth = chain[chain.length - 1]["depth"];
          for(let i_tem = chain.length - 1; i_tem >= 0; i_tem--){
               if(up_row_depth <= chain[i_tem]["depth"]){//exist shift left
                    chain[i_tem]["depth"] = chain[i_tem]["depth"] + left_tabulation - calibrate_index;
               } else {
                    //divide rows
                    chain.splice(0, i_tem + 1);
                    break
               }
          }
     })
     return chains_array
}
