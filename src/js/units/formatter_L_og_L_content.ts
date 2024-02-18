import { patterns } from "./declare_patterns";

export function formatter_L_og_L_content(
    og_L_content:string, 
    og_L_searcher: any,
    og_L_activator: any,
){
    let is_key_row = false;

    let is_exist_finding_word = false;
    let reg_attachment = new RegExp(patterns.pattern_L_attach, 'iu'),
        reg_tag = new RegExp(patterns.pattern_tag, 'iu'),
        input_regex = new RegExp(og_L_searcher +'|'+ og_L_activator, 'giu');
    let regexp = new RegExp("[\\p{L}_#@0-9]*", 'giu');

    let attachment00s_L_name00s: any = [];

    let all_word00s = og_L_content.replace(regexp, function (og_L_one_word: string) {

        let is_exist_tags = reg_tag.test(og_L_one_word),
            is_exist_attachment = reg_attachment.test(og_L_one_word);

        //put_L_style_L_internal
        let word_L_input_regex = og_L_one_word.replace(input_regex, function (word_L_changed: string) {
            is_exist_finding_word = true;
            is_key_row = true;
            return word_L_changed = 
                "<mark>" 
                    + word_L_changed 
                + "</mark>";
        });

        //put_L_style_L_internal
        if(is_exist_tags){
            og_L_one_word = 
                "<span class='item_tags_style'>" 
                    + word_L_input_regex 
                + "</span>";
        } else if(is_exist_attachment){//add_L_attachment_L_style
            
            //add_L_attachment
            attachment00s_L_name00s.push(og_L_one_word);

            og_L_one_word = 
            "<span class='special_symbols_style'>" 
                + word_L_input_regex 
            + "</span>";
        }
        return og_L_one_word;

    });

    return {
        content: all_word00s,
        is_key_row: is_key_row,
        attachment00s_L_name00s: attachment00s_L_name00s
    }
}