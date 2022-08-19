import {elements} from "./obj_post_edit_f.js";
import {patterns} from "./obj_post_edit_f.js";
import {functions} from "./obj_post_edit_f.js";

import {put_validation_events_to_post} from './post_editor_controller.js';
import {toggle_pop_up} from '../interface/settings_pop_up_end.js';
import {add_to_ram} from './change_item_end.js';
let Loader = require('../tehnic/async_loader_end.js');

//OPTIMIZING_FS
function gEBI(id, parent) {
   return (parent || document).getElementById(id);
}
function dCE(element){
   return document.createElement(element);
}

//UNITS
export function add_item(response_server_id, item_value, contenteditable, add_ram_boolen){
   let       items_container = gEBI("items_container"),
       parent_post_container = dCE("div"),
          delete_item_button = dCE("a"),
                  sense_item = dCE("div"),
                  numbers_bar = dCE("div"),
                   post_name = dCE("div"),
                   save_flag = dCE("span"),
                   file_time = dCE("span"),
                   post_low_panel = dCE("div"),
                   count_words = dCE("span"),
                   count_rows = dCE("span"),
                   count_tags = dCE("span"),
                   count_points = dCE("span"),
         div_contenteditable = dCE("div");

   const blocks_new_post = {
      parent_post_container:{
         parent_block: items_container,
         id: response_server_id,
         class: "item",
         element_html: parent_post_container,
      },
      delete_item_button:{
         parent_block: parent_post_container,
         class: ["delete_item_button", "button_cont_stl"],
         inner_html: '<svg class="liner_icon_style icon_size_middle"><use xlink:href="#sprite_delete_button"></use></svg>',
         element_html: delete_item_button,
      },
      sense_item:{
         parent_block: parent_post_container,
         class: "sense_item",
         element_html: sense_item,
      },
      post_low_panel:{
         parent_block: sense_item,
         class: "post_low_panel",
         element_html: post_low_panel,
      },
      count_words:{
         parent_block: post_low_panel,
         class: ["count_words", "post_counters"],
         element_html: count_words,
      },
      count_rows:{
         parent_block: post_low_panel,
         class: ["count_rows", "post_counters"],
         element_html: count_rows,
      },
      count_tags:{
         parent_block: post_low_panel,
         class: ["count_tags", "post_counters"],
         element_html: count_tags,
      },
      count_points:{
         parent_block: post_low_panel,
         class: ["count_points", "post_counters"],
         element_html: count_points,
      },
      post_name:{
         parent_block: parent_post_container,
         class: "post_name",
         inner_html: "Post:"+response_server_id,
         element_html: post_name,
      },
      save_flag:{
         parent_block: post_name,
         class: "save_flag",
         element_html: save_flag,
      },
      file_time:{
         parent_block: post_name,
         class: "file_time",
         element_html: file_time,
      },
      div_contenteditable:{
         parent_block: sense_item,
         id: "item_input_id_" + response_server_id,
         class: "item_input",
         inner_html: item_value,
         attribute_name:"contenteditable",
         attribute_value: contenteditable,
         element_html: div_contenteditable,
      },
      numbers_bar:{
         parent_block: sense_item,
         class: "numbers_bar",
         element_html: numbers_bar,
      }

   }

   for (const element_unit in blocks_new_post) {
      let element_obj = blocks_new_post[element_unit];
      let element = element_obj.element_html;
      
      if(!Array.isArray(element_obj.class)){
         element.classList.add(element_obj.class);
      } else {
         element.classList.add(element_obj.class[0]);
         element.classList.add(element_obj.class[1]);
      }
      
      if(element_obj.hasOwnProperty("id"))
         element.id = element_obj.id;
      if(element_obj.hasOwnProperty("attribute_name"))
         element.setAttribute(element_obj.attribute_name, element_obj.attribute_value);
      if(element_obj.hasOwnProperty("inner_html"))
         element.innerHTML = element_obj.inner_html;
      if(element_obj == "parent_post_container"){
         items_container.appendChild(element);
      } else {
         element_obj.parent_block.appendChild(element);
      }
   }

   let new_post = gEBI(response_server_id);
   let new_post_input = new_post.querySelector(".item_input");

   let paste = new_post_input.innerText;
   let html_el = post_format(paste);
   new_post_input.innerHTML =  html_el.innerHTML;
   functions.search_format_function(new_post_input, []);

   put_validation_events_to_post(new_post_input);
   if(add_ram_boolen == undefined){
      add_to_ram(parent_post_container, response_server_id, [])
   } else if (add_ram_boolen == false){
      false
   }
}
export function post_format(inner_text){
   let rows_arr = [];
   rows_arr = inner_text.split("\n");
   let div = dCE("div");
   if(rows_arr != null){
      for(let i = 0; i < rows_arr.length; i++){
         let new_line_div = document.createElement("div");
         if (rows_arr[i] != "") {
            new_line_div.innerHTML = rows_arr[i];
         } 
         new_line_div.className = "post_row";
         div.append(new_line_div);
      }
      return div;
   }
} 
async function dataload(new_item_content, channel_folder){
   let response = await fetch("php/post/add_new_post.php",{
      method: "POST",
      headers:{
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
       },
       body: "new_item=" + new_item_content +
            "&channel_folder=" + channel_folder.trim()
   }); 
   if(response.ok){
      let file_name = await response.text();
      if (/\d/.test(file_name) == true){
         let contenteditable = true;
         add_item(file_name, new_item_content, contenteditable);
      } else {
         console.log("Error server");
      }
   }
}
function get_selection_HTML(){
   var range;
   if (window.getSelection) {

      var selection = window.getSelection();
      let div = dCE("div");
      div.innerHTML = selection;
      if(/\p{L}/gu.test(div.innerText)){
         let html_el = post_format(div.innerText)
         return html_el.innerHTML;
      } else {
         return '<div class="post_row">New post</div>';
      }

   }
}
async function load_form_new_channel_script(){
   let response = await fetch("php/channels_function/form_add_new_channel.php",{
      method: "POST",
      headers:{
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
         },
   }); 
   if(response.ok){
      let content = await response.text();
      let contenteditable = false;
      add_item("form_new_channel", content, contenteditable);
      var l = new Loader();
      l.require([
         "js/validation_send_form_create_channel.js"], 
         function() {
            console.log('Scripts Loaded');
      });
   }
}

