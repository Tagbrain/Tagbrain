import {elements} from "../post_manipulation/obj_post_edit_f";
import {patterns} from "../post_manipulation/obj_post_edit_f";
import {functions} from "../post_manipulation/obj_post_edit_f";
//UNITS
import {add_neuron} from "../../units/add_neuron.js";
import {send_data_ajax} from "../../units/send_data_ajax.js";
import {get_compress_html_set} from "../../units/compress_neuron_for_bar";
import {get_string_tags_struct} from "../../units/get_string_tags_struct.js";
import {get_neuron_features} from "../../units/get_neuron_features";


//OPTIMIZING_F
function gEBI(id, parent) {
     return (parent || document).getElementById(id);
}
function dCE(element){
return document.createElement(element);
}

//UNITS

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
               add_neuron(post_id, arr_objs_posts[i].content, "true", false);
          }
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
     timer_name = window.setTimeout(get_front_end_search_array, ms, "association", array_key)
}
function get_front_end_search_array(type_search, array_of_search_key){ 
     let ids = [];  

     let collection_posts = document.querySelectorAll('#items_container .item_input');
     if(collection_posts != null){
 
          for(let i = 0; i < collection_posts.length; i++){
                 let post_block = collection_posts[i];
                 let object_features = get_neuron_features(post_block, type_search, array_of_search_key);
                 object_features["type_window"] = "search";
                 ids.push(object_features);
          }

          //check sort par
          ids.sort((a, b) => b.activation - a.activation );
     
     }
     //output
     document.querySelector("#counter_block_found_words").textContent = "Best neurons: "+ ids.length;
     ids = ids.map( post_features => get_compress_html_set(post_features));
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
         tag = tag.trim();
         if (e.ctrlKey) {
             search_input.value += ','+tag;
         } else {
             search_input.value = tag; 
         }
         call_refractory_timer(refractory_timer, 500);
         document.querySelector("#search_right_bar").click(); 
     }
 }, false);

 let field_search_r_bar = document.querySelector('#search_input_block');
 let send_search_request = document.querySelector('#send_search_request');
 send_search_request.addEventListener('click', function(e){
     call_refractory_timer(refractory_timer, 500);
})


field_search_r_bar.addEventListener('keydown', function(e){

     const key = e.code || e.keyCode;
     if (key === 13 || key === 'Enter') {
          let send_search_request = document.querySelector('#send_search_request');
          send_search_request.click();
          //call_refractory_timer(refractory_timer, 500);
     }    
          
     
          /*
          let search_field = document.querySelector('#search_input_block'),
          search_val = search_field.value;
          let array_of_search_key = get_format_search_data(search_val);
          let refractor_front_end;
          refractor_front_end_search(refractor_front_end, array_of_search_key, 300);
          */
     
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
                    let data = {
                         channel_name: channel_name,
                         array_of_search_key: array_of_search_key,
                         collection_post_without_ram: collection_post_without_ram,
                         collection_ram_post_name: collection_ram_post_name,
                    };
                    let url = "php/channel_search/channel_search_controller.php";
                    let controller_f = function(response_obj){
                         success_reaction(response_obj, array_of_search_key);
                    }
                    let error_message = "Search data not load";
                    send_data_ajax(data, url, controller_f, false, error_message);
                    front_end_search = false;
               } 

               if(front_end_search == true){ 
                    get_front_end_search_array("association", array_of_search_key);
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

     get_front_end_search_array("association", array_of_search_key);
}