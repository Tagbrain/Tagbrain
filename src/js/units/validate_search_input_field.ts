import {clean_neuron_selection} from "./clean_neuron_selection";
export function validate_search_input_field(search_input: String){
    if (search_input.length < 3){
        let result_block = document.querySelector('#result_block');
        if(result_block != null){
            result_block.innerHTML = "Write a word more than 2 symbols in the search input";
        }
        clean_neuron_selection();
        return false;   
   } else {
        return true;
   }
}