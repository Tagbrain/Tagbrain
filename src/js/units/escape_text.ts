export function escape_text(text: any) {
    let obj_escape_html_map: {[key: string]: any} = {
         '&amp;': '&',
         '&lt;': '<',
         '&gt;': '>',
         '&quot': '"',
         '&#039;': "'",
         '&nbsp;': " ",
         '|-0': "|-〇",
    };
    return text.replace(/&amp;|&lt;|&gt;|&quot|&#039|&nbsp;|\|-0/g, function (pattern: string) {
         let response: string = obj_escape_html_map[pattern];
         return response;
    });
}