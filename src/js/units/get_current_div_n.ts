import { get_sel_range } from "./get_sel_range";
import { surrounded_div } from "./surrounded_div";
import { drop_down_L_neuron_L_branche_s } from "./drop_down_L_neuron_L_branche_s";
import { create_new_row } from "./create_new_row";
import { focus_end_element } from "./focus_end_element";

type caret = {
     sel: any;
     range: any;
} | undefined;

export function get_current_div_n(node_par: Element | string) {
     let obj_caret: caret = get_sel_range(),
          current_element: any,
          outgrowth_list = window["tagbrain_graph"]["cursor_position"]["neuron_element"].children;
     if(obj_caret != undefined){
          current_element = obj_caret.sel.anchorNode;
          if (typeof node_par === "string") {
               if (node_par === "start") {
                    current_element = obj_caret.sel.anchorNode
               }
               if (node_par === "end") {
                    current_element = obj_caret.sel.focusNode
               }
          } else if (node_par instanceof Element) {
               current_element = node_par;
          }


          if (current_element.nodeType == 3) {
               if (current_element.parentNode.classList.contains("item_input")) {
                    let selectNode_text = current_element.innerText;
                    let new_line_div = surrounded_div(selectNode_text);
                    current_element = new_line_div;
               } else {
                    while (!current_element.parentNode.classList.contains("item_input")) {
                         current_element = current_element.parentNode;
                    }
                    window["tagbrain_graph"]["cursor_position"]["outgrowth"] = current_element;
               }
          } else if (current_element.classList.contains("item_input")) {
               let new_line_div = create_new_row("", true);//zero symbol
               drop_down_L_neuron_L_branche_s(window["tagbrain_graph"]["cursor_position"]["neuron_element"]);
               current_element.innerHTML = "";
               current_element.appendChild(new_line_div);
               focus_end_element(new_line_div);
               current_element = new_line_div;
               console.log("check code")
          }

     }

     for (let i = 0; i < outgrowth_list.length; i++) {
          if (outgrowth_list[i] == current_element) {
               return i;
          }
     }
}