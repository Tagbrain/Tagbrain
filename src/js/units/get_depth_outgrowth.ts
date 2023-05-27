export function get_depth_outgrowth(outgrowth_text: any){
    let spaces_amount: any = 0;
    let symbols = [...outgrowth_text];
    let text_exist = false;
    for(let i = 0; i < symbols.length; i++){
        let sym = symbols[i];

        if (sym == " ") {
            spaces_amount += 1;
        } else if (sym == "\t") {
            symbols[i] = "    ";
            spaces_amount += 4;
        } else if (sym == "" || sym == "\n") {
            break
        } else {//end tabulation
            text_exist = true;
            break
        }
    }
    let depth = Math.floor(spaces_amount/4);

    return {
        content: outgrowth_text.substring(spaces_amount),
        depth: depth,
        text_exist: text_exist,
    }
}