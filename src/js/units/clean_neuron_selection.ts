import {gEBI, dCE} from "./compress_f.js";

export function clean_neuron_selection(){
    let array_of_finded: any = [];
    let neurons_container = gEBI("neurons_x_tab_content_c_container");
    if(neurons_container.getElementsByTagName("mark")[0]){
         array_of_finded = document.querySelectorAll("mark") ;
         if(array_of_finded != null){
              for(let i = 0; i < array_of_finded.length; i++){
                   let content = array_of_finded[i].innerText;
                   array_of_finded[i].outerHTML = content;
              }
         }    
    }
}