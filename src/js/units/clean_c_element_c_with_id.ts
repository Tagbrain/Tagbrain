import { gEBI, dCE } from "./compress_f.js";
export function clean_c_element_c_with_id(id:string){
    let element = gEBI(id);
    if(element != null){
        element.innerHTML = "";
    }
}