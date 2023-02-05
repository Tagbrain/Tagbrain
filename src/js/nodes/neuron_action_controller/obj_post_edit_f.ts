import {patterns} from "../../units/declare_patterns";
import {escape_text} from "../../units/escape_text";
import {get_depth_outgrowth} from "../../units/get_depth_outgrowth";
import {drop_down_c_neuron_c_branche_s} from "../../units/drop_down_c_neuron_c_branche_s";

export let elements = {
     all_posts: document.querySelectorAll(".item_input"),
     current_post: document,
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
     get_current_line_div(node_par: Element | string) {
          let div_n = this.get_current_div_n(node_par);
          return elements.current_post.childNodes[div_n];
     },
     get_current_div_n(node_par: Element | string) {
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
     create_new_row(content: string, is_enter: boolean) {
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
     get_current_line_spaces(current_node: Element) {
          let outgrowth_text = current_node.textContent;
          let obj_space = get_depth_outgrowth(outgrowth_text);
          return obj_space.depth;
     },
     focus_end_element(element: HTMLElement) {
          let new_range = new Range();
          new_range.selectNodeContents(element);
          document.getSelection()?.removeAllRanges();
          document.getSelection()?.addRange(new_range);
          new_range.collapse();
     },
     put_caret(node: HTMLElement | Text, pos: string){
          // do => SAVE_SELECTION
          if(typeof(pos) === 'number'){
               let position: number = pos;
               if(node.nodeType == 1){
                    let Elnode = node as Node;
                    let childs = Elnode.childNodes;
                    let i = 0;
                    if(childs != null){
                         while(i < childs.length) {
                              let text = childs[i].textContent,
                              len: number = 0;
                              if(text != null)
                                   len = text.length;

                              if(len < position){
                                   position = position - len;
                                   i++;
                                   continue
                              } else {
                                   if(childs[i].nodeType == 3){
                                        let element: HTMLElement = Elnode as HTMLElement;
                                        element.focus();
                                        document.getSelection()?.collapse(childs[i], position);
                                        return
                                   } else {
                                        let element: HTMLElement = childs[i] as HTMLElement;
                                        element.focus();
                                        document.getSelection()?.collapse(childs[i].childNodes[0], position);
                                        return
                                   }
                              }
                         }
                    }
               }
               // #edit => RETURN OLD SELECTION

          } else if (pos === "end" || undefined){

               let new_range = new Range();
               new_range.selectNodeContents(node);
               if (document.getSelection !== null){
               document.getSelection()?.removeAllRanges();
               document.getSelection()?.addRange(new_range);
               }
               new_range.collapse();
               return
          }
     },
     get_row_caret_position() {
          let obj_caret = this.get_sel_range(),
               current_row = this.get_current_line_div(obj_caret.sel.anchorNode),
               caret_position = this.get_position_in_row(obj_caret.sel.anchorNode, obj_caret.sel.anchorOffset, current_row);
          return caret_position;
     },
     iterate_childs_to_target(target_node: Node | Text, current_node: Node | Text, position_in_row_where_node: number){
          if(target_node != current_node){
               let current_node_children: NodeListOf<Node> = current_node.childNodes;
               for (let i = 0; i < current_node_children.length; i++) {
                    let child = current_node_children[i];
                    if(target_node == child){
                         return position_in_row_where_node;
                    } else {
                         if(child.nodeType == 3){//this is text
                              let text = child.textContent;
                              if(text != null){
                                   position_in_row_where_node += text.length;
                              }
                         } else {//this is node
                              if(current_node.contains(target_node)){
                                   this.iterate_childs_to_target(target_node, child, position_in_row_where_node);
                              } else {
                                   let text_node = current_node.textContent
                                   if(text_node != null){
                                        position_in_row_where_node += text_node.length;
                                   }
                              }
                         }
                    }
               }
          }
          return position_in_row_where_node;
     },
     get_position_in_row(target_node: HTMLElement | Text, node_position:number, current_row:Node) {
          let position_in_row_where_node = 0;
          let current_row_childnodes: NodeListOf<Node> = current_row.childNodes;

          for (let i = 0; i < current_row_childnodes.length; i++) {
               let current_node: Text | HTMLElement = current_row_childnodes[i] as Text | HTMLElement;
               if(target_node == current_node){//this is target node
                    position_in_row_where_node += node_position;
                    break
               } else {//this contains target node
                    if(current_node.contains(target_node)){//current_node contain target node
                         position_in_row_where_node = this.iterate_childs_to_target(target_node, current_node, position_in_row_where_node);
                         position_in_row_where_node += node_position
                         break
                    } else {//get current node length and follow to the next 
                         let textcont = current_node.textContent;
                         if(textcont != null)
                              position_in_row_where_node += textcont.length;
                         continue
                    }
               }

          }   
          //clean syntax
          let row_content = current_row.textContent;
          if(row_content != null)
               current_row.textContent = row_content;

          return position_in_row_where_node;
     },
     //textNode first level post
     surrounded_div(text: string) {
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
     transfer_line(tab_index: string) {
          let current_node = this.get_current_line_div(),
               current_node_content:string = current_node.textContent,
               amount_spaces_current_node = this.get_current_line_spaces(current_node),
               caret_position = this.get_row_caret_position(),
               first_part_content = current_node_content.slice(0, caret_position),
               second_part_content: string = current_node_content.slice(caret_position),
               obj_second_line_spaces = get_depth_outgrowth(second_part_content);


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
     insert_one_tab(focus: boolean, current_element: HTMLElement) {
          let node_text = current_element.innerText;

          node_text = "    " + node_text;
          current_element.innerHTML = node_text;

          if (focus)
               this.focus_end_element(current_element);
     },
     paste_formatting(paste: string) {
          let this_post: any = elements.current_post,
              obj_caret = this.get_sel_range(),
              current_node = this.get_current_line_div(),
              current_node_spaces = this.get_current_line_spaces(current_node),
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
                         let spaces_previus_line_n = this.get_current_line_spaces(this_post.childNodes[start_sel_block]);
                         let content_second_line = this_post.childNodes[start_sel_block + 1].textContent;
                         this_post.childNodes[start_sel_block + 1].textContent = " ".repeat(spaces_previus_line_n) + content_second_line;
                    } else { //remove zero line
                         this_post.removeChild(this_post.childNodes[start_sel_block + 1]);
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
     deleteTab(target_block: HTMLElement, focus: boolean) {
          let content = target_block.innerText;
          if(content != null){
               content = content.replace("\t", "    ");
               content.search(/\s\s\s\s/i);
               if (content.search(/\s\s\s\s/i) == 0) {
                    content = content.substring(4);
               } else if (content.search(/\s\s\s/i) == 0) {
                    content = content.substring(3);
               } else if (content.search(/\s\s/i) == 0) {
                    content = content.substring(2);
               } else if (content.search(/\s/i) == 0) {
                    content = content.substring(1);
               };
               target_block.innerText = content;
          }

          if (focus)
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
     get_pos_activation(){

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
     },
     validate_row_formate(node: HTMLElement, caret_pos: number){
          
          let text_row = node.textContent;
          let escaped_itext_row = escape_text(text_row);

          let regexp = new RegExp(patterns.pattern_tag, 'gmu');
               
          let text_with_symbols_tags = escaped_itext_row.replace(regexp, function (search_key:string) {
               search_key = "<span class='item_tags_style'>" + search_key + "</span>";
               return search_key;
          });
          //put current caret
          node.innerHTML = text_with_symbols_tags;
     },
     //
     put_rows(post:HTMLElement, is_return_array:boolean){
          let subclasses: number[] = [];
          let rows = post.children;
          //get hide rows
          for(let i = 0; i < rows.length; i++){
               
               if(rows[i].classList.contains("subclass")){
                    subclasses.push(i);
               }
          }
          let numbers_bar: HTMLElement | null = null;

          let parent: HTMLElement | null = null;
          if(post.parentElement != null){
               parent = post.parentElement;
               numbers_bar = parent.querySelector(".numbers_bar");
          }

          if(numbers_bar != null){
               let count_rows = rows.length;
               numbers_bar.innerHTML = "";
               let numbers_array: HTMLElement [] = [];

               for(let ind = 1; ind < (count_rows+1); ind++){
                    let container: HTMLElement  = document.createElement("div");

                    let number: HTMLElement  = document.createElement("div");
                    number.innerHTML = ind.toString();

                    let arrows_container = document.createElement("div");
                    arrows_container.className = "arrows_c";
                    
                    container.append(number, arrows_container);
                    numbers_bar.append(container);

                    numbers_array.push(container);
               }

               let num_conts = numbers_bar.children;
               
               for(let j = 0; j < subclasses.length; j++){
                    num_conts[subclasses[j]].classList.add("subclass");
               }     

               if(is_return_array != undefined){
                    return numbers_array;
               }
          }
     },
     make_drop_down_blocks(parent_el: HTMLElement) {
          var arr_row_spaces: number[] = [];
          let classes_arr = parent_el.children as HTMLCollectionOf<HTMLElement>;
          let numbers_bar: HTMLElement[] = [];
          
          if(classes_arr.length > 0){

               numbers_bar = this.put_rows(parent_el, true);
               let arrows_containers: HTMLCollectionOf<HTMLElement>;
               if(parent_el.parentElement != null){
                    arrows_containers = parent_el.parentElement.getElementsByClassName("arrows_c") as HTMLCollectionOf<HTMLElement>;
               } else {
                    return
               }
               for(let i = 0; i < classes_arr.length; i++){
                    let text = classes_arr[i].innerText;
                    let obj_spaces = get_depth_outgrowth(text);
                    arr_row_spaces.push(obj_spaces.depth);
               }

               for(let j = 0; j < arr_row_spaces.length; j++){

                    //check collapsed
                    let subclasses_num: HTMLElement[] = [];
                    let subclasses: HTMLElement[] = [];

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
                    if(classes_arr[j].innerText.trim() == ""){
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
}