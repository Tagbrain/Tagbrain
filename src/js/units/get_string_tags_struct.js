export function get_string_tags_struct(tags_struct){
    //[{key:KEY, c:number, d: number}{}{}]
    let j = 0;
    let count_tags = 0;
    if(tags_struct != undefined){

         if(tags_struct != []){
            count_tags = tags_struct.length;  
         }

    } 

    let finded_post_tags_string = '<br>';

    if(tags_struct != null){

        let sorted_tags_struct = tags_struct.sort((a, b) => b.d - a.d );
        if(sorted_tags_struct.length > 24){
            let difference = sorted_tags_struct.length - 24;
            sorted_tags_struct = sorted_tags_struct.slice(difference);
        }
        sorted_tags_struct = sorted_tags_struct.sort((b, a) => b.c - a.c );

        while(j < sorted_tags_struct.length){
            finded_post_tags_string +=    
                '<span class="item_tags_style">' 
                    + "&nbsp;".repeat(sorted_tags_struct[j]["d"] / 2)
                    + sorted_tags_struct[j]["key"].toString()+'<br>'
                +'</span>';  
            j++;
        }
    }  

    //#do two part for output in two columns ???
    return {
         count: count_tags,
         string: finded_post_tags_string,
    }
}