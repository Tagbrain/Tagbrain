import {elements} from "./obj_post_edit_f.js";
import {patterns} from "./obj_post_edit_f.js";
import {functions} from "./obj_post_edit_f.js";
import {get_post_tags_obj} from "../all_posts_action/search_controller.js";

//UNITS
  let refractory_timer;
  function gEBI(id, parent) {
    return (parent || document).getElementById(id);
  } 
  function call_refractor_send_data(timer_name, ms, target_blur, post_tags){
    if(timer_name != undefined)
      window.clearTimeout(timer_name);
    timer_name = window.setTimeout(code_and_send_data, ms, target_blur, post_tags)
  }
  function put_not_save_flag(target_blur){
    let save_flag_container = target_blur.parentNode.parentNode.querySelector(".save_flag");
    save_flag_container.innerHTML = " ●";
  }
  function delete_save_flag(post_id){
    let post = gEBI(post_id),
    save_flag_container = post.querySelector(".save_flag");
    save_flag_container.innerHTML = "";
    gEBI("history_"+post_id).innerHTML = "";
  }
  function clean_save_not_save_block(){
    let saved_not_saved_block = gEBI("saved_not_saved");
    saved_not_saved_block.textContent = "";
  }
  function give_post_right_format(post_el){
    let search_post_obj = functions.search_format_function(post_el, []);
    let finded_post_tags = search_post_obj.finded_tags_post;
    return finded_post_tags;
  }
  function code_and_send_data(target_el, post_tags){

    let content_to_php = encodeURIComponent(target_el.innerText),
              post_id = encodeURIComponent(target_el.parentNode.parentNode.id),
        channel_folder = gEBI("page_tag_map_name").textContent.trim();

    dataload_item_new_value(content_to_php, post_id, channel_folder); 
    add_to_ram(target_el, post_id, post_tags);

  }
  function validate_blur_row(){
    let focused_rows = document.querySelector(".focus_row");
    if(focused_rows != null)
        focused_rows.classList.remove("focus_row");
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
    
    let html_ram_row =                      '<div class="ram_row" id="'+'ram_'+post_info.id+'">' 
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
  async function dataload_item_new_value(new_content, id_parent_item, channel_folder){
    let response = await fetch("php/post/change_content_post.php",{
      method: "POST",
      headers:{
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        },
        body: "parent_item_id=" + id_parent_item 
            + "&new_content=" + new_content 
            + "&channel_folder=" + channel_folder
    }); 
    if(response.ok){
      let responseText = await response.text();
      console.log(responseText);
      if(responseText == "save"){
        delete_save_flag(id_parent_item);
        let saved_not_saved_block = gEBI("saved_not_saved"),
          post_save_time = new Date(),
          post_save_hours = post_save_time.getHours(), 
          post_save_minutes = post_save_time.getMinutes();
        if (post_save_minutes < 10){
          post_save_minutes = "0" + post_save_minutes;
        }
        let time_data_hours_minutes = "Post " + id_parent_item + " saved in " + post_save_hours+":"+post_save_minutes;
        saved_not_saved_block.textContent = time_data_hours_minutes;
        setTimeout(clean_save_not_save_block, 60000);
      }
    } else {
        console.log("Error server");
    }
  }

//NODE
  //LISTENER
  document.addEventListener('blur', function(e) {
    e = e || window.event;
    var target_blur = e.target;
    if(target_blur.classList.contains("item_input") == true){
      start_controller(target_blur);
    }
  }, true);
  /* remove after replace all channels format
  document.addEventListener('DOMContentLoaded', () => {

    let posts = document.querySelectorAll(".item");
    let i=0;
    posts.forEach((post) => {
        let content = post.querySelector(".item_input");
        setTimeout(function (){call_refractor_send_data(refractory_timer, 900, content, ["nothing"])}, 2000*i)
        i++;
    });

  })
  */
  //CONTROLLER

  function start_controller(target_post){

    elements.current_post = target_post;
    
    functions.echo_data();
    let finded_post_tags = give_post_right_format(target_post);
    put_not_save_flag(target_post);
    validate_blur_row();
    functions.make_drop_down_blocks(target_post);

    call_refractor_send_data(refractory_timer, 900, target_post, finded_post_tags);

  }