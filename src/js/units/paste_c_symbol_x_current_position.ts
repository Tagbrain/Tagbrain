import {put_c_caret_x_target_c_string_position} from "./put_c_caret_x_target_c_string_position";
import {insert_one_tab} from "./insert_one_tab";
export function paste_c_symbol_x_current_position(symbol: string){
    let symbol_len = symbol.length;
    let position_c_current_x_last = window["tagbrain_graph"]["cursor_position"]["depth_c_in_outgrowth"];
    let el_c_current_x_last = window["tagbrain_graph"]["cursor_position"]["outgrowth"];

    if(symbol == "tab+"){
        insert_one_tab(true, el_c_current_x_last);
        symbol_len = 4;
    } else if(symbol == "tab-"){
        //insert_one_tab(true, el_c_current_x_last);
        //symbol_len = 0;
    } else {
        let row_string = el_c_current_x_last.textContent;
        let paste_line = [row_string.slice(0, position_c_current_x_last), symbol, row_string.slice(position_c_current_x_last)].join('');
        el_c_current_x_last.textContent = paste_line;
        put_c_caret_x_target_c_string_position(el_c_current_x_last, position_c_current_x_last+symbol_len);
    }

   //refresh
   window["tagbrain_graph"]["cursor_position"]["outgrowth"] = el_c_current_x_last;
   window["tagbrain_graph"]["cursor_position"]["depth_c_in_outgrowth"] = position_c_current_x_last+symbol_len;
}
