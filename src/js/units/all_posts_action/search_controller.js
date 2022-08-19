import {elements} from "../post_manipulation/obj_post_edit_f.js";
import {patterns} from "../post_manipulation/obj_post_edit_f.js";
import {functions} from "../post_manipulation/obj_post_edit_f.js";
import {post_format} from "../post_manipulation/add_item.js";
import {add_item} from "../post_manipulation/add_item.js";



//OPTIMIZING_F
function gEBI(id, parent) {
     return (parent || document).getElementById(id);
}
function dCE(element){
return document.createElement(element);
}

//UNITS
export function get_post_tags_obj(post_tags_arr){
     let j = 0;
     let count_tags = 0;
     let finded_post_tags_string = '';
     if(post_tags_arr != null){
          while(j < post_tags_arr.length){
               if(count_tags < 20){
                    finded_post_tags_string += '<span class="item_tags_style">' + post_tags_arr[j].toString()+'</span>'+ '&nbsp; &nbsp; ';   
               } else if(count_tags > 19 && count_tags < 21 ){
                    finded_post_tags_string += ' ... ';
               } else if(j == post_tags_arr.length - 1){
                    finded_post_tags_string += ' <span class="item_tags_style">' + post_tags_arr[j].toString()+'</span> ';
               }
               count_tags++;
               j++;
          }
     }  
     return {
          count: count_tags,
          string: finded_post_tags_string,
     }
}
function clean_selection(){
     let array_of_finded = [];
     if(document.getElementsByTagName("mark")[0]){
          array_of_finded = document.querySelectorAll("mark");
          if(array_of_finded != null){
               for(let i = 0; i < array_of_finded.length; i++){
                    let content = array_of_finded[i].innerText;
                    array_of_finded[i].outerHTML = content;
               }
          }    
     }
}
function clean_output_field(){
     let result_field = document.getElementById("result_block");
     result_field.innerHTML = "";
}
function delete_posts(arr_id){
     if(Object.keys(arr_id).length > 0){
          let obj = Object.keys(arr_id);
          for(let i = 0; i < obj.length; i++){
               let post_id = arr_id[obj[i]];;
               let post = document.getElementById(post_id);
               post.remove();
          }
     }
}
function add_posts(arr_objs_posts){

     if(arr_objs_posts.length > 0){

          for(let i = 0; i < arr_objs_posts.length;i++){
               let post_id = arr_objs_posts[i].file_name;
               add_item(post_id, arr_objs_posts[i].content, "true", false);
          }
     }

}

async function send_data_server(array_of_search_key, channel_name, collection_post_without_ram, collection_ram_post_name){
     let data = {
          channel_name: channel_name,
          array_of_search_key: array_of_search_key,
          collection_post_without_ram: collection_post_without_ram,
          collection_ram_post_name: collection_ram_post_name,
     }
     let json = JSON.stringify(data)
     let response = await fetch("php/channel_search/channel_search_controller.php",{
          method: "POST",
          headers:{
               'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
               "Access-Control-Allow-Origin" : "*", 
               "Access-Control-Allow-Credentials" : true 
          },
          body: "data=" + json
     });
     if (response.ok) { 
          let response_json = await response.json();
          if(response_json.status == "success")
              success_reaction(response_json, array_of_search_key);
      } else {
          console.log("Search data not load");
          //get_front_end_search_array();
      }
}
function check_state(search_val){
     if (search_val.length < 3){
          document.querySelector('#result_block').innerHTML = "Write a word more than 2 symbols in the search input";
          clean_selection();
          return false;   
     } else {
          return true;
     }
}
function get_collection_post_name(){
     let arr_ids = [];
     let array_post_name = document.querySelectorAll(".item");
     array_post_name.forEach((element)=>{
          let id_el = element.id;
          arr_ids.push(id_el);
     })
     return arr_ids;
}
function get_collection_ram_post_name(){
     let arr_ids = [];
     let last_posts_lists = document.getElementById("last_posts_lists");
     let ram_links_el_arr = last_posts_lists.querySelectorAll(".ram_row");
     ram_links_el_arr.forEach((element)=>{
          let id_ram = element.id;
          id_ram = id_ram.replace("ram_", "");
          arr_ids.push(id_ram);
     })
     return arr_ids;
}
function get_format_search_data(search_val){
     let split_search_array = [];
     split_search_array = search_val.split(/\,/g);
     let array_of_search_key = split_search_array.filter(word => word.length > 2);

     //divide tag on word + tag

     if(array_of_search_key.length > 0){
          return array_of_search_key;
     } else {
          return false;
     }
}
function get_collection_posts_without_ram(full_collection, ram_collection){
     let coll_without_ram = [];
     if(ram_collection.length == 0){
          return full_collection;
     } else {
          coll_without_ram = full_collection.filter(x => !ram_collection.includes(x));
          return coll_without_ram;
     }
}