//NODE
   //LISTENERS
    //CONTROLLER
   document.addEventListener('DOMContentLoaded',function(){
      if(gEBI("search_input")){
         gEBI("search_input").addEventListener('click', function() {
               let search_input_new_post = "<div class='post_row'>Write a new post here</div>";
               let channel_folder = gEBI("page_tag_map_name").textContent.trim();
               dataload(search_input_new_post, channel_folder);  
         });
      };
      if(gEBI("create_new_channel_button")){
         gEBI("create_new_channel_button").addEventListener('click', function() {
            load_form_new_channel_script();
         });
      };
   
      if(gEBI("button_create_from_selection")){
         let content_from_sel;
         
         document.addEventListener("contextmenu", (e)=>{
            if (window.getSelection()){
               content_from_sel = get_selection_HTML();
            }
         });
         gEBI("button_create_from_selection").addEventListener('click', function(e) {
            let channel_folder = gEBI("page_tag_map_name").textContent.trim();
            dataload(content_from_sel, channel_folder);  
            let upper_layer_for_animation = document.querySelector(".upper_layer_for_animation"),
            post_pop_up_menu = gEBI("post_pop_up_menu"),
            classes = post_pop_up_menu.classList;
            toggle_pop_up('post_pop_up_show', 'post_pop_up_hide', classes, upper_layer_for_animation, 'none');
         });
      };
   })
