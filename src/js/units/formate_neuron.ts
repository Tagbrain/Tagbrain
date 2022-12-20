import {gEBI, dCE} from "./compress_f.js";

export function post_format(inner_text: string){
   let rows_arr: string[] = [];
   rows_arr = inner_text.split("\n");
   let div_html = dCE("div");
   if(rows_arr != null){
       for(let i = 0; i < rows_arr.length; i++){
          let new_div_html = dCE("div");
         if (rows_arr[i] != "") {
            new_div_html.innerHTML = rows_arr[i];
         } 
         new_div_html.className = "post_row";
         div_html.append(new_div_html);
       }
       return div_html;
   }
} 