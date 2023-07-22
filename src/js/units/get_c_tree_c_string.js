export function get_c_tree_c_string(tree_c_prepared){
    let structure = tree_c_prepared;
    let tree_c_string = '<br>';

    if(structure != []){
 
        structure = structure.sort((a, b) => b.d - a.d );
        if(structure.length > 15){
            let difference = structure.length - 15;
            structure = structure.slice(difference);
        }
        structure = structure.sort((b, a) => b.i - a.i);

        for (let j = 0; j < structure.length; j++) {
            let og = structure[j];
            tree_c_string +=    
                '<span class="item_tags_style">' 
                    + "&nbsp;".repeat(og.d)
                    + og.k.toString()+'<br>'
                +'</span>';  
            
        }
        
        return {
             count: structure.length,
             string: tree_c_string,
        }
    } else { 
        return {
            count: 0,
            string: tree_c_string,
       }
    }


}