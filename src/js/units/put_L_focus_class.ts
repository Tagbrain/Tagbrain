export function put_L_focus_class(current_line: any){
    let current_line_CL = current_line.classList;
    if(current_line_CL.contains("focus_row")){
         true
    } else {
         let focused_rows = document.querySelector(".focus_row");
         if(focused_rows != null)
              focused_rows.classList.remove("focus_row");
         current_line.classList.add("focus_row");
    }
}