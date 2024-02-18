import {get_depth_outgrowth} from "../../units/get_depth_outgrowth";
import {drop_down_L_neuron_L_branche_s} from "../../units/drop_down_L_neuron_L_branche_s";
import {get_row_caret_position} from "../../units/get_row_caret_position";
import {get_sel_range} from "../../units/get_sel_range";
import {get_current_line_div} from "../../units/get_current_line_div";
import {focus_end_element} from "../../units/focus_end_element";
import {get_current_div_n} from "../../units/get_current_div_n";
import {create_new_row} from "../../units/create_new_row";
import {put_L_caret_x_target_L_string_position} from "../../units/put_L_caret_x_target_L_string_position";

export let elements = {
     all_posts: document.querySelectorAll(".item_input"),
     current_post: document,
}
//if you work with functions_obj get current_post from elements_obj
export let functions = {
     //terminal
     get_first_line(post: Element) {
          let post_rows = post.children as HTMLCollectionOf<HTMLElement>;
          if (post_rows != null) {
               if (post_rows.length > 0) {
                    for (let i = 0; i < post_rows.length; i++) {
                         if (/\p{L}/gu.test(post_rows[i].innerText)) {
                              return post_rows[i];
                         }
                    }
               }
          }
     },
     paste_formatting(paste: string) {
          let this_post: any = window["tagbrain_graph"]["cursor_position"]["neuron_element"],
              obj_caret:any = get_sel_range(),
              current_node = get_current_line_div(""),
              obj_space = get_depth_outgrowth(current_node.textContent),
              paste_rows: string[] = [];
              paste_rows = paste.split(/\r?\n|\,|\;|\:/);
          //check count selectnodes

          //check count rows in paste text
          if (paste_rows.length < 2) {

               //check selected_several_line and get sel limits
               let selection_obj = this.get_selection_obj(),
                    start_sel_block = selection_obj.start_block_n,
                    end_sel_block = selection_obj.end_block_n;

               if (selection_obj.several_rows == true) {
                    obj_caret.sel.deleteFromDocument();
                    let paste_text_node = paste_rows[0];
                    let old_content_on_start_row = this_post.childNodes[start_sel_block].textContent;
                    this_post.childNodes[start_sel_block].textContent = old_content_on_start_row + paste_text_node;

                    //get value, append new value to node
                    if (/[\p{L}]*/.test(this_post.childNodes[start_sel_block + 1].textContent) == true) {
                         let tabs_previus_line_n = get_depth_outgrowth(this_post.childNodes[start_sel_block].textContent).depth;
                         let content_second_line = this_post.childNodes[start_sel_block + 1].textContent;
                         this_post.childNodes[start_sel_block + 1].textContent = " ".repeat(tabs_previus_line_n * 4) + content_second_line;
                    } else { //remove zero line
                         this_post.removeChild(this_post.childNodes[start_sel_block + 1]);
                    }

                    focus_end_element(this_post.childNodes[start_sel_block]);
               } else { //select content on one line

                    obj_caret.sel.deleteFromDocument();

                    let paste_text_node = paste_rows[0],
                    current_row_content = current_node.innerText;

                    let caret_position;
                    if(current_row_content == "\n"){
                         current_row_content = "";
                         caret_position = 0
                    } else {
                         caret_position = get_row_caret_position();
                    }

                    let paste_line = [current_row_content.slice(0, caret_position), paste_text_node, current_row_content.slice(caret_position)].join('');
                    
                    current_node.textContent = paste_line;
                    put_L_caret_x_target_L_string_position(this_post.childNodes[start_sel_block], caret_position);
               }

          } else {
               for (let i = 0; i < paste_rows.length; i++) {
                    let content = " ".repeat(obj_space.depth * 4) + paste_rows[i];
                    let paste_line = create_new_row(content, false);
                    drop_down_L_neuron_L_branche_s(window["tagbrain_graph"]["cursor_position"]["neuron_element"]);
                    obj_caret.sel.deleteFromDocument();
                    if(i == 0){
                         if(current_node.textContent.trim() != ""){
                              current_node.after(paste_line);
                         } else {
                              current_node.replaceWith(paste_line);
                         }
                    } else {
                         current_node.after(paste_line);
                    }
                    current_node = paste_line;
               }
               focus_end_element(current_node);
               //put caret
          }
          //divides lines by comma separator
     },
     get_selection_obj() {
          let limit_sel_div1:any = get_current_div_n("start"),
               limit_sel_div2:any = get_current_div_n("end"),
               selected_several_rows = false,
               obj_range:any = get_sel_range(),
               start_block_n,
               end_block_n,
               is_direct = true,
               start_sel_node,
               start_sel_node_pos,
               end_sel_node,
               end_sel_node_pos;

          obj_range.sel.anchorNode
          if (limit_sel_div1 < limit_sel_div2) {
               is_direct = true;
               start_block_n = limit_sel_div1;
               end_block_n = limit_sel_div2;
          } else if (limit_sel_div1 > limit_sel_div2) {
               is_direct = false;
               start_block_n = limit_sel_div2;
               end_block_n = limit_sel_div1;
          } else {
               start_block_n = limit_sel_div1;
               end_block_n = limit_sel_div1;
          }

          if (is_direct == true) {
               start_sel_node = obj_range.sel.anchorNode;
               start_sel_node_pos = obj_range.sel.anchorOffset;
               end_sel_node = obj_range.sel.focusNode;
               end_sel_node_pos = obj_range.sel.focusOffset;
          } else {
               start_sel_node = obj_range.sel.focusNode;
               start_sel_node_pos = obj_range.sel.focusOffset;
               end_sel_node = obj_range.sel.anchorNode;
               end_sel_node_pos = obj_range.sel.anchorOffset;
          }

          //count selection rows
          if ((end_block_n - start_block_n) > 0)
               selected_several_rows = true;

          return {
               range: obj_range.range,
               several_rows: selected_several_rows,
               start_block_n: start_block_n,
               end_block_n: end_block_n,
               node_start: start_sel_node,
               node_end: end_sel_node,
               node_start_pos: start_sel_node_pos,
               node_end_pos: end_sel_node_pos,
          }
     },
     destruct_shape_activation_number(str_num: string){

          let array_pos: number[] = [];

          let symbols:RegExpMatchArray | null;
          symbols = str_num.match(/./g);

          let current_row: number = -1;
          let current_depth: number = 0;
          if(symbols != null){
               for(let i = 0; i < symbols.length; i++){
                    if(symbols[i] == "8"){
                         current_row += 1;
                    } else if (symbols[i] == "9"){
                         if(symbols[i] == "9"){
                              current_depth -= 1;
                         } else {
                              current_depth += 1;
                         }
                    } else {
                         continue;
                    }
                    array_pos.push(current_row, current_depth);
               }
          }

          return array_pos;
     }
     //
}