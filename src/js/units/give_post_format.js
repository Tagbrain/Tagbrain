import {gEBI, dCE} from "./compress_f.js";

export function post_format(inner_text){
    let rows_arr = [];
    rows_arr = inner_text.split("\n");
    let div = dCE("div");
    if(rows_arr != null){
       for(let i = 0; i < rows_arr.length; i++){
          let new_line_div = document.createElement("div");
          if (rows_arr[i] != "") {
             new_line_div.innerHTML = rows_arr[i];
          } 
          new_line_div.className = "post_row";
          div.append(new_line_div);
       }
       return div;
    }
} 