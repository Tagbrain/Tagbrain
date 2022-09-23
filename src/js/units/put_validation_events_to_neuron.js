import {elements} from "../nodes/post_manipulation/obj_post_edit_f.js";
import {patterns} from "../nodes/post_manipulation/obj_post_edit_f.js";
import {functions} from "../nodes/post_manipulation/obj_post_edit_f.js";

export function put_validation_events_to_neuron(element_one){
    element_one.addEventListener('keydown', function(e){
         elements.current_post = element_one;
         let selection = window.getSelection();
         let current_line = functions.get_current_line_div("start");
 
              if((!e.shiftKey) && (!e.ctrlKey) && (e.keyCode != 9) && (e.keyCode != 8) && (e.keyCode != 46)){
                   let old_caret_pos = functions.get_row_caret_position();
                   functions.validate_row_formate(current_line, old_caret_pos);
                   functions.put_caret(current_line, old_caret_pos);
              }
    
              if (e.key === 'Enter') {
                   if(e.shiftKey){
                        e.preventDefault();
                        functions.transfer_line("shift_enter");
                   } else {
                        e.preventDefault();
                        functions.transfer_line("enter");  
                   }
              } 
              if (e.keyCode == 9){
                   e.preventDefault();
                   if(selection == ''){
                   if (!e.shiftKey){
                        functions.insert_one_tab(true, current_line);
                   } else { //shift is pressed
                        functions.deleteTab(current_line, true); 
                   }
                   } else if (selection != ''){
                        let post_child_nodes = [],
                        selection_obj = functions.get_selection_obj();
    
                        post_child_nodes = element_one.childNodes;
                        if(e.shiftKey){
                        for(let i = selection_obj.start_block_n; i < (selection_obj.end_block_n+1); i++){
                             functions.deleteTab(post_child_nodes[i], false);
                        }
                        if(post_child_nodes[selection_obj.end_block_n]){
                             document.getSelection().setBaseAndExtent(post_child_nodes[selection_obj.start_block_n], 0, post_child_nodes[selection_obj.end_block_n], post_child_nodes[selection_obj.end_block_n].childNodes.length);
                        } else {
                             //one line
                        }
                        } else { // one tab
                             let post_child_nodes = [],
                             selection_obj = functions.get_selection_obj();
    
                             post_child_nodes = element_one.childNodes;
                             for(let i = selection_obj.start_block_n; i < (selection_obj.end_block_n+1); i++){
                                  functions.insert_one_tab(false, post_child_nodes[i]);
                             }
                             if(post_child_nodes[selection_obj.end_block_n]){
                                  document.getSelection().setBaseAndExtent(post_child_nodes[selection_obj.start_block_n], 0, post_child_nodes[selection_obj.end_block_n], post_child_nodes[selection_obj.end_block_n].childNodes.length);
                             } else {
                                  //one line
                             }
                        }
                   }
              }
 
         });
 
    element_one.addEventListener('paste', (event) => {
         elements.current_post = element_one;
         let paste = (event.clipboardData || window.clipboardData).getData('text');
         functions.paste_formatting(paste);
         event.preventDefault();
    });
 
    element_one.addEventListener('keyup', function(e){  
         elements.current_post = element_one;
 
         let current_line = functions.get_current_line_div("start");
         
         let current_line_CL = current_line.classList;
         if(current_line_CL.contains("focus_row")){
              true
         } else {
              let focused_rows = document.querySelector(".focus_row");
              if(focused_rows != null)
                   focused_rows.classList.remove("focus_row");
              current_line.classList.add("focus_row");
         }
         
         functions.echo_data(); 
    })
 }