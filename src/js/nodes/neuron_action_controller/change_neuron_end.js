import {elements} from "./obj_post_edit_f";
import {patterns} from "./obj_post_edit_f";
import {functions} from "./obj_post_edit_f";
import {send_data_ajax} from "../../units/send_data_ajax.js";
import {get_neuron_object_outgrowths} from "../../units/get_neuron_object_outgrowths";
import {add_to_ram} from "../../units/add_to_ram.js";
import {gEBI, dCE} from "../../units/compress_f.js";

//UNITS
  let refractory_timer;
  function call_refractor_send_data(timer_name, ms, target_blur){
    if(timer_name != undefined)
      window.clearTimeout(timer_name);
    timer_name = window.setTimeout(code_and_send_data, ms, target_blur)
  }
  function put_not_save_class(target_blur){
    let save_flag_container = target_blur.parentNode.parentNode.querySelector(".save_flag");
    save_flag_container.innerHTML = " ●";
  }
  function delete_save_flag(post_id){
    let post = gEBI(post_id);
    if(post == null) {
      console.log("zero neuron");
      return false
    };
    let save_flag_container = post.querySelector(".save_flag");
    save_flag_container.innerHTML = "";
    if(gEBI("ram_"+post_id))
      gEBI("ram_"+post_id).querySelector(".activation_container ").className = "activation_container saved_neuron";
    if(gEBI("search_"+post_id))
      gEBI("search_"+post_id).querySelector(".activation_container ").className = "activation_container saved_neuron";
  }
  function clean_save_not_save_block(){
    let saved_not_saved_block = gEBI("saved_not_saved");
    saved_not_saved_block.textContent = "";
  }
  function code_and_send_data(neuron){
    let neuron_tree = get_neuron_object_outgrowths(neuron),
        neuron_id = neuron.parentNode.parentNode.id,
        graph_name = gEBI("page_tag_map_name").textContent.trim(),
        time = Math.round(new Date().getTime() / 1000).toString();

    let data = {
      action: 'change',
      graph_name: graph_name,
      neuron_id: neuron_id,
      neuron_tree: neuron_tree,
      unix_time: time,
    };
    let url = "php/neurons/controller_neurons_change.php";
    let controller_f = function(response_obj){
        if(response_obj.status == "success"){
          delete_save_flag(neuron_id);
          let saved_not_saved_block = gEBI("saved_not_saved"),
          time_data_hours_minutes = "Saved";
          saved_not_saved_block.textContent = time_data_hours_minutes;
          setTimeout(clean_save_not_save_block, 60000);
        }
    };
    let error_message = "Search data not load";
    send_data_ajax(data, url, controller_f, true, error_message);
    add_to_ram(neuron, neuron_id, false);
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

  //CONTROLLER

  function start_controller(target_neuron){
    elements.current_post = target_neuron;
    functions.echo_data();

    let array_current_key_word = target_neuron.querySelectorAll("mark");
    if(array_current_key_word.length == 0){
      functions.search_format_function(target_neuron, []);
    } else {
      let arr_text_val = [];
      for(var i = 0; i < array_current_key_word.length; i++){
        arr_text_val.push(array_current_key_word[i].innerText.trim());
      }
      functions.search_format_function(target_neuron, arr_text_val);
    }

    put_not_save_class(target_neuron);
    validate_blur_row();
    functions.make_drop_down_blocks(target_neuron);
    call_refractor_send_data(refractory_timer, 900, target_neuron);
  }