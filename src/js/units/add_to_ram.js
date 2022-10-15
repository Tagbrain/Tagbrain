import {get_string_tags_struct} from "./get_string_tags_struct.js";
import {gEBI, dCE} from "./compress_f.js";
export function add_to_ram(post_el, post_id, post_tags_arr, is_special_neuron){
    if(gEBI("history_"+post_id))
      gEBI("history_"+post_id).parentNode.parentNode.parentNode.remove();

    let post_content_text = post_el.innerText;
    let firsts_words_post = post_content_text.split(/([^\p{L}_0-9#]*)/g, 20).join("");
    let html_ram_row;

    if(is_special_neuron == undefined || false){
      let obj_post_tags = get_string_tags_struct(post_tags_arr);
      let time_last_editing_post = post_el.parentNode.parentNode.querySelector(".file_time").textContent;

      let post_info = {
        id: post_id,
        count_tags: obj_post_tags.count,
        words: firsts_words_post,
        tags: obj_post_tags.string,
        time: time_last_editing_post,     
      }

      html_ram_row = 
        '<div class="ram_row" id="'+'ram_'+post_info.id+'">' 
        + '<a class="ram_link_part" href="#' + post_info.id + '">'
            + '<span>| '
                  + '<span id="history_' + post_info.id + '" class="special_symbols_style save_flag_ram">'
                    +'●'
                  + ' </span>'
            + '  |</span>' 
            + '<span class="ram_head_time">'
                  + post_info.time 
            + ' </span>'
            + '<span class="ram_row_first_words">' 
                  + post_info.words 
            + '</span><br>'  
        + '</a>' 
        + '<div class="ram_row_body">'
            + '<span>'
                  + '<span> '
                      + post_info.count_tags
                  + ' </span>'
                  + '<span> [ '
                      + post_info.tags
                  + ']</span>'
            + '</span>'
            + '<a class="ram_row_delete">✖</a>'
        + '</div>'
      + '</div>';
    } else {

      let post_info = {
        id: post_id,
        words: firsts_words_post,     
      }

      html_ram_row = 
        '<div class="ram_row" id="'+'ram_'+post_info.id+'">' 
        + '<a class="ram_link_part" href="#' + post_info.id + '">'
            + '<span>| '
                  + '<span id="history_' + post_info.id + '" class="special_symbols_style save_flag_ram">'
                    +'●'
                  + ' </span>'
            + '  |</span>' 
            + '<span class="ram_head_time">'
                  + '' 
            + ' </span>'
            + '<span class="ram_row_first_words special_symbols_style">' 
                  + post_info.words 
            + '</span><br>'  
        + '</a>' 
        + '<div class="ram_row_body">'
            + '<span>'
                  + '<span> '
                      + ''
                  + ' </span>'
                  + '<span> [ '
                      + ''
                  + ']</span>'
            + '</span>'
            + '<a class="ram_row_delete">✖</a>'
        + '</div>'
      + '</div>';
    
    }
    
    gEBI("last_posts_lists").insertAdjacentHTML("afterbegin", html_ram_row);
  }