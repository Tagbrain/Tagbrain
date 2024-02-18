import { gEBI, dCE } from "./compress_f.js";
export function clean_L_element_L_with_id(id:string){
    let element = gEBI(id);
    if(element != null){
        element.innerHTML = "";
    }
}