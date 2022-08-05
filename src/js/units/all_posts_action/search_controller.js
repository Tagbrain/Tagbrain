import {elements} from "../post_manipulation/obj_post_edit_f.js";
import {patterns} from "../post_manipulation/obj_post_edit_f.js";
import {functions} from "../post_manipulation/obj_post_edit_f.js";

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

function call_refractory_timer(timer_name, ms){
    if(timer_name != undefined)
    window.clearTimeout(timer_name);
    timer_name = window.setTimeout(get_post_search_data, ms, true, "assosiation")
}
let refractory_timer;
let field_search_r_bar = document.querySelector('#search_input_block');

field_search_r_bar.addEventListener('keydown', function(e){
     //back end search
     if (e.key === 'Enter') {
          call_refractory_timer(refractory_timer, 900);
          //get_post_search_data(false, "assosiation");
     }
})

function actions_after_get_data(obj_search_data){
     //get current collection post
     //each.style = display none (execute main_post)
}

async function send_data_server(array_of_tags, array_of_words, channel_name){
     let response = await fetch("php/channel_search/channel_search.php",{
          method: "POST",
          headers:{
               'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
          },
          body: "channel_name=" + channel_name +
               "&array_of_tags=" + array_of_tags +
               "&array_of_words=" + array_of_words
     });
     if (response.ok) { 
          let response_json = await response.json();
          console.log("data get");
          if(response_json.status == "success")
              actions_after_get_data(response_json);
      } else {
          console.log("Search data not send");
          get_post_search_data(true);
      }
}

function get_post_search_data(front_end_search, type_search){
     let search_field = document.querySelector('#search_input_block'),
           search_val = search_field.value,
         channel_name = document.getElementById("page_tag_map_name").textContent.trim(),
         counter_posts = 0,
         split_search_array = [],
         array_of_tags = [],
         array_of_words = [],   
         ids = [];  

          if (search_val.length < 3){
               document.querySelector('#result_block').innerHTML = "Write a word more than 2 symbols in the search input";
               //remove all tags
               return false;   
          };

          split_search_array = search_val.split(/\,/g);
          let array_of_search_key = split_search_array.filter(word => word.length > 2);
          if(array_of_search_key != null){
               for(let i = 0; i < array_of_search_key.length; i++){
                    if(patterns.pattern_tag.test(array_of_search_key[i])){
                         if(array_of_search_key[i].length > 2)
                              array_of_tags.push(array_of_search_key[i]); 
                    } else if(patterns.word.test(array_of_search_key[i])){
                         if(array_of_search_key[i].length > 2)
                              array_of_words.push(array_of_search_key[i]);
                    }
               }
          }
          if(front_end_search == false){
               send_data_server(array_of_tags, array_of_words, channel_name);
          } else { 
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
                                   if(unique_array_of_search_key.length > unique_finded_words.length)
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
          }


     // выводим результаты работы
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

    //function tags search
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
         call_refractory_timer(refractory_timer, 900);
         get_post_search_data();  
         document.querySelector("#search_right_bar").checked = true; 
     }
 }, false);

