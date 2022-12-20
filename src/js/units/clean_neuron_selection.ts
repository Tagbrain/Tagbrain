import {gEBI, dCE} from "./compress_f.js";

export function clean_neuron_selection(){
    let array_of_finded: any = [];
    let neuron_container = gEBI("items_container");
    if(neuron_container.getElementsByTagName("mark")[0]){
         array_of_finded = document.querySelectorAll("mark") ;
         if(array_of_finded != null){
              for(let i = 0; i < array_of_finded.length; i++){
                   let content = array_of_finded[i].innerText;
                   array_of_finded[i].outerHTML = content;
              }
         }    
    }
}