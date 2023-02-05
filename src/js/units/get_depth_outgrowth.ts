export function get_depth_outgrowth(outgrowth_text: any){
    let spaces_amount: any = 0;
    let text_exist = false;
    let content = outgrowth_text.replace(/./gi, function (key: String) {
        if(text_exist == false){
            if (key == " ") {
                spaces_amount += 1;
                return "";
            } else if (key == "\t") {
                spaces_amount += 4;
                return "";
            } else {//end tabulation
                text_exist = true;
                return key;
            }
        } else {
             return key;
        }
    });
    let depth = Math.floor(spaces_amount/4);
    let response = {
        content: content,
        depth: depth,
        text_exist: text_exist,
    }
    return response
}