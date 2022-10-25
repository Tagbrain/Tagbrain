import {gEBI, dCE} from "./compress_f.js";
import {elements} from "../nodes/post_manipulation/obj_post_edit_f";
import {patterns} from "../nodes/post_manipulation/obj_post_edit_f";
import {functions} from "../nodes/post_manipulation/obj_post_edit_f";
import {add_to_ram} from "./add_to_ram.js"
import {post_format} from "./give_post_format.js";
import {put_validation_events_to_neuron} from "./put_validation_events_to_neuron.js";

export function add_neuron(response_server_id, neuron_content, contenteditable, add_ram_boolen, is_format){
   let  neurons_container = gEBI("items_container");

   let neuron_shell = dCE("div");
   neuron_shell.id = response_server_id;
   neuron_shell.className = "item";
   neuron_shell.innerHTML += 
        '<div class="post_name">'
         + '<span>'+response_server_id+'</span>'
         + '<span class="save_flag"></span>'
         + '<span class="file_time" title="last editing"></span>'
      + '</div>'
      + '<div class="post_icon_container">'
         + '<a class="button_cont_stl">'
            + '<svg class="liner_icon_style icon_size_middle">'
               + '<use xlink:href="#sprite_attachment"></use>'
            + '</svg>'
         + '</a>'
         + '<a class="button_cont_stl">'
            + '<svg class="liner_icon_style icon_size_middle">'
               + '<use xlink:href="#sprite_fork_icon"></use>'
            + '</svg>'
         + '</a>'
         + '<a class="button_cont_stl">'
            + '<svg class="liner_icon_style icon_size_middle delete_neuron_button">'
               + '<use xlink:href="#sprite_delete_button"></use>'
            + '</svg>'
         + '</a>'
      + '</div>'
      + '<div class="sense_item">'
         + '<div class="numbers_bar"></div>'
         + '<div contenteditable="'+contenteditable+'" spellcheck="false" id="neuron_'+response_server_id+'" class="item_input">'
         + neuron_content
         + '</div>'
         + '<div class="post_low_panel">'
            + '<span class="count_words post_counters" title="Words count | MAX: 500">W:</span>'
            + '<span class="count_rows post_counters" title="Rows count">R:</span>'
            + '<span class="count_tags post_counters" title="Tags count">#:</span>'
            + '<span class="count_points post_counters" title="Points counts quality of the post"></span>'
         + '</div>'
      + '</div>';

      neurons_container.appendChild(neuron_shell);

   if(is_format == true || is_format == undefined){
      let new_neuron_el = neuron_shell.querySelector(".item_input");

      let obj_els = post_format(new_neuron_el.innerText);
      new_neuron_el.innerHTML =  obj_els.html.innerHTML;
      functions.search_format_function(new_neuron_el, []);

      put_validation_events_to_neuron(new_neuron_el);
      if(add_ram_boolen == undefined){
         add_to_ram(new_neuron_el, response_server_id, [])
      } else if (add_ram_boolen == false){
         false
      }
   }

   return neuron_shell;
}
