import {gEBI, dCE} from "../../units/compress_f.js";
import {toggle_pop_up} from '../interface/settings_pop_up_end.js';
let Loader = require('../../units/tehnic/async_loader_end.js');
import {add_neuron} from "../../units/add_neuron.js";
import {post_format} from "../../units/give_post_format.js";
import {send_data_ajax} from "../../units/send_data_ajax.js";

//UNITS
function send_data_f(content, channel_name, innerText){
   let data = {
      content_neuron: content,
      channel_name: channel_name.trim(),
    };
   let url = "php/post/add_new_post.php";
   let controller_f = function(response_obj){
      if (response_obj.status == "success"){
         add_neuron(response_obj.id, innerText, true);
      } 
   }
   let error_message = "Error server";
   send_data_ajax(data, url, controller_f, true, error_message);
}


function get_selection_HTML(){
   var range;
   if (window.getSelection) {

      var selection = window.getSelection();
      let div = dCE("div");
      div.innerHTML = selection;
      if(/\p{L}/gu.test(div.innerText)){
         let obj_els = post_format(div.innerText);
         return {
            html: obj_els.html.innerHTML,
            text: obj_els.text,
         }
      } else {
         return '<div class="post_row">New post</div>';
      }

   }
}

//NODE
   //LISTENERS
    //CONTROLLER
   document.addEventListener('DOMContentLoaded',function(){
      if(gEBI("search_input")){
         gEBI("search_input").addEventListener('click', function() {
               let content_new_neuron = "$Write connections of a #new neuron";
               let channel_name = gEBI("page_tag_map_name").textContent;
               send_data_f(content_new_neuron, channel_name, content_new_neuron);  
         });
      };
      if(gEBI("create_new_channel_button")){
         gEBI("create_new_channel_button").addEventListener('click', function() {

            let data = null;
            let url = "php/channels_function/form_add_new_channel.php";
            let controller_f = function(response_obj){
                  if(response_obj.status = "success"){
                  let contenteditable = false;
                  add_neuron("form_new_channel", response_obj.content, contenteditable, false, false);
                  var l = new Loader();
                  l.require([
                     "js/validation_send_form_create_channel.js"], 
                     function() {
                        console.log('Scripts Loaded');
                  });
               }
            };
            let error_message = "Search data not load";
            send_data_ajax(data, url, controller_f, true, error_message);

         });
      };
   
      if(gEBI("button_create_from_selection")){

         let neuron_from_selection;
         
         document.addEventListener("contextmenu", (e) => {
            if (window.getSelection()){
               neuron_from_selection = get_selection_HTML();
            }
         });

         gEBI("button_create_from_selection").addEventListener('click', function(e) {
            if(gEBI("logout_a")){
               let channel_name = gEBI("page_tag_map_name").textContent; 

               send_data_f(neuron_from_selection["text"], channel_name, neuron_from_selection["html"]);
            }
            let upper_layer_for_animation = document.querySelector(".upper_layer_for_animation"),
            neuron_pop_up_menu = gEBI("neuron_pop_up_menu"),
            classes = neuron_pop_up_menu.classList;
            toggle_pop_up('neuron_pop_up_show', 'neuron_pop_up_hide', classes, upper_layer_for_animation, 'none');
         });
      };
   })
