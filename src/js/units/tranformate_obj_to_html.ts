export function transformate_obj_to_html(content: {depth: number, content: string, row: number}[]){
    let outgrowths = content;
    let html_all:string = "";
    for(let i = 0; i < outgrowths.length; i++){
        let depth:number = outgrowths[i]["depth"];
        let content:string = outgrowths[i]["content"];
        html_all += '<div class="post_row">' + ' '.repeat(4*depth) + content + '</div>';
    }
    return html_all;
}