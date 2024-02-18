import {put_L_caret_x_target_L_string_position} from "./put_L_caret_x_target_L_string_position";
import {insert_one_tab} from "./insert_one_tab";
import {delete_one_tab} from "./delete_one_tab";
import {transfer_line} from "./transfer_line";

export function paste_L_symbol_x_current_position(symbol: string){
    let symbol_len = symbol.length;
    let position_L_current_x_last = window["tagbrain_graph"]["cursor_position"]["depth_L_in_outgrowth"];
    let el_L_current_x_last = window["tagbrain_graph"]["cursor_position"]["outgrowth"];

    if(symbol == "tab+"){
        insert_one_tab(el_L_current_x_last, false);
        symbol_len = 4;
        put_L_caret_x_target_L_string_position(
            el_L_current_x_last, 
            position_L_current_x_last + symbol_len
        );
    } else if(symbol == "tab-"){
        let reducted = delete_one_tab(el_L_current_x_last, false);
        symbol_len = -reducted;
        put_L_caret_x_target_L_string_position(el_L_current_x_last, position_L_current_x_last+symbol_len);
    } else if(symbol == "enter"){
        transfer_line("shift_enter");
    } else {
        let row_string = el_L_current_x_last.textContent,
            paste_line = [row_string.slice(0, position_L_current_x_last), symbol, row_string.slice(position_L_current_x_last)].join('');
        el_L_current_x_last.textContent = paste_line;
        put_L_caret_x_target_L_string_position(el_L_current_x_last, position_L_current_x_last+symbol_len);
    }

   //refresh
   window["tagbrain_graph"]["cursor_position"]["outgrowth"] = el_L_current_x_last;
   window["tagbrain_graph"]["cursor_position"]["depth_L_in_outgrowth"] = position_L_current_x_last+symbol_len;
}
