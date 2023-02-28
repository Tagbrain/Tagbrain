import {gEBI, dCE} from "./compress_f.js";
import {parent_is_exist} from "./parent_is_exist";
import {create_objects_outgrowth_from_text} from "./create_objects_outgrowth_from_text";

export function get_selection_neuron_outgrowths(){
   var range;
   if (window.getSelection) {
      var selection = window.getSelection();
      //check neuron parent
      if(selection != null){
            let first_node = selection.anchorNode as Node;
            let second_node = selection.focusNode as Node;
            let first_node_is_true: boolean = parent_is_exist(first_node, "item_input");
            let second_node_is_true: boolean = parent_is_exist(second_node, "item_input");
            if(first_node_is_true == true && second_node_is_true == true){
               //collect outgrowth
               let div = dCE("div");
               div.innerHTML = selection;
               let selected_text = div.innerText;
               let outgrowths = create_objects_outgrowth_from_text(selected_text);
               return outgrowths;
            }
      } else {
          return [{depth: 0, row: 0, content: "$Write connections of a #new neuron"}];
      }
   }
 }