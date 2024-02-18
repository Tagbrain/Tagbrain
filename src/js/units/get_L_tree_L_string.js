export function get_L_tree_L_string(tree_L_prepared){
    let structure = tree_L_prepared;
    let tree_L_string = '<br>';

    if(structure != []){
 
        structure = structure.sort((a, b) => b.d - a.d );
        if(structure.length > 15){
            let difference = structure.length - 15;
            structure = structure.slice(difference);
        }
        structure = structure.sort((b, a) => b.i - a.i);

        for (let j = 0; j < structure.length; j++) {
            let og = structure[j];
            tree_L_string +=    
                '<span class="item_tags_style">' 
                    + "&nbsp;".repeat(og.d)
                    + og.k.toString()+'<br>'
                +'</span>';  
            
        }
        
        return {
             count: structure.length,
             string: tree_L_string,
        }
    } else { 
        return {
            count: 0,
            string: tree_L_string,
       }
    }


}