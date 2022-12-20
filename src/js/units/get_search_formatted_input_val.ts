export function get_search_formatted_input_val(search_val:String){
    let split_search_array:String[] = [];
    split_search_array = search_val.split(/\,/g);
    let array_of_search_key = split_search_array.filter(word => word.length > 2);

    //divide tag on word + tag

    if(array_of_search_key.length > 0){
         return array_of_search_key;
    } else {
         return false;
    }
}