import {functions} from "../nodes/neuron_action_controller/obj_post_edit_f";
import {echo_c_statistic_c_to_neuron} from "./echo_c_statistic_c_to_neuron";
import {get_row_caret_position} from "./get_row_caret_position";
import {get_current_line_div} from "./get_current_line_div";
import {put_c_caret_x_target_c_string_position} from "./put_c_caret_x_target_c_string_position";
import {get_parent_with_class} from "./get_parent_with_class";
import {detect_c_mobile} from "./detect_c_mobile";
import {insert_one_tab} from "./insert_one_tab";


export function put_validation_events_to_neuron(element_one){

     element_one.addEventListener('keydown', function(e){
          window["tagbrain_graph"]["cursor_position"]["neuron_element"] = element_one;
          let selection = window.getSelection();
          let current_line = get_current_line_div("start");

          if (e.keyCode == 9){
               e.preventDefault();
               if(selection == ''){
                    if (e.shiftKey){
                         functions.deleteTab(current_line, true); 
                    } else { //shift is pressed
                         insert_one_tab(true, current_line);
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
                              insert_one_tab(false, post_child_nodes[i]);
                         }
                         if(post_child_nodes[selection_obj.end_block_n]){
                              document.getSelection().setBaseAndExtent(post_child_nodes[selection_obj.start_block_n], 0, post_child_nodes[selection_obj.end_block_n], post_child_nodes[selection_obj.end_block_n].childNodes.length);
                         } else {
                              //one line
                         }
                    }
               }
          }
     })
    element_one.addEventListener('keypress', function(e){
          window["tagbrain_graph"]["cursor_position"]["neuron_element"] = element_one;
         let selection = window.getSelection();
         let current_line = get_current_line_div("start");
 
               if((!e.shiftKey) && (!e.ctrlKey) && (e.keyCode != 9) && (e.keyCode != 8) && (e.keyCode != 46)){
                   let old_caret_pos = get_row_caret_position();
                   functions.validate_row_formate(current_line, old_caret_pos);
                   put_c_caret_x_target_c_string_position(current_line, old_caret_pos);
               }
              if (e.key === 'Enter') {
                   if(e.shiftKey){
                        e.preventDefault();
                        functions.transfer_line("shift_enter");
                   } else {
                         e.preventDefault();
                         if(detect_c_mobile()){
                              functions.transfer_line("shift_enter");
                         } else {
                              functions.transfer_line("enter");  
                         }
                   }
              } 
 
         });
 
    element_one.addEventListener('paste', (event) => {
          window["tagbrain_graph"]["cursor_position"]["neuron_element"] = element_one;
         let paste = (event.clipboardData || window.clipboardData).getData('text');
         functions.paste_formatting(paste);
         event.preventDefault();
    });
 
    element_one.addEventListener('keyup', function(e){  
          window["tagbrain_graph"]["cursor_position"]["neuron_element"] = element_one;
          let current_line = get_current_line_div("start");
          focus_row_controller(current_line);
          echo_c_statistic_c_to_neuron();
          window["tagbrain_graph"]["cursor_position"] = {
               neuron_element: element_one, 
               outgrowth: current_line, 
               depth_c_in_outgrowth: get_row_caret_position(),
          }
    })

    element_one.addEventListener('change', function(e){  
     let current_line = get_current_line_div("start");
     window["tagbrain_graph"]["cursor_position"] = {
          neuron_element: element_one, 
          outgrowth: current_line, 
          depth_c_in_outgrowth: get_row_caret_position(),
     }
    })

    element_one.addEventListener('click', function(e){  
     window["tagbrain_graph"]["cursor_position"]["neuron_element"] = element_one;
     //let current_line = get_parent_with_class(e.target, "post_row");
     let current_line = get_current_line_div("start");
     focus_row_controller(current_line);
     window["tagbrain_graph"]["cursor_position"] = {
          neuron_element: element_one, 
          outgrowth: current_line, 
          depth_c_in_outgrowth: get_row_caret_position(), //get_caret_c_pos_x_put_tb_c_caret #edit
     }
     })
 }

 function focus_row_controller(current_line){
     let current_line_CL = current_line.classList;
     if(current_line_CL.contains("focus_row")){
          true
     } else {
          let focused_rows = document.querySelector(".focus_row");
          if(focused_rows != null)
               focused_rows.classList.remove("focus_row");
          current_line.classList.add("focus_row");
     }
 }