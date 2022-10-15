export function calibrate_chains_depth(chains_array: {depth: number, key: string, is_key_row: boolean, escape: boolean}[][], glob_depth: number){
    let left_tabulation: number = glob_depth + 4;
    chains_array.forEach(function(chain, index){
         let calibrate_index: number = chain[chain.length - 1]["depth"];// index for shifting main father to zero pos
         chain.forEach(function(father_obj:{depth: number, key: string, is_key_row: boolean}, ind){
              father_obj["depth"] = father_obj["depth"] + left_tabulation - calibrate_index;
         });
    })
    return chains_array
}
