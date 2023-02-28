export function create_new_row(content: string, is_enter: boolean) {
    let new_line_div = document.createElement("div");
    if (content != "") {
         new_line_div.innerHTML = content;
    } else if (is_enter == true) {
         let newtext = document.createTextNode("\n");
         new_line_div.appendChild(newtext);
    }
    new_line_div.className = "post_row";
    return new_line_div;
}