let refractory_timer;
function call_refractory_timer(timer_name, ms){
     if(timer_name != undefined)
          window.clearTimeout(timer_name);
     timer_name = window.setTimeout(start_search_controller, ms, false, true)
}
function refractor_front_end_search(timer_name, array_key, ms){
     if(timer_name != undefined)
          window.clearTimeout(timer_name);
     timer_name = window.setTimeout(get_front_end_search_array, ms, "assosiation", array_key)
}
function get_front_end_search_array(type_search, array_of_search_key){ 
       let  counter_posts = 0,
                      ids = [];  

     let collection_posts = document.querySelectorAll('#items_container .item_input');
     if(collection_posts != null){

          for(let i = 0; i < collection_posts.length; i++){
               let post_block = collection_posts[i];
               let post_content_text = post_block.innerText;

               if(array_of_search_key != null){
                    let time_last_editing_post = post_block.parentNode.parentNode.querySelector(".file_time").textContent,  
                    firsts_words_post = post_content_text.split(/\s|\n|\r/g, 60).join(" ");
                    let first_row = functions.get_first_line(post_block);
                    let is_need_obj = functions.find_row_words(first_row, array_of_search_key);
                    let header_search_ind;
                    if(is_need_obj == true){
                         header_search_ind = "the object";
                    } else {
                         header_search_ind = "";
                    }

                    let search_post_obj = functions.search_format_function(post_block, array_of_search_key),
                         finded_post_words = search_post_obj.finded_words,
                         finded_post_tags = search_post_obj.finded_tags_post,
                              count_finded = 0;

                    if(finded_post_words != null)
                         count_finded = finded_post_words.length;

                    let obj_post_tags = get_post_tags_obj(finded_post_tags);
                    
               
                    //optimazing array tags
                    if(type_search == "assosiation"){
                         true
                    } else {
                         let unique_array_of_search_key = array_of_search_key.filter((val, ind, arr) => arr.indexOf(val) === ind);
                         let unique_finded_words = finded_post_words.filter((val, ind, arr) => arr.indexOf(val) === ind);
                         if(unique_array_of_search_key.length > unique_finded_words.length);
                              break;
                    }
                    
                    if(count_finded > 0){
                         counter_posts++;
                         if (post_block.parentNode.parentNode.id != ''){
                              ids.push( {
                                   id: post_block.parentNode.parentNode.id, 
                                   finded: count_finded,
                                   count_tags: obj_post_tags.count,
                                   words: firsts_words_post,
                                   tags: obj_post_tags.string,
                                   time: time_last_editing_post,
                                   header_search_ind: header_search_ind     
                              });
                         }
                    }
               }
          }
     }

     //output
     document.querySelector("#counter_block_found_words").textContent = "Found posts: "+ counter_posts;
     ids = ids.map( post_block => {
          return    '<div class="search_row">' 
                         + '<a class="link_part" href="#' + post_block.id + '">'
                              + '<span>|'
                                   + '<span class="special_symbols_style">'
                                        + post_block.finded
                                   + '</span>'
                              + '| </span>' 
                              + '<span class="header_search_ind special_symbols_style">'
                                   + post_block.header_search_ind
                              + '</span>' 
                              + '<span class="search_row_head_time">'
                                   + post_block.time 
                              + ' </span>'
                              + '<span class="first_words_search_row">' 
                                   + post_block.words 
                              + '</span><br>'  
                         + '</a>' 
                         + '<div class="search_row_body">'
                              + '<span>'
                                   + '<span> '
                                        + post_block.count_tags
                                   + ' </span>'
                                   + '<span> [ '
                                        + post_block.tags
                                   + ']</span>'
                              + '</span>'
                              + '<a class="search_row_delete">✖</a>'
                         + '</div>'
                    + '</div>';
     });
     document.querySelector('#result_block').innerHTML = ids.join('');
}     

 //NODE
     //LISTENER

 document.addEventListener('dblclick', function(e) {
     e = e || window.event;
     var target = e.target;
     if(target.classList.contains("item_tags_style")){
         let search_input = document.querySelector('#search_input_block');
         var tag = target.textContent || target.innerText;
         if (e.ctrlKey) {
             search_input.value += ','+tag;
         } else {
             search_input.value = tag; 
         }
         call_refractory_timer(refractory_timer, 500);
         document.querySelector("#search_right_bar").checked = true; 
     }
 }, false);

 let field_search_r_bar = document.querySelector('#search_input_block');
 field_search_r_bar.addEventListener('keydown', function(e){
     if (e.key === 'Enter') {
          call_refractory_timer(refractory_timer, 500);
     } else {
          /*
          let search_field = document.querySelector('#search_input_block'),
          search_val = search_field.value;
          let array_of_search_key = get_format_search_data(search_val);
          let refractor_front_end;
          refractor_front_end_search(refractor_front_end, array_of_search_key, 300);
          */
     }
})
     //CONTROLLER

function start_search_controller(front_end_search, back_end_search, type_search){
     let search_field = document.querySelector('#search_input_block'),
     search_val = search_field.value,
     channel_name = document.getElementById("page_tag_map_name").textContent.trim();

     let state = check_state(search_val);

     if(state == true){

          let array_of_search_key = get_format_search_data(search_val);

          let collection_post_name = get_collection_post_name();
          let collection_ram_post_name = get_collection_ram_post_name();
          let collection_post_without_ram = get_collection_posts_without_ram(collection_post_name, collection_ram_post_name);

          if(array_of_search_key != false){

               //check regexp or not regexp
               
               if(back_end_search == true){
                    send_data_server(array_of_search_key, channel_name, collection_post_without_ram, collection_ram_post_name);
                    front_end_search = false;
               } 

               if(front_end_search == true){ 
                    get_front_end_search_array("assosiation", array_of_search_key);
               }

          }

     }
}
function success_reaction(obj_search_data, array_of_search_key){
     if(obj_search_data.remove_posts){
          let arr_id_posts_for_del = obj_search_data.remove_posts;
          delete_posts(arr_id_posts_for_del);
     }

     if(obj_search_data.add_posts){
          let arr_objs_posts = obj_search_data.add_posts;
          add_posts(arr_objs_posts);
     }

     clean_output_field();

     get_front_end_search_array("assosiation", array_of_search_key);
}