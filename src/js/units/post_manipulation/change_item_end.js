import {elements} from "./obj_post_edit_f.js";
import {patterns} from "./obj_post_edit_f.js";
import {functions} from "./obj_post_edit_f.js";
import {get_post_tags_obj} from "../all_posts_action/search_controller.js";

function gEBI(id, parent) {
  return (parent || document).getElementById(id);
} 

function call_refractory_timer(timer_name, ms, target_blur, post_tags){
  if(timer_name != undefined)
    window.clearTimeout(timer_name);
  timer_name = window.setTimeout(code_and_send_data, ms, target_blur, post_tags)
}

let f_post_change = {
  put_not_save_flag(target_blur){
    let save_flag_container = target_blur.parentNode.parentNode.querySelector(".save_flag");
    save_flag_container.innerHTML = " ●";
  },
  delete_save_flag(post_id){
    let post = gEBI(post_id),
    save_flag_container = post.querySelector(".save_flag");
    save_flag_container.innerHTML = "";
    gEBI("history_"+post_id).innerHTML = "";
  },
  clean_save_not_save_block(){
    let saved_not_saved_block = gEBI("saved_not_saved");
    saved_not_saved_block.textContent = "";
  },
  change_symbols(post_el){
    let search_post_obj = functions.search_format_function(post_el, []);
    let finded_post_tags = search_post_obj.finded_tags_post;
    /*
    if(post_el.innerText.match("LATEX_START") != null){
      renderMathInElement(post_el, {
        delimiters: [
          {left: 'LATEX_START', right: 'LATEX_END', display: true},        

        ],
        throwOnError : false
      });
    }*/
    return finded_post_tags;
  },
}

export function add_to_ram(post_el, post_id, post_tags_arr){
  if(gEBI("history_"+post_id))
    gEBI("history_"+post_id).parentNode.parentNode.parentNode.remove();

  let post_content_text = post_el.innerText;
  let firsts_words_post = post_content_text.split(/([^\p{L}_0-9#]*)/g, 20).join("");
  let time_last_editing_post = post_el.parentNode.parentNode.querySelector(".file_time").textContent;
  let obj_post_tags = get_post_tags_obj(post_tags_arr);

  let post_info = {
    id: post_id,
    count_tags: obj_post_tags.count,
    words: firsts_words_post,
    tags: obj_post_tags.string,
    time: time_last_editing_post,     
  }
  
  let html_ram_row =                      '<div class="ram_row">' 
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
 gEBI("last_posts_lists").insertAdjacentHTML("afterbegin", html_ram_row);
}

let refractory_timer;
document.addEventListener('blur', function(e) {
  e = e || window.event;
  var target_blur = e.target;
  if(target_blur.classList.contains("item_input") == true){

    elements.current_post = target_blur;
    functions.echo_data();
    let finded_post_tags = f_post_change.change_symbols(target_blur);
    f_post_change.put_not_save_flag(target_blur);
    validate_blur_row();
    functions.make_drop_down_blocks(target_blur);
    call_refractory_timer(refractory_timer, 900, target_blur, finded_post_tags);

  }
}, true);

  function code_and_send_data(target_el, post_tags){
    let content_to_php = encodeURIComponent(target_el.innerHTML),
    post_id = encodeURIComponent(target_el.parentNode.parentNode.id),
        channel_folder = gEBI("page_tag_map_name").textContent.trim();

    dataload_item_new_value(content_to_php, post_id, channel_folder); 
    add_to_ram(target_el, post_id, post_tags);
  }

    function dataload_item_new_value(new_content, id_parent_item, channel_folder){
      const xhttp = new XMLHttpRequest();
      xhttp.onload = function() {
        console.log(xhttp.responseText);
        if(xhttp.responseText == "save"){
          f_post_change.delete_save_flag(id_parent_item);
        }
        let saved_not_saved_block = gEBI("saved_not_saved"),
            post_save_time = new Date(),
            post_save_hours = post_save_time.getHours(), 
            post_save_minutes = post_save_time.getMinutes();
        if (post_save_minutes < 10){
          post_save_minutes = "0" + post_save_minutes;
        }
        let time_data_hours_minutes = "Post " + id_parent_item + " saved in " + post_save_hours+":"+post_save_minutes;
        saved_not_saved_block.textContent = time_data_hours_minutes;
        setTimeout(f_post_change.clean_save_not_save_block, 60000);
      }
      xhttp.open("POST", "php/post/change_content_post.php", true);
      xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xhttp.send("parent_item_id=" + id_parent_item + "&new_content=" + new_content + "&channel_folder=" + channel_folder);
    }

  function validate_blur_row(){
        let focused_rows = document.querySelector(".focus_row");
        if(focused_rows != null)
            focused_rows.classList.remove("focus_row");
  }