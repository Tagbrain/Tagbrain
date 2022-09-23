import {parent_is_exist} from "../../units/parent_is_exist.js";

export let elements = {
     all_posts: document.querySelectorAll(".item_input"),
     current_post: document,
}
export let patterns = {
     invisible_char: '︀',
     pattern_tag: /#[\p{L}_0-9]*/gui,
     pattern_verb: /\$[\p{L}_0-9]*/gui,
     word: /(\w+)*/gu,
     pattern_symbols: /\$[\p{L}_0-9]*|↓|\||&|→|←|↑|=>|<(|\/)span[^>]*>/gui,
     code_pattern: /(\[code\][^]*\[\/code\])/gm,
     clean_codetag_pattern: /\[(|\/)code\]/gm,
}
//if you work with functions_obj get current_post from elements_obj
export let functions = {
     //terminal
     get_sel_range() {
          var sel, range;
          if (window.getSelection) {
               sel = window.getSelection();
               if (sel.getRangeAt && sel.rangeCount) {
                    range = sel.getRangeAt(0);
                    return {
                         sel: sel,
                         range: range,
                    }
               }
          }
     },
     give_current_post() {
          let obj_caret = this.get_sel_range();
          let node = obj_caret.sel.anchorNode;
          elements.current_post = parent_is_exist(node, "item_input");
     },
     get_current_line_div(node_par) {
          let div_n = this.get_current_div_n(node_par);
          return elements.current_post.childNodes[div_n];
     },
     get_current_div_n(node_par) {
          let obj_caret = this.get_sel_range(),
               children_list1 = elements.current_post.children;

          //def curremt element
          let current_element = obj_caret.sel.anchorNode;
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
                    let new_line_div = functions.surrounded_div(selectNode_text);
                    current_element = new_line_div;
                    children_list1 = elements.current_post.children;
               } else {
                    while (!current_element.parentNode.classList.contains("item_input")) {
                         current_element = current_element.parentNode;
                    }
               }
          } else if (current_element.classList.contains("item_input")) {
               let new_line_div = this.create_new_row("");//zero symbol
               this.make_drop_down_blocks(elements.current_post);
               current_element.innerHTML = "";
               current_element.appendChild(new_line_div);
               this.focus_end_element(new_line_div);
               current_element = new_line_div;
               children_list1 = elements.current_post.children;
          }
          for (let i = 0; i < children_list1.length; i++) {
               if (children_list1[i] == current_element) {
                    return i;
               }
          }
     },
     get_first_line(post) {
          let post_rows = post.childNodes;
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
     create_new_row(content, is_enter) {
          let new_line_div = document.createElement("div");
          if (content != "") {
               new_line_div.innerHTML = content;
          } else if (is_enter == true) {
               let newtext = document.createTextNode("\n");
               new_line_div.appendChild(newtext);
          }
          new_line_div.className = "post_row";
          return new_line_div;
     },
     get_current_line_spaces(current_node) {
          let text_content = current_node.textContent;
          let obj_space = this.get_first_spaces_and_boolen_exist_text(text_content);
          //current_node.textContent = obj_space.content;
          return obj_space.spaces;
     },
     get_first_spaces_and_boolen_exist_text(text_content, previous_spaces, pos_par) {
          let  spaces_amount = 0,
               text_exist = false,
               spaces_string = "";

          let text_row = text_content.replace(/./gi, function (key) {
               if(text_exist == false){
                    if (key == patterns.invisible_char)
                         return "";
                    if (key == " ") {
                         spaces_amount += 1;
                         spaces_string += " ";
                         return "";
                    } else if (key == "\t") {
                         spaces_amount += 4;
                         spaces_string += "    ";
                         return "";
                    } else {//end tabulation
                         text_exist = true;
                         return key;
                    }
               } else {
                    return key;
               }
          });
          
          if(pos_par != undefined){
               if(pos_par == "first"){
                    spaces_amount = 0;
                    spaces_string = "";
               } 
          } else {
               if(previous_spaces != undefined){
                    if(spaces_amount > previous_spaces)
                         if(spaces_amount - previous_spaces > 6){
                              spaces_amount = previous_spaces + 4;
                              spaces_string = " ".repeat(previous_spaces + 4);
                         }
               }

               let tabulation = spaces_amount % 4;

               if(tabulation > 0){
                    if (tabulation > 2){
                         spaces_string = spaces_string + " ";
                         spaces_amount = spaces_amount + 1;
                    } else {
                         if(tabulation == 2){
                              spaces_string = spaces_string.slice(2);
                              spaces_amount = spaces_amount - 2;
                         } else {//==1
                              spaces_string = spaces_string.slice(1);
                              spaces_amount = spaces_amount - 1;
                         }
                    }
               }
          }
          
          return {
               spaces: spaces_amount,
               content: spaces_string + text_row,
               text_exist: text_exist,
          };
     },
     focus_end_element(element) {
          let new_range = new Range();
          new_range.selectNodeContents(element);
          document.getSelection().removeAllRanges();
          document.getSelection().addRange(new_range);
          new_range.collapse();
     },
     put_caret(node, pos){
     
          let position;
          // do => SAVE_SELECTION
          if(typeof(pos) === 'number'){
               position = pos;
          } else if (pos === "end" || undefined){
               let new_range = new Range();
               new_range.selectNodeContents(node);
               document.getSelection().removeAllRanges();
               document.getSelection().addRange(new_range);
               new_range.collapse();
               return
          }

          let childs = node.childNodes;
          let i = 0;

          if(childs != null){
               while(i < childs.length) {

                    let len = childs[i].textContent.length;

                    if(len < position){
                         position = position - len;
                         i++;
                         continue
                    } else {
                         if(childs[i].nodeType == 3){
                              node.focus();
                              document.getSelection().collapse(childs[i], position);
                              return
                         } else {
                              childs[i].focus();
                              document.getSelection().collapse(childs[i].childNodes[0], position);
                              return
                         }
                    }

               }
          }
          // #edit => RETURN OLD SELECTION
     },
     get_row_caret_position() {
          let obj_caret = this.get_sel_range(),
               current_row = this.get_current_line_div(obj_caret.sel.anchorNode),
               caret_position = this.get_position_in_row(obj_caret.sel.anchorNode, obj_caret.sel.anchorOffset, current_row);
          return caret_position;
     },
     get_position_in_row(node, node_position, current_row) {
          let position_in_row_where_node = 0,
                  current_row_childnodes = [];

          current_row_childnodes = current_row.childNodes;

          if (current_row_childnodes != null) {
               for (let i = 0; i < current_row_childnodes.length; i++) {
                    if (node == current_row_childnodes[i] || current_row_childnodes[i].contains(node)) {
                         position_in_row_where_node += node_position;
                         break
                    } else {
                         let child_textcont;
                         if (current_row_childnodes[i].nodeType != 3){
                              child_textcont = current_row_childnodes[i].textContent;
                         } else {
                              child_textcont = current_row_childnodes[i];
                         }
                         position_in_row_where_node += child_textcont.length;
                    }
               }
          }
          current_row = current_row.textContent;

          return position_in_row_where_node;
     },
     //textNode first level post
     surrounded_div(text) {
          //if contain several rows divide
          let obj_caret = this.get_sel_range(),
               range = obj_caret.range;
          range.deleteContents();
          let new_line_div = this.create_new_row(text);
          this.make_drop_down_blocks(elements.current_post);
          range.insertNode(new_line_div);
          obj_caret.sel.anchorNode.parentNode.removeChild(obj_caret.sel.anchorNode);
          range.collapse();
          return new_line_div;
     },
     transfer_line(tab_index) {
          let current_node = this.get_current_line_div(),
               current_node_content = current_node.textContent,
               amount_spaces_current_node = this.get_current_line_spaces(current_node),
               caret_position = this.get_row_caret_position(),
               first_part_content = current_node_content.slice(0, caret_position),
               second_part_content = current_node_content.slice(caret_position),
               obj_second_line_spaces = this.get_first_spaces_and_boolen_exist_text(second_part_content);


          tab_index == "enter" ? amount_spaces_current_node = 0 : true;
          
          if (obj_second_line_spaces.text_exist == false) {
               second_part_content = "";
               //second_part_content = obj_second_line_spaces.content;
          };

          current_node.textContent = first_part_content;

          let new_line_div;
          if (amount_spaces_current_node > 0) {
               let content = " ".repeat(amount_spaces_current_node) + second_part_content;
               new_line_div = this.create_new_row(content);
               this.make_drop_down_blocks(elements.current_post);
               current_node.after(new_line_div);
               let new_div_lastchild = new_line_div.lastChild;
               this.validate_row_formate(current_node, false);
               this.focus_end_element(new_div_lastchild);
          } else {
               let content = second_part_content;
               new_line_div = this.create_new_row(content, true);
               this.make_drop_down_blocks(elements.current_post);
               current_node.after(new_line_div);
               let new_div_lastchild = new_line_div.lastChild;
               this.validate_row_formate(current_node, false);
               this.focus_end_element(new_div_lastchild);
          }
     },
     insert_one_tab(focus, current_node) {
          let node_text = current_node.innerText;

          node_text = "    " + node_text;
          current_node.innerHTML = node_text;

          if (focus)
               if (focus == true)
                    this.focus_end_element(current_node);
     },
     paste_formatting(paste) {
          let this_post = elements.current_post,
              obj_caret = this.get_sel_range(),
              current_node = this.get_current_line_div(),
              current_node_spaces = this.get_current_line_spaces(current_node),
              paste_rows = [];
              paste_rows = paste.split(/\r?\n/);
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
                         let spaces_previus_line_n = this.get_current_line_spaces(this_post.childNodes[start_sel_block]);
                         let content_second_line = this_post.childNodes[start_sel_block + 1].textContent;
                         this_post.childNodes[start_sel_block + 1].textContent = " ".repeat(spaces_previus_line_n) + content_second_line;
                    } else { //remove zero line
                         removeChild(this_post.childNodes[start_sel_block + 1]);
                    }

                    this.focus_end_element(this_post.childNodes[start_sel_block]);
               } else { //select content on one line

                    obj_caret.sel.deleteFromDocument();

                    let paste_text_node = paste_rows[0],
                    current_row_content = current_node.innerText;

                    let caret_position;
                    if(current_row_content == "\n"){
                         current_row_content = "";
                         caret_position = 0
                    } else {
                         caret_position = this.get_row_caret_position();
                    }

                    let paste_line = [current_row_content.slice(0, caret_position), paste_text_node, current_row_content.slice(caret_position)].join('');
                    
                    current_node.textContent = paste_line;
                    this.put_caret(this_post.childNodes[start_sel_block], caret_position);

               }

          } else {
               for (let i = 0; i < paste_rows.length; i++) {
                    let content = " ".repeat(current_node_spaces) + paste_rows[i];
                    let paste_line = this.create_new_row(content);
                    this.make_drop_down_blocks(elements.current_post);
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
               this.focus_end_element(current_node);
               //put caret
          }
          //divides lines by comma separator
     },
     deleteTab(target_block, focus) {
          let content = target_block.innerText;

          if (content.startsWith(patterns.invisible_char)) {
               content = content.replace(patterns.invisible_char, "");
          }

          content = content.replace("\t", "    ");
          if (content.startsWith('    ')) {
               content = content.substr(4);
          } else if (content.startsWith('   ')) {
               content = content.substr(3);
          } else if (content.startsWith('  ')) {
               content = content.substr(2);
          } else if (content.startsWith(' ')) {
               content = content.substr(1);
          };

          target_block.innerHTML = content;

          if (focus)
               if (focus == true)
                    this.focus_end_element(target_block);
     },
     get_selection_obj() {
          let limit_sel_div1 = this.get_current_div_n("start"),
               limit_sel_div2 = this.get_current_div_n("end"),
               selected_several_rows = false,
               obj_range = this.get_sel_range(),
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
     escape_text(text) {
          const obj_escape_html_map = {
               '&amp;': '&',
               '&lt;': '<',
               '&gt;': '>',
               '&quot': '"',
               '&#039;': "'",
               '&nbsp;': " ",
          };
          return text.replace(/&amp;|&lt;|&gt;|&quot|&#039|&nbsp;/g, function (pattern) {
               return obj_escape_html_map[pattern];
          });
     },
     /*
     rescape_text(text){
          const obj_escape_html_map = {
               '&': '&amp;',
               '<': '&lt;',
               '>': '&gt;',
               '"': '&quot',
               "'": '&#039;',
               " ": '&nbsp;',
          };
          return text.replace(/&|<|>|"|'|\s/g, function (pattern) {
               return obj_escape_html_map[pattern];
          });
     },*/
     get_pos_activation(){

     },
     destruct_shape_activation_number(str_num){

          array_pos = [];

          let symbols = [];
          symbols = matchAll(/./g);

          current_row = -1;
          current_depth = 0;

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

          return array_pos;
     },
     generate_struct_activ_num(obj_allrow){
          function collect_part_number(curr_col, prev_col, activation_octal){

               if(prev_col == curr_col){
                    return "8" + activation_octal;
               } else if(prev_col < curr_col){
                    return "98" + activation_octal;
               } else if(prev_col > curr_col){
                    let quotient = Math.floor((prev_col - curr_col)/ 4);
                    return "99".repeat(quotient) + "8" + activation_octal;
               }
          }
          let general_activation = 0;
          let number = "";
          let last_depth_tmp = 0;
          if(obj_allrow.length > 0)
          
          for (let i = 0; i < obj_allrow.length; i++) {
               let activation_octal = "0";
              

               if(obj_allrow[i]["is_key_row"] == true){
                    let  row_activ = this.get_row_score(obj_allrow[i]["row"]),
                         depth_activ = this.get_depth_score(obj_allrow[i]["depth"]),
                         activation = row_activ * depth_activ;
                         general_activation += activation;

                    activation_octal = this.get_octal_number(activation);

                    number += collect_part_number(obj_allrow[i]["depth"], last_depth_tmp, activation_octal);
               } else {
                    number += collect_part_number(obj_allrow[i]["depth"], last_depth_tmp, "");
               }

               last_depth_tmp = obj_allrow[i]["depth"];
          }

          return {
               number: number,
               general_activation: general_activation,
          }
     },
     get_row_score(row_num){
          if(row_num < 2){
               return 13;
          } else if(row_num < 4){
               return 10;
          } else if(row_num < 8) {
               return 3;
          } else {
               return 1;
          }
     },
     get_depth_score(depth_num){
          if(depth_num < 9){
               return 10;
          } else if (depth_num < 12){
               return 5;
          } else if (depth_num < 20){
               return 2;
          } else {
               return 1;
          } 
     },
     convert_num_to_custom_system(num){
          return {
               from : function (baseFrom) {
                   return {
                       to : function (baseTo) {
                           return parseInt(num, baseFrom).toString(baseTo);
                       }
                   };
               }
          };
     },   
     get_octal_number(num){
          return this.convert_num_to_custom_system(num).from(10).to(8);
     },
     //search block
     search_format_function(current_post, array_of_search_key) {
          let obj_result_search = {};
          let rows = current_post.childNodes;
          if(rows.length > 0)
               return obj_result_search = this.surround_post_text_in_tags_controller(rows, array_of_search_key);
     },
     get_chain_fathers(rows, arr_objs_rows, arr_objs_current_rows){
          if(arr_objs_rows != null){
               let arr_chains = [];

               outer:for (let i = 0; i < arr_objs_current_rows.length; i++){
                    let chain_fathers = '<span class="arrows_sh">'
                                             + arr_objs_current_rows[i]["key"] 
                                        +'</span><br>';
                    let j = arr_objs_current_rows[i]["row"] - 2;
                    let curr_d = arr_objs_current_rows[i]["depth"];
                    let z = 0;
                    while(j >= 0 && z < 5){
                         if(curr_d > arr_objs_rows[j]["depth"]){//is parent
                              let value = rows[j].textContent.trim();
                              chain_fathers = value + "<span class='arrows_sh'> => </span>" + chain_fathers;
                              if(arr_objs_rows[j]["depth"] == 0){
                                   chain_fathers = "&nbsp;&nbsp;" + chain_fathers;
                                   arr_chains.push(chain_fathers);
                                   continue outer
                              } else {
                                   curr_d = arr_objs_rows[j]["depth"];
                                   z++;
                              }
                         }
                         j--;
                    }
                    chain_fathers = "" + chain_fathers;
                    arr_chains.push(chain_fathers);
               }
               return arr_chains;
          }
     },
     get_chain_fathers2(row_els, arr_objs_rows, arr_objs_current_rows){
          if(arr_objs_rows != null){
               let arr_chains = [];

               outer:for (let i = arr_objs_current_rows.length-1; i > 0; i--){
                    let one_chain_fathers = [];
                    let j = arr_objs_current_rows[i]["row"] - 2; // number current row
                    let curr_d = arr_objs_current_rows[i]["depth"]; //depth current row

                    let z = 0;
                    while(j >= 0 && z < 5){
                         if(curr_d > arr_objs_rows[j]["depth"]){//is parent
                              let value = row_els[j].textContent.trim();
        
                              if(arr_objs_rows[j]["depth"] == 0){//finded main parent
                                   let obj_one_chain_father = {
                                        "value": value,
                                        "depth": curr_d,
                                        "row": j,
                                   };
                                   one_chain_fathers.push(obj_one_chain_father);
                                   continue outer;
                              } else {
                                   let obj_one_chain_father = {
                                        "value": value,
                                        "depth": curr_d,
                                        "row": j,
                                   };
                                   one_chain_fathers.push(obj_one_chain_father);
                                   curr_d = arr_objs_rows[j]["depth"];
                                   z++;
                              }
                         }
                         j--;
                    }
               }
          }



          if(arr_objs_rows != null){
               let arr_chains = [];
               let arr_chains_properties = [];
               let fathers_network = "";
               outer:for (let i = 0; i < arr_objs_current_rows.length; i++){
                    let chain_fathers;
                    let father_properties;

                    let j = arr_objs_current_rows[i]["row"] - 2;
                    let curr_d = arr_objs_current_rows[i]["depth"];
                    let z = 0;
                    while(j >= 0 && z < 5){
                         if(curr_d > arr_objs_rows[j]["depth"]){//is parent
                              let value = row_els[j].textContent.trim();
                              father_properties.push(value);
                              if(arr_objs_rows[j]["depth"] == 0){
                                   chain_fathers = "&nbsp;&nbsp;" + chain_fathers;
                                   arr_chains.push(chain_fathers);
                                   let key_fathefeatures_obj = {};
                                   key_fathefeatures_obj[arr_objs_current_rows[i]["key"]] = father_properties;
                                   arr_chains_properties.push(key_fathefeatures_obj);
                                   continue outer
                              } else {
                                   curr_d = arr_objs_rows[j]["depth"];
                                   z++;
                              }
                         }
                         j--;
                    }
                    chain_fathers = "" + chain_fathers;
                    arr_chains.push(chain_fathers);
                    let key_fathefeatures_obj = {};
                    key_fathefeatures_obj[arr_objs_current_rows[i]["key"]] = father_properties;
                    arr_chains_properties.push(key_fathefeatures_obj);

               }
               /*#edit
                    for (let i = 0; i < arr_chains_properties.length; i++){
                         get keys group
                              key1
                              key2
                              ...
                         get all sites beetwen groups one key
                              choose the leaast depth feature as father
                    }
               */
               return fathers_network;
          }
     },
     surround_post_text_in_tags_controller(rows, array_of_search_key) {
          let finded_words = [],
          finded_tags_struct = [],
          cut_rows_arr = [],
          arr_objs_struct_activ = [],
          arr_objs_current_rows = [];

          let previus_row_spaces = 0;

          for (let i = 0; i < rows.length; i++) {
               let  obj_struct_activ = {},
                    is_key_row = false,
                    text_row = rows[i].textContent,
                    space_obj;

               if(text_row == "" || text_row == "\n"){
                    cut_rows_arr.push(i);
                    continue;
               } else if(i == 0){
                    space_obj = this.get_first_spaces_and_boolen_exist_text(text_row, previus_row_spaces, "first");
               } else {
                    space_obj = this.get_first_spaces_and_boolen_exist_text(text_row, previus_row_spaces);
               }
               
               obj_struct_activ["depth"] = space_obj.spaces;
               obj_struct_activ["row"] = i;

               let content_right_spaces = space_obj.content;
               let escaped_itext_row = this.escape_text(content_right_spaces);

               //#remove
               let text_symbols_spans_formatting = escaped_itext_row.replace(patterns.pattern_symbols, function (match_pattern) {
                    if (match_pattern.indexOf("span") != -1) {
                         match_pattern = "";
                    } else {
                         match_pattern = "<span class='special_symbols_style'>" + match_pattern + "</span>";
                    }
                    return match_pattern;
               });

               let regexp;
               let array_is_empty = false;
               

               if (array_of_search_key != null) {
                    if (array_of_search_key.length > 0) {
                         regexp = new RegExp(array_of_search_key.join('|') + '|#[\\p{L}_0-9]*', 'gmu');
                    } else {
                         array_is_empty = true;
                         regexp = new RegExp('#[\\p{L}_0-9]*', 'gmu');
                    }
               }

               let text_with_symbols_tags = text_symbols_spans_formatting.replace(regexp, function (search_key) {

                    if (array_is_empty == false) {
                         if (array_of_search_key.includes(search_key) == true) {
                              finded_words.push(search_key);
                              is_key_row = true;
                              obj_struct_activ["key"] = search_key;
                              if (/#[\p{L}_0-9]*/.test(search_key) == true) {
                                   finded_tags_struct.push({key:search_key, c:i, d:space_obj.spaces});
                                   search_key = "<span class='item_tags_style'><mark>" + search_key + "</mark></span>";
                                   return search_key;
                              } else {
                                   search_key = "<mark>" + search_key + "</mark>";
                                   return search_key;
                              }
                         }
                    }

                    if (/#[\p{L}_0-9]*/.test(search_key) == true) {
                         finded_tags_struct.push({key:search_key, c:i, d:space_obj.spaces});
                         if (array_is_empty == false) {
                              let reg_words_in_tag = new RegExp(array_of_search_key.join('|'), 'gu')
                              search_key = search_key.replace(reg_words_in_tag, function (word) {
                                   finded_words.push(word);
                                   is_key_row = true;
                                   obj_struct_activ["key"] = search_key;
                                   word = "<mark>" + word + "</mark>";
                                   return word;
                              })
                         }
                         search_key = "<span class='item_tags_style'>" + search_key + "</span>";
                         return search_key;
                    }
               });

               rows[i].innerHTML = text_with_symbols_tags;
               obj_struct_activ["is_key_row"] = is_key_row;
               arr_objs_struct_activ.push(obj_struct_activ);
               if(is_key_row == true)
                    arr_objs_current_rows.push(obj_struct_activ);
               
               previus_row_spaces = space_obj.spaces;
          }

          
          if(arr_objs_current_rows.length > 5){
               arr_objs_current_rows.sort((a, b) => b.depth - a.depth);
               arr_objs_current_rows = arr_objs_current_rows.slice(0, 5);
          }
               
          let chain_fathers = this.get_chain_fathers(rows, arr_objs_struct_activ, arr_objs_current_rows);

          let obj_st_acitvations = this.generate_struct_activ_num(arr_objs_struct_activ);

          //AFTER OTHER
          if(cut_rows_arr != null){
               for(let i = rows.length - 1; i >= 0; i--){
                    for(let j = 0; j < cut_rows_arr.length; j++){
                         if(i == cut_rows_arr[j]){
                              rows[i].remove(); 
                         }
                    }
               }
          }
          
          return {
               finded_words: finded_words,
               finded_tags_struct: finded_tags_struct,
               struct_activ_num: obj_st_acitvations.number,
               general_activation: obj_st_acitvations.general_activation,
               chain_fathers: chain_fathers,
          }
     },
     validate_row_formate(node, caret_pos){
          let text_row = node.textContent;
          let escaped_itext_row = this.escape_text(text_row);

          let text_symbols_spans_formatting = escaped_itext_row.replace(patterns.pattern_symbols, function (match_pattern) {
               if (match_pattern.indexOf("span") != -1) {
                    match_pattern = "";
               } else {
                    match_pattern = "<span class='special_symbols_style'>" + match_pattern + "</span>";
               }
               return match_pattern;
          });

          let regexp = new RegExp('#[\\p{L}_0-9]*', 'gmu');
               
          let text_with_symbols_tags = text_symbols_spans_formatting.replace(regexp, function (search_key) {
               search_key = "<span class='item_tags_style'>" + search_key + "</span>";
               return search_key;
          });
          //put current caret
          node.innerHTML = text_with_symbols_tags;
     },
     //
     put_rows(post, is_return_array){
          let subclasses = [];
          let rows = post.childNodes;
          //get hide rows
          for(let i = 0; i < rows.length; i++){
               
               if(rows[i].classList.contains("subclass")){
                    subclasses.push(i);
               }
          }
          let numbers_bar = post.parentNode.querySelector(".numbers_bar");

          let count_rows = rows.length;
          numbers_bar.innerHTML = "";
          let numbers_array = [];

          for(let ind = 1; ind < (count_rows+1); ind++){
               let container = document.createElement("div");

               let number = document.createElement("div");
               number.innerHTML = ind;

               let arrows_container = document.createElement("div");
               arrows_container.className = "arrows_c";
               
               container.append(number, arrows_container);
               numbers_bar.append(container);

               numbers_array.push(container);
          }

          let num_conts = numbers_bar.childNodes;
          
          for(let j = 0; j < subclasses.length; j++){
               num_conts[subclasses[j]].classList.add("subclass");
          }     

          if(is_return_array != undefined){
               return numbers_array;
          }

     },
     make_drop_down_blocks(parent_el) {

          let classes_arr = [];
          var arr_row_spaces = [];
          classes_arr = parent_el.childNodes;
          let numbers_bar = [];
          
          if(classes_arr.length > 0){

               numbers_bar = this.put_rows(parent_el, true);
               let arrows_containers = parent_el.parentNode.querySelectorAll(".arrows_c");

               for(let i = 0; i < classes_arr.length; i++){
                    let text = classes_arr[i].innerText;
                    let obj_spaces = this.get_first_spaces_and_boolen_exist_text(text);
                    arr_row_spaces.push(obj_spaces.spaces);
               }

               for(let j = 0; j < arr_row_spaces.length; j++){

                    //check collapsed
                    let subclasses_num = [];
                    let subclasses = [];

                    if(arr_row_spaces[j+1] == null){
                         break
                    }

                    let arr_cont_CL = arrows_containers[j].classList;
                    //merge (1,2) and remove weak embedded blocks
                    //(1)
                    if(arr_row_spaces[j] < arr_row_spaces[j+1]){

                         classes_arr[j].classList.add("class");
                         arrows_containers[j].innerHTML = "+";
                         if(!classes_arr[j+1].classList.contains("subclass")){
                              arr_cont_CL.add("open_d_d");
                         } else {
                              if(classes_arr[j].classList.contains("subclass")){
                                   arr_cont_CL.add("open_d_d");
                              }
                         }

                    }
                    if(classes_arr[j].textContent.trim() == ""){
                         continue
                    }
                    
                    let z = j + 1;
                    let counter = 0;
                    //(2)
                    while(arr_row_spaces[j] < arr_row_spaces[z]){
                         subclasses.push(classes_arr[z]);
                         subclasses_num.push(numbers_bar[z]);

                         if(counter+2 == arr_row_spaces.length){
                              break
                         }
                         z++;
                         counter++;
                    }

                    
                    arrows_containers[j].addEventListener('click', function (e) {

                         if(subclasses != null){
                              if(subclasses[0]){
                                   if (subclasses[0].classList.contains("subclass")){
                                        arr_cont_CL.add("open_d_d");
                                        for(let c = 0; c < subclasses.length; c++){
                                             let sub_c_CL = subclasses[c].classList;
                                             let sub_c_num_CL = subclasses_num[c].classList;
          
                                             if(sub_c_CL.contains("subclass")){
                                                  sub_c_CL.remove("subclass");
                                                  sub_c_num_CL.remove("subclass");
                                             }
          
                                        }

                                   } else {
                                        arr_cont_CL.remove("open_d_d");
                                        if(subclasses != null){
                                             for(let c = 0; c < subclasses.length; c++){
                                                  let sub_c_CL = subclasses[c].classList;
                                                  let sub_c_num_CL = subclasses_num[c].classList;
                                                  
                                                  if(!sub_c_CL.contains("subclass")){
                                                       if(sub_c_CL.contains("class")){
                                                            sub_c_CL.remove("class");
                                                       }
                                                       sub_c_CL.add("subclass");
                                                       sub_c_num_CL.add("subclass");
                                                  }
          
                                             }
                                        }
                                   }
                              }
                         }
                    });
                    
               }
          }
     },
     echo_data() {
          let count_rows = 0,
               count_tags = 0,
               count_words = 0,
               count_points = 0,
               count_words_arr = [],
               count_tags_arr = [],
               rows_arr = [],
               content = elements.current_post.textContent;

          let patterns1 = {
               words: /[^\s]*[\p{L}\p{P}_0-9]/gu,
          }

          //get not empty rows
          rows_arr = elements.current_post.childNodes;
          if (rows_arr != null) {
               for (let j = 0; j < rows_arr.length; j++) {
                    let text_characters_arr = rows_arr[j].textContent.match(/[^\s]*[\p{L}\p{P}_0-9]/gu);
                    if (text_characters_arr != null)
                         count_rows += 1;
               }
          }

          //get count words
          count_words_arr = content.match(patterns1.words);
          if (count_words_arr != null)
               count_words = count_words_arr.length;

          //get count tags
          count_tags_arr = content.match(patterns.pattern_tag);
          if (count_tags_arr != null)
               count_tags = count_tags_arr.length;
          //sigmoid(count_tags)

          let counters = {
               words: count_words,
               rows: count_rows,
               tags: count_tags,
          }

          //let points = (normalizing_tag_f(count_tags) * normalizing_rows_f(count_rows) / normalizing_words_f(count_words);

          function normalizing_tag_f(count_tags) {
               sigmoid(count_tags)
          }

          function normalizing_rows_f(count_rows) {
               sigmoid(count_tags)
          }

          function normalizing_words_f(count_words) {
               //let count_words_index = 0.0001*(count_words**2) - (0.02*count_words) + 1.0001;
               //after extreme other function
               //count_words = 0,001*(count_words**2) - (0,02*count_words) + 7,99;
               //sigmoid(count_words)
               sigmoid(count_words)
          }


          //check structurization
          if (count_rows * 3 > count_words) {
               count_points = (count_tags * count_rows) / (2 * count_words);
          } else {
               count_points = (count_tags * count_rows) / count_words;
          }

          //math
          function sigmoid(z) {
               return 10 / (1 + Math.exp(-z));
          }
          function echo_points(count_points) {
               let hard_index = 10;
               let result = sigmoid(count_points / hard_index);
               return result;
          }
          count_points = echo_points(count_points);
          count_points = Math.floor(count_points * 10) / 10;

          let post_low_panel = elements.current_post.parentNode.parentNode.querySelector(".post_low_panel")
          let count_rows_node = post_low_panel.querySelector(".count_rows"),
               count_words_node = post_low_panel.querySelector(".count_words"),
               count_tags_node = post_low_panel.querySelector(".count_tags"),
               count_points_node = post_low_panel.querySelector(".count_points");
          if(count_words > 500){
               count_words_node.innerHTML = "W: " + "<error>" + count_words + "</error>";
          } else {
               count_words_node.textContent = "W: " + count_words;
          }
          count_rows_node.textContent = "R: " + count_rows;
          count_tags_node.textContent = "#: " + count_tags;
          count_points_node.textContent = "points: " + count_points;
          //make vertical lines 
     }
}