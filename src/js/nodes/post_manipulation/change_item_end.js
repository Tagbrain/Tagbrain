import {elements} from "./obj_post_edit_f.js";
import {patterns} from "./obj_post_edit_f.js";
import {functions} from "./obj_post_edit_f.js";
import {send_data_ajax} from "../../units/send_data_ajax.js";
import {add_to_ram} from "../../units/add_to_ram.js"

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

    let content_to_php = target_el.innerText,
              post_id = target_el.parentNode.parentNode.id,
        channel_name = gEBI("page_tag_map_name").textContent.trim();

    let data = {
      item_id: post_id,
      new_content: content_to_php,
      channel_name: channel_name,
    };
    let url = "php/post/change_content_post.php";
    let controller_f = function(response_obj){
        if(response_obj.status == "save"){
          delete_save_flag(post_id);
          let saved_not_saved_block = gEBI("saved_not_saved"),
            post_save_time = new Date(),
            post_save_hours = post_save_time.getHours(), 
            post_save_minutes = post_save_time.getMinutes();
          if (post_save_minutes < 10){
            post_save_minutes = "0" + post_save_minutes;
          }
          let time_data_hours_minutes = "Saved " + post_save_hours+":"+post_save_minutes;
          saved_not_saved_block.textContent = time_data_hours_minutes;
          setTimeout(clean_save_not_save_block, 60000);
        }
    };
    let error_message = "Search data not load";
    send_data_ajax(data, url, controller_f, true, error_message);
    add_to_ram(target_el, post_id, post_tags);
  }
  function validate_blur_row(){
    let focused_rows = document.querySelector(".focus_row");
    if(focused_rows != null)
        focused_rows.classList.remove("focus_row");
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
    #check
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