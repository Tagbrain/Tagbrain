import {escape_text} from "./escape_text";
import {patterns} from "./declare_patterns";

export function validate_row_formate(node: HTMLElement){
          
    let text_row = node.textContent;
    let escaped_itext_row = escape_text(text_row);

    let regexp = new RegExp(patterns.pattern_tag, 'gmu');
         
    let text_with_symbols_tags = escaped_itext_row.replace(regexp, function (search_key:string) {
         search_key = "<span class='item_tags_style'>" + search_key + "</span>";
         return search_key;
    });
    //put current caret
    node.innerHTML = text_with_symbols_tags;
}