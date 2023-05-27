import { get_current_line_div } from "./get_current_line_div";
import { focus_end_element } from "./focus_end_element";
import { get_row_caret_position } from "./get_row_caret_position";
import { get_depth_outgrowth } from "./get_depth_outgrowth";
import { get_current_div_n } from "./get_current_div_n";
import { drop_down_c_neuron_c_branche_s } from "./drop_down_c_neuron_c_branche_s";
import { create_new_row } from "./create_new_row";
import { validate_row_formate } from "./validate_row_formate";

export function transfer_line(tab_index: string) {
     let current_node = get_current_line_div("start"),
          current_node_content: string = current_node.textContent,
          obj_space = get_depth_outgrowth(current_node.textContent),
          caret_position = get_row_caret_position(),
               first_part_content = current_node_content.slice(0, caret_position),
               second_part_content: string = current_node_content.slice(caret_position),
          obj_second_line_spaces = get_depth_outgrowth(second_part_content);
     
     current_node.textContent = first_part_content;
     let new_line_div: any;
     (obj_second_line_spaces.text_exist == false) ? second_part_content = "" : false ;

     let is_enter = false;
     if(tab_index == "enter" || obj_space.depth == 0){
          is_enter = true;
     }
     
     let content = " ".repeat(4 * obj_space.depth) + second_part_content;
     new_line_div = create_new_row(content, is_enter);
     drop_down_c_neuron_c_branche_s(window["tagbrain_graph"]["cursor_position"]["neuron_element"]);
     current_node.after(new_line_div);
     let new_div_lastchild = new_line_div.lastChild;
     validate_row_formate(current_node);
     focus_end_element(new_div_lastchild);
}