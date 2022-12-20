import {get_string_tags_struct} from "./get_string_tags_struct.js";
import {gEBI, dCE} from "./compress_f.js";
import {get_compress_html_set} from "./compress_neuron_for_bar";
import {get_neuron_features} from "./get_neuron_features";

export function add_to_ram(post_el, neuron_id, is_special_neuron){
    if(gEBI("ram_"+neuron_id))
      gEBI("ram_"+neuron_id).remove();

    let html_ram_row;
    let neuron_features;
    if(is_special_neuron == false){//neurons usual html
      let type_search = "association";
      let array_current_key_word = post_el.querySelectorAll("mark");
      if(array_current_key_word.length == 0){
        neuron_features = get_neuron_features(post_el, type_search, []);
      } else {
        let arr_text_val = [];
        for(var i = 0; i < array_current_key_word.length; i++){
          arr_text_val.push(array_current_key_word[i].innerText.trim());
        }
        neuron_features = get_neuron_features(post_el, type_search, arr_text_val);
      }
      neuron_features["type_window"] = "ram";
      neuron_features["activation"] = "-";
      html_ram_row = get_compress_html_set(neuron_features);
   
    } else {// neuron unusual html

      neuron_features = {
        id: neuron_id,
        words: "special", 
        type_window: "ram",
        chain_fathers: "special words"
      }
      html_ram_row = get_compress_html_set(neuron_features);
  
    }
    
    gEBI("last_posts_lists").insertAdjacentHTML("afterbegin", html_ram_row);
  